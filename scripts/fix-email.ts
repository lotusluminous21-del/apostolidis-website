import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as dotenv from 'dotenv';
import * as path from 'path';

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

async function fixEmail() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const authInstance = getAuth(app);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('Missing credentials in .env.local');
  }

  console.log('🔐 Authenticating...');
  await signInWithEmailAndPassword(authInstance, email, password);
  console.log('✅ Authenticated');

  const settingsRef = doc(db, 'site_settings', 'main');
  console.log('🛠 Updating site_settings/main contact email...');
  
  await updateDoc(settingsRef, {
    'contact.email': 'apostolidisconstruction@gmail.com'
  });

  console.log('✨ Firestore updated successfully!');
}

fixEmail().catch(err => {
  console.error('❌ Error updating Firestore:', err);
  process.exit(1);
});
