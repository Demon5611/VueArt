// src/store/cart.ts
import { defineStore } from 'pinia'

export type CartItem = {
  id: string
  title: string
  price: number
  qty: number
  image?: string
  stock?: number | null
  disabled?: boolean
}

type AddPayload = Omit<CartItem, 'qty'> & { qty?: number }

const STORAGE_KEY = 'cart:v1'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalCount: (s) => s.items.reduce((a, i) => a + i.qty, 0),
    subtotal:   (s) => s.items.reduce((a, i) => a + i.price * i.qty, 0),
  },

  actions: {
    hydrate() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed?.items)) {
          // нормализуем данные
          this.items = parsed.items.map((i: any) => ({
            id: String(i.id),
            title: String(i.title),
            price: Number(i.price) || 0,
            qty: Math.max(1, Number(i.qty) || 1),
            image: i.image || undefined,
            stock: i.stock ?? null,
            disabled: !!i.disabled,
          }))
        }
      } catch { /* noop */ }
    },

    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: this.items }))
      } catch { /* noop */ }
    },

    addItem(payload: AddPayload) {
      const qty = Math.max(1, payload.qty ?? 1)
      const id  = payload.id
      const idx = this.items.findIndex(i => i.id === id)

      if (idx >= 0) {
        const next = Math.min(this.items[idx].stock ?? Infinity, this.items[idx].qty + qty)
        this.items[idx].qty = next
      } else {
        this.items.push({
          id,
          title: payload.title,
          price: Number(payload.price) || 0,
          qty,
          image: payload.image,
          stock: payload.stock ?? null,
        })
      }
      this.persist()
    },

    updateQty(id: string, qty: number) {
      const i = this.items.findIndex(x => x.id === id)
      if (i === -1) return
      const safe = Math.max(1, Math.floor(qty))
      const maxed = Math.min(this.items[i].stock ?? Infinity, safe)
      this.items[i].qty = maxed
      this.persist()
    },

    remove(id: string) {
      this.items = this.items.filter(x => x.id !== id)
      this.persist()
    },

    clear() {
      this.items = []
      this.persist()
    },
  },
})
