// src/constants/galleryData.ts
export type Foto = {
  id: string
  title: string
  price: number
  image: string
  description: string
}

export const allFotos: Foto[] = [
  {
    id: "f1",
    title: "Маки",
    price: 8000,
    image: new URL("@/assets/gallaryDetils/Маки.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 50Х50",
  },
  {
    id: "f2",
    title: "Малиновка",
    price: 5000,
    image: new URL("@/assets/gallaryDetils/Малиновка.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 10Х15.",
  },
  {
    id: "f3",
    title: "Остановись",
    price: 30000,
    image: new URL("@/assets/gallaryDetils/Остановись.jpeg", import.meta.url).href,
    description: "Холст, акрил. Размер 150Х60",
  },
  {
    id: "f4",
    title: "Осязаемое счастье",
    price: 24000,
    image: new URL("@/assets/gallaryDetils/Осязаемое_счастье.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 60Х60",
  },
  {
    id: "f5",
    title: "Следуй за мечтой",
    price: 10000,
    image: new URL("@/assets/gallaryDetils/Следуй_за_мечтой.jpg", import.meta.url).href,
    description: "Холст, масло - смешанная техника. Размер 50Х70",
  },
  {
    id: "f6",
    title: "Слава советскому спорту",
    price: 15000,
    image: new URL("@/assets/gallaryDetils/Спорт.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 50Х50",
  },
  {
    id: "f7",
    title: "Хурма в теплом тоне",
    price: 6000,
    image: new URL("@/assets/gallaryDetils/Хурма.jpg", import.meta.url).href,
    description: "Холст, масло. Размер 20Х30",
  },
];
