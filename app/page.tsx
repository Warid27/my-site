"use client"

import { useState, useEffect } from "react"
import type { ReactNode, MouseEvent } from "react"
import { motion } from "framer-motion"
import { Menu, X, ExternalLink, Sun, Moon, GraduationCap, Handshake, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

function AnimatedText({ language }: { language: "en" | "id" }) {
  const words =
    language === "en"
      ? ["Warid", "a developer", "a human", "a programmer"]
      : ["Warid", "seorang developer", "manusia", "programmer"]
  const [displayText, setDisplayText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 100)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 5000)
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 50)
      } else {
        setIsDeleting(false)
        setWordIndex((wordIndex + 1) % words.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex])

  return <span className="text-primary">{displayText}</span>
}

type GlassCardProps = {
  as?: "div" | "a"
  href?: string
  children: ReactNode
  className?: string
  target?: string
  rel?: string
}

function GlassCard({ as = "div", href, children, className = "", target, rel }: GlassCardProps) {
  const Tag: any = as

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ;(e.currentTarget as HTMLElement).style.setProperty("--x", `${x}px`)
    ;(e.currentTarget as HTMLElement).style.setProperty("--y", `${y}px`)
  }

  return (
    <Tag
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-xl border p-6 transition cursor-pointer backdrop-blur-xl bg-card border-border hover:border-primary/50 block ${className}`}
    >
      {/* Shine following cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background:
            "radial-gradient(400px circle at var(--x) var(--y), rgba(255,255,255,0.18), transparent 45%)",
        }}
      />
      {/* Subtle inner border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-xl"
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </Tag>
  )
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSkillCategory, setActiveSkillCategory] = useState("Frontend")
  const [language, setLanguage] = useState<"en" | "id">("en")
  const { resolvedTheme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const translations = {
    en: {
      nav: { about: "About", journey: "Journey", skills: "Skills", projects: "Projects", contact: "Contact" },
      hero: {
        greeting: "Hi, I'm",
        title: "An ambitious student developer passionate about coding, learning, and creating digital experiences",
        subtitle:
          "Currently a student at SMKN 2 Magelang, I specialize in full-stack web development and game development. I'm dedicated to mastering multiple programming languages and frameworks while collaborating with talented developers.",
        viewWork: "View My Work",
        viewGithub: "View GitHub",
      },
      about: {
        title: "About Me",
        text1:
          "I'm an ambitious and passionate developer with a keen interest in web development, game design, physics, and music. My journey in tech started with a curiosity about how things work, and it has evolved into a commitment to building meaningful digital solutions.",
        text2:
          "Currently studying at SMKN 2 Magelang, I'm actively learning and experimenting with modern technologies including Dart, Flutter, C#, JavaScript, and Python. I believe in continuous learning and collaborating with passionate developers to push the boundaries of what's possible.",
        text3:
          "When I'm not coding, you can find me exploring new game engines, discussing physics concepts, or enjoying music. I'm open to collaboration and always excited to work on projects that challenge my skills.",
        student: "Student at",
        openTo: "Open to",
        location: "Location",
        collaboration: "Collaboration & freelance projects",
        magelang: "Magelang, Indonesia",
      },
      timeline: {
        title: "My Journey",
      },
      skills: {
        title: "Skills & Technologies",
      },
      projects: {
        title: "Featured Projects",
      },
      contact: {
        title: "Let's Connect",
        subtitle: "I'm always interested in hearing about new projects and opportunities. Feel free to reach out!",
        interested: "Interested in collaborating or just want to chat? I'm always down for interesting conversations!",
      },
      footer: "© 2025 Warid27. Built with Next.js & Tailwind CSS.",
    },
    id: {
      nav: { about: "Tentang", journey: "Perjalanan", skills: "Keahlian", projects: "Proyek", contact: "Kontak" },
      hero: {
        greeting: "Halo, Saya",
        title:
          "Seorang developer mahasiswa yang passionate tentang coding, belajar, dan menciptakan pengalaman digital",
        subtitle:
          "Saat ini seorang siswa di SMKN 2 Magelang, saya spesialisasi dalam web development full-stack dan game development. Saya berkomitmen untuk menguasai berbagai bahasa pemrograman dan framework sambil berkolaborasi dengan developer berbakat.",
        viewWork: "Lihat Karya Saya",
        viewGithub: "Lihat GitHub",
      },
      about: {
        title: "Tentang Saya",
        text1:
          "Saya seorang developer yang passionate dan ambisius dengan minat khusus pada web development, game design, physics, dan musik. Perjalanan saya di tech dimulai dengan curiosity tentang bagaimana sesuatu bekerja, dan berkembang menjadi komitmen untuk membangun solusi digital yang bermakna.",
        text2:
          "Saat ini belajar di SMKN 2 Magelang, saya aktif belajar dan bereksperimen dengan teknologi modern termasuk Dart, Flutter, C#, JavaScript, dan Python. Saya percaya pada pembelajaran berkelanjutan dan kolaborasi dengan developer passionate untuk mendorong batasan dari yang mungkin.",
        text3:
          "Ketika tidak coding, Anda bisa menemukan saya mengeksplorasi game engine baru, mendiskusikan konsep physics, atau menikmati musik. Saya terbuka untuk kolaborasi dan selalu excited untuk bekerja pada proyek yang menantang skill saya.",
        student: "Mahasiswa di",
        openTo: "Terbuka untuk",
        location: "Lokasi",
        collaboration: "Proyek collaboration & freelance",
        magelang: "Magelang, Indonesia",
      },
      timeline: {
        title: "Perjalanan Saya",
      },
      skills: {
        title: "Keahlian & Teknologi",
      },
      projects: {
        title: "Proyek Unggulan",
      },
      contact: {
        title: "Mari Terhubung",
        subtitle: "Saya selalu tertarik mendengar tentang proyek dan peluang baru. Silakan hubungi saya!",
        interested: "Tertarik berkolaborasi atau hanya ingin chatting? Saya selalu siap untuk percakapan menarik!",
      },
      footer: "© 2025 Warid27. Dibuat dengan Next.js & Tailwind CSS.",
    },
  }

  const t = translations[language]

  const projects = [
    {
      title: "Pemiyos",
      descriptionEn:
        "Most contribution - Full-featured collaborative project showcasing comprehensive web development skills",
      descriptionId:
        "Most contribution - Proyek kolaboratif penuh fitur yang menampilkan keahlian web development komprehensif",
      tags: ["Web", "Featured"],
      link: "https://pemiyos.netlify.app/",
    },
    {
      title: "Saga Advisor",
      descriptionEn: "Prototype website - Professional web application built with modern technologies",
      descriptionId: "Website Prototipe - Aplikasi web profesional dibangun dengan teknologi modern",
      tags: ["Next.js", "Vercel"],
      link: "https://saga-advisor.vercel.app/",
    },
    {
      title: "LKS 2025",
      descriptionEn: "Game like Bomb It - Interactive browser game created with HTML, CSS, and JavaScript",
      descriptionId: "Game seperti Bomb It - Game browser interaktif dibuat dengan HTML, CSS, dan JavaScript",
      tags: ["Game", "HTML/CSS/JS"],
      link: "https://lks-2025-warid.vercel.app/",
    },
    {
      title: "Chailly Bot",
      descriptionEn: "Interactive AI assistant bot application with advanced features and conversational abilities",
      descriptionId: "Aplikasi bot AI asistan interaktif dengan fitur canggih dan kemampuan percakapan",
      tags: ["Bot", "Next.js"],
      link: "https://chaillubot.vercel.app/",
    },
    {
      title: "Crossy Road Three.js",
      descriptionEn: "3D game recreation using Three.js and Next.js - Demonstrates 3D graphics and game mechanics",
      descriptionId: "Rekreasi game 3D menggunakan Three.js dan Next.js - Mendemonstrasikan grafis 3D dan mekanik game",
      tags: ["3D", "Game", "Three.js"],
      link: "https://crossy-road-threejs-next.vercel.app/",
    },
    {
      title: "Latihan LKS",
      descriptionEn: "Training project for competition preparation with full-stack implementation",
      descriptionId: "Proyek latihan untuk persiapan kompetisi dengan implementasi full-stack",
      tags: ["Training", "Next.js"],
      link: "https://latihan-lks.vercel.app/",
    },
  ]

  const skillsData = {
    Frontend: [
      { name: "Next.js", logo: "/icons/nextjs.svg" },
      { name: "React", logo: "/icons/react.svg" },
      { name: "Static Sites", logo: "/icons/html.svg" },
      { name: "Flutter", logo: "/icons/flutter.svg" },
    ],
    Backend: [
      { name: "Next.js", logo: "/icons/nextjs.svg" },
      { name: "Bun JS", logo: "/icons/bun.svg" },
      { name: "Express.js", logo: "/icons/express.svg" },
    ],
    Database: [
      { name: "MySQL", logo: "/icons/mysql.svg" },
      { name: "PostgreSQL", logo: "/icons/postgresql.svg" },
      { name: "MongoDB", logo: "/icons/mongodb.svg" },
    ],
    Deploy: [
      { name: "Netlify", logo: "/icons/Netlify.svg" },
      { name: "Railway", logo: "/icons/railway.svg" },
      { name: "Vercel", logo: "/icons/Vercel.svg" },
    ],
    Other: [
      { name: "Unity", logo: "/icons/unity.svg" },
      { name: "Figma", logo: "/icons/figma.svg" },
    ],
  }

  const timeline = [
    {
      year: "2019",
      titleEn: "SMPN 1 Kota Magelang",
      titleId: "SMPN 1 Kota Magelang",
      descriptionEn: "Junior High School",
      descriptionId: "Sekolah Menengah Pertama",
    },
    {
      year: "2022",
      titleEn: "SMKN 2 Kota Magelang",
      titleId: "SMKN 2 Kota Magelang",
      descriptionEn: "Vocational High School - PPLG (Software Development)",
      descriptionId: "Sekolah Menengah Kejuruan - PPLG (Pengembangan Perangkat Lunak)",
    },
    {
      year: "2023",
      titleEn: "Magang di PT Teknoreka Inovasi",
      titleId: "Magang di PT Teknoreka Inovasi",
      descriptionEn: "Internship - Applied web development skills in professional environment",
      descriptionId: "Magang - Menerapkan skill web development di lingkungan profesional",
    },
    {
      year: "2025",
      titleEn: "Bekerja di Reka Solusi Teknologi",
      titleId: "Bekerja di Reka Solusi Teknologi",
      descriptionEn: "Full-time Developer - Building digital solutions",
      descriptionId: "Developer Full-time - Membangun solusi digital",
    },
  ]

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-primary cursor-pointer">
              Warid27
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="px-3 py-1 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition cursor-pointer"
                aria-label="Toggle theme"
              >
                {isMounted ? (resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />) : <div className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setLanguage(language === "en" ? "id" : "en")}
                className="px-3 py-1 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition cursor-pointer"
              >
                {language === "en" ? "ID" : "EN"}
              </button>
              <button className="text-foreground cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 items-center">
              <button
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-primary transition cursor-pointer"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("timeline")}
                className="text-foreground hover:text-primary transition cursor-pointer"
              >
                {t.nav.journey}
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="text-foreground hover:text-primary transition cursor-pointer"
              >
                {t.nav.skills}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-foreground hover:text-primary transition cursor-pointer"
              >
                {t.nav.projects}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition cursor-pointer"
              >
                {t.nav.contact}
              </button>
              <button
                onClick={() => setLanguage(language === "en" ? "id" : "en")}
                className="px-3 py-1 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition cursor-pointer"
              >
                {language === "en" ? "ID" : "EN"}
              </button>
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="px-3 py-1 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition cursor-pointer"
                aria-label="Toggle theme"
              >
                {isMounted ? (resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />) : <div className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-foreground hover:text-primary transition py-2 cursor-pointer"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("timeline")}
                className="block w-full text-left text-foreground hover:text-primary transition py-2 cursor-pointer"
              >
                {t.nav.journey}
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="block w-full text-left text-foreground hover:text-primary transition py-2 cursor-pointer"
              >
                {t.nav.skills}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left text-foreground hover:text-primary transition py-2 cursor-pointer"
              >
                {t.nav.projects}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-foreground hover:text-primary transition py-2 cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 text-balance">
                {t.hero.greeting} <AnimatedText language={language} />
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-6 text-balance">{t.hero.title}</p>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.hero.subtitle}</p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
                >
                  {t.hero.viewWork}
                </button>
                <a
                  href="https://github.com/Warid27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition cursor-pointer"
                >
                  {t.hero.viewGithub}
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-2xl">
                <Image
                  src="/me.webp"
                  alt="Warid27 Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {t.about.title}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-background rounded-xl p-8 border border-border/60 shadow-sm hover:shadow-md transition">
                <p className="text-lg text-muted-foreground leading-relaxed">{t.about.text1}</p>
              </div>
              <div className="bg-background rounded-xl p-8 border border-border/60 shadow-sm hover:shadow-md transition">
                <p className="text-lg text-muted-foreground leading-relaxed">{t.about.text2}</p>
              </div>
              <div className="bg-background rounded-xl p-8 border border-border/60 shadow-sm hover:shadow-md transition">
                <p className="text-lg text-muted-foreground leading-relaxed">{t.about.text3}</p>
              </div>
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              <div className="bg-background p-6 rounded-xl border border-border/60 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide">
                      {t.about.student}
                    </h3>
                    <p className="text-foreground font-bold text-lg leading-tight">SMKN 2 Magelang</p>
                    <p className="text-muted-foreground text-sm mt-1">PPLG Major</p>
                  </div>
                </div>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border/60 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Handshake size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide">{t.about.openTo}</h3>
                    <p className="text-foreground font-bold leading-tight">{t.about.collaboration}</p>
                  </div>
                </div>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border/60 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide">
                      {t.about.location}
                    </h3>
                    <p className="text-foreground font-bold leading-tight">{t.about.magelang}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {t.timeline.title}
          </motion.h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-transparent md:transform md:-translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative ${index % 2 === 0 ? "md:ml-auto md:pl-12" : "md:pr-12"} pl-24 md:pl-0 md:w-1/2`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background md:transform md:-translate-x-1/2 md:-translate-y-1/2"></div>

                  {/* Content */}
                    <motion.div
                      className="bg-card rounded-lg p-6 border border-border hover:border-primary transition cursor-pointer"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                    <p className="text-sm font-bold text-primary mb-1">{item.year}</p>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {language === "en" ? item.titleEn : item.titleId}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === "en" ? item.descriptionEn : item.descriptionId}
                    </p>
                    </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {t.skills.title}
          </motion.h2>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {Object.keys(skillsData).map((category) => (
              <button
                key={category}
                onClick={() => setActiveSkillCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition cursor-pointer ${
                  activeSkillCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-foreground hover:border-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Technology grid for selected category */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skillsData[activeSkillCategory as keyof typeof skillsData].map((tech) => (
              <div
                key={tech.name}
                className="bg-background dark:bg-gray-100 rounded-lg p-6 border border-border hover:border-primary transition flex flex-col items-center justify-center gap-3 group cursor-pointer"
              >
                <div className="h-12 w-12 relative">
                  <Image
                    src={tech.logo || "/placeholder.svg"}
                    alt={tech.name}
                    fill
                    className="object-contain group-hover:scale-110 transition"
                  />
                </div>
                <p className="text-foreground dark:text-black font-semibold text-center text-sm">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {t.projects.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06 }}
                className="h-full"
              >
                <GlassCard
                as="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-in fade-in-50 h-full"
                >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition">
                      {project.title}
                    </h3>
                    <ExternalLink size={20} className="text-muted-foreground group-hover:text-primary transition" />
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {language === "en" ? project.descriptionEn : project.descriptionId}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 scroll-mt-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {t.contact.title}
          </motion.h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">{t.contact.subtitle}</p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a
              href="https://github.com/Warid27"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-background border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition cursor-pointer"
            >
              <i className="fab fa-github text-xl"></i>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/sinatrya_al_warid/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-background border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition cursor-pointer"
            >
              <i className="fab fa-instagram text-xl"></i>
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/Sinatrya?locale=id_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-background border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition cursor-pointer"
            >
              <i className="fab fa-facebook text-xl"></i>
              <span>Facebook</span>
            </a>
          </div>

          <p className="text-muted-foreground mb-6">{t.contact.interested}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  )
}
