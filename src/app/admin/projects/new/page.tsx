'use client';

import { useAuth } from '@/components/admin/auth-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { BilingualField, BilingualListField } from '@/components/admin/bilingual-field';
import { ImageUploader, MediaItem } from '@/components/admin/image-uploader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, doc, setDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { ArrowLeft, Save, Sparkles, Loader2 } from 'lucide-react';
import { generateProjectDescriptions, generateScopeAndFeatures } from '@/lib/ai/agent';

interface ProjectData {
  code: string;
  slug: string;
  title: string;
  title_el: string;
  category: string;
  category_el: string;
  location: string;
  status: string;
  shortDescription: string;
  shortDescription_el: string;
  fullDescription: string;
  fullDescription_el: string;
  scopeOfWork: string[];
  scopeOfWork_el: string[];
  keyFeatures: string[];
  materials: string[];
  specs: { label: string; value: string }[];
  specs_el: { label: string; value: string }[];
  images: MediaItem[];
  isFeatured: boolean;
  order: number;
}

const categories = [
  { en: 'Commercial & Retail', el: 'Επαγγελματικοί Χώροι' },
  { en: 'Residential Apartment', el: 'Ανακαίνιση Διαμερίσματος' },
  { en: 'Single-Family Home', el: 'Μονοκατοικία' },
];

const statuses = ['Completed', 'In Progress', 'Ongoing Portfolio'];

