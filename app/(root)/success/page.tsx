"use client"
import { useCart } from '@/app/lib/hooks/useCart'
import Link from 'next/link'
import React, { useEffect } from 'react'

const OrderSuccess = () => {
  const cart = useCart();
  useEffect(()=>{
    cart.clearCart()
  },[])
  return (
    <div className='h-screen justify-center flex flex-col items-center gap-5'>
      <p className='text-heading4-bold text-red-1'>
        Successfull Payment
        </p>
        <p className='text-body-semibold'>
          Your order has been placed successfully
          </p>
        <Link href={"/"} className='p-4 border text-base-bold hover:bg-black hover:text-white' >
        CONTINUE SHOPPING
        </Link>
      </div>
  )
}

export default OrderSuccess