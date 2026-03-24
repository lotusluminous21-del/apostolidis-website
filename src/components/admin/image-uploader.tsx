'use client';

import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase/config';
import { useState, useRef } from 'react';
import { Upload, X, GripVertical, Star, Film, Image as ImageIcon } from 'lucide-react';

export interface MediaItem {
  src: string;
  alt: string;
}

interface ImageUploaderProps {
  images: MediaItem[];
  onChange: (images: MediaItem[]) => void;
  storagePath: string; // e.g. "projects/filmiki-old-hq"
}

export function ImageUploader({ images, onChange, storagePath }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const newImages: MediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `${storagePath}/${fileName}`);

      try {
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const pct = Math.round(
                ((i + snapshot.bytesTransferred / snapshot.totalBytes) / files.length) * 100
              );
              setProgress(pct);
            },
            reject,
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              newImages.push({
                src: url,
                alt: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
              });
              resolve();
            }
          );
        });
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    onChange([...images, ...newImages]);
    setUploading(false);
    setProgress(0);
  };

  const handleDelete = async (index: number) => {
    const img = images[index];
    // Only delete from storage if it's a Firebase Storage URL
    if (img.src.includes('firebasestorage.googleapis.com')) {
      try {
        const storageRef = ref(storage, img.src);
        await deleteObject(storageRef);
      } catch {
        // File may already be deleted
      }
    }
    onChange(images.filter((_, i) => i !== index));
  };

  const setAsHero = (index: number) => {
    if (index === 0) return;
    const reordered = [...images];
    const [moved] = reordered.splice(index, 1);
    reordered.unshift(moved);
    onChange(reordered);
  };

  // Drag and drop reordering
  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const reordered = [...images];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    onChange(reordered);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const isVideo = (src: string) => {
    return src.match(/\.(mp4|mov|webm|avi)(\?|$)/i);
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
        Media Gallery
        <span className="text-zinc-600 font-normal ml-2">
          ({images.length} items · first = hero thumbnail)
        </span>
      </label>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                relative group rounded-xl overflow-hidden border-2 aspect-video bg-zinc-900
                ${index === 0 ? 'border-amber-500/50 ring-2 ring-amber-500/20' : 'border-zinc-800'}
                ${dragIndex === index ? 'opacity-50' : 'opacity-100'}
                cursor-grab active:cursor-grabbing transition-all
              `}
            >
              {/* Media Preview */}
              {isVideo(img.src) ? (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                  <Film className="w-8 h-8 text-zinc-600" />
                  <span className="absolute bottom-1 left-1 text-[9px] bg-black/70 px-1.5 py-0.5 rounded text-zinc-400">MP4</span>
                </div>
              ) : (
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Hero badge */}
              {index === 0 && (
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-amber-500 text-black text-[10px] font-bold rounded-md uppercase">
                  Hero
                </div>
              )}

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setAsHero(index)}
                  className="p-2 bg-amber-500/20 hover:bg-amber-500/40 rounded-lg text-amber-400 transition-colors"
                  title="Set as hero"
                >
                  <Star className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-400 transition-colors"
                  title="Delete"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drag handle */}
              <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-4 h-4 text-white/60" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${dragOver
            ? 'border-amber-500 bg-amber-500/5'
            : 'border-zinc-700 hover:border-zinc-600 hover:bg-zinc-900/50'
          }
          ${uploading ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/mp4,video/webm"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-3">
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-zinc-400">Uploading... {progress}%</p>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <p className="text-sm text-zinc-400">
              Drop files here or <span className="text-amber-400">browse</span>
            </p>
            <p className="text-[10px] text-zinc-600 mt-1">Images (WebP, JPG, PNG) and Videos (MP4, WebM) · Max 50 MB</p>
          </>
        )}
      </div>
    </div>
  );
}
