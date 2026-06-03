"use client"

import { useTransition, useRef } from "react"

interface Props {
  action: (formData: FormData) => Promise<void>
}

export function AddBookForm({ action }: Props) {
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await action(formData)
      formRef.current?.reset()
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label htmlFor="title" className="text-sm font-medium">
          Título <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="El nombre del viento"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="author" className="text-sm font-medium">
          Autor <span className="text-gray-400 text-xs">(opcional)</span>
        </label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Patrick Rothfuss"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
      >
        {isPending ? "Guardando…" : "Agregar libro"}
      </button>
    </form>
  )
}
