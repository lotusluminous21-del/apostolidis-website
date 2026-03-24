'use client';

import { useAuth } from '@/components/admin/auth-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, orderBy, query, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Plus, GripVertical, Star, StarOff, Pencil, Trash2, Film, Image as ImageIcon } from 'lucide-react';

interface ProjectListItem {
  id: string;
  title: string;
  title_el?: string;
  category: string;
  status: string;
  isFeatured?: boolean;
  order: number;
  images: { src: string; alt: string }[];
}

export default function AdminProjectsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<ProjectListItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hasOrderChanges, setHasOrderChanges] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    fetchProjects();
  }, [user]);

  async function fetchProjects() {
    setLoading(true);
    try {
      const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      const items: ProjectListItem[] = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as ProjectListItem[];
      setProjects(items);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'projects', deleteTarget.id));
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete:', err);
    } finally {
      setDeleting(false);
    }
  }

  async function toggleFeatured(project: ProjectListItem) {
    try {
      const { updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'projects', project.id), {
        isFeatured: !project.isFeatured,
      });
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? { ...p, isFeatured: !p.isFeatured } : p
        )
      );
    } catch (err) {
      console.error('Failed to toggle featured:', err);
    }
  }

  async function saveOrder() {
    setSavingOrder(true);
    try {
      const batch = writeBatch(db);
      projects.forEach((p, i) => {
        batch.update(doc(db, 'projects', p.id), { order: i });
      });
      await batch.commit();
      setHasOrderChanges(false);
    } catch (err) {
      console.error('Failed to save order:', err);
    } finally {
      setSavingOrder(false);
    }
  }

  // Drag and drop
  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const reordered = [...projects];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    setProjects(reordered);
    setDragIndex(index);
    setHasOrderChanges(true);
  };
  const handleDragEnd = () => setDragIndex(null);

  const isVideo = (src: string) => src.match(/\.(mp4|mov|webm|avi)(\?|$)/i);

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
          <div>
            <h1 className="text-3xl font-bold text-white">Projects</h1>
            <p className="text-zinc-500 mt-1 text-sm">
              {projects.length} project{projects.length !== 1 ? 's' : ''} · Drag to reorder
            </p>
          </div>
          <div className="flex items-center gap-3">
            {hasOrderChanges && (
              <button
                onClick={saveOrder}
                disabled={savingOrder}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
              >
                {savingOrder ? 'Saving...' : 'Save Order'}
              </button>
            )}
            <button
              onClick={() => router.push('/admin/projects/new')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-xl text-sm font-semibold hover:from-amber-400 hover:to-orange-400 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>
        </div>

        {/* Project List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-zinc-900/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
            <ImageIcon className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">No projects yet</p>
            <p className="text-zinc-600 text-sm mt-1">Add your first project to get started</p>
          </div>
        ) : (
          <div className="space-y-2">
            {projects.map((project, index) => (
              <div
                key={project.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`
                  group flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl
                  hover:border-zinc-700 transition-all cursor-grab active:cursor-grabbing
                  ${dragIndex === index ? 'opacity-50 scale-[0.98]' : ''}
                `}
              >
                {/* Drag Handle */}
                <div className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Thumbnail */}
                <div className="w-20 h-14 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                  {project.images?.[0] ? (
                    isVideo(project.images[0].src) ? (
                      <video
                        src={project.images[0].src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                        onMouseOver={(e) => e.currentTarget.play()}
                        onMouseOut={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      />
                    ) : (
                      <img
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-zinc-700" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {project.title}
                    </h3>
                    {project.isFeatured && (
                      <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {project.category} · {project.status} · {project.images?.length || 0} media
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFeatured(project); }}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                    title={project.isFeatured ? 'Remove featured' : 'Set featured'}
                  >
                    {project.isFeatured ? (
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ) : (
                      <StarOff className="w-4 h-4 text-zinc-500" />
                    )}
                  </button>
                  <button
                    onClick={() => router.push(`/admin/projects/${project.id}`)}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(project); }}
                    className="p-2 hover:bg-red-950/50 rounded-lg transition-colors text-zinc-500 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
