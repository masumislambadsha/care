# Stripe Payment Setup Guide

## 1. Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click "Sign up" and create an account
3. Complete the registration process

## 2. Get Your API Keys

1. Log in to your Stripe Dashboard
2. Click on "Developers" in the left sidebar
3. Click on "API keys"
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`) - Click "Reveal test key"

## 3. Add Keys to .env.local

Open your `.env.local` file and add:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

## 4. Set Up Webhook (For Production)

For local development, webhooks are optional. For production:

1. In Stripe Dashboard, go to "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
5. Copy the "Signing secret" (starts with `whsec_`)
6. Add to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## 5. Test the Payment Flow

1. Start your development server: `npm run dev`
2. Navigate to a booking page: `http://localhost:3000/booking/any-service-id`
3. Complete all 4 steps
4. Click "Proceed to Payment"
5. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code

## Test Card Numbers

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires authentication**: 4000 0025 0000 3155

## What Happens After Payment?

1. User is redirected to Stripe Checkout
2. After successful payment, redirected to `/booking/success`
3. Webhook creates booking in database
4. Notifications sent to client and caregiver
5. Payment record created

## Important Notes

- Test mode keys start with `pk_test_` and `sk_test_`
- Live mode keys start with `pk_live_` and `sk_live_`
- Never commit your secret keys to version control
- Always use test mode during development