export default function NewProjectPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [project, setProject] = useState<ProjectData>({
    code: '',
    slug: '',
    title: '',
    title_el: '',
    category: 'Residential Apartment',
    category_el: 'Ανακαίνιση Διαμερίσματος',
    location: '',
    status: 'Completed',
    shortDescription: '',
    shortDescription_el: '',
    fullDescription: '',
    fullDescription_el: '',
    scopeOfWork: [],
    scopeOfWork_el: [],
    keyFeatures: [],
    materials: [],
    specs: [],
    specs_el: [],
    images: [],
    isFeatured: false,
    order: 0,
  });
  const [saving, setSaving] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isDraftingScope, setIsDraftingScope] = useState(false);

  const isBasicInfoPopulated = Boolean(project.title && project.title_el && project.category);
  const isDescriptionsPopulated = Boolean(project.shortDescription && project.shortDescription_el && project.fullDescription && project.fullDescription_el);

  useEffect(() => {
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  // Get next order number
  useEffect(() => {
    if (!user) return;
    async function getNextOrder() {
      const q = query(collection(db, 'projects'), orderBy('order', 'desc'));
      const snap = await getDocs(q);
      const maxOrder = snap.docs.length > 0 ? (snap.docs[0].data().order ?? 0) : -1;
      setProject((prev) => ({ ...prev, order: maxOrder + 1 }));
    }
    getNextOrder();
  }, [user]);

  function updateField<K extends keyof ProjectData>(field: K, value: ProjectData[K]) {
    setProject((prev) => ({ ...prev, [field]: value }));
  }

  // Auto-generate slug from title
  function handleTitleChange(title: string) {
    updateField('title', title);
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    updateField('slug', slug);
  }

  async function handleAutoDraftDescriptions() {
    if (!isBasicInfoPopulated) {
      alert('Please fill out the Title, Greek Title, and Category first.');
      return;
    }
    setIsDrafting(true);
    try {
      const result = await generateProjectDescriptions(project.title, project.category, project.location);
      if (result) {
        setProject(prev => ({
          ...prev,
          shortDescription: prev.shortDescription || result.short_en,
          shortDescription_el: prev.shortDescription_el || result.short_el,
          fullDescription: prev.fullDescription || result.long_en,
          fullDescription_el: prev.fullDescription_el || result.long_el,
        }));
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate draft. Please check console for Vertex AI details.');
    } finally {
      setIsDrafting(false);
    }
  }

  async function handleAutoDraftScope() {
    if (!isDescriptionsPopulated) {
      alert('Please fully populate the descriptions first.');
      return;
    }
    setIsDraftingScope(true);
    try {
      const result = await generateScopeAndFeatures(project.shortDescription, project.fullDescription);
      if (result) {
        setProject(prev => ({
          ...prev,
          scopeOfWork: prev.scopeOfWork.length ? prev.scopeOfWork : result.scope_en,
          scopeOfWork_el: prev.scopeOfWork_el.length ? prev.scopeOfWork_el : result.scope_el,
        }));
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate scope of work.');
    } finally {
      setIsDraftingScope(false);
    }
  }

  async function handleSave() {
    if (!project.title || !project.slug) return;
    setSaving(true);
    try {
      const docId = project.slug;
      await setDoc(doc(db, 'projects', docId), {
        ...project,
        id: docId,
      });
      router.push('/admin/projects');
    } catch (err) {
      console.error('Failed to create project:', err);
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    'w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all text-sm';
  const selectClass =
    'w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all text-sm appearance-none';

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <AdminSidebar />
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/projects')}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">New Project</h1>
              <p className="text-zinc-500 text-sm mt-0.5">Add a new project to your portfolio</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !project.title}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-xl text-sm font-semibold hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Creating...' : 'Create Project'}
          </button>
        </div>

        {/* Form */}
        <div className="space-y-8 max-w-5xl">
          {/* Basic Info */}
          <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Basic Information</h2>

            <BilingualField
              labelEn="Title"
              labelEl="Τίτλος"
              valueEn={project.title}
              valueEl={project.title_el}
              onChangeEn={handleTitleChange}
              onChangeEl={(v) => updateField('title_el', v)}
              required
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Code</label>
                <input
                  type="text"
                  value={project.code}
                  onChange={(e) => updateField('code', e.target.value)}
                  placeholder="AP-017"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Slug (auto)</label>
                <input
                  type="text"
                  value={project.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                  placeholder="project-slug"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Location</label>
                <input
                  type="text"
                  value={project.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Athens, Greece"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Category</label>
                <select
                  value={project.category}
                  onChange={(e) => {
                    const cat = categories.find((c) => c.en === e.target.value);
                    updateField('category', e.target.value);
                    if (cat) updateField('category_el', cat.el);
                  }}
                  className={selectClass}
                >
                  {categories.map((c) => (
                    <option key={c.en} value={c.en}>{c.en}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Status</label>
                <select
                  value={project.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  className={selectClass}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl w-full">
                  <input
                    type="checkbox"
                    checked={project.isFeatured}
                    onChange={(e) => updateField('isFeatured', e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500/30"
                  />
                  <span className="text-sm text-zinc-300">Featured Project</span>
                </label>
              </div>
            </div>
          </section>

          {/* Descriptions */}
          <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Descriptions</h2>
              <button
                type="button"
                onClick={handleAutoDraftDescriptions}
                disabled={isDrafting || !isBasicInfoPopulated}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
              >
                {isDrafting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Auto-Draft Descriptions
              </button>
            </div>
            <BilingualField
              labelEn="Short Description"
              labelEl="Σύντομη Περιγραφή"
              valueEn={project.shortDescription}
              valueEl={project.shortDescription_el}
              onChangeEn={(v) => updateField('shortDescription', v)}
              onChangeEl={(v) => updateField('shortDescription_el', v)}
              type="textarea"
            />
            <BilingualField
              labelEn="Full Description"
              labelEl="Πλήρης Περιγραφή"
              valueEn={project.fullDescription}
              valueEl={project.fullDescription_el}
              onChangeEn={(v) => updateField('fullDescription', v)}
              onChangeEl={(v) => updateField('fullDescription_el', v)}
              type="textarea"
            />
          </section>

          {/* Scope of Work */}
          <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Scope of Work & Features</h2>
              <button
                type="button"
                onClick={handleAutoDraftScope}
                disabled={isDraftingScope || !isDescriptionsPopulated}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
              >
                {isDraftingScope ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Auto-Draft Scope & Features
              </button>
            </div>
            <BilingualListField
              labelEn="Scope of Work"
              labelEl="Εύρος Εργασιών"
              valuesEn={project.scopeOfWork}
              valuesEl={project.scopeOfWork_el}
              onChangeEn={(v) => updateField('scopeOfWork', v)}
              onChangeEl={(v) => updateField('scopeOfWork_el', v)}
              placeholder="Add work item..."
            />
          </section>

          {/* Media */}
          <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Media Gallery</h2>
            <ImageUploader
              images={project.images}
              onChange={(imgs) => updateField('images', imgs)}
              storagePath={`projects/${project.slug || 'new-project'}`}
            />
          </section>

          {/* Bottom Actions */}
          <div className="flex justify-end gap-3 pb-8">
            <button
              onClick={() => router.push('/admin/projects')}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !project.title}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-xl text-sm font-semibold hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
