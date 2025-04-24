# Subscription Management

This directory contains the subscription management functionality for Bonsai Prep.

## Features

- View current subscription details
- See remaining video credits
- Purchase additional video credits
- Manage billing information

## Components

- `SubscriptionInfo`: Displays the current subscription details including plan type, status, remaining credits, and renewal date.
- `PurchaseCredits`: Allows users to purchase additional video credits with different package options.

## Database Schema

The subscription data is stored in the `subscriptions` table with the following structure:

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  video_credits_remaining INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

## Implementation Notes

- The subscription page is accessible via the sidebar navigation.
- The `increment_credits` database function is used to add credits to a user's account.
- In a production environment, this would integrate with a payment processor like Stripe.
- Row-level security policies ensure users can only view and update their own subscription data.

## Future Enhancements

- Integration with Stripe for payment processing
- Subscription plan management (upgrade/downgrade)
- Automatic renewal notifications
- Usage analytics and recommendations 