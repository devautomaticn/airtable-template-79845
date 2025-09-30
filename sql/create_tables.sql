
-- Create templates table
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  description TEXT,
  image TEXT,
  category TEXT,
  base_url TEXT,
  walkthrough_video_url TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT,
  creator_name TEXT,
  creator_email TEXT,
  creator_description TEXT,
  features TEXT[] DEFAULT '{}',
  use_cases TEXT[] DEFAULT '{}'
);

-- Create requests table
CREATE TABLE requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT,
  template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
  requested_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_templates_status ON templates(status);
CREATE INDEX idx_requests_template_id ON requests(template_id);
