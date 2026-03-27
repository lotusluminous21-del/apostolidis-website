'use client';

import { useAuth } from '@/components/admin/auth-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Plus, GripVertical, Pencil, Trash2, Save, X, Check } from 'lucide-react';
import { triggerRevalidation } from '@/lib/revalidate';

interface ServiceItem {
  id: string;
  key: string;
  name_en: string;
  name_el: string;
  order: number;
}

export default function AdminServicesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editEn, setEditEn] = useState('');
  const [editEl, setEditEl] = useState('');
  const [addMode, setAddMode] = useState(false);
  const [newEn, setNewEn] = useState('');
  const [newEl, setNewEl] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hasOrderChanges, setHasOrderChanges] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) fetchServices();
  }, [user]);

  async function fetchServices() {
    setLoading(true);
    try {
      const q = query(collection(db, 'services'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceItem)));
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!newEn.trim()) return;
    const key = newEn.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const newItem: ServiceItem = {
      id: key,
      key,
      name_en: newEn.trim(),
      name_el: newEl.trim(),
      order: services.length,
    };
    try {
      await setDoc(doc(db, 'services', key), newItem);
      await triggerRevalidation();
      setServices([...services, newItem]);
      setNewEn('');
      setNewEl('');
      setAddMode(false);
    } catch (err) {
      console.error('Failed to add:', err);
    }
  }

  async function handleEditSave(index: number) {
    const svc = services[index];
    try {
      const { updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'services', svc.id), {
        name_en: editEn,
        name_el: editEl,
      });
      await triggerRevalidation();
      setServices((prev) =>
        prev.map((s, i) => i === index ? { ...s, name_en: editEn, name_el: editEl } : s)
      );
      setEditIndex(null);
    } catch (err) {
      console.error('Failed to edit:', err);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'services', deleteTarget.id));
      await triggerRevalidation();
      setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete:', err);
    } finally {
      setDeleting(false);
    }
  }

  async function saveOrder() {
    setSavingOrder(true);
    try {
      const batch = writeBatch(db);
      services.forEach((s, i) => batch.update(doc(db, 'services', s.id), { order: i }));
      await batch.commit();
      await triggerRevalidation();
      setHasOrderChanges(false);
    } catch (err) {
      console.error('Failed to save order:', err);
    } finally {
      setSavingOrder(false);
    }
  }

  const handleDragStart = (i: number) => setDragIndex(i);
  const handleDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    const reordered = [...services];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(i, 0, moved);
    setServices(reordered);
    setDragIndex(i);
    setHasOrderChanges(true);
  };
  const handleDragEnd = () => setDragIndex(null);

  const inputClass =
    'flex-1 px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-sm';

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Services</h1>
            <p className="text-zinc-500 mt-1 text-sm">{services.length} services · Drag to reorder</p>
          </div>
          <div className="flex items-center gap-3">
            {hasOrderChanges && (
              <button onClick={saveOrder} disabled={savingOrder} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
                {savingOrder ? 'Saving...' : 'Save Order'}
              </button>
            )}
            <button
              onClick={() => setAddMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-xl text-sm font-semibold hover:from-amber-400 hover:to-orange-400 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>
        </div>

        <div className="max-w-3xl space-y-2">
          {/* Add form */}
          {addMode && (
            <div className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newEn}
                  onChange={(e) => setNewEn(e.target.value)}
                  placeholder="English name"
                  className={inputClass}
                  autoFocus
                />
                <input
                  type="text"
                  value={newEl}
                  onChange={(e) => setNewEl(e.target.value)}
                  placeholder="Ελληνικό όνομα"
                  className={inputClass}
                  dir="auto"
                />
              </div>
              <button onClick={handleAdd} className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => { setAddMode(false); setNewEn(''); setNewEl(''); }} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Service List */}
          {loading ? (
            [1, 2, 3, 4, 5].map((i) => <div key={i} className="h-14 bg-zinc-900/50 rounded-xl animate-pulse" />)
          ) : (
            services.map((svc, index) => (
              <div
                key={svc.id}
                draggable={editIndex !== index}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`
                  group flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl
                  hover:border-zinc-700 transition-all
                  ${editIndex !== index ? 'cursor-grab active:cursor-grabbing' : ''}
                  ${dragIndex === index ? 'opacity-50' : ''}
                `}
              >
                <GripVertical className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 flex-shrink-0" />

                {editIndex === index ? (
                  <>
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <input type="text" value={editEn} onChange={(e) => setEditEn(e.target.value)} className={inputClass} />
                      <input type="text" value={editEl} onChange={(e) => setEditEl(e.target.value)} className={inputClass} dir="auto" />
                    </div>
                    <button onClick={() => handleEditSave(index)} className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors"><Check className="w-4 h-4" /></button>
                    <button onClick={() => setEditIndex(null)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors"><X className="w-4 h-4" /></button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-white">{svc.name_en}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-sm text-zinc-400">{svc.name_el}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setEditIndex(index); setEditEn(svc.name_en); setEditEl(svc.name_el); }}
                        className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(svc)}
                        className="p-2 hover:bg-red-950/50 rounded-lg text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteTarget?.name_en}"?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
