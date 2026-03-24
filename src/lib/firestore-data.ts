import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  code: string;
  slug: string;
  title: string;
  title_el?: string;
  category: string;
  category_el?: string;
  location: string;
  status: string;
  specs: ProjectSpec[];
  specs_el?: ProjectSpec[];
  shortDescription: string;
  shortDescription_el?: string;
  fullDescription: string;
  fullDescription_el?: string;
  scopeOfWork: string[];
  scopeOfWork_el?: string[];
  keyFeatures: string[];
  materials?: string[];
  images: ProjectImage[];
  isFeatured?: boolean;
  order?: number;
}

export interface ServiceItem {
  id: string;
  key: string;
  name_en: string;
  name_el: string;
  order: number;
}

export interface SiteSettings {
  about: {
    heading_en: string;
    heading_el: string;
    description1_en: string;
    description1_el: string;
    description2_en: string;
    description2_el: string;
    description3_en: string;
    description3_el: string;
    statsProjects: string;
    statsYears: string;
    statsClients: string;
  };
  contact: {
    email: string;
    phone: string;
    address_en: string;
    address_el: string;
    hours_en: string;
    hours_el: string;
  };
  footer: {
    tagline_en: string;
    tagline_el: string;
    establishedYear: string;
  };
}

// ── Projects ─────────────────────────────────────────────────────────────

let cachedProjects: Project[] | null = null;

export async function getProjects(): Promise<Project[]> {
  if (cachedProjects) return cachedProjects;

  const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  cachedProjects = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
  return cachedProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.category === category);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.isFeatured);
}

// ── Services ─────────────────────────────────────────────────────────────

let cachedServices: ServiceItem[] | null = null;

export async function getServices(): Promise<ServiceItem[]> {
  if (cachedServices) return cachedServices;

  try {
    const q = query(collection(db, 'services'), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    cachedServices = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceItem));
    return cachedServices;
  } catch (err) {
    console.error('Failed to fetch services from Firestore:', err);
    return [];
  }
}

// ── Site Settings ────────────────────────────────────────────────────────

let cachedSettings: SiteSettings | null = null;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (cachedSettings) return cachedSettings;

  try {
    const snap = await getDoc(doc(db, 'site_settings', 'main'));
    if (snap.exists()) {
      cachedSettings = snap.data() as SiteSettings;
      return cachedSettings;
    }
    return null;
  } catch (err) {
    console.error('Failed to fetch site settings:', err);
    return null;
  }
}

// ── Cache Invalidation ──────────────────────────────────────────────────

export function invalidateCache() {
  cachedProjects = null;
  cachedServices = null;
  cachedSettings = null;
}
