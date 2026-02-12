"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useParams } from "next/navigation";

type Review = {
  name: string;
  rating: number;
  text: string;
  date: string;
};

type Caregiver = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  hourlyRate: number;
  location: string;
  verified: boolean;
  image: string;
  bio: string;
  longBio: string;
  skills: string[];
  availability: string;
  languages: string[];
  education: string;
  certifications: string[];
  services: string[];
  reviews: Review[];
};

const caregiverData: Record<string, Caregiver> = {
  "1": {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Baby & Child Care",
    rating: 4.9,
    reviewsCount: 127,
    experience: "8 years",
    hourlyRate: 18,
    location: "New York, NY",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop",
    bio: "Certified nanny with CPR training and early childhood education background. I'm passionate about creating a safe, nurturing environment where children can learn and grow.",
    longBio:
      "With over 8 years of experience in childcare, I've had the privilege of working with families from diverse backgrounds and children of all ages. My approach combines structured learning activities with plenty of creative play time. I hold certifications in CPR, First Aid, and have completed coursework in early childhood development.",
    skills: [
      "CPR Certified",
      "First Aid",
      "Early Childhood Education",
      "Meal Preparation",
      "Homework Help",
      "Potty Training",
      "Sleep Training",
      "Bilingual (English/Spanish)",
    ],
    availability: "Available",
    languages: ["English", "Spanish"],
    education: "Bachelor's in Early Childhood Education",
    certifications: [
      "CPR Certified",
      "First Aid Certified",
      "Child Development Associate (CDA)",
    ],
    services: [
      "Babysitting",
      "Full-time Nanny",
      "After-school Care",
      "Overnight Care",
    ],
    reviews: [
      {
        name: "Emily R.",
        rating: 5,
        text: "Sarah is absolutely wonderful! My kids love her and I trust her completely. She's punctual, professional, and goes above and beyond.",
        date: "2 weeks ago",
      },
      {
        name: "Michael T.",
        rating: 5,
        text: "Best nanny we've ever had. Our daughter has learned so much and always looks forward to time with Sarah.",
        date: "1 month ago",
      },
      {
        name: "Lisa K.",
        rating: 5,
        text: "Highly recommend! Sarah is patient, creative, and truly cares about the children she works with.",
        date: "2 months ago",
      },
    ],
  },
  "2": {
    id: 2,
    name: "Michael Chen",
    specialty: "Senior Care",
    rating: 5.0,
    reviewsCount: 94,
    experience: "6 years",
    hourlyRate: 22,
    location: "Los Angeles, CA",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    bio: "Compassionate senior care specialist with dementia care certification and a genuine passion for helping elderly individuals maintain their independence.",
    longBio:
      "I've dedicated my career to providing dignified, compassionate care for seniors. My experience includes working with individuals with dementia, Alzheimer's, and various mobility challenges. I believe in treating every client with respect and helping them maintain their independence as much as possible.",
    skills: [
      "Dementia Care",
      "Medication Management",
      "Mobility Assistance",
      "Meal Preparation",
      "Companionship",
      "Transportation",
      "Personal Care",
      "Memory Care",
    ],
    availability: "Available",
    languages: ["English", "Mandarin"],
    education: "Certified Nursing Assistant (CNA)",
    certifications: [
      "CNA License",
      "Dementia Care Specialist",
      "CPR Certified",
    ],
    services: [
      "Personal Care",
      "Companionship",
      "Medication Reminders",
      "Transportation",
    ],
    reviews: [
      {
        name: "Patricia W.",
        rating: 5,
        text: "Michael has been a blessing for our mother. He's patient, kind, and treats her with such dignity.",
        date: "3 weeks ago",
      },
      {
        name: "Robert C.",
        rating: 5,
        text: "Excellent care for my father who has dementia. Michael knows exactly how to handle difficult situations.",
        date: "1 month ago",
      },
    ],
  },
  "3": {
    id: 3,
    name: "Emily Rodriguez",
    specialty: "Special Needs Care",
    rating: 4.8,
    reviewsCount: 156,
    experience: "10 years",
    hourlyRate: 28,
    location: "Chicago, IL",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop",
    bio: "Special needs caregiver with extensive experience supporting children and adults on the autism spectrum and with developmental disabilities.",
    longBio:
      "For over a decade, I've supported individuals with a wide range of developmental and cognitive differences. I focus on building trust, consistency, and structured routines tailored to each person's strengths and challenges. I collaborate closely with families, therapists, and educators to ensure continuity of care.",
    skills: [
      "ABA Therapy",
      "Behavioral Support",
      "Autism Spectrum",
      "Communication Strategies",
      "Sensory Integration",
      "Social Skills",
      "ADL Support",
      "IEP Implementation",
    ],
    availability: "Available",
    languages: ["English"],
    education: "Master's in Special Education",
    certifications: [
      "Special Education License",
      "ABA Therapy Certified",
      "Behavioral Support Specialist",
    ],
    services: [
      "Special Needs Care",
      "Behavioral Support",
      "Therapy Assistance",
      "Respite Care",
    ],
    reviews: [
      {
        name: "Maria G.",
        rating: 5,
        text: "Emily has been incredible with our son who has autism. She understands his needs perfectly.",
        date: "2 weeks ago",
      },
      {
        name: "David T.",
        rating: 5,
        text: "Finally found a caregiver who truly gets it. Professional and genuinely caring.",
        date: "3 weeks ago",
      },
    ],
  },
};

