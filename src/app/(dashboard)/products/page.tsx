import ProductTable from '@/components/features/products/ProductTable'
import Banner from '@/components/layout/Banner'
import Header from '@/components/layout/Header'
import React from 'react'
import { getProducts } from './action';

async function page() {
  const products = await getProducts();
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 p-6 gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <ProductTable products={products} />
        </div>

        <div className="w-[300px]">
          <Banner />
        </div>
      </div>
    </div>
  )
}

export default page