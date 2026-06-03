export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      books: {
        Row: {
          author: string | null
          created_at: string
          id: string
          title: string
        }
        Insert: {
          author?: string | null
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          author?: string | null
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      user_books: {
        Row: {
          book_id: string
          created_at: string
          id: string
          status: Database["public"]["Enums"]["book_status"]
          user_id: string
        }
        Insert: {
          book_id: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["book_status"]
          user_id: string
        }
        Update: {
          book_id?: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["book_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_books_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
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
      book_status: "por_leer" | "comprado" | "leyendo" | "leido" | "abandonado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T]

export const BOOK_STATUS_LABELS: Record<
  Database["public"]["Enums"]["book_status"],
  string
> = {
  por_leer: "Por leer",
  comprado: "Comprado",
  leyendo: "Leyendo",
  leido: "Leído",
  abandonado: "Abandonado",
}
