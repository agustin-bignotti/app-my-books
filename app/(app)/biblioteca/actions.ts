"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addBook(formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const author = (formData.get("author") as string)?.trim() || null

  if (!title) return

  const supabase = await createClient()

  // 1. Insertar en el catálogo global
  const { data: book, error: bookError } = await supabase
    .from("books")
    .insert({ title, author })
    .select("id")
    .single()

  if (bookError || !book) return

  // 2. Crear la ficha personal (RLS garantiza que user_id = auth.uid())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from("user_books").insert({
    book_id: book.id,
    user_id: user.id,
  })

  revalidatePath("/biblioteca")
}
