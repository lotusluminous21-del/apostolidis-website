"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ProjectImage } from "@/lib/firestore-data"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp } from "@/lib/animation-variants"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

interface ProjectGalleryProps {
    images: ProjectImage[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

    // Handle body scroll locking
    useEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [selectedImageIndex])

    const handlePrevious = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedImageIndex((prev) => (prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null))
    }, [images.length])

    const handleNext = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedImageIndex((prev) => (prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null))
    }, [images.length])

    const handleClose = useCallback(() => {
        setSelectedImageIndex(null)
    }, [])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return
            if (e.key === "ArrowLeft") handlePrevious()
            if (e.key === "ArrowRight") handleNext()
            if (e.key === "Escape") handleClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [selectedImageIndex, handlePrevious, handleNext, handleClose])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 my-12 md:my-20">
                {images.map((image, i) => (
                    <motion.div
                        key={i}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative overflow-hidden group cursor-pointer ${
                            i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5] md:aspect-square"
                        }`}
                        onClick={() => setSelectedImageIndex(i)}
                    >
                        <div className="absolute inset-0 bg-neutral-100">
                            {image.src.match(/\.(mp4|webm)(\?|$)/i) ? (
                                <video
                                    src={image.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            ) : (
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                                />
                            )}
                        </div>

                        {/* Caption on hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-xs font-mono uppercase tracking-widest">{image.alt}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
                        onClick={handleClose}
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
                            aria-label="Close lightbox"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-50 p-2"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-10 h-10" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-50 p-2"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-10 h-10" />
                                </button>
                            </>
                        )}

                        <div 
                            className="relative w-full h-full max-w-6xl p-4 md:p-12 flex flex-col items-center justify-center pointer-events-none"
                        >
                            <div className="relative w-full h-[80vh] pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                                {images[selectedImageIndex].src.match(/\.(mp4|webm)(\?|$)/i) ? (
                                    <video
                                        src={images[selectedImageIndex].src}
                                        autoPlay
                                        loop
                                        controls
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <TransformWrapper
                                        initialScale={1}
                                        minScale={1}
                                        maxScale={4}
                                        centerOnInit
                                        wheel={{ step: 0.1 }}
                                    >
                                        <TransformComponent
                                            wrapperClass="!w-full !h-full flex items-center justify-center"
                                            contentClass="!w-full !h-full cursor-grab active:cursor-grabbing"
                                        >
                                            <Image
                                                src={images[selectedImageIndex].src}
                                                alt={images[selectedImageIndex].alt}
                                                fill
                                                className="object-contain"
                                                sizes="100vw"
                                                priority
                                                draggable={false}
                                            />
                                        </TransformComponent>
                                    </TransformWrapper>
                                )}
                            </div>
                            
                            {images[selectedImageIndex].alt && (
                                <div className="mt-4 pointer-events-auto text-center h-8 flex items-center justify-center">
                                    <p className="text-white/80 text-sm font-mono uppercase tracking-widest">
                                        {images[selectedImageIndex].alt}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
