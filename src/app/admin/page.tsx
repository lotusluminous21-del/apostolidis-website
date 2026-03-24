'use client';

import { useAuth } from '@/components/admin/auth-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { FolderKanban, Wrench, MessageSquare, ArrowUpRight } from 'lucide-react';

interface DashboardStats {
  projects: number;
  services: number;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({ projects: 0, services: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsSnap, servicesSnap] = await Promise.all([
          getCountFromServer(collection(db, 'projects')),
          getCountFromServer(collection(db, 'services')),
        ]);
        setStats({
          projects: projectsSnap.data().count,
          services: servicesSnap.data().count,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setStatsLoading(false);
      }
    }

    if (user) fetchStats();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Projects',
      value: stats.projects,
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Services',
      value: stats.services,
      icon: Wrench,
      href: '/admin/services',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <AdminSidebar />
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Welcome back. Manage your portfolio content.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((card) => (
            <button
              key={card.label}
              onClick={() => router.push(card.href)}
              className="group relative bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 text-left hover:border-zinc-700 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{card.label}</p>
                  <p className="text-4xl font-bold text-white mt-2">
                    {statsLoading ? (
                      <span className="inline-block w-12 h-10 bg-zinc-800 rounded-lg animate-pulse" />
                    ) : (
                      card.value
                    )}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
                Manage <ArrowUpRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Add Project', href: '/admin/projects/new' },
              { label: 'Manage Services', href: '/admin/services' },
              { label: 'Edit About', href: '/admin/settings' },
              { label: 'View Live Site', href: '/', external: true },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => action.external ? window.open(action.href, '_blank') : router.push(action.href)}
                className="px-4 py-3 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl text-sm text-zinc-300 hover:text-white transition-all"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
