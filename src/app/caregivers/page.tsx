"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function CaregiversPage() {
  const [selectedService, setSelectedService] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  const caregivers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Baby & Child Care",
      rating: 4.9,
      reviews: 127,
      experience: "8 years",
      hourlyRate: 18,
      location: "New York, NY",
      verified: true,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Certified nanny with CPR training and early childhood education background.",
      availability: "Available",
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "Senior Care",
      rating: 5.0,
      reviews: 94,
      experience: "6 years",
      hourlyRate: 22,
      location: "Los Angeles, CA",
      verified: true,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Compassionate senior care specialist with dementia care certification.",
      availability: "Available",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      specialty: "Special Needs Care",
      rating: 4.8,
      reviews: 156,
      experience: "10 years",
      hourlyRate: 28,
      location: "Chicago, IL",
      verified: true,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Special education teacher with autism spectrum disorder expertise.",
      availability: "Available",
    },
    {
      id: 4,
      name: "David Thompson",
      specialty: "Pet Care",
      rating: 4.7,
      reviews: 82,
      experience: "5 years",
      hourlyRate: 15,
      location: "Austin, TX",
      verified: true,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Professional pet sitter with veterinary assistant background.",
      availability: "Busy",
    },
    {
      id: 5,
      name: "Jessica Martinez",
      specialty: "Housekeeping",
      rating: 4.9,
      reviews: 203,
      experience: "12 years",
      hourlyRate: 20,
      location: "Miami, FL",
      verified: true,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      bio: "Detail-oriented housekeeper with eco-friendly cleaning expertise.",
      availability: "Available",
    },
    {
      id: 6,
      name: "Robert Kim",
      specialty: "Tutoring",
      rating: 5.0,
      reviews: 67,
      experience: "7 years",
      hourlyRate: 25,
      location: "Seattle, WA",
      verified: true,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bio: "Math and science tutor with Master's degree in Education.",
      availability: "Available",
    },
  ];

  const filteredCaregivers = caregivers.filter((caregiver) => {
    const matchesService =
      selectedService === "all" || caregiver.specialty === selectedService;
    const matchesSearch =
      caregiver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caregiver.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesService && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

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
            <span className="text-slate-900 font-medium">
              Browse Caregivers
            </span>
          </div>
        </div>
      </div>

      {/* Main section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Find Your Perfect Caregiver
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Browse verified, experienced caregivers ready to provide
              exceptional care
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Search by name or specialty..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="all">All Services</option>
                  <option value="Baby & Child Care">Baby & Child Care</option>
                  <option value="Senior Care">Senior Care</option>
                  <option value="Special Needs Care">Special Needs Care</option>
                  <option value="Pet Care">Pet Care</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Tutoring">Tutoring</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600">
              <span className="font-bold text-slate-900">
                {filteredCaregivers.length}
              </span>{" "}
              caregivers found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Sort by:</span>
              <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Highest Rated</option>
                <option>Most Reviews</option>
                <option>Lowest Price</option>
                <option>Highest Price</option>
              </select>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaregivers.map((caregiver, idx) => (
              <motion.div
                key={caregiver.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="relative h-64">
                  <img
                    src={caregiver.image}
                    alt={caregiver.name}
                    className="w-full h-full object-cover"
                    width={400}
                    height={256}
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <span className="material-icons text-amber-400 text-sm">
                      star
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {caregiver.rating}
                    </span>
                  </div>
                  {caregiver.verified && (
                    <div className="absolute top-4 left-4 bg-teal-600 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      <span className="material-icons text-white text-sm">
                        verified
                      </span>
                      <span className="text-white text-xs font-semibold">
                        Verified
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        caregiver.availability === "Available"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {caregiver.availability}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {caregiver.name}
                  </h3>
                  <p className="text-sm text-teal-600 font-semibold mb-2">
                    {caregiver.specialty}
                  </p>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {caregiver.bio}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="material-icons text-slate-400 text-sm">
                        location_on
                      </span>
                      <span>{caregiver.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-icons text-slate-400 text-sm">
                        work
                      </span>
                      <span>{caregiver.experience}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <span className="material-icons text-amber-400 text-sm">
                      star
                    </span>
                    <span className="font-semibold">{caregiver.rating}</span>
                    <span>({caregiver.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-2xl font-bold text-slate-900">
                        ${caregiver.hourlyRate}
                      </span>
                      <span className="text-slate-600 text-sm">/hr</span>
                    </div>
                    <Link
                      href={`/caregivers/${caregiver.id}`}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {filteredCaregivers.length === 0 && (
            <div className="text-center py-16">
              <span className="material-icons text-slate-300 text-6xl mb-4">
                search_off
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No caregivers found
              </h3>
              <p className="text-slate-600">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
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
