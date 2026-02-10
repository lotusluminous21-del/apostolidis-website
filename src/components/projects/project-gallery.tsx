"use client"

import Image from "next/image"
import { ProjectImage } from "@/data/projects"
import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animation-variants"

interface ProjectGalleryProps {
    images: ProjectImage[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
    // Masonry-like grid or just a clean responsive grid
    // For simplicity and elegance, a variable span grid

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 my-12 md:my-20">
            {images.map((image, i) => (
                <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative overflow-hidden group ${
                        // Make the first image full width if odd number of images or just for impact
                        i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5] md:aspect-square"
                        }`}
                >
                    <div className="absolute inset-0 bg-neutral-100">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                        />
                    </div>

                    {/* Caption on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs font-mono uppercase tracking-widest">{image.alt}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
