"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import CustomButton from "@/components/CustomButtons";

const serviceData: Record<string, any> = {
  "baby-care": {
    id: "baby-care",
    title: "Baby & Child Care",
    description:
      "Professional, loving care for your little ones. Our verified babysitters and nannies provide safe, engaging, and nurturing care for infants, toddlers, and children of all ages.",
    longDescription:
      "Finding the right caregiver for your child is one of the most important decisions you'll make as a parent. Our baby and child care service connects you with experienced, certified professionals who understand child development, safety protocols, and the unique needs of each age group.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=600&fit=crop",
    rating: 4.8,
    totalBookings: 15420,
    startingPrice: 15,
    hourlyRate: "$15-25",
    dailyRate: "$120-200",
    features: [
      "Meal preparation and feeding",
      "Educational activities and playtime",
      "Bedtime routines and sleep training",
      "Light housekeeping",
      "Homework help for school-age children",
      "Transportation to activities",
      "First aid and CPR certified",
      "Age-appropriate development activities",
    ],
    benefits: [
      {
        icon: "verified_user",
        title: "Background Verified",
        description:
          "All caregivers undergo comprehensive background checks and reference verification.",
      },
      {
        icon: "school",
        title: "Certified Professionals",
        description:
          "CPR, First Aid, and early childhood education certifications.",
      },
      {
        icon: "favorite",
        title: "Loving Care",
        description:
          "Compassionate caregivers who treat your children like their own.",
      },
      {
        icon: "schedule",
        title: "Flexible Scheduling",
        description:
          "Book hourly, daily, or recurring care that fits your schedule.",
      },
    ],
    testimonials: [
      {
        name: "Jennifer Smith",
        rating: 5,
        text: "Sarah has been amazing with our 2-year-old twins. She's patient, creative, and the kids absolutely love her!",
        date: "2 weeks ago",
      },
      {
        name: "Mark Johnson",
        rating: 5,
        text: "Professional, reliable, and great with kids. We couldn't ask for a better babysitter.",
        date: "1 month ago",
      },
    ],
    faqs: [
      {
        question: "What age groups do you cover?",
        answer:
          "Our caregivers are experienced with children from newborns to 12 years old, with specialized training for different age groups.",
      },
      {
        question: "Are caregivers background checked?",
        answer:
          "Yes, all caregivers undergo comprehensive background checks, reference verification, and identity confirmation before joining our platform.",
      },
      {
        question: "Can I request the same caregiver regularly?",
        answer:
          "Absolutely! Once you find a caregiver you love, you can book them for recurring appointments.",
      },
      {
        question: "What if I need to cancel or reschedule?",
        answer:
          "You can cancel or reschedule up to 24 hours before the appointment without penalty.",
      },
    ],
  },

  "senior-care": {
    id: "senior-care",
    title: "Senior Care",
    description:
      "Compassionate, professional care for your elderly loved ones. Our caregivers provide companionship, daily assistance, and specialized support to help seniors maintain independence and dignity.",
    longDescription:
      "As our loved ones age, they deserve care that honors their independence while providing the support they need. Our senior care service connects families with compassionate, trained caregivers who specialize in elderly care.",
    image:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1200&h=600&fit=crop",
    rating: 4.9,
    totalBookings: 12850,
    startingPrice: 20,
    hourlyRate: "$20-35",
    dailyRate: "$160-280",
    features: [
      "Medication reminders and management",
      "Mobility and transfer assistance",
      "Companionship and conversation",
      "Meal preparation and nutrition",
      "Light housekeeping and laundry",
      "Transportation to appointments",
      "Personal care assistance",
      "Memory care support",
    ],
    benefits: [
      {
        icon: "health_and_safety",
        title: "Medical Training",
        description:
          "Caregivers trained in senior health and emergency response.",
      },
      {
        icon: "psychology",
        title: "Dementia Care",
        description:
          "Specialized training for Alzheimer's and dementia care.",
      },
      {
        icon: "home",
        title: "Age in Place",
        description:
          "Help seniors maintain independence in their own homes.",
      },
      {
        icon: "family_restroom",
        title: "Family Support",
        description:
          "Regular updates and communication with family members.",
      },
    ],
    testimonials: [
      {
        name: "Patricia Williams",
        rating: 5,
        text: "Michael has been a blessing for our mother. He's patient, kind, and treats her with such dignity.",
        date: "3 weeks ago",
      },
      {
        name: "Robert Chen",
        rating: 5,
        text: "Excellent care for my father who has dementia. The caregiver knows exactly how to handle difficult situations.",
        date: "1 month ago",
      },
    ],
    faqs: [
      {
        question: "Do you provide medical care?",
        answer:
          "Our caregivers provide non-medical support. For medical needs, we can connect you with licensed nurses.",
      },
      {
        question: "What if my loved one has dementia?",
        answer:
          "We have caregivers specially trained in dementia care who understand the unique challenges.",
      },
      {
        question: "Can caregivers help with bathing?",
        answer:
          "Yes, our caregivers can assist with personal care while maintaining dignity and respect.",
      },
      {
        question: "How do you ensure safety?",
        answer:
          "All caregivers are trained in fall prevention and emergency protocols.",
      },
    ],
  },

  "special-needs": {
    id: "special-needs",
    title: "Special Needs Care",
    description:
      "Specialized, compassionate care for individuals with physical, developmental, or cognitive disabilities.",
    longDescription:
      "Every individual deserves care that respects their unique abilities and challenges. Our special needs care service connects families with caregivers who have specialized training in supporting individuals with autism, cerebral palsy, Down syndrome, and other disabilities.",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&h=600&fit=crop",
    rating: 4.9,
    totalBookings: 8640,
    startingPrice: 25,
    hourlyRate: "$25-40",
    dailyRate: "$200-320",
    features: [
      "Behavioral support and management",
      "Therapy assistance and exercises",
      "ADL support",
      "Communication aid",
      "Sensory-friendly activities",
      "Medication support",
      "Social skills development",
      "Respite care for families",
    ],
    benefits: [
      {
        icon: "psychology_alt",
        title: "Specialized Training",
        description:
          "Caregivers certified in behavioral support and special education.",
      },
      {
        icon: "accessibility",
        title: "Adaptive Care",
        description:
          "Personalized approaches for each individual’s unique needs.",
      },
      {
        icon: "groups",
        title: "Family Partnership",
        description:
          "Collaborative care plans with families and therapists.",
      },
      {
        icon: "celebration",
        title: "Quality of Life",
        description:
          "Focus on independence and meaningful engagement.",
      },
    ],
    testimonials: [
      {
        name: "Maria Garcia",
        rating: 5,
        text: "Emily has been incredible with our son who has autism. She understands his needs perfectly.",
        date: "2 weeks ago",
      },
      {
        name: "David Thompson",
        rating: 5,
        text: "Finally found a caregiver who truly gets it. Professional and genuinely caring.",
        date: "3 weeks ago",
      },
    ],
    faqs: [
      {
        question: "What conditions do you support?",
        answer:
          "We support autism, cerebral palsy, Down syndrome, ADHD, and other developmental disabilities.",
      },
      {
        question: "Are caregivers specially trained?",
        answer:
          "Yes, all special needs caregivers have specialized training and certifications.",
      },
      {
        question: "Can you work with therapy schedules?",
        answer:
          "Absolutely! Our caregivers coordinate with existing therapy schedules.",
      },
      {
        question: "Do you provide respite care?",
        answer:
          "Yes, we offer respite care to give family caregivers needed breaks.",
      },
    ],
  },

  "pet-care": {
    id: "pet-care",
    title: "Pet Care",
    description:
      "Reliable pet sitters and dog walkers to care for your furry family members.",
    longDescription:
      "Our pet care service connects you with trusted sitters and walkers who treat your pets like family, providing exercise, feeding, and company while you’re away.",
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=600&fit=crop",
    rating: 4.7,
    totalBookings: 6700,
    startingPrice: 12,
    hourlyRate: "$12-20",
    dailyRate: "$90-150",
    features: [
      "Dog walking",
      "Pet sitting",
      "Feeding & medication",
      "Playtime & exercise",
      "Photo & video updates",
    ],
    benefits: [
      {
        icon: "pets",
        title: "Animal Lovers",
        description: "Sitters and walkers who truly love animals.",
      },
      {
        icon: "schedule",
        title: "Flexible Visits",
        description: "Drop‑ins, overnights, and regular walks available.",
      },
      {
        icon: "verified_user",
        title: "Verified Sitters",
        description: "Background‑checked pet caregivers.",
      },
      {
        icon: "favorite",
        title: "Happy Pets",
        description: "Stress‑free care in their familiar environment.",
      },
    ],
    testimonials: [],
    faqs: [
      {
        question: "Can you handle special diets or medications?",
        answer:
          "Yes, pet sitters can follow specific feeding schedules and give oral medications as instructed.",
      },
      {
        question: "Do you offer overnight stays?",
        answer:
          "Overnight pet sitting is available in many areas, subject to sitter availability.",
      },
      {
        question: "Will I get updates about my pet?",
        answer:
          "Most sitters provide photo and message updates during each visit or walk.",
      },
    ],
  },

  housekeeping: {
    id: "housekeeping",
    title: "Housekeeping",
    description:
      "Professional house cleaners and housekeepers for a spotless home.",
    longDescription:
      "From deep cleaning to recurring maintenance, our housekeeping professionals keep your home fresh, organized, and welcoming.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=600&fit=crop",
    rating: 4.8,
    totalBookings: 9800,
    startingPrice: 18,
    hourlyRate: "$18-30",
    dailyRate: "$140-220",
    features: [
      "Deep cleaning",
      "Laundry services",
      "Organization",
      "Regular maintenance",
    ],
    benefits: [
      {
        icon: "cleaning_services",
        title: "Thorough Cleaning",
        description: "Top‑to‑bottom cleans tailored to your home.",
      },
      {
        icon: "schedule",
        title: "Flexible Scheduling",
        description: "One‑time, weekly, or monthly visits available.",
      },
      {
        icon: "verified_user",
        title: "Trusted Pros",
        description: "Background‑checked, experienced housekeepers.",
      },
      {
        icon: "home",
        title: "Comfortable Home",
        description: "A tidy, fresh space without the stress.",
      },
    ],
    testimonials: [],
    faqs: [
      {
        question: "What cleaning supplies are used?",
        answer:
          "Cleaners typically bring their own supplies, but can use your preferred products if requested.",
      },
      {
        question: "Can I book recurring housekeeping?",
        answer:
          "Yes, you can schedule weekly, bi‑weekly, or monthly cleanings for ongoing support.",
      },
      {
        question: "Do you offer deep cleaning or move‑out cleans?",
        answer:
          "Many housekeepers offer deep cleans, move‑in/move‑out services, and one‑time intensive sessions.",
      },
    ],
  },

  tutoring: {
    id: "tutoring",
    title: "Tutoring & Education",
    description:
      "Qualified tutors for academic support, homework help, and skill development.",
    longDescription:
      "Connect with experienced tutors for school subjects, exam preparation, and skill-building for learners of all ages.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop",
    rating: 4.9,
    totalBookings: 7300,
    startingPrice: 20,
    hourlyRate: "$20-45",
    dailyRate: "$160-300",
    features: [
      "Subject tutoring",
      "Test preparation",
      "Homework help",
      "Language learning",
    ],
    benefits: [
      {
        icon: "school",
        title: "Expert Tutors",
        description: "Qualified teachers and experienced instructors.",
      },
      {
        icon: "schedule",
        title: "Flexible Sessions",
        description: "After‑school, evening, and weekend time slots.",
      },
      {
        icon: "devices",
        title: "Online or In‑Person",
        description: "Choose the format that works best for you.",
      },
      {
        icon: "emoji_events",
        title: "Exam Success",
        description: "Targeted prep for tests and exams.",
      },
    ],
    testimonials: [],
    faqs: [
      {
        question: "Which subjects do you cover?",
        answer:
          "Tutors are available for math, science, languages, test prep, and many other subjects.",
      },
      {
        question: "Do you help with exam preparation?",
        answer:
          "Yes, tutors can design focused plans for school exams, board exams, and standardized tests.",
      },
      {
        question: "Can sessions be online?",
        answer:
          "Many tutors offer both in‑person and online sessions via video chat and shared whiteboards.",
      },
    ],
  },
};



