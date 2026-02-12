"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Booking = {
  id: string;
  booking_number: string;
  service_name: string;
  caregiver_name: string;
  client_name: string;
  start_date: string;
  duration_type: string;
  duration_value: number;
  total_amount: number;
  status: string;
  payment_status: string;
};

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      fetchBookings();
    }
  }, [status, router]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      console.log("Fetching bookings...");
      const response = await fetch("/api/bookings/my-bookings");
      const data = await response.json();

      console.log("API Response:", response.status, data);

      if (response.ok) {
        console.log("Bookings received:", data.bookings);
        setBookings(data.bookings || []);
        if (data.bookings && data.bookings.length > 0) {
          toast.success(`Loaded ${data.bookings.length} booking(s)`);
        }
      } else {
        console.error("Failed to fetch bookings:", data.error);
        toast.error(`Failed to load bookings: ${data.error}`);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "ONGOING":
        return "bg-purple-100 text-purple-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const isCaregiver = session?.user?.role === "CAREGIVER";

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Bookings</h1>
        <p className="text-slate-600">
          {isCaregiver
            ? "Manage your service bookings"
            : "Track and manage your care bookings"}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          {["all", "confirmed", "ongoing", "completed", "cancelled"].map(
            (filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === filterOption
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-slate-400 text-4xl">
              event_busy
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            No bookings found
          </h3>
          <p className="text-slate-600 mb-6">
            {isCaregiver
              ? "You don't have any bookings yet. Keep your profile updated!"
              : "You haven't made any bookings yet. Start by finding a caregiver."}
          </p>
          {!isCaregiver && (
            <button
              onClick={() => router.push("/caregivers")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all"
            >
              <span className="material-icons">search</span>
              Find Caregivers
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {booking.service_name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        booking.status,
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Booking #{booking.booking_number}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-teal-600">
                    ${booking.total_amount}
                  </p>
                  <p className="text-xs text-slate-500">
                    {booking.payment_status}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-sm">
                    person
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">
                      {isCaregiver ? "Client" : "Caregiver"}
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {isCaregiver
                        ? booking.client_name
                        : booking.caregiver_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-sm">
                    calendar_today
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">Start Date</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {new Date(booking.start_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="material-icons text-slate-400 text-sm">
                    schedule
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {booking.duration_value}{" "}
                      {booking.duration_type.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 border-2 border-slate-200 text-slate-700 font-semibold rounded-lg hover:border-teal-600 hover:text-teal-600 transition-all">
                  View Details
                </button>
                {booking.status === "COMPLETED" && (
                  <button className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all">
                    Leave Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
