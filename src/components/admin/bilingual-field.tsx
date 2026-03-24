'use client';

import { ReactNode, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { translateText } from '@/lib/ai/agent';

interface BilingualFieldProps {
  labelEn: string;
  labelEl: string;
  valueEn: string;
  valueEl: string;
  onChangeEn: (value: string) => void;
  onChangeEl: (value: string) => void;
  type?: 'input' | 'textarea';
  placeholder?: string;
  required?: boolean;
}

export function BilingualField({
  labelEn,
  labelEl,
  valueEn,
  valueEl,
  onChangeEn,
  onChangeEl,
  type = 'input',
  placeholder = '',
  required = false,
}: BilingualFieldProps) {
  const [isTranslatingEn, setIsTranslatingEn] = useState(false);
  const [isTranslatingEl, setIsTranslatingEl] = useState(false);

  const handleTranslateToEn = async () => {
    if (!valueEl) return;
    setIsTranslatingEn(true);
    try {
      const translated = await translateText(valueEl, 'el', 'en');
      onChangeEn(translated);
    } catch (e) {
      console.error(e);
      alert('Translation failed. Please check console for details.');
    } finally {
      setIsTranslatingEn(false);
    }
  };

  const handleTranslateToEl = async () => {
    if (!valueEn) return;
    setIsTranslatingEl(true);
    try {
      const translated = await translateText(valueEn, 'en', 'el');
      onChangeEl(translated);
    } catch (e) {
      console.error(e);
      alert('Translation failed. Please check console for details.');
    } finally {
      setIsTranslatingEl(false);
    }
  };

  const baseInputClass =
    'w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all text-sm';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* English */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
            <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold">EN</span>
            {labelEn}
          </label>
          {valueEl && !valueEn && (
            <button 
              type="button" 
              onClick={handleTranslateToEn} 
              disabled={isTranslatingEn}
              className="text-[10px] text-amber-500/80 hover:text-amber-500 flex items-center gap-1 font-medium transition-colors"
            >
              {isTranslatingEn ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              Translate from Greek
            </button>
          )}
        </div>
        {type === 'textarea' ? (
          <textarea
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder={placeholder}
            required={required}
            rows={4}
            className={baseInputClass + ' resize-y min-h-[100px]'}
          />
        ) : (
          <input
            type="text"
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={baseInputClass}
          />
        )}
      </div>

      {/* Greek */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">EL</span>
            {labelEl}
          </label>
          {valueEn && !valueEl && (
            <button 
              type="button" 
              onClick={handleTranslateToEl} 
              disabled={isTranslatingEl}
              className="text-[10px] text-amber-500/80 hover:text-amber-500 flex items-center gap-1 font-medium transition-colors"
            >
              {isTranslatingEl ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              Translate from English
            </button>
          )}
        </div>
        {type === 'textarea' ? (
          <textarea
            value={valueEl}
            onChange={(e) => onChangeEl(e.target.value)}
            placeholder={placeholder}
            required={required}
            rows={4}
            className={baseInputClass + ' resize-y min-h-[100px]'}
            dir="auto"
          />
        ) : (
          <input
            type="text"
            value={valueEl}
            onChange={(e) => onChangeEl(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={baseInputClass}
            dir="auto"
          />
        )}
      </div>
    </div>
  );
}

interface BilingualListFieldProps {
  labelEn: string;
  labelEl: string;
  valuesEn: string[];
  valuesEl: string[];
  onChangeEn: (values: string[]) => void;
  onChangeEl: (values: string[]) => void;
  placeholder?: string;
}

export function BilingualListField({
  labelEn,
  labelEl,
  valuesEn,
  valuesEl,
  onChangeEn,
  onChangeEl,
  placeholder = 'Add item...',
}: BilingualListFieldProps) {
  const [newEn, setNewEn] = useState('');
  const [newEl, setNewEl] = useState('');

  const addItem = () => {
    if (newEn.trim()) {
      onChangeEn([...valuesEn, newEn.trim()]);
      onChangeEl([...valuesEl, newEl.trim()]);
      setNewEn('');
      setNewEl('');
    }
  };

  const removeItem = (index: number) => {
    onChangeEn(valuesEn.filter((_, i) => i !== index));
    onChangeEl(valuesEl.filter((_, i) => i !== index));
  };

  const baseInputClass =
    'flex-1 px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-sm';

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
            <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold">EN</span>
            {labelEn}
          </label>
          <div className="space-y-2">
            {valuesEn.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updated = [...valuesEn];
                    updated[i] = e.target.value;
                    onChangeEn(updated);
                  }}
                  className={baseInputClass}
                />
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="text-red-400/60 hover:text-red-400 text-sm px-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">EL</span>
            {labelEl}
          </label>
          <div className="space-y-2">
            {valuesEl.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updated = [...valuesEl];
                    updated[i] = e.target.value;
                    onChangeEl(updated);
                  }}
                  className={baseInputClass}
                  dir="auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add new row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <input
          type="text"
          value={newEn}
          onChange={(e) => setNewEn(e.target.value)}
          placeholder={`${placeholder} (EN)`}
          className={baseInputClass + ' w-full'}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
        />
        <div className="flex gap-2">
          <input
            type="text"
            value={newEl}
            onChange={(e) => setNewEl(e.target.value)}
            placeholder={`${placeholder} (EL)`}
            className={baseInputClass + ' w-full'}
            dir="auto"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
          />
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 text-sm font-medium transition-colors whitespace-nowrap"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