export default function CaregiverProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState<"about" | "skills" | "reviews">(
    "about",
  );

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  const caregiver = caregiverData[id] || caregiverData["1"];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-xl">
                health_and_safety
              </span>
            </div>
            <span className="text-xl font-bold text-slate-900">Care.xyz</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/services"
              className="text-slate-600 hover:text-teal-600 transition-colors font-medium"
            >
              Find Care
            </Link>
            <Link
              href="/register?role=caregiver"
              className="text-slate-600 hover:text-teal-600 transition-colors font-medium"
            >
              Become a Caregiver
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-teal-600 transition-colors font-medium"
            >
              Resources
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-slate-600 hover:text-teal-600 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-full transition-all"
            >
              Join Now
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* BREADCRUMBS */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-teal-600">
              Home
            </Link>
            <span className="material-icons text-slate-400 text-sm">
              chevron_right
            </span>
            <Link
              href="/caregivers"
              className="text-slate-500 hover:text-teal-600"
            >
              Caregivers
            </Link>
            <span className="material-icons text-slate-400 text-sm">
              chevron_right
            </span>
            <span className="text-slate-900 font-medium">{caregiver.name}</span>
          </div>
        </div>
      </div>

      {/* MAIN SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* LEFT: PROFILE & TABS */}
            <div className="lg:col-span-2">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-8"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-48 h-48 flex-shrink-0">
                    <Image
                      src={caregiver.image}
                      alt={caregiver.name}
                      className="w-full h-full object-cover rounded-2xl"
                      width={192}
                      height={192}
                    />
                    {caregiver.verified && (
                      <div className="absolute -top-2 -right-2 bg-teal-600 p-2 rounded-full shadow-lg">
                        <span className="material-icons text-white text-sm">
                          verified
                        </span>
                      </div>
                    )}
                    <div
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold ${
                        caregiver.availability === "Available"
                          ? "bg-green-500 text-white"
                          : "bg-slate-500 text-white"
                      }`}
                    >
                      {caregiver.availability}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                      {caregiver.name}
                    </h1>
                    <p className="text-xl text-teal-600 font-semibold mb-4">
                      {caregiver.specialty}
                    </p>
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-icons text-amber-400">
                          star
                        </span>
                        <span className="font-bold text-slate-900">
                          {caregiver.rating}
                        </span>
                        <span className="text-slate-600">
                          ({caregiver.reviews.length} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="material-icons text-slate-400">
                          work
                        </span>
                        <span>{caregiver.experience}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 mb-4">
                      <span className="material-icons text-slate-400">
                        location_on
                      </span>
                      <span>{caregiver.location}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {caregiver.bio}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="sticky top-20 z-30 bg-white border-b border-slate-200 rounded-t-2xl mb-8">
                <div className="flex gap-8 px-8">
                  {["about", "skills", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() =>
                        setActiveTab(tab as "about" | "skills" | "reviews")
                      }
                      className={`py-4 font-semibold text-sm uppercase tracking-wider transition-all ${
                        activeTab === tab
                          ? "text-teal-600 border-b-2 border-teal-600"
                          : "text-slate-600 hover:text-teal-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-8">
                {activeTab === "about" && (
                  <div className="space-y-6">
                    {/* About Me */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
                    >
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        About Me
                      </h2>
                      <p className="text-slate-600 leading-relaxed">
                        {caregiver.longBio}
                      </p>
                    </motion.div>

                    {/* Education & Certifications */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
                    >
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Education & Certifications
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="material-icons text-teal-600 mt-1">
                            school
                          </span>
                          <div>
                            <h3 className="font-semibold text-slate-900">
                              Education
                            </h3>
                            <p className="text-slate-600">
                              {caregiver.education}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="material-icons text-teal-600 mt-1">
                            verified
                          </span>
                          <div>
                            <h3 className="font-semibold text-slate-900 mb-2">
                              Certifications
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {caregiver.certifications.map((cert, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                                >
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Languages */}
                        <div className="flex items-start gap-3">
                          <span className="material-icons text-teal-600 mt-1">
                            language
                          </span>
                          <div>
                            <h3 className="font-semibold text-slate-900 mb-2">
                              Languages
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {caregiver.languages.map((lang, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
                    >
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Services Offered
                      </h2>
                      <div className="grid grid-cols-2 gap-3">
                        {caregiver.services.map((service, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                          >
                            <span className="material-icons text-teal-600 text-sm">
                              check_circle
                            </span>
                            <span className="text-slate-700 font-medium text-sm">
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}

                {activeTab === "skills" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                      Skills & Expertise
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {caregiver.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-teal-50 rounded-xl text-center hover:bg-teal-100 transition-colors"
                        >
                          <span className="text-slate-700 font-medium">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">
                          Reviews
                        </h2>
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-amber-400 text-3xl">
                            star
                          </span>
                          <div>
                            <div className="text-2xl font-bold text-slate-900">
                              {caregiver.rating}
                            </div>
                            <div className="text-sm text-slate-600">
                              {caregiver.reviews.length} reviews
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {caregiver.reviews.map((review, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 bg-slate-50 rounded-xl border border-slate-100"
                          >
                            <div className="flex items-center gap-1 mb-3">
                              {Array.from({ length: review.rating }).map(
                                (_, i) => (
                                  <span
                                    key={i}
                                    className="material-icons text-amber-400 text-sm"
                                  >
                                    star
                                  </span>
                                ),
                              )}
                            </div>
                            <p className="text-slate-700 mb-4 leading-relaxed">
                              &quot;{review.text}&quot;
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-900">
                                {review.name}
                              </span>
                              <span className="text-sm text-slate-500">
                                {review.date}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Booking Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-slate-900 mb-2">
                      ${caregiver.hourlyRate}/hr
                    </div>
                    <p className="text-slate-600">Starting rate</p>
                  </div>
                  <Link
                    href={`/services`}
                    className="block w-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 rounded-xl text-center transition-all shadow-lg mb-4"
                  >
                    Book Now
                  </Link>
                  <button className="block w-full bg-white hover:bg-slate-50 text-teal-600 font-bold px-8 py-4 rounded-xl text-center transition-all border-2 border-teal-600">
                    Send Message
                  </button>
                </div>

                {/* Quick Facts */}
                <div className="bg-linear-to-br from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-100">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="material-icons text-teal-600">info</span>
                    Quick Facts
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Response Time</span>
                      <span className="font-semibold text-slate-900">
                        Within 1 hour
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Acceptance Rate</span>
                      <span className="font-semibold text-slate-900">95%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Repeat Clients</span>
                      <span className="font-semibold text-slate-900">87%</span>
                    </div>
                  </div>
                </div>

                {/* Safety & Trust */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4">
                    Safety & Trust
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="material-icons text-green-600 text-sm">
                        check_circle
                      </span>
                      Background verified
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-icons text-green-600 text-sm">
                        check_circle
                      </span>
                      Identity confirmed
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-icons text-green-600 text-sm">
                        check_circle
                      </span>
                      References checked
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-icons text-green-600 text-sm">
                        check_circle
                      </span>
                      Insurance covered
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* END RIGHT */}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="material-icons text-white text-xl">
                    health_and_safety
                  </span>
                </div>
                <span className="text-xl font-bold text-white">Care.xyz</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transforming the way families find trusted, professional care
                for their loved ones across the globe.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Senior Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Specialized Nursing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Dementia Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Child Care
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-teal-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
                <button className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-sm text-slate-500">
              © 2026 Care.xyz Inc. All rights reserved. Providing compassionate
              care nationwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
