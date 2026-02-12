"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterCaregiverPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nid_number: "",
    password: "",
    confirmPassword: "",
    services_offered: [] as string[],
    experience: 0,
    hourly_rate: 15,
    bio: "",
  });

  const services = [
    "Baby & Child Care",
    "Senior Care",
    "Special Needs Care",
    "Pet Care",
    "Housekeeping",
    "Tutoring",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: "CAREGIVER",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      router.push("/login?registered=caregiver");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services_offered: prev.services_offered.includes(service)
        ? prev.services_offered.filter((s) => s !== service)
        : [...prev.services_offered, service],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-xl">
                health_and_safety
              </span>
            </div>
            <span className="text-xl font-bold text-slate-900">Care.xyz</span>
          </Link>
        </div>
      </nav>

      <main className="grow flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <div className="mb-8">
              <Link
                href="/register"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 mb-4"
              >
                <span className="material-icons text-sm">arrow_back</span>
                Back
              </Link>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Become a Caregiver
              </h1>
              <p className="text-slate-600">
                Join our community of professional caregivers
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      step >= s
                        ? "bg-teal-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-12 h-1 ${
                        step > s ? "bg-teal-600" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    Personal Information
                  </h2>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      National ID Number *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your NID number"
                      value={formData.nid_number}
                      onChange={(e) =>
                        setFormData({ ...formData, nid_number: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    Professional Details
                  </h2>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Services You Offer
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                            formData.services_offered.includes(service)
                              ? "border-teal-600 bg-teal-50 text-teal-700"
                              : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experience: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.hourly_rate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hourly_rate: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Bio (min 50 characters)
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                      placeholder="Tell families about your experience and approach to caregiving..."
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-slate-900">Security</h2>
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    required
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:border-teal-600 hover:text-teal-600 transition-all"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="ml-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all disabled:opacity-50"
                  >
                    {isLoading ? "Creating..." : "Create Account"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

