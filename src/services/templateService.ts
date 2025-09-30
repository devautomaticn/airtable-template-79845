import { supabase } from '@/lib/supabase';
import { Template } from '@/types/template';
import { createTemplateRequest } from './requestService';

export const fetchPublishedTemplates = async (): Promise<Template[]> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching published templates:', error);
    throw error;
  }

  return data.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image,
    category: row.category,
    baseUrl: row.base_url,
    walkthroughVideoUrl: row.walkthrough_video_url,
    status: row.status,
    createdAt: row.created_at,
    source: row.source,
    creator: {
      name: row.creator_name,
      email: row.creator_email,
      description: row.creator_description
    },
    features: row.features || [],
    useCases: row.use_cases || []
  }));
};

export const fetchTemplateById = async (id: string): Promise<Template | null> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching template by ID:', error);
    throw error;
  }

  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    image: data.image,
    category: data.category,
    baseUrl: data.base_url,
    walkthroughVideoUrl: data.walkthrough_video_url,
    status: data.status,
    createdAt: data.created_at,
    source: data.source,
    creator: {
      name: data.creator_name,
      email: data.creator_email,
      description: data.creator_description
    },
    features: data.features || [],
    useCases: data.use_cases || []
  };
};

export const requestTemplateAccess = async (email: string, templateId: string) => {
  const webhookUrl = 'https://n8n-sp88.onrender.com/webhook/e61a9bba-b0cc-439a-a106-2cd278fb7867';
  
  try {
    console.log('Starting template access request process for:', { email, templateId });
    
    const request = await createTemplateRequest(email, templateId);
    console.log('Template request created in database:', request);
    
    console.log('Attempting webhook call to:', webhookUrl);
    console.log('Webhook payload:', { 
      email, 
      templateId,
    });
    
    try {
      console.log('Initiating fetch request to webhook...');
      
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({ 
          email, 
          templateId,
        }),
      });
      
      console.log('Webhook call completed with no-cors mode.');
      console.log('Note: Due to no-cors mode, we cannot read the response status, but the request was sent.');
      
    } catch (webhookError) {
      console.error('Error during webhook call:', webhookError);
      console.log('Continuing despite webhook error since database entry was successful');
    }
    
    return request;
  } catch (error) {
    console.error('Error requesting template access:', error);
    throw error;
  }
};

export const fetchAllTemplates = async (): Promise<Template[]> => {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all templates:', error);
    throw error;
  }

  return data.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image,
    category: row.category,
    baseUrl: row.base_url,
    walkthroughVideoUrl: row.walkthrough_video_url,
    status: row.status,
    createdAt: row.created_at,
    source: row.source,
    creator: {
      name: row.creator_name,
      email: row.creator_email,
      description: row.creator_description
    },
    features: row.features || [],
    useCases: row.use_cases || []
  }));
};

