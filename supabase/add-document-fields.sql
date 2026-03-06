-- Add document fields to caregiver_profiles table
ALTER TABLE caregiver_profiles
ADD COLUMN IF NOT EXISTS nid_document_url TEXT,
ADD COLUMN IF NOT EXISTS certificate_urls TEXT[],
ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

-- Add profile image to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

-- Add comment
COMMENT ON COLUMN caregiver_profiles.nid_document_url IS 'URL to NID/National ID document stored in Cloudinary';
COMMENT ON COLUMN caregiver_profiles.certificate_urls IS 'Array of URLs to certificate documents stored in Cloudinary';
COMMENT ON COLUMN caregiver_profiles.profile_image_url IS 'URL to profile image stored in Cloudinary';
COMMENT ON COLUMN users.profile_image_url IS 'URL to user profile image stored in Cloudinary';
