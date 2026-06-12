import { describe, it, expect } from "vitest"
import { BOOK_STATUS_LABELS } from "@/lib/database.types"

describe("BOOK_STATUS_LABELS", () => {
  it("tiene etiqueta para cada estado del enum", () => {
    const estados = ["por_leer", "comprado", "leyendo", "leido", "abandonado"]
    for (const estado of estados) {
      expect(BOOK_STATUS_LABELS).toHaveProperty(estado)
      expect(typeof BOOK_STATUS_LABELS[estado as keyof typeof BOOK_STATUS_LABELS]).toBe("string")
    }
  })
})
