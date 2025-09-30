
import { supabase } from '@/lib/supabase';
import { TemplateRequest } from '@/types/template';
import { v4 as uuidv4 } from 'uuid';

export const createTemplateRequest = async (email: string, templateId: string): Promise<TemplateRequest> => {
  const newRequest: TemplateRequest = {
    id: uuidv4(),
    email,
    templateId,
    requestedAt: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('requests')
    .insert({
      id: newRequest.id,
      email: newRequest.email,
      template_id: newRequest.templateId,
      requested_at: newRequest.requestedAt
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating template request:', error);
    throw error;
  }

  return {
    id: data.id,
    email: data.email,
    templateId: data.template_id,
    requestedAt: data.requested_at
  };
};

export const getRequestsByTemplateId = async (templateId: string): Promise<TemplateRequest[]> => {
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .eq('template_id', templateId)
    .order('requested_at', { ascending: false });

  if (error) {
    console.error('Error fetching requests by template ID:', error);
    throw error;
  }

  return data.map(row => ({
    id: row.id,
    email: row.email,
    templateId: row.template_id,
    requestedAt: row.requested_at
  }));
};
