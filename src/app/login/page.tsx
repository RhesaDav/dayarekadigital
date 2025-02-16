import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden flex">
        <div className="w-1/2 p-8 backdrop-blur-lg bg-white/30">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Mail className="text-gray-500 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-2 outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <Lock className="text-gray-500 w-5 h-5" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-2 outline-none bg-transparent"
              />
            </div>
          </div>
          
          <div className="text-right text-sm text-blue-500 hover:underline cursor-pointer mb-6">
            Forgot Password?
          </div>

            <Link href={"/home"}>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
            Login
          </button>
            </Link>
        </div>

        <div className="w-1/2 hidden md:block relative">
          <Image
            src="/table_banner.png" 
            alt="Login Illustration"
            layout="fill" 
            objectFit="cover" 
          />
        </div>
      </div>
    </div>
  );
}

export default login;
