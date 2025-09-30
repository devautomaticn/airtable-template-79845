
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      templates: {
        Row: {
          id: string
          title: string
          description: string
          image: string
          category: string
          base_url: string | null
          walkthrough_video_url: string | null
          status: string
          created_at: string
          source: string | null
          creator_name: string
          creator_email: string
          creator_description: string | null
          features: string[]
          use_cases: string[]
        }
        Insert: {
          id?: string
          title: string
          description: string
          image: string
          category: string
          base_url?: string | null
          walkthrough_video_url?: string | null
          status: string
          created_at?: string
          source?: string | null
          creator_name: string
          creator_email: string
          creator_description?: string | null
          features: string[]
          use_cases: string[]
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image?: string
          category?: string
          base_url?: string | null
          walkthrough_video_url?: string | null
          status?: string
          created_at?: string
          source?: string | null
          creator_name?: string
          creator_email?: string
          creator_description?: string | null
          features?: string[]
          use_cases?: string[]
        }
      }
      requests: {
        Row: {
          id: string
          email: string
          template_id: string
          requested_at: string
        }
        Insert: {
          id?: string
          email: string
          template_id: string
          requested_at?: string
        }
        Update: {
          id?: string
          email?: string
          template_id?: string
          requested_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
