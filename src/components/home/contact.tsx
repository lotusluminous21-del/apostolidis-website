"use client"

import { useRef, useState } from "react"
import { db } from "@/lib/firebase/config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { useTranslations, useLocale } from "next-intl"
import { SplitText } from "@/components/ui/split-text"
import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer, EASE, withDelay, scaleX, markerPop } from "@/lib/animation-variants"
import { ArrowLeft, ArrowRight, CornerDownRight, Mail, MapPin, Phone, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


const CONTACT_TIMELINE = {
    FRAME_START: 0.1,
    MARKERS: 0.4,
    CONTENT_REVEAL: 0.5,
    STAGGER: 0.1,
    FORM_START: 1.2, // After left panel content is revealed
}

// Slide from left animation for form sections
const slideFromLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
}

export function Contact({ settings }: { settings?: any }) {
    const t = useTranslations('Contact')
    const locale = useLocale()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        try {
            await addDoc(collection(db, 'contact_inquiries'), {
                ...data,
                status: 'unread',
                createdAt: serverTimestamp(),
            });
            reset()
            setIsSuccess(true)
        } catch (error) {
            console.error('Error submitting form:', error)
            alert('Something went wrong. Please try again or use the email directly.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Section className="bg-background relative text-brand-black overflow-hidden border-b border-grid-line" id="contact">

            <div ref={containerRef} className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-x-16 items-start">
                {/* LEFT: INFO & HEADER ("The Brief") */}
                <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32">

                    {/* Decorative Guide Line - Animated */}
                    <motion.div
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.2, delay: CONTACT_TIMELINE.FRAME_START, ease: EASE.sharp }}
                        className="absolute -left-4 top-0 bottom-0 w-[1px] bg-brand-black/5 hidden lg:block"
                    >
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(markerPop, CONTACT_TIMELINE.MARKERS)}
                            className="absolute top-0 left-[-3px] w-[7px] h-[1px] bg-brand-black/20"
                        />
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(markerPop, CONTACT_TIMELINE.MARKERS + 0.1)}
                            className="absolute top-[100px] left-[-3px] w-[7px] h-[1px] bg-brand-black/20"
                        />
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(markerPop, CONTACT_TIMELINE.MARKERS + 0.2)}
                            className="absolute bottom-0 left-[-3px] w-[7px] h-[1px] bg-brand-black/20"
                        />
                    </motion.div>

                    <div className="flex items-center gap-3 mb-4 lg:mb-6 pt-2 lg:pt-4 w-full border-t border-brand-black/10">
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: CONTACT_TIMELINE.CONTENT_REVEAL, ease: EASE.smooth }}
                            className="text-[10px] font-mono tracking-widest text-architectural uppercase font-semibold"
                        >
                            {t('badge')}
                        </motion.span>
                        <motion.div
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 0.8, delay: CONTACT_TIMELINE.CONTENT_REVEAL + 0.1, ease: EASE.sharp }}
                            className="h-px flex-1 bg-brand-black/10"
                        />
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-brand-black leading-[0.9] lg:leading-[0.85] mb-6 relative z-10 -mt-1 lg:-mt-2">
                        {isInView && (
                            <SplitText className="inline-block" delay={0.1}>
                                {t('headingPrimary')}
                            </SplitText>
                        )}
                        <br />
                        <span className="text-brand-black/10">
                            {isInView && (
                                <SplitText className="inline-block" delay={0.2}>
                                    {t('headingSecondary')}
                                </SplitText>
                            )}
                        </span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-brand-black/60 font-medium max-w-xs leading-relaxed border-l-2 border-architectural/20 pl-4 mb-12"
                    >
                        {t('subtitle')}
                    </motion.p>

                    {/* Contact Details Grid */}
                    <motion.div
                        variants={staggerContainer(0.1, 0.5)}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 gap-6 w-full"
                    >
                        <motion.div variants={fadeUp} className="group border-t border-brand-black/5 pt-4">
                            <h4 className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-brand-black/40 uppercase mb-1">
                                <span className="w-1.5 h-1.5 border border-brand-black/20 rounded-sm inline-block" />
                                {t('emailLabel')}
                            </h4>
                            <a href={`mailto:${settings?.contact?.email || 'apostolidisconstruction@gmail.com'}`} className="text-lg font-bold text-brand-black group-hover:text-architectural transition-colors flex items-center justify-between w-full">
                                {settings?.contact?.email || 'apostolidisconstruction@gmail.com'}
                            </a>
                        </motion.div>

                        <motion.div variants={fadeUp} className="border-t border-brand-black/5 pt-4">
                            <h4 className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-brand-black/40 uppercase mb-1">
                                <span className="w-1.5 h-1.5 border border-brand-black/20 rounded-sm inline-block" />
                                {t('addressLabel')}
                            </h4>
                            <p className="text-sm font-medium text-brand-black/80 whitespace-pre-line">
                                {locale === 'el' ? settings?.contact?.address_el || t('addressValue') : settings?.contact?.address_en || t('addressValue')}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* RIGHT: FORM - DISTINCT MODULE */}
                <div className="lg:col-span-7 w-full relative bg-brand-black/[0.02] border border-brand-black/10 p-5 md:p-6 lg:p-8">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: EASE.smooth }}
                            className="flex flex-col items-center justify-center text-center h-full min-h-[400px] md:min-h-[500px] space-y-8 py-10"
                        >
                            <div className="relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                    className="w-20 h-20 rounded-full bg-architectural/10 flex items-center justify-center text-architectural relative z-10"
                                >
                                    <Mail className="w-10 h-10" />
                                </motion.div>
                                <motion.div 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                    className="absolute inset-0 rounded-full bg-architectural/20 z-0"
                                />
                            </div>
                            
                            <div className="space-y-4 max-w-md">
                                <motion.h3 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl md:text-3xl font-black uppercase tracking-tight text-brand-black"
                                >
                                    {t('form.successHeading')}
                                </motion.h3>
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-brand-black/60 leading-relaxed font-medium text-sm md:text-base border-l-2 border-architectural/20 pl-4 text-left"
                                >
                                    {t('form.successBody')}
                                </motion.p>
                            </div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="pt-6 w-full max-w-sm"
                            >
                                <Button 
                                    onClick={() => setIsSuccess(false)}
                                    type="button"
                                    className="h-12 w-full bg-transparent border border-brand-black/20 text-brand-black hover:bg-brand-black hover:text-white transition-colors rounded-none flex items-center justify-center gap-3 group"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] relative top-[1px]">
                                        {t('form.submitAnother')}
                                    </span>
                                </Button>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        {/* Section 1: Identity */}
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(slideFromLeft, CONTACT_TIMELINE.FORM_START)}
                            className="space-y-6"
                        >
                            <div className="border-b border-brand-black/10 pb-3 mb-5">
                                <h3 className="flex items-center gap-3 text-base font-bold text-brand-black uppercase tracking-tight">
                                    <span className="font-mono text-[10px] text-architectural border border-architectural/30 px-1.5 py-0.5 rounded-none">{t('form.identityBadge')}</span>
                                    {t('form.identity')}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                                <div className="group relative space-y-1">
                                    <Label htmlFor="name">{t('form.name')} *</Label>
                                    <Input
                                        {...register("name", { required: t('form.validation.nameRequired') })}
                                        placeholder={t('form.namePlaceholder')}
                                        aria-invalid={!!errors.name}
                                    />
                                    {errors.name && (
                                        <span className="text-[9px] text-red-600 font-mono tracking-widest uppercase block mt-1">
                                            {errors.name.message as string}
                                        </span>
                                    )}
                                </div>
                                <div className="group relative space-y-1">
                                    <Label htmlFor="email">{t('form.email')} *</Label>
                                    <Input
                                        {...register("email", {
                                            required: t('form.validation.emailRequired'),
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: t('form.validation.emailInvalid')
                                            }
                                        })}
                                        placeholder={t('form.emailPlaceholder')}
                                        type="email"
                                        aria-invalid={!!errors.email}
                                    />
                                    {errors.email && (
                                        <span className="text-[9px] text-red-600 font-mono tracking-widest uppercase block mt-1">
                                            {errors.email.message as string}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 2: Brief */}
                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(slideFromLeft, CONTACT_TIMELINE.FORM_START + 0.15)}
                            className="space-y-6"
                        >
                            <div className="border-b border-brand-black/10 pb-3 mb-5">
                                <h3 className="flex items-center gap-3 text-base font-bold text-brand-black uppercase tracking-tight">
                                    <span className="font-mono text-[10px] text-architectural border border-architectural/30 px-1.5 py-0.5 rounded-none">{t('form.transmissionBadge')}</span>
                                    {t('form.transmission')}
                                </h3>
                            </div>

                            <div className="group relative space-y-1">
                                <Label htmlFor="message">{t('form.message')}</Label>
                                <Textarea
                                    {...register("message")}
                                    placeholder={t('form.messagePlaceholder')}
                                    className="min-h-[80px]"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={withDelay(slideFromLeft, CONTACT_TIMELINE.FORM_START + 0.3)}
                            className="pt-2"
                        >
                            <Button disabled={isSubmitting || isSuccess} type="submit" className="h-12 px-8 bg-brand-black text-white hover:bg-architectural transition-colors rounded-none w-full flex items-center justify-between group relative overflow-hidden">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] relative z-10">
                                    {isSubmitting ? 'Sending...' : isSuccess ? 'Message Sent!' : t('form.submit')}
                                </span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />

                                {/* Button Hover Effect Layer */}
                                <div className="absolute inset-0 bg-architectural transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                            </Button>

                            {/* Security/Footer Metadata */}
                            <div className="mt-3 flex justify-between items-center text-[9px] font-mono text-brand-black/40 uppercase tracking-widest">
                                <span>{t('form.secure')}</span>
                                <span>{t('form.status')}</span>
                            </div>
                        </motion.div>

                        </form>
                    )}
                </div>
            </div>
        </Section>
    )
}

