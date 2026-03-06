# Cloudinary & Resend Implementation

## ✅ Implemented Features

### 📧 Resend Email Service

Created `src/lib/email.ts` with the following email functions:

1. **Verification Emails**
   - `sendVerificationApprovedEmail()` - Sent when admin approves caregiver
   - `sendVerificationRejectedEmail()` - Sent when admin rejects caregiver with reason

2. **Booking Emails**
   - `sendBookingConfirmationEmail()` - Sent when booking is confirmed
   - `sendBookingCancellationEmail()` - Sent when booking is cancelled with refund info

3. **Welcome Emails**
   - `sendWelcomeEmail()` - Sent to new users after registration

### 📁 Cloudinary Image/Document Upload

1. **Service Images** - Already using imgbb (can switch to Cloudinary if needed)
2. **Document Upload API** - `src/app/api/upload/document/route.ts`
   - Supports images (JPEG, PNG, WebP) and PDFs
   - Max 10MB file size
   - Organized by document type and user ID
   - Types: 'nid', 'certificate', 'profile'

### 🔗 Integration Points

#### Admin Verification API (`src/app/api/admin/verifications/route.ts`)

- ✅ Sends approval email when caregiver is approved
- ✅ Sends rejection email with reason when caregiver is rejected

#### Registration API (`src/app/api/auth/register/route.ts`)

- ✅ Sends welcome email to new users
- ✅ Different messages for CLIENT vs CAREGIVER roles

#### Booking Cancellation API (`src/app/api/bookings/cancel/route.ts`)

- ✅ Sends cancellation email with refund amount
- ✅ Includes booking number and service name

## 📋 TODO - Recommended Next Steps

### High Priority

1. **Booking Confirmation Emails**
   - Add to booking creation API (`src/app/api/bookings/create/route.ts`)
   - Send to both client and caregiver

2. **Caregiver Document Upload UI**
   - Add document upload fields to caregiver registration
   - Upload NID/National ID
   - Upload certificates
   - Store URLs in caregiver_profiles table

3. **Profile Picture Upload**
   - Add to user profile page
   - Use Cloudinary for storage
   - Update users.image field

### Medium Priority

4. **Password Reset Emails**
   - Create forgot password flow
   - Send reset link via email

5. **Booking Reminder Emails**
   - Send 24 hours before booking starts
   - Send to both client and caregiver

6. **Review Request Emails**
   - Send after booking is completed
   - Encourage users to leave reviews

### Low Priority

7. **Payment Receipt Emails**
   - Send after successful payment
   - Include invoice details

8. **Review Photos**
   - Allow users to upload photos with reviews
   - Use Cloudinary for storage

## 🔧 Configuration Required

### Environment Variables (.env)

```env
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App URL
NEXT_PUBLIC_URL=http://localhost:3000
```

### Resend Setup

1. Sign up at https://resend.com
2. Verify your domain (or use resend.dev for testing)
3. Update `FROM_EMAIL` in `src/lib/email.ts` with your verified domain
4. Add API key to `.env`

### Cloudinary Setup

1. Already configured in `src/lib/cloudinary.ts`
2. Add credentials to `.env`
3. Test with document upload API

## 📝 Usage Examples

### Send Verification Email

```typescript
import { sendVerificationApprovedEmail } from "@/lib/email";

await sendVerificationApprovedEmail("caregiver@example.com", "John Doe");
```

### Upload Document

```typescript
const formData = new FormData();
formData.append("file", file);
formData.append("type", "nid"); // or 'certificate', 'profile'

const response = await fetch("/api/upload/document", {
  method: "POST",
  body: formData,
});

const { url } = await response.json();
```

## 🎨 Email Templates

All emails use inline HTML styling for maximum compatibility. They include:

- Responsive design
- Brand colors (teal #0d9488)
- Clear call-to-action buttons
- Professional formatting

## 🔒 Security

- Document uploads require authentication
- Files organized by user ID in Cloudinary
- Email sending errors don't fail the main operation
- File type and size validation

## 📊 Database Schema Updates Needed

To fully support document uploads, add these fields to `caregiver_profiles`:

```sql
ALTER TABLE caregiver_profiles
ADD COLUMN nid_document_url TEXT,
ADD COLUMN certificate_urls TEXT[],
ADD COLUMN profile_image_url TEXT;
```

## 🚀 Testing

1. Test emails in development using Resend's test mode
2. Test document uploads with various file types
3. Verify email delivery in Resend dashboard
4. Check Cloudinary dashboard for uploaded files
