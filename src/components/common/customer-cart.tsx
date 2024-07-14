/*
|----------------------------------------------
| setting up ui for
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: mealnight, 
|----------------------------------------------
*/

import React from 'react'

type cartItem = {
  id: string
  name: string
  price: number
  quantity: number
  section: string
  serial: number
}

const CustomerCart = (props) => {
  const currentCart = JSON.parse(props.cart)
  return (
    <div className="flex flex-col w-full">
      <h1 className="py-2 font-semibold text-slate-700 underline">Order</h1>
      <ul className="flex flex-col">
        {currentCart &&
          currentCart?.length > 0 &&
          currentCart?.map((cart: cartItem) => {
            return (
              <li
                key={cart.id}
                className="flex justify-between w-full items-center my-1"
              >
                <p className="flex justify-center items-start">
                  <strong className="mr-1 font-medium text-red-500">
                    {cart.quantity}x
                  </strong>
                  <span className="capitalize text-slate-700 font-medium ml-2 text-left whitespace-pre-line">
                    {cart.name}
                  </span>
                  <span className="capitalize text-slate-700 font-medium ml-2 text-left whitespace-pre-line">
                    &pound;{Number(cart.price * cart.quantity).toFixed(2)}
                  </span>
                </p>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default CustomerCart
