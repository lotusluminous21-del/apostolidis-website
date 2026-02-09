"use client"

import { useRef } from "react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { SplitText } from "@/components/ui/split-text"
import { motion, useInView } from "framer-motion"
import { fadeUp, staggerContainer, EASE, withDelay } from "@/lib/animation-variants"
import { ArrowLeft, ArrowRight, CornerDownRight, Mail, MapPin, Phone, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CONTACT_TIMELINE = {
    FRAME_START: 0.1,
    MARKERS: 0.4,
    CONTENT_REVEAL: 0.5,
    STAGGER: 0.1
}

export function Contact() {
    const t = useTranslations('Contact')
    const { register, handleSubmit, control, formState: { errors } } = useForm()
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" })

    const onSubmit = (data: any) => {
        console.log(data)
        // Handle submission
    }

    return (
        <Section className="bg-background relative text-brand-black overflow-hidden py-0 border-b border-grid-line" id="contact">

            <div ref={containerRef} className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start max-w-[1400px] mx-auto px-6 md:px-12 py-16 lg:py-24">
                {/* LEFT: INFO & HEADER ("The Brief") */}
                <div className="w-full lg:w-[35%] flex flex-col items-start sticky top-32">

                    {/* Decorative Guide Line */}
                    <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-brand-black/5 hidden lg:block">
                        <div className="absolute top-0 left-[-3px] w-[7px] h-[1px] bg-brand-black/20" />
                        <div className="absolute top-[100px] left-[-3px] w-[7px] h-[1px] bg-brand-black/20" />
                        <div className="absolute bottom-0 left-[-3px] w-[7px] h-[1px] bg-brand-black/20" />
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-brand-black leading-[0.9] lg:leading-[0.85] mb-6 relative z-10 -mt-1 lg:-mt-2">
                        {isInView && (
                            <SplitText className="inline-block" delay={0.1}>
                                Start
                            </SplitText>
                        )}
                        <br />
                        <span className="text-brand-black/10">
                            {isInView && (
                                <SplitText className="inline-block" delay={0.2}>
                                    Building
                                </SplitText>
                            )}
                        </span>
                    </h2>

                    <div className="flex items-center justify-between mb-8 pl-1">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-architectural rounded-full" />
                            <span className="text-architectural text-[9px] font-mono tracking-[0.2em] uppercase font-bold">
                                Project Initiation
                            </span>
                        </div>
                        <div className="text-brand-black/20 text-xs hidden lg:block">+</div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-brand-black/60 font-medium max-w-xs leading-relaxed border-l-2 border-architectural/20 pl-4"
                    >
                        Have a project in mind? Initiate the protocol.
                        We are ready to translate your vision into engineered reality.
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
                                Communication Line
                            </h4>
                            <a href="tel:+306944141888" className="text-lg font-bold text-brand-black group-hover:text-architectural transition-colors flex items-center justify-between w-full">
                                +30 694 414 1888
                            </a>
                        </motion.div>

                        <motion.div variants={fadeUp} className="group border-t border-brand-black/5 pt-4">
                            <h4 className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-brand-black/40 uppercase mb-1">
                                <span className="w-1.5 h-1.5 border border-brand-black/20 rounded-sm inline-block" />
                                Electronic Mail
                            </h4>
                            <a href="mailto:info@georgeapostolidis.gr" className="text-lg font-bold text-brand-black group-hover:text-architectural transition-colors flex items-center justify-between w-full">
                                info@georgeapostolidis.gr
                            </a>
                        </motion.div>

                        <motion.div variants={fadeUp} className="border-t border-brand-black/5 pt-4">
                            <h4 className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-brand-black/40 uppercase mb-1">
                                <span className="w-1.5 h-1.5 border border-brand-black/20 rounded-sm inline-block" />
                                Coordinates
                            </h4>
                            <p className="text-sm font-medium text-brand-black/80">
                                Αγίας Λαύρας 57, Αθήνα 111 41
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* RIGHT: FORM - DISTINCT MODULE */}
                <div className="w-full lg:w-[60%] relative bg-brand-black/[0.02] border border-brand-black/10 p-6 lg:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        {/* Section 1: Identity */}
                        <div className="space-y-6">
                            <div className="border-b border-brand-black/10 pb-3 mb-5">
                                <h3 className="flex items-center gap-3 text-base font-bold text-brand-black uppercase tracking-tight">
                                    <span className="font-mono text-[10px] text-architectural border border-architectural/30 px-1.5 py-0.5 rounded-none">01</span>
                                    IDENTITY PROTOCOL
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                                <div className="group relative space-y-1">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        {...register("name", { required: "Name is required" })}
                                        placeholder="John Doe"
                                        aria-invalid={!!errors.name}
                                    />
                                    {errors.name && (
                                        <span className="text-[9px] text-red-600 font-mono tracking-widest uppercase block mt-1">
                                                // Error: Missing Input
                                        </span>
                                    )}
                                </div>
                                <div className="group relative space-y-1">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        placeholder="john@example.com"
                                        type="email"
                                        aria-invalid={!!errors.email}
                                    />
                                    {errors.email && (
                                        <span className="text-[9px] text-red-600 font-mono tracking-widest uppercase block mt-1">
                                                // Error: Invalid Format
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Specs */}
                        <div className="space-y-6">
                            <div className="border-b border-brand-black/10 pb-3 mb-5">
                                <h3 className="flex items-center gap-3 text-base font-bold text-brand-black uppercase tracking-tight">
                                    <span className="font-mono text-[10px] text-architectural border border-architectural/30 px-1.5 py-0.5 rounded-none">02</span>
                                    PROJECT PARAMETERS
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                                <div className="group relative space-y-1">
                                    <Label htmlFor="type">Project Type</Label>
                                    <Controller
                                        name="type"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="renovation">Renovation</SelectItem>
                                                    <SelectItem value="construction">New Construction</SelectItem>
                                                    <SelectItem value="consulting">Engineering Consulting</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                <div className="group relative space-y-1">
                                    <Label htmlFor="budget">Estimated Budget</Label>
                                    <Controller
                                        name="budget"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Range" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="under-30k">&lt; 30.000€</SelectItem>
                                                    <SelectItem value="30k-80k">30.000€ - 80.000€</SelectItem>
                                                    <SelectItem value="80k-150k">80.000€ - 150.000€</SelectItem>
                                                    <SelectItem value="over-150k">&gt; 150.000€</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Brief */}
                        <div className="space-y-6">
                            <div className="border-b border-brand-black/10 pb-3 mb-5">
                                <h3 className="flex items-center gap-3 text-base font-bold text-brand-black uppercase tracking-tight">
                                    <span className="font-mono text-[10px] text-architectural border border-architectural/30 px-1.5 py-0.5 rounded-none">03</span>
                                    DATA TRANSMISSION
                                </h3>
                            </div>

                            <div className="group relative space-y-1">
                                <Label htmlFor="message">Additional Details</Label>
                                <Textarea
                                    {...register("message")}
                                    placeholder="Describe your vision..."
                                    className="min-h-[80px]"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button type="submit" className="h-12 px-8 bg-brand-black text-white hover:bg-architectural transition-colors rounded-none w-full flex items-center justify-between group relative overflow-hidden">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] relative z-10">Submit Protocol</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />

                                {/* Button Hover Effect Layer */}
                                <div className="absolute inset-0 bg-architectural transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                            </Button>

                            {/* Security/Footer Metadata */}
                            <div className="mt-3 flex justify-between items-center text-[9px] font-mono text-brand-black/40 uppercase tracking-widest">
                                <span>// Secure Transmission</span>
                                <span>Status: Awaiting Input</span>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </Section>
    )
}

