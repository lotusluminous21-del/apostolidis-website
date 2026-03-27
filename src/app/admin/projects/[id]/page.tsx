'use client';

import { useAuth } from '@/components/admin/auth-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { BilingualField, BilingualListField } from '@/components/admin/bilingual-field';
import { ImageUploader, MediaItem } from '@/components/admin/image-uploader';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { ArrowLeft, Save, Trash2, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { generateProjectDescriptions, generateScopeAndFeatures } from '@/lib/ai/agent';
import { triggerRevalidation } from '@/lib/revalidate';

interface ProjectData {
  id: string;
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
  specs: { label: string; value: string }[];
  specs_el: { label: string; value: string }[];
  images: MediaItem[];
  isFeatured: boolean;
  order: number;
}

const defaultProject: ProjectData = {
  id: '',
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
  specs: [],
  specs_el: [],
  images: [],
  isFeatured: false,
  order: 0,
};

const categories = [
  { en: 'Commercial & Retail', el: 'Επαγγελματικοί Χώροι' },
  { en: 'Residential Apartment', el: 'Ανακαίνιση Διαμερίσματος' },
  { en: 'Single-Family Home', el: 'Μονοκατοικία' },
];

const statuses = ['Completed', 'In Progress', 'Ongoing Portfolio'];

export default function EditProjectPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<ProjectData>(defaultProject);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isDraftingScope, setIsDraftingScope] = useState(false);
  const [showDraftConfirm, setShowDraftConfirm] = useState(false);
  const [showScopeConfirm, setShowScopeConfirm] = useState(false);

  const isBasicInfoPopulated = Boolean(project.title && project.title_el && project.category);
  const isDescriptionsPopulated = Boolean(project.shortDescription && project.shortDescription_el && project.fullDescription && project.fullDescription_el);

  useEffect(() => {
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user || !projectId) return;
    loadProject();
  }, [user, projectId]);

  async function loadProject() {
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, 'projects', projectId));
      if (snap.exists()) {
        setProject({ ...defaultProject, ...snap.data(), id: snap.id } as ProjectData);
      } else {
        router.push('/admin/projects');
      }
    } catch (err) {
      console.error('Failed to load project:', err);
    } finally {
      setLoading(false);
    }
  }

  function updateField<K extends keyof ProjectData>(field: K, value: ProjectData[K]) {
    setProject((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  const hasExistingDescriptions = Boolean(
    project.shortDescription || 
    project.shortDescription_el || 
    project.fullDescription || 
    project.fullDescription_el
  );

  function handleAutoDraftDescriptionsClick() {
    if (!isBasicInfoPopulated) {
      alert('Please fill out the Title, Greek Title, and Category first.');
      return;
    }
    if (hasExistingDescriptions) {
      setShowDraftConfirm(true);
    } else {
      executeAutoDraftDescriptions();
    }
  }

  async function executeAutoDraftDescriptions() {
    setIsDrafting(true);
    setShowDraftConfirm(false);
    try {
      const result = await generateProjectDescriptions(project.title, project.category, project.location);
      if (result) {
        setProject(prev => ({
          ...prev,
          shortDescription: result.short_en,
          shortDescription_el: result.short_el,
          fullDescription: result.long_en,
          fullDescription_el: result.long_el,
        }));
        setSaved(false);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate draft. Please check console for Vertex AI details.');
    } finally {
      setIsDrafting(false);
    }
  }

  const hasExistingScope = project.scopeOfWork.length > 0 || project.scopeOfWork_el.length > 0;

  function handleAutoDraftScopeClick() {
    if (!isDescriptionsPopulated) {
      alert('Please fully populate the descriptions first.');
      return;
    }
    if (hasExistingScope) {
      setShowScopeConfirm(true);
    } else {
      executeAutoDraftScope();
    }
  }

  async function executeAutoDraftScope() {
    setIsDraftingScope(true);
    setShowScopeConfirm(false);
    try {
      const result = await generateScopeAndFeatures(project.shortDescription, project.fullDescription);
      if (result) {
        setProject(prev => ({
          ...prev,
          scopeOfWork: result.scope_en,
          scopeOfWork_el: result.scope_el,
        }));
        setSaved(false);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate scope of work.');
    } finally {
      setIsDraftingScope(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { id, ...data } = project;
      await updateDoc(doc(db, 'projects', projectId), data as Record<string, unknown>);
      await triggerRevalidation(['/projects', `/projects/${project.slug}`]);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      await triggerRevalidation(['/projects', `/projects/${project.slug}`]);
      router.push('/admin/projects');
    } catch (err) {
      console.error('Failed to delete:', err);
      setDeleting(false);
    }
  }

  const selectClass =
    'w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all text-sm appearance-none';
  const inputClass =
    'w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all text-sm';

  if (authLoading || !user || loading) {
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
              <h1 className="text-2xl font-bold text-white">{project.title || 'Edit Project'}</h1>
              <p className="text-zinc-500 text-sm mt-0.5">{project.code || 'No code'} · {project.slug || 'no-slug'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open(`/en/projects/${project.slug}`, '_blank')}
              className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-white text-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="flex items-center gap-2 px-3 py-2 text-red-400/70 hover:text-red-400 text-sm transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                ${saved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400'
                }
                disabled:opacity-50
              `}
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8 max-w-5xl">
          {/* Section: Basic Info */}
          <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Basic Information</h2>

            <BilingualField
              labelEn="Title"
              labelEl="Τίτλος"
              valueEn={project.title}
              valueEl={project.title_el}
              onChangeEn={(v) => updateField('title', v)}
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
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Slug</label>
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

          {/* Section: Descriptions */}
          <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Descriptions</h2>
              <button
                type="button"
                onClick={handleAutoDraftDescriptionsClick}
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

          {/* Section: Scope & Features */}
          <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Scope of Work & Features</h2>
              <button
                type="button"
                onClick={handleAutoDraftScopeClick}
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

          {/* Section: Media */}
          <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Media Gallery</h2>
            <ImageUploader
              images={project.images}
              onChange={(imgs) => updateField('images', imgs)}
              storagePath={`projects/${project.slug || project.id}`}
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
              disabled={saving}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all
                ${saved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400'
                }
                disabled:opacity-50
              `}
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Project'}
            </button>
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={showDelete}
        title="Delete Project"
        message={`Are you sure you want to permanently delete "${project.title}"? All associated data will be lost.`}
        confirmLabel="Delete Permanently"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        loading={deleting}
        loadingLabel="Deleting..."
      />

      <ConfirmDialog
        open={showDraftConfirm}
        title="Replace Descriptions?"
        message="Running the auto-generator will replace all existing English and Greek descriptions for this project. This cannot be undone."
        confirmLabel="Generate & Replace"
        onConfirm={executeAutoDraftDescriptions}
        onCancel={() => setShowDraftConfirm(false)}
        variant="warning"
      />

      <ConfirmDialog
        open={showScopeConfirm}
        title="Replace Scope & Features?"
        message="Running the auto-generator will replace all existing items in the Scope of Work section. This cannot be undone."
        confirmLabel="Generate & Replace"
        onConfirm={executeAutoDraftScope}
        onCancel={() => setShowScopeConfirm(false)}
        variant="warning"
      />
    </div>
  );
}
