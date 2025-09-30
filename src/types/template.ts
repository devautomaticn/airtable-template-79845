
export interface Template {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  baseUrl?: string;
  walkthroughVideoUrl?: string;
  status?: 'draft' | 'published' | 'pending';
  createdAt?: string;
  source?: 'admin' | 'submission';
  creator?: {
    name?: string;
    email?: string;
    description?: string;
  };
  features?: string[];
  useCases?: string[];
}

export interface TemplateSubmission {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  templateName?: string;
  category?: string;
  description?: string;
  builderDescription?: string;
  airtableBaseUrl?: string;
  walkthroughVideoUrl?: string;
  status?: 'pending' | 'approved' | 'rejected';
  submittedAt?: string;
}

export interface TemplateRequest {
  id: string;
  email?: string;
  templateId?: string;
  requestedAt?: string;
}
