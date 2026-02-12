-- Seed Services
INSERT INTO services (name, slug, description, short_description, image, base_hourly_rate, base_daily_rate, features, is_active) VALUES
('Baby & Child Care', 'baby-care', 'Professional babysitters and nannies for infants, toddlers, and children of all ages.', 'Trusted care for your little ones', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop', 15.00, 120.00, ARRAY['Meal preparation', 'Educational activities', 'Bedtime routines', 'Light housekeeping'], true),
('Senior Care', 'senior-care', 'Compassionate care for elderly loved ones including companionship and daily assistance.', 'Professional elderly care services', 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=600&fit=crop', 20.00, 160.00, ARRAY['Medication reminders', 'Mobility assistance', 'Companionship', 'Meal preparation'], true),
('Special Needs Care', 'special-needs', 'Specialized care for individuals with physical, developmental, or cognitive disabilities.', 'Expert special needs support', 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600&fit=crop', 25.00, 200.00, ARRAY['Behavioral support', 'Therapy assistance', 'ADL support', 'Communication aid'], true),
('Pet Care', 'pet-care', 'Reliable pet sitters and dog walkers to care for your furry family members.', 'Loving care for your pets', 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop', 12.00, 90.00, ARRAY['Dog walking', 'Pet sitting', 'Feeding & medication', 'Playtime & exercise'], true),
('Housekeeping', 'housekeeping', 'Professional house cleaners and housekeepers for a spotless home.', 'Keep your home pristine', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop', 18.00, 140.00, ARRAY['Deep cleaning', 'Laundry services', 'Organization', 'Regular maintenance'], true),
('Tutoring & Education', 'tutoring', 'Qualified tutors for academic support, homework help, and skill development.', 'Expert educational support', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop', 20.00, 160.00, ARRAY['Subject tutoring', 'Test preparation', 'Homework help', 'Language learning'], true);

-- Seed Demo Admin User (password: Admin123!)
INSERT INTO users (id, name, email, password, role, status, email_verified) VALUES
('00000000-0000-0000-0000-000000000001', 'Admin User', 'admin@care.xyz', '$2a$10$YourHashedPasswordHere', 'ADMIN', 'ACTIVE', NOW());

-- Seed Demo Client Users
INSERT INTO users (id, name, email, password, phone, role, status, email_verified) VALUES
('00000000-0000-0000-0000-000000000002', 'John Smith', 'john@example.com', '$2a$10$YourHashedPasswordHere', '+1234567890', 'CLIENT', 'ACTIVE', NOW()),
('00000000-0000-0000-0000-000000000003', 'Emily Johnson', 'emily@example.com', '$2a$10$YourHashedPasswordHere', '+1234567891', 'CLIENT', 'ACTIVE', NOW());

-- Seed Demo Caregiver Users
INSERT INTO users (id, name, email, password, phone, nid_number, image, role, status, email_verified) VALUES
('00000000-0000-0000-0000-000000000004', 'Sarah Johnson', 'sarah@example.com', '$2a$10$YourHashedPasswordHere', '+1234567892', '1234567890', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', 'CAREGIVER', 'ACTIVE', NOW()),
('00000000-0000-0000-0000-000000000005', 'Michael Chen', 'michael@example.com', '$2a$10$YourHashedPasswordHere', '+1234567893', '1234567891', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', 'CAREGIVER', 'ACTIVE', NOW()),
('00000000-0000-0000-0000-000000000006', 'Emily Rodriguez', 'emily.r@example.com', '$2a$10$YourHashedPasswordHere', '+1234567894', '1234567892', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', 'CAREGIVER', 'ACTIVE', NOW());

-- Seed Caregiver Profiles
INSERT INTO caregiver_profiles (user_id, bio, experience, hourly_rate, certifications, languages, services_offered, verification_status, avg_rating, total_reviews, total_bookings) VALUES
('00000000-0000-0000-0000-000000000004', 'Certified nanny with CPR training and early childhood education background.', 8, 18.00, ARRAY['CPR Certified', 'First Aid', 'Child Development Associate'], ARRAY['English', 'Spanish'], ARRAY['Baby & Child Care'], 'APPROVED', 4.9, 127, 450),
('00000000-0000-0000-0000-000000000005', 'Compassionate senior care specialist with dementia care certification.', 6, 22.00, ARRAY['CNA License', 'Dementia Care Specialist', 'CPR Certified'], ARRAY['English', 'Mandarin'], ARRAY['Senior Care'], 'APPROVED', 5.0, 94, 320),
('00000000-0000-0000-0000-000000000006', 'Special education teacher with autism spectrum disorder expertise.', 10, 28.00, ARRAY['Special Education License', 'ABA Therapy Certified'], ARRAY['English'], ARRAY['Special Needs Care'], 'APPROVED', 4.8, 156, 580);

-- Seed Promo Codes
INSERT INTO promo_codes (code, discount_type, discount_value, max_uses, expires_at, is_active) VALUES
('WELCOME10', 'PERCENTAGE', 10.00, 1000, NOW() + INTERVAL '90 days', true),
('FIRST20', 'PERCENTAGE', 20.00, 500, NOW() + INTERVAL '60 days', true),
('SAVE15', 'FIXED', 15.00, 200, NOW() + INTERVAL '30 days', true);
