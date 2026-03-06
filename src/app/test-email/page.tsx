"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function TestEmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const testWelcomeEmail = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/test/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "welcome",
          email,
          name: "Test User",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Welcome email sent! Check your inbox.");
      } else {
        toast.error(data.error || "Failed to send email");
      }
    } catch (error) {
      toast.error("Failed to send email");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const testApprovalEmail = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/test/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "approval",
          email,
          name: "Test Caregiver",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Approval email sent! Check your inbox.");
      } else {
        toast.error(data.error || "Failed to send email");
      }
    } catch (error) {
      toast.error("Failed to send email");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const testRejectionEmail = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/test/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "rejection",
          email,
          name: "Test Caregiver",
          reason: "Incomplete documentation provided",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Rejection email sent! Check your inbox.");
      } else {
        toast.error(data.error || "Failed to send email");
      }
    } catch (error) {
      toast.error("Failed to send email");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const testBookingEmail = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/test/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Booking confirmation email sent! Check your inbox.");
      } else {
        toast.error(data.error || "Failed to send email");
      }
    } catch (error) {
      toast.error("Failed to send email");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const testCancellationEmail = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/test/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cancellation",
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Cancellation email sent! Check your inbox.");
      } else {
        toast.error(data.error || "Failed to send email");
      }
    } catch (error) {
      toast.error("Failed to send email");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            🧪 Email Testing Dashboard
          </h1>
          <p className="text-slate-600 mb-8">
            Test all email templates by sending them to your email address
          </p>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Your Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-teal-600 focus:outline-none text-slate-900"
            />
            <p className="text-sm text-slate-500 mt-2">
              💡 With Resend's free plan, you can only send to your own verified
              email
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                1. Welcome Email
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Sent when a new user registers
              </p>
              <button
                onClick={testWelcomeEmail}
                disabled={loading}
                className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Welcome Email"}
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                2. Caregiver Approval Email
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Sent when admin approves a caregiver application
              </p>
              <button
                onClick={testApprovalEmail}
                disabled={loading}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Approval Email"}
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                3. Caregiver Rejection Email
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Sent when admin rejects a caregiver application
              </p>
              <button
                onClick={testRejectionEmail}
                disabled={loading}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Rejection Email"}
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                4. Booking Confirmation Email
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Sent when a booking is confirmed
              </p>
              <button
                onClick={testBookingEmail}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Booking Email"}
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                5. Booking Cancellation Email
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Sent when a booking is cancelled
              </p>
              <button
                onClick={testCancellationEmail}
                disabled={loading}
                className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Cancellation Email"}
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">
              📊 Check Results
            </h4>
            <p className="text-sm text-blue-800 mb-2">After sending, check:</p>
            <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal">
              <li>Your email inbox for the test email</li>
              <li>
                <a
                  href="https://resend.com/emails"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600"
                >
                  Resend Dashboard
                </a>{" "}
                to see delivery status
              </li>
              <li>Browser console for any errors</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
