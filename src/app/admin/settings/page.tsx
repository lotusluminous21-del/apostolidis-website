'use client';

import { useAuth } from '@/components/admin/auth-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { BilingualField } from '@/components/admin/bilingual-field';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Save, Check } from 'lucide-react';

interface SiteSettingsData {
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

const defaultSettings: SiteSettingsData = {
  about: {
    heading_en: '',
    heading_el: '',
    description1_en: '',
    description1_el: '',
    description2_en: '',
    description2_el: '',
    description3_en: '',
    description3_el: '',
    statsProjects: '40+',
    statsYears: '7+',
    statsClients: '100%',
  },
  contact: {
    email: 'apostolidisconstructions@gmail.com',
    phone: '',
    address_en: '',
    address_el: '',
    hours_en: '',
    hours_el: '',
  },
  footer: {
    tagline_en: '',
    tagline_el: '',
    establishedYear: '2018',
  },
};

export default function AdminSettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettingsData>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'footer'>('about');

  useEffect(() => {
    if (!authLoading && !user) router.push('/admin/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) loadSettings();
  }, [user]);

  async function loadSettings() {
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, 'site_settings', 'main'));
      if (snap.exists()) {
        setSettings({ ...defaultSettings, ...snap.data() } as SiteSettingsData);
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await setDoc(doc(db, 'site_settings', 'main'), settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setSaving(false);
    }
  }

  function updateAbout<K extends keyof SiteSettingsData['about']>(field: K, value: string) {
    setSettings((prev) => ({ ...prev, about: { ...prev.about, [field]: value } }));
    setSaved(false);
  }

  function updateContact<K extends keyof SiteSettingsData['contact']>(field: K, value: string) {
    setSettings((prev) => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
    setSaved(false);
  }

  function updateFooter<K extends keyof SiteSettingsData['footer']>(field: K, value: string) {
    setSettings((prev) => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
    setSaved(false);
  }

  const tabs = [
    { key: 'about' as const, label: 'About' },
    { key: 'contact' as const, label: 'Contact' },
    { key: 'footer' as const, label: 'Footer' },
  ];

  const inputClass =
    'w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all text-sm';

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
            <h1 className="text-3xl font-bold text-white">Site Settings</h1>
            <p className="text-zinc-500 mt-1 text-sm">Manage your site's content and configuration</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50
              ${saved
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400'
              }`}
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-zinc-900/50 rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-zinc-900/50 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="max-w-4xl">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
                  <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">About Section</h2>

                  <BilingualField
                    labelEn="Heading"
                    labelEl="Επικεφαλίδα"
                    valueEn={settings.about.heading_en}
                    valueEl={settings.about.heading_el}
                    onChangeEn={(v) => updateAbout('heading_en', v)}
                    onChangeEl={(v) => updateAbout('heading_el', v)}
                  />
                  <BilingualField
                    labelEn="Description 1"
                    labelEl="Περιγραφή 1"
                    valueEn={settings.about.description1_en}
                    valueEl={settings.about.description1_el}
                    onChangeEn={(v) => updateAbout('description1_en', v)}
                    onChangeEl={(v) => updateAbout('description1_el', v)}
                    type="textarea"
                  />
                  <BilingualField
                    labelEn="Description 2"
                    labelEl="Περιγραφή 2"
                    valueEn={settings.about.description2_en}
                    valueEl={settings.about.description2_el}
                    onChangeEn={(v) => updateAbout('description2_en', v)}
                    onChangeEl={(v) => updateAbout('description2_el', v)}
                    type="textarea"
                  />
                  <BilingualField
                    labelEn="Description 3"
                    labelEl="Περιγραφή 3"
                    valueEn={settings.about.description3_en}
                    valueEl={settings.about.description3_el}
                    onChangeEn={(v) => updateAbout('description3_en', v)}
                    onChangeEl={(v) => updateAbout('description3_el', v)}
                    type="textarea"
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Projects Count</label>
                      <input type="text" value={settings.about.statsProjects} onChange={(e) => updateAbout('statsProjects', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Years Experience</label>
                      <input type="text" value={settings.about.statsYears} onChange={(e) => updateAbout('statsYears', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Client Satisfaction</label>
                      <input type="text" value={settings.about.statsClients} onChange={(e) => updateAbout('statsClients', e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
                <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Contact Information</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Email</label>
                    <input type="email" value={settings.contact.email} onChange={(e) => updateContact('email', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Phone</label>
                    <input type="text" value={settings.contact.phone} onChange={(e) => updateContact('phone', e.target.value)} className={inputClass} />
                  </div>
                </div>

                <BilingualField
                  labelEn="Address"
                  labelEl="Διεύθυνση"
                  valueEn={settings.contact.address_en}
                  valueEl={settings.contact.address_el}
                  onChangeEn={(v) => updateContact('address_en', v)}
                  onChangeEl={(v) => updateContact('address_el', v)}
                />

                <BilingualField
                  labelEn="Hours"
                  labelEl="Ωράριο"
                  valueEn={settings.contact.hours_en}
                  valueEl={settings.contact.hours_el}
                  onChangeEn={(v) => updateContact('hours_en', v)}
                  onChangeEl={(v) => updateContact('hours_el', v)}
                  type="textarea"
                />
              </section>
            )}

            {/* Footer Tab */}
            {activeTab === 'footer' && (
              <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
                <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Footer Settings</h2>

                <BilingualField
                  labelEn="Tagline"
                  labelEl="Σλόγκαν"
                  valueEn={settings.footer.tagline_en}
                  valueEl={settings.footer.tagline_el}
                  onChangeEn={(v) => updateFooter('tagline_en', v)}
                  onChangeEl={(v) => updateFooter('tagline_el', v)}
                />

                <div>
                  <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Established Year</label>
                  <input type="text" value={settings.footer.establishedYear} onChange={(e) => updateFooter('establishedYear', e.target.value)} className={inputClass} placeholder="2018" />
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
