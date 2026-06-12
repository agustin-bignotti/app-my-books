import { createClient } from "@/lib/supabase/server"
import { BOOK_STATUS_LABELS } from "@/lib/database.types"
import { AddBookForm } from "./AddBookForm"
import { addBook } from "./actions"

export default async function BibliotecaPage() {
  const supabase = await createClient()

  const { data: userBooks } = await supabase
    .from("user_books")
    .select("id, status, created_at, books(title, author)")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Mi biblioteca</h2>
        <p className="text-sm text-gray-500">
          {userBooks?.length ?? 0} libro{userBooks?.length !== 1 ? "s" : ""}
        </p>
      </div>

      <AddBookForm action={addBook} />

      {userBooks && userBooks.length > 0 ? (
        <ul className="divide-y">
          {userBooks.map((ub) => (
            <li key={ub.id} className="py-4 space-y-1">
              <p className="font-medium">
                {(ub.books as { title: string; author: string | null })?.title}
              </p>
              {(ub.books as { title: string; author: string | null })?.author && (
                <p className="text-sm text-gray-500">
                  {(ub.books as { title: string; author: string | null }).author}
                </p>
              )}
              <span className="inline-block text-xs bg-gray-100 rounded px-2 py-0.5">
                {BOOK_STATUS_LABELS[ub.status]}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">Todavía no tienes libros. Agrega el primero.</p>
      )}
    </div>
  )
}
