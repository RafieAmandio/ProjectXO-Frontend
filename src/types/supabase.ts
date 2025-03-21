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
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          gender: string | null
          instagram_username: string | null
          auth_provider: string
          is_premium: boolean
          created_at: string
          last_login_at: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          gender?: string | null
          instagram_username?: string | null
          auth_provider?: string
          is_premium?: boolean
          created_at?: string
          last_login_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          gender?: string | null
          instagram_username?: string | null
          auth_provider?: string
          is_premium?: boolean
          created_at?: string
          last_login_at?: string | null
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          id: string
          user_id: string | null
          anonymous_id: string | null
          quiz_date: string
          personality_type: string | null
          dimension_1: string | null
          dimension_2: string | null
          dimension_3: string | null
          dimension_4: string | null
          dimension_5: string | null
          dimension_1d_score: number | null
          dimension_1k_score: number | null
          dimension_2e_score: number | null
          dimension_2i_score: number | null
          dimension_3r_score: number | null
          dimension_3u_score: number | null
          dimension_4t_score: number | null
          dimension_4f_score: number | null
          dimension_5h_score: number | null
          dimension_5s_score: number | null
          instagram_username: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          anonymous_id?: string | null
          quiz_date?: string
          personality_type?: string | null
          dimension_1?: string | null
          dimension_2?: string | null
          dimension_3?: string | null
          dimension_4?: string | null
          dimension_5?: string | null
          dimension_1d_score?: number | null
          dimension_1k_score?: number | null
          dimension_2e_score?: number | null
          dimension_2i_score?: number | null
          dimension_3r_score?: number | null
          dimension_3u_score?: number | null
          dimension_4t_score?: number | null
          dimension_4f_score?: number | null
          dimension_5h_score?: number | null
          dimension_5s_score?: number | null
          instagram_username?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          anonymous_id?: string | null
          quiz_date?: string
          personality_type?: string | null
          dimension_1?: string | null
          dimension_2?: string | null
          dimension_3?: string | null
          dimension_4?: string | null
          dimension_5?: string | null
          dimension_1d_score?: number | null
          dimension_1k_score?: number | null
          dimension_2e_score?: number | null
          dimension_2i_score?: number | null
          dimension_3r_score?: number | null
          dimension_3u_score?: number | null
          dimension_4t_score?: number | null
          dimension_4f_score?: number | null
          dimension_5h_score?: number | null
          dimension_5s_score?: number | null
          instagram_username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_results_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          id: string
          question_text: string
          option_a_text: string
          option_b_text: string
          dimension: string
          option_a_type: string
          option_b_type: string
          active: boolean
          display_order: number | null
        }
        Insert: {
          id?: string
          question_text: string
          option_a_text: string
          option_b_text: string
          dimension: string
          option_a_type: string
          option_b_type: string
          active?: boolean
          display_order?: number | null
        }
        Update: {
          id?: string
          question_text?: string
          option_a_text?: string
          option_b_text?: string
          dimension?: string
          option_a_type?: string
          option_b_type?: string
          active?: boolean
          display_order?: number | null
        }
        Relationships: []
      }
      personality_types: {
        Row: {
          id: string
          type_code: string
          type_name: string
          description: string | null
          strengths: string | null
          weaknesses: string | null
          is_premium_content: boolean
        }
        Insert: {
          id?: string
          type_code: string
          type_name: string
          description?: string | null
          strengths?: string | null
          weaknesses?: string | null
          is_premium_content?: boolean
        }
        Update: {
          id?: string
          type_code?: string
          type_name?: string
          description?: string | null
          strengths?: string | null
          weaknesses?: string | null
          is_premium_content?: boolean
        }
        Relationships: []
      }
      quiz_responses: {
        Row: {
          id: string
          quiz_result_id: string
          question_id: string
          selected_option: string | null
          created_at: string
        }
        Insert: {
          id?: string
          quiz_result_id: string
          question_id: string
          selected_option?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          quiz_result_id?: string
          question_id?: string
          selected_option?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_responses_quiz_result_id_fkey"
            columns: ["quiz_result_id"]
            referencedRelation: "quiz_results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_responses_question_id_fkey"
            columns: ["question_id"]
            referencedRelation: "questions"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          id: string
          user_id: string
          amount: number | null
          payment_date: string
          payment_method: string | null
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          amount?: number | null
          payment_date?: string
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number | null
          payment_date?: string
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserting<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updating<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Relationships<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Relationships']