export const createTemplate = async (templateData: Partial<Template>): Promise<Template> => {
  try {
    console.log('Starting createTemplate with data:', templateData);
    
    // Generate ID if not provided
    const templateId = templateData.id || crypto.randomUUID();
    console.log('Using template ID:', templateId);
    
    // Prepare data for Supabase with all fields optional
    const newTemplate = {
      id: templateId,
      title: templateData.title || null,
      description: templateData.description || null,
      image: templateData.image || null,
      category: templateData.category || null,
      base_url: templateData.baseUrl || null,
      walkthrough_video_url: templateData.walkthroughVideoUrl || null,
      status: templateData.status || 'draft',
      source: templateData.source || 'admin',
      creator_name: templateData.creator?.name || null,
      creator_email: templateData.creator?.email || null,
      creator_description: templateData.creator?.description || null,
      features: Array.isArray(templateData.features) ? templateData.features : [],
      use_cases: Array.isArray(templateData.useCases) ? templateData.useCases : []
    };
    
    console.log('Prepared data for Supabase:', newTemplate);
    
    // Check Supabase connection before attempting insert
    try {
      const { data: connectionTest, error: connectionError } = await supabase.from('templates').select('id').limit(1);
      
      if (connectionError) {
        console.error('Supabase connection error:', connectionError);
        throw new Error(`Failed to connect to database: ${connectionError.message}`);
      }
      
      console.log('Supabase connection successful, proceeding with insert');
    } catch (connError) {
      console.error('Connection test failed:', connError);
      throw new Error(`Database connection error: ${connError instanceof Error ? connError.message : String(connError)}`);
    }
    
    // Insert into Supabase
    try {
      const { error: insertError } = await supabase
        .from('templates')
        .insert(newTemplate);
        
      if (insertError) {
        console.error('Supabase error creating template:', insertError);
        console.error('Error details:', insertError.details, insertError.hint, insertError.code);
        throw new Error(`Failed to create template: ${insertError.message}`);
      }
      
      console.log('Template inserted successfully');
    } catch (insertErr) {
      console.error('Insert operation failed:', insertErr);
      throw new Error(`Database insert error: ${insertErr instanceof Error ? insertErr.message : String(insertErr)}`);
    }
    
    // Fetch the newly created record
    try {
      const { data: createdTemplate, error: fetchError } = await supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .single();
        
      if (fetchError) {
        console.error('Error fetching created template:', fetchError);
        throw new Error('Template was created but could not be retrieved');
      }
      
      if (!createdTemplate) {
        throw new Error('Template was created but returned null');
      }
      
      console.log('Template creation complete, data returned:', createdTemplate);
      
      // Convert database response back to camelCase for frontend
      return {
        id: createdTemplate.id,
        title: createdTemplate.title,
        description: createdTemplate.description,
        image: createdTemplate.image,
        category: createdTemplate.category,
        baseUrl: createdTemplate.base_url,
        walkthroughVideoUrl: createdTemplate.walkthrough_video_url,
        status: createdTemplate.status,
        createdAt: createdTemplate.created_at,
        source: createdTemplate.source,
        creator: {
          name: createdTemplate.creator_name,
          email: createdTemplate.creator_email,
          description: createdTemplate.creator_description
        },
        features: createdTemplate.features || [],
        useCases: createdTemplate.use_cases || []
      };
    } catch (fetchErr) {
      console.error('Fetch operation failed after insert:', fetchErr);
      throw new Error(`Template was created but retrieval failed: ${fetchErr instanceof Error ? fetchErr.message : String(fetchErr)}`);
    }
  } catch (error) {
    console.error('Error in createTemplate:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};

export const updateTemplate = async (template: Partial<Template>): Promise<Template> => {
  if (!template.id) {
    throw new Error('Template ID is required for updates');
  }
  
  const updateData = {
    title: template.title || null,
    description: template.description || null,
    image: template.image || null,
    category: template.category || null,
    base_url: template.baseUrl || null,
    walkthrough_video_url: template.walkthroughVideoUrl || null,
    status: template.status || null,
    source: template.source || null,
    creator_name: template.creator?.name || null,
    creator_email: template.creator?.email || null,
    creator_description: template.creator?.description || null,
    features: Array.isArray(template.features) ? template.features : [],
    use_cases: Array.isArray(template.useCases) ? template.useCases : []
  };
  
  const { data, error } = await supabase
    .from('templates')
    .update(updateData)
    .eq('id', template.id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating template:', error);
    throw error;
  }
  
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    image: data.image,
    category: data.category,
    baseUrl: data.base_url,
    walkthroughVideoUrl: data.walkthrough_video_url,
    status: data.status,
    createdAt: data.created_at,
    source: data.source,
    creator: {
      name: data.creator_name,
      email: data.creator_email,
      description: data.creator_description
    },
    features: data.features || [],
    useCases: data.use_cases || []
  };
};

export const deleteTemplate = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting template:', error);
    throw error;
  }
};

export const createTemplateFromSubmission = async (submission: {
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
  status?: string;
  submittedAt?: string;
}) => {
  try {
    console.log('Creating template from submission:', submission);
    
    const newTemplate = {
      id: submission.id || crypto.randomUUID(),
      title: submission.templateName || null,
      description: submission.description || null,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1674&auto=format&fit=crop",
      category: submission.category || null,
      base_url: submission.airtableBaseUrl || null,
      walkthrough_video_url: submission.walkthroughVideoUrl || null,
      status: 'pending',
      source: 'submission',
      creator_name: `${submission.firstName || ''} ${submission.lastName || ''}`.trim() || null,
      creator_email: submission.email || null,
      creator_description: submission.builderDescription || null,
      features: [],
      use_cases: [],
      created_at: submission.submittedAt || new Date().toISOString()
    };
    
    // Check connection first
    const { error: testError } = await supabase
      .from('templates')
      .select('id')
      .limit(1);
      
    if (testError) {
      console.error('Connection test failed:', testError);
      throw new Error(`Database connection error: ${testError.message}`);
    }
    
    // Insert the template
    const { error: insertError } = await supabase
      .from('templates')
      .insert(newTemplate);
      
    if (insertError) {
      console.error('Error creating template from submission:', insertError);
      console.error('Error details:', insertError.details, insertError.hint, insertError.code);
      throw new Error(`Failed to create template from submission: ${insertError.message}`);
    }
    
    // Fetch the created template
    const { data, error: fetchError } = await supabase
      .from('templates')
      .select('*')
      .eq('id', newTemplate.id)
      .single();
      
    if (fetchError) {
      console.error('Error fetching created template:', fetchError);
      throw new Error('Template was created but could not be retrieved');
    }
    
    console.log('Template created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in createTemplateFromSubmission:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Unknown error: ${String(error)}`);
    }
  }
};
