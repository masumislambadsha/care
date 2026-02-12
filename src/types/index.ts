export type UserRole = "CLIENT" | "CAREGIVER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED"
  | "PAYMENT_FAILED";
export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";
export type DurationType = "HOURLY" | "DAILY" | "WEEKLY";

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified?: string;
  phone?: string;
  nid_number?: string;
  image?: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface CaregiverProfile {
  id: string;
  user_id: string;
  bio?: string;
  experience: number;
  hourly_rate: number;
  certifications?: string[];
  languages?: string[];
  services_offered?: string[];
  verification_status: VerificationStatus;
  availability?: Record<string, any>;
  avg_rating: number;
  total_reviews: number;
  total_bookings: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  image?: string;
  base_hourly_rate?: number;
  base_daily_rate?: number;
  features?: string[];
  faqs?: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  booking_number: string;
  client_id: string;
  caregiver_id: string;
  service_id: string;
  start_date: string;
  end_date: string;
  duration_type: DurationType;
  duration_value: number;
  division?: string;
  district?: string;
  city?: string;
  area?: string;
  address?: string;
  special_instructions?: string;
  base_amount: number;
  platform_fee: number;
  discount: number;
  total_amount: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  stripe_payment_id?: string;
  promo_code?: string;
  cancelled_at?: string;
  cancel_reason?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  author_id: string;
  target_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}
