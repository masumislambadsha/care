# How to Use Resend & Cloudinary - Step by Step Guide

## 📧 Part 1: Setting Up Resend (Email Service)

### Step 1: Get Your Resend API Key

1. Go to https://resend.com
2. Sign up for a free account
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

### Step 2: Add to Your .env File

Open your `.env` file and add:

```env
RESEND_API_KEY=re_your_actual_key_here
```

### Step 3: Test It!

The emails are already integrated. They will automatically send when:

#### ✅ **Welcome Email** - Sends automatically when:

- A new user registers (client or caregiver)
- **Test it:** Go to http://localhost:3000/register and create a new account

#### ✅ **Verification Emails** - Sends automatically when:

- Admin approves a caregiver application
- Admin rejects a caregiver application
- **Test it:**
  1. Register as a caregiver
  2. Login as admin
  3. Go to Admin > Verifications
  4. Approve or reject the caregiver

#### ✅ **Booking Cancellation Email** - Sends automatically when:

- A client cancels a booking
- **Test it:**
  1. Create a booking
  2. Go to My Bookings
  3. Cancel the booking

### Step 4: Verify Email Delivery

1. Go to https://resend.com/emails
2. You'll see all sent emails
3. Click on any email to see:
   - Delivery status
   - Email preview
   - Recipient info

### 📝 Important Notes for Resend:

**For Development (Testing):**

- Resend provides `onboarding@resend.dev` for testing
- You can only send to YOUR email address
- This is perfect for testing!

**For Production:**

- You need to verify your own domain
- Go to Resend > Domains > Add Domain
- Add DNS records they provide
- Then update `FROM_EMAIL` in `src/lib/email.ts`:

```typescript
const FROM_EMAIL = "Care XYZ <noreply@yourdomain.com>";
```

---

## 📁 Part 2: Setting Up Cloudinary (File Upload)

### Step 1: Get Your Cloudinary Credentials

1. Go to https://cloudinary.com
2. Sign up for a free account
3. Go to **Dashboard**
4. You'll see:
   - Cloud Name
   - API Key
   - API Secret

### Step 2: Add to Your .env File

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Test Document Upload

The document upload API is ready at `/api/upload/document`. Here's how to use it:

#### Example: Upload NID Document

```typescript
// In your React component
const handleFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "nid"); // or 'certificate', 'profile'

  try {
    const response = await fetch("/api/upload/document", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      console.log("File uploaded:", data.url);
      // Save this URL to your database
    } else {
      console.error("Upload failed:", data.error);
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};
```

### Step 4: Verify Upload in Cloudinary

1. Go to https://cloudinary.com/console/media_library
2. Navigate to `care-xyz` folder
3. You'll see subfolders:
   - `nid/` - National ID documents
   - `certificate/` - Certificates
   - `profile/` - Profile pictures
   - `services/` - Service images (from imgbb currently)

---

## 🎯 Real-World Usage Examples

### Example 1: Add Document Upload to Caregiver Registration

Add this to your caregiver registration form:

```tsx
const [nidDocument, setNidDocument] = useState<string>("");
const [uploading, setUploading] = useState(false);

const handleNIDUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploading(true);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "nid");

  try {
    const response = await fetch("/api/upload/document", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setNidDocument(data.url);
      toast.success("Document uploaded successfully");
    }
  } catch (error) {
    toast.error("Failed to upload document");
  } finally {
    setUploading(false);
  }
};

// In your JSX:
<div>
  <label>Upload NID/National ID *</label>
  <input
    type="file"
    accept="image/*,application/pdf"
    onChange={handleNIDUpload}
    disabled={uploading}
  />
  {uploading && <p>Uploading...</p>}
  {nidDocument && <p>✓ Document uploaded</p>}
</div>;
```

### Example 2: Add Profile Picture Upload

```tsx
const [profileImage, setProfileImage] = useState<string>("");

const handleProfileImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "profile");

  const response = await fetch("/api/upload/document", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (response.ok) {
    setProfileImage(data.url);
    // Update user profile in database
    await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: data.url }),
    });
  }
};
```

### Example 3: Send Custom Email

If you want to send a custom email, add a new function to `src/lib/email.ts`:

```typescript
export async function sendCustomEmail(
  to: string,
  subject: string,
  message: string,
) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0d9488;">${subject}</h1>
          <p style="font-size: 16px; color: #334155;">${message}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
```

Then use it anywhere:

```typescript
import { sendCustomEmail } from "@/lib/email";

await sendCustomEmail(
  "user@example.com",
  "Important Update",
  "Your booking has been confirmed!",
);
```

---

## 🧪 Testing Checklist

### Test Resend Emails:

- [ ] Register a new client → Check for welcome email
- [ ] Register a new caregiver → Check for welcome email
- [ ] Admin approves caregiver → Check for approval email
- [ ] Admin rejects caregiver → Check for rejection email
- [ ] Cancel a booking → Check for cancellation email

### Test Cloudinary Uploads:

- [ ] Upload an image file → Check Cloudinary dashboard
- [ ] Upload a PDF file → Check Cloudinary dashboard
- [ ] Try uploading file > 10MB → Should fail with error
- [ ] Try uploading wrong file type → Should fail with error

---

## 🐛 Troubleshooting

### Emails Not Sending?

1. **Check your API key:**

   ```bash
   # In terminal
   echo $RESEND_API_KEY
   ```

2. **Check Resend dashboard:**
   - Go to https://resend.com/emails
   - Look for failed emails
   - Check error messages

3. **Check server logs:**
   - Look for "Failed to send email" errors
   - Check the error details

### File Upload Not Working?

1. **Check Cloudinary credentials:**

   ```bash
   echo $CLOUDINARY_CLOUD_NAME
   echo $CLOUDINARY_API_KEY
   ```

2. **Check file size:**
   - Max 10MB for documents
   - Max 5MB for service images

3. **Check file type:**
   - Documents: JPEG, PNG, WebP, PDF
   - Images: JPEG, PNG, WebP

4. **Check authentication:**
   - User must be logged in
   - Check session in browser DevTools

---

## 💡 Pro Tips

### For Resend:

1. **Use templates** for consistent branding
2. **Track opens** by enabling tracking in Resend dashboard
3. **Test emails** before going to production
4. **Set up webhooks** to track delivery status

### For Cloudinary:

1. **Optimize images** automatically with transformations
2. **Use folders** to organize files by user/type
3. **Set up auto-backup** in Cloudinary settings
4. **Enable auto-format** for better performance

---

## 📊 Monitoring

### Resend Dashboard:

- View all sent emails
- Check delivery rates
- See bounce/spam reports
- Monitor API usage

### Cloudinary Dashboard:

- View all uploaded files
- Check storage usage
- Monitor bandwidth
- See transformation usage

---

## 🎉 You're All Set!

Now you have:

- ✅ Automated email notifications
- ✅ Secure file uploads
- ✅ Professional email templates
- ✅ Organized file storage

Need help? Check the logs or the documentation files!
