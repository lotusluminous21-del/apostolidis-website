/**
 * Seed Firestore & Firebase Storage Migration Script
 * 
 * Uploads all media from /public/apostolidis_highlights/ to Firebase Storage,
 * seeds the Firestore `projects`, `services`, and `site_settings` collections.
 * 
 * Usage:
 *   npx tsx scripts/seed-firestore.ts
 * 
 * Prerequisites:
 *   - Firebase Auth admin user already created
 *   - Firestore + Storage rules already deployed
 *   - .env.local file present with Firebase config
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const authInstance = getAuth(app);

// Authenticate as admin before running migration
async function authenticateAdmin(): Promise<void> {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env.local. ' +
      'Add these credentials for the Firebase Auth admin user.'
    );
  }

  console.log(`🔐 Authenticating as ${email}...`);
  await signInWithEmailAndPassword(authInstance, email, password);
  console.log('   ✅ Authenticated successfully');
}

const HIGHLIGHTS_DIR = path.join(process.cwd(), 'public', 'apostolidis_highlights');

// ── Helpers ───────────────────────────────────────────────────────────────

function getAllMediaFiles(dir: string): { relativePath: string; absolutePath: string; folder: string }[] {
  const results: { relativePath: string; absolutePath: string; folder: string }[] = [];
  const folders = fs.readdirSync(dir);

  for (const folder of folders) {
    const folderPath = path.join(dir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.webp', '.jpg', '.jpeg', '.png', '.mp4', '.webm', '.mov'].includes(ext)) {
        results.push({
          relativePath: `/apostolidis_highlights/${folder}/${file}`,
          absolutePath: path.join(folderPath, file),
          folder,
        });
      }
    }
  }

  return results;
}

async function uploadFile(
  absolutePath: string,
  storagePath: string
): Promise<string> {
  const fileBuffer = fs.readFileSync(absolutePath);
  const storageRef = ref(storage, storagePath);

  const ext = path.extname(absolutePath).toLowerCase();
  const contentTypeMap: Record<string, string> = {
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
  };

  await uploadBytes(storageRef, fileBuffer, {
    contentType: contentTypeMap[ext] || 'application/octet-stream',
  });

  return getDownloadURL(storageRef);
}

// ── Step 1: Upload Media ─────────────────────────────────────────────────

async function uploadAllMedia(): Promise<Map<string, string>> {
  console.log('\n📁 Step 1: Uploading media to Firebase Storage...');
  const urlMap = new Map<string, string>(); // localPath -> storageUrl

  const files = getAllMediaFiles(HIGHLIGHTS_DIR);
  console.log(`   Found ${files.length} media files across ${new Set(files.map(f => f.folder)).size} folders`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const storagePath = `projects/${file.folder}/${path.basename(file.absolutePath)}`;

    try {
      const url = await uploadFile(file.absolutePath, storagePath);
      urlMap.set(file.relativePath, url);
      console.log(`   ✓ [${i + 1}/${files.length}] ${path.basename(file.absolutePath)}`);
    } catch (err: any) {
      console.error(`   ✗ [${i + 1}/${files.length}] ${path.basename(file.absolutePath)}: ${err.message}`);
    }
  }

  console.log(`   ✅ Uploaded ${urlMap.size}/${files.length} files`);
  return urlMap;
}

// ── Step 2: Seed Projects ────────────────────────────────────────────────

async function seedProjects(urlMap: Map<string, string>) {
  console.log('\n📦 Step 2: Seeding projects to Firestore...');

  const projectsPath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    // Rewrite image URLs
    if (project.images) {
      project.images = project.images.map((img: { src: string; alt: string }) => ({
        src: urlMap.get(img.src) || img.src, // Fallback to original if not found
        alt: img.alt,
      }));
    }

    // Add order field
    project.order = i;

    const docId = project.id || project.slug;
    await setDoc(doc(db, 'projects', docId), project);
    console.log(`   ✓ [${i + 1}/${projects.length}] ${project.title}`);
  }

  console.log(`   ✅ Seeded ${projects.length} projects`);
}

// ── Step 3: Seed Services ────────────────────────────────────────────────

async function seedServices() {
  console.log('\n🔧 Step 3: Seeding services to Firestore...');

  const enMessages = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'messages', 'en.json'), 'utf-8')
  );
  const elMessages = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'messages', 'el.json'), 'utf-8')
  );

  const serviceKeys: string[] = enMessages.Services.items;
  const enList = enMessages.Services.list;
  const elList = elMessages.Services.list;

  for (let i = 0; i < serviceKeys.length; i++) {
    const key = serviceKeys[i];
    const service = {
      id: key,
      key,
      name_en: enList[key] || key,
      name_el: elList[key] || key,
      order: i,
    };

    await setDoc(doc(db, 'services', key), service);
    console.log(`   ✓ [${i + 1}/${serviceKeys.length}] ${service.name_en}`);
  }

  console.log(`   ✅ Seeded ${serviceKeys.length} services`);
}

// ── Step 4: Seed Site Settings ───────────────────────────────────────────

async function seedSiteSettings() {
  console.log('\n⚙️  Step 4: Seeding site settings...');

  const en = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'messages', 'en.json'), 'utf-8')
  );
  const el = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'messages', 'el.json'), 'utf-8')
  );

  const settings = {
    about: {
      heading_en: en.About.heading,
      heading_el: el.About.heading,
      description1_en: en.About.description1,
      description1_el: el.About.description1,
      description2_en: en.About.description2,
      description2_el: el.About.description2,
      description3_en: en.About.description3,
      description3_el: el.About.description3,
      statsProjects: '40+',
      statsYears: '7+',
      statsClients: '100%',
    },
    contact: {
      email: 'apostolidisconstructions@gmail.com',
      phone: '',
      address_en: en.Contact.addressValue,
      address_el: el.Contact.addressValue,
      hours_en: en.Contact.info.hoursValue,
      hours_el: el.Contact.info.hoursValue,
    },
    footer: {
      tagline_en: en.Footer.tagline,
      tagline_el: el.Footer.tagline,
      establishedYear: '2018',
    },
  };

  await setDoc(doc(db, 'site_settings', 'main'), settings);
  console.log('   ✅ Site settings seeded');
}

// ── Main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Apostolidis CMS Migration');
  console.log(`   Project: ${firebaseConfig.projectId}`);
  console.log(`   Storage: ${firebaseConfig.storageBucket}`);

  await authenticateAdmin();

  const urlMap = await uploadAllMedia();
  await seedProjects(urlMap);
  await seedServices();
  await seedSiteSettings();

  console.log('\n🎉 Migration complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌ Migration failed:', err);
  process.exit(1);
});
