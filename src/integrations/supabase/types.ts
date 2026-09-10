export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      books: {
        Row: {
          author: string | null
          category: string
          cover_theme: string
          created_at: string
          currency: string
          id: string
          is_featured: boolean
          is_published: boolean
          language: string
          long_description: string | null
          pages: number | null
          pdf_url: string | null
          price_cents: number
          rating: number
          short_description: string | null
          slug: string
          sort_order: number
          subtitle: string | null
          title: string
          updated_at: string
          year: string | null
        }
        Insert: {
          author?: string | null
          category?: string
          cover_theme?: string
          created_at?: string
          currency?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          language?: string
          long_description?: string | null
          pages?: number | null
          pdf_url?: string | null
          price_cents?: number
          rating?: number
          short_description?: string | null
          slug: string
          sort_order?: number
          subtitle?: string | null
          title: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          author?: string | null
          category?: string
          cover_theme?: string
          created_at?: string
          currency?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          language?: string
          long_description?: string | null
          pages?: number | null
          pdf_url?: string | null
          price_cents?: number
          rating?: number
          short_description?: string | null
          slug?: string
          sort_order?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          book_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          book_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          book_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      highlights: {
        Row: {
          book_id: string
          chapter_index: number
          color: string
          created_at: string
          end_offset: number
          id: string
          kind: string
          last_reviewed_at: string | null
          note: string | null
          paragraph_index: number
          review_count: number
          start_offset: number
          text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          book_id: string
          chapter_index?: number
          color?: string
          created_at?: string
          end_offset?: number
          id?: string
          kind?: string
          last_reviewed_at?: string | null
          note?: string | null
          paragraph_index?: number
          review_count?: number
          start_offset?: number
          text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          book_id?: string
          chapter_index?: number
          color?: string
          created_at?: string
          end_offset?: number
          id?: string
          kind?: string
          last_reviewed_at?: string | null
          note?: string | null
          paragraph_index?: number
          review_count?: number
          start_offset?: number
          text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "highlights_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          book_id: string
          created_at: string
          id: string
          order_id: string
          quantity: number
          unit_price_cents: number
        }
        Insert: {
          book_id: string
          created_at?: string
          id?: string
          order_id: string
          quantity?: number
          unit_price_cents: number
        }
        Update: {
          book_id?: string
          created_at?: string
          id?: string
          order_id?: string
          quantity?: number
          unit_price_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          currency: string
          id: string
          provider: string | null
          provider_reference: string | null
          status: string
          total_cents: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          id?: string
          provider?: string | null
          provider_reference?: string | null
          status?: string
          total_cents?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          provider?: string | null
          provider_reference?: string | null
          status?: string
          total_cents?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          daily_goal_minutes: number
          display_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          daily_goal_minutes?: number
          display_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          daily_goal_minutes?: number
          display_name?: string | null
          id?: string
        }
        Relationships: []
      }
      reading_progress: {
        Row: {
          book_id: string
          chapter_index: number
          created_at: string
          id: string
          last_read_at: string
          percent: number
          scroll_ratio: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          book_id: string
          chapter_index?: number
          created_at?: string
          id?: string
          last_read_at?: string
          percent?: number
          scroll_ratio?: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          book_id?: string
          chapter_index?: number
          created_at?: string
          id?: string
          last_read_at?: string
          percent?: number
          scroll_ratio?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_progress_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_sessions: {
        Row: {
          book_id: string | null
          created_at: string
          id: string
          minutes: number
          pages: number
          session_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          book_id?: string | null
          created_at?: string
          id?: string
          minutes?: number
          pages?: number
          session_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          book_id?: string | null
          created_at?: string
          id?: string
          minutes?: number
          pages?: number
          session_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_sessions_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_stats: {
        Row: {
          books_finished: number
          created_at: string
          current_streak: number
          last_read_date: string | null
          longest_streak: number
          total_minutes: number
          total_pages: number
          updated_at: string
          user_id: string
        }
        Insert: {
          books_finished?: number
          created_at?: string
          current_streak?: number
          last_read_date?: string | null
          longest_streak?: number
          total_minutes?: number
          total_pages?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          books_finished?: number
          created_at?: string
          current_streak?: number
          last_read_date?: string | null
          longest_streak?: number
          total_minutes?: number
          total_pages?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      log_reading_session: {
        Args: {
          _book_id: string
          _minutes: number
          _pages: number
          _session_date?: string
        }
        Returns: {
          books_finished: number
          created_at: string
          current_streak: number
          last_read_date: string | null
          longest_streak: number
          total_minutes: number
          total_pages: number
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "reading_stats"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
