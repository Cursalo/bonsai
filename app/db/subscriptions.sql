-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
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

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);

-- Create function to increment video credits
CREATE OR REPLACE FUNCTION increment_credits(credit_amount INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN video_credits_remaining + credit_amount;
END;
$$;

-- Create RLS policies for subscriptions table
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy for users to view only their own subscription
CREATE POLICY "Users can view their own subscription" 
  ON subscriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy for users to update only their own subscription
CREATE POLICY "Users can update their own subscription" 
  ON subscriptions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Policy for service role to manage all subscriptions
CREATE POLICY "Service role can manage all subscriptions" 
  ON subscriptions 
  USING (auth.role() = 'service_role');

-- Sample data for testing (comment out in production)
INSERT INTO subscriptions (user_id, plan_id, status, video_credits_remaining, expires_at)
VALUES 
  -- Replace with actual user IDs from your auth.users table
  ('00000000-0000-0000-0000-000000000000', 'monthly', 'active', 42, NOW() + INTERVAL '30 days')
ON CONFLICT (id) DO NOTHING; 