type TabId = "overview" | "features" | "caregivers" | "faq";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [activeTab, setActiveTab] = useState<TabId>("overview");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl font-semibold text-slate-700">
          Service not found for {"{slug}"}
        </p>
      </div>
    );
  }

  const topCaregivers = [
    {
      name: "Sarah Johnson",
      specialty: service.title,
      rating: 4.9,
      reviews: 127,
      experience: "8 years",
      rate: `$${service.startingPrice}/hr`,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Michael Chen",
      specialty: service.title,
      rating: 5.0,
      reviews: 94,
      experience: "6 years",
      rate: `$${service.startingPrice + 5}/hr`,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Emily Rodriguez",
      specialty: service.title,
      rating: 4.8,
      reviews: 156,
      experience: "10 years",
      rate: `$${service.startingPrice + 8}/hr`,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  ];

  const tabs: TabId[] = ["overview", "features", "caregivers", "faq"];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
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
              className="text-teal-600 font-medium border-b-2 border-teal-600"
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

      {/* Breadcrumb */}
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
              href="/services"
              className="text-slate-500 hover:text-teal-600"
            >
              Services
            </Link>
            <span className="material-icons text-slate-400 text-sm">
              chevron_right
            </span>
            <span className="text-slate-900 font-medium">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          width={1200}
          height={400}
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-white mb-4">
                {service.title}
              </h1>
              <div className="flex items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-amber-400">star</span>
                  <span className="font-bold">{service.rating}</span>
                  <span className="text-white/80">
                    ({service.totalBookings.toLocaleString()} bookings)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons">payments</span>
                  <span className="font-bold">
                    Starting at ${service.startingPrice}/hr
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-semibold text-sm uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-slate-600 hover:text-teal-600"
                }`}
              >
                {tab === "overview" && "Overview"}
                {tab === "features" && "Features"}
                {tab === "caregivers" && "Caregivers"}
                {tab === "faq" && "FAQ"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-12">
            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
                >
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    About This Service
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {service.longDescription}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
                >
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Why Choose Our Service
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.benefits.map(
                      (
                        benefit: {
                          icon: string;
                          title: string;
                          description: string;
                        },
                        idx: number
                      ) => (
                        <div
                          key={idx}
                          className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors"
                        >
                          <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center shrink-0">
                            <span className="material-icons text-white">
                              {benefit.icon}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1">
                              {benefit.title}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-linear-to-br from-teal-600 to-blue-600 rounded-2xl p-8 shadow-lg text-white"
                >
                  <h2 className="text-3xl font-bold mb-6">How It Works</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold">1</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">
                        Browse &amp; Select
                      </h3>
                      <p className="text-white/90 text-sm">
                        Review caregiver profiles, ratings, and availability.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold">2</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">Book &amp; Pay</h3>
                      <p className="text-white/90 text-sm">
                        Schedule your service and pay securely online.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold">3</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">Get Care</h3>
                      <p className="text-white/90 text-sm">
                        Receive exceptional care from verified professionals.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
                >
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    What Clients Say
                  </h2>
                  <div className="space-y-4">
                    {service.testimonials.map(
                      (
                        testimonial: {
                          name: string;
                          rating: number;
                          text: string;
                          date: string;
                        },
                        idx: number
                      ) => (
                        <div
                          key={idx}
                          className="p-6 bg-slate-50 rounded-xl border border-slate-100"
                        >
                          <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: testimonial.rating }).map(
                              (_, i) => (
                                <span
                                  key={i}
                                  className="material-icons text-amber-400 text-sm"
                                >
                                  star
                                </span>
                              )
                            )}
                          </div>
                          <p className="text-slate-700 mb-4 leading-relaxed">
                            “{testimonial.text}”
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-900">
                              {testimonial.name}
                            </span>
                            <span className="text-sm text-slate-500">
                              {testimonial.date}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              </>
            )}

            {/* FEATURES */}
            {activeTab === "features" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
                >
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    What&apos;s Included
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map(
                      (feature: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
                        >
                          <span className="material-icons text-teal-600 mt-0.5">
                            check_circle
                          </span>
                          <span className="text-slate-700 font-medium">
                            {feature}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
                >
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Service Guarantee
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                      <span className="material-icons text-green-600 text-3xl">
                        verified
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">
                          100% Satisfaction Guaranteed
                        </h3>
                        <p className="text-slate-600 text-sm">
                          If you&apos;re not completely satisfied with your
                          first booking, we&apos;ll make it right or provide a
                          full refund.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                      <span className="material-icons text-blue-600 text-3xl">
                        shield
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">
                          Insurance Coverage
                        </h3>
                        <p className="text-slate-600 text-sm">
                          All services are covered by comprehensive liability
                          insurance for your peace of mind.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                      <span className="material-icons text-purple-600 text-3xl">
                        support_agent
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">
                          24/7 Support
                        </h3>
                        <p className="text-slate-600 text-sm">
                          Our customer support team is available around the
                          clock to assist with any questions or concerns.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {/* CAREGIVERS */}
            {activeTab === "caregivers" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-slate-900">
                      Top Caregivers
                    </h2>
                    <Link
                      href="/caregivers"
                      className="text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1"
                    >
                      View All
                      <span className="material-icons text-sm">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topCaregivers.map((caregiver, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all"
                      >
                        <div className="relative h-48">
                          <Image
                            src={caregiver.image}
                            alt={caregiver.name}
                            className="w-full h-full object-cover"
                            width={400}
                            height={192}
                          />
                          <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                            <span className="material-icons text-amber-400 text-sm">
                              star
                            </span>
                            <span className="font-bold text-slate-900 text-sm">
                              {caregiver.rating}
                            </span>
                          </div>
                          <div className="absolute top-4 left-4 bg-teal-600 px-3 py-1.5 rounded-full">
                            <span className="text-white text-xs font-bold">
                              Top Rated
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-lg text-slate-900 mb-1">
                            {caregiver.name}
                          </h3>
                          <p className="text-sm text-teal-600 font-semibold mb-3">
                            {caregiver.specialty}
                          </p>
                          <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                            <span className="flex items-center gap-1">
                              <span className="material-icons text-slate-400 text-sm">
                                work
                              </span>
                              {caregiver.experience}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-icons text-amber-400 text-sm">
                                reviews
                              </span>
                              {caregiver.reviews} reviews
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <span className="text-2xl font-bold text-slate-900">
                              {caregiver.rate}
                            </span>
                            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-linear-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white text-center"
                >
                  <h3 className="text-2xl font-bold mb-3">
                    Can&apos;t find the right caregiver?
                  </h3>
                  <p className="text-white/90 mb-6">
                    Browse our full directory of{" "}
                    {service.totalBookings.toLocaleString()} verified caregivers.
                  </p>
                  <Link
                    href="/caregivers"
                    className="inline-block bg-white text-teal-600 hover:bg-slate-100 font-bold px-8 py-3 rounded-lg transition-all"
                  >
                    <CustomButton>Browse All Caregivers</CustomButton>
                  </Link>
                </motion.div>
              </>
            )}

            {/* FAQ */}
            {activeTab === "faq" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Frequently Asked Questions
                </h2>
                {service.faqs.map(
                  (
                    faq: { question: string; answer: string },
                    idx: number
                  ) => (
                    <details
                      key={idx}
                      className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 group"
                    >
                      <summary className="font-bold text-slate-900 cursor-pointer flex items-center justify-between">
                        {faq.question}
                        <span className="material-icons text-teal-600 group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <p className="mt-4 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  )
                )}
              </motion.div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-6 lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Pricing
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 font-medium">Hourly Rate</span>
                  <span className="text-2xl font-bold text-slate-900">
                    {service.hourlyRate}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 font-medium">Daily Rate</span>
                  <span className="text-2xl font-bold text-slate-900">
                    {service.dailyRate}
                  </span>
                </div>
              </div>
              <Link
                href={`/booking/${service.id}`}
                className="block w-full bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 rounded-xl text-center transition-all shadow-lg"
              >
                Book This Service
              </Link>
            </div>

            <div className="bg-linear-to-br from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="material-icons text-white">
                    verified_user
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Safety Guaranteed</h4>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="material-icons text-teal-600 text-sm">
                    check
                  </span>
                  Background verified caregivers
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-icons text-teal-600 text-sm">
                    check
                  </span>
                  Secure payment processing
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-icons text-teal-600 text-sm">
                    check
                  </span>
                  24/7 customer support
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-icons text-teal-600 text-sm">
                    check
                  </span>
                  Satisfaction guarantee
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4">Need Help?</h4>
              <div className="space-y-3 text-sm">
                <a
                  href="tel:1-800-CARE-XYZ"
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <span className="material-icons text-teal-600">phone</span>
                  <div>
                    <div className="font-semibold text-slate-900">Call Us</div>
                    <div className="text-slate-600">1-800-CARE-XYZ</div>
                  </div>
                </a>
                <a
                  href="mailto:support@care.xyz"
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <span className="material-icons text-teal-600">email</span>
                  <div>
                    <div className="font-semibold text-slate-900">Email Us</div>
                    <div className="text-slate-600">support@care.xyz</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  placeholder="Your email..."
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
