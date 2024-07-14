/*
|-----------------------------------------
| setting up MenuMostFavoritesItems for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: restaurant.mealnight.com, July, 2024
|-----------------------------------------
*/
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Star } from 'lucide-react'

const menuData = [
  'All Categories',
  'Main Course',
  'Pizza',
  'Drink',
  'Dessert',
  'More',
]
const foodItem = [
  {
    id: 1,
    img: '/img/img.png',
    title: 'Pizza',
    favorite: '79',
    totalSales: '843',
    reviews: [3, 454],
  },
  {
    id: 2,
    img: '/img/img.png',
    title: 'Burger',
    favorite: '79',
    totalSales: '843',
    reviews: [4, 454],
  },
  {
    id: 3,
    img: '/img/img.png',
    title: 'Pizza',
    favorite: '79',
    totalSales: '843',
    reviews: [3, 454],
  },
  {
    id: 4,
    img: '/img/img.png',
    title: 'Burger',
    favorite: '79',
    totalSales: '843',
    reviews: [3, 454],
  },
  {
    id: 5,
    img: '/img/img.png',
    title: 'Pizza',
    favorite: '79',
    totalSales: '843',
    reviews: [3, 454],
  },
  {
    id: 6,
    img: '/img/img.png',
    title: 'Dessert',
    favorite: '79',
    totalSales: '843',
    reviews: [5, 454],
  },
]
const MenuMostFavoritesItems = () => {
  const [currentCategory, setCurrentCategory] = useState(menuData[0])
  return (
    <main className="p-4">
      <header className="w-full items-center justify-between">
        <h2>Most FavoritesItems</h2>
        <div className="flex items-center justify-end">
          {menuData.map((curr) => (
            <h3
              onClick={() => setCurrentCategory(curr)}
              key={curr}
              className={`text-xl font-bold text-gray-900 px-4 cursor-pointer ${
                currentCategory === curr
                  ? ' text-rose-600 border-b-4 border-b-rose-600 '
                  : ' border-b-slate-200 border-b-2'
              } `}
            >
              {curr}
            </h3>
          ))}
        </div>
      </header>
      {currentCategory.toLocaleLowerCase() === 'all categories' ? (
        <section className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {foodItem.map((curr, idx) => (
            <div className={`flex gap-2 w-full`}>
              <Image
                priority={false}
                src={curr.img}
                width={100}
                quality={100}
                height={100}
                className="w-[180px] h-full rounded-lg"
                alt={curr.title}
              />
              <div className="flex w-full pr-4 items-start justify-between">
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">{curr.title}</h2>
                  <h3 className="text-xl text-gray-700">
                    <strong>{curr.totalSales}</strong> Total Sales
                  </h3>
                  <div className="w-full flex gap-4 text-sm text-gray-500">
                    <p className="flex text-sm items-center">
                      {Array.from(
                        { length: curr.reviews[0] },
                        (_, i) => i + 1
                      ).map((r) => (
                        <Star
                          fill="orange"
                          stroke="orange"
                          className="w-[20px] pr-1 h-[20px]"
                        />
                      ))}
                      {Array.from(
                        { length: 5 - curr.reviews[0] },
                        (_, i) => i + 1
                      ).map((r) => (
                        <Star
                          stroke="orange"
                          className="w-[20px]  pr-1 h-[20px]"
                        />
                      ))}
                      <span className="pl-4">({curr.reviews[1]} reviews</span> )
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center text-2xl font-bold w-auto h-full border px-4 min-w-[140px]">
                  {curr.favorite}
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="w-full flex items-center justify-center h-[500px]">
          {currentCategory}
        </div>
      )}
    </main>
  )
}
export default MenuMostFavoritesItems
