import React from 'react'
import { Button } from '../ui/Button';

interface HeaderProps {
  title: string;
  desc: string;
}

function Header() {
    return (
        <div className="bg-white p-4 shadow">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold">Customer</h1>
              <p className="text-gray-500">You can manage and organize your customer and other things here</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost">Customer</Button>
              <Button variant="ghost">Promo</Button>
              <Button variant="ghost">Voucher</Button>
            </div>
          </div>
        </div>
      );    
}

export default Header