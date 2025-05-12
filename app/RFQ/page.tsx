"use client";
import React, { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import CustomHeader from '@/app/headers/CustomHeader';
import { getStorage } from '@/app/utils/helper';


export default function Home() {
 useEffect(() => {
  // Check authentication
    const accessToken = getStorage('access_token');
    if (!accessToken) {
      redirect('/sign-in');
    }
 }, [])
 
  return (
    <motion.div  initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}>
    <CustomHeader/>
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
      >
      <h1 className="text-4xl font-bold mb-6 text-green-600">Mechanic Finder</h1>
      <p className="mb-6 text-gray-700">
        Find the best mechanic for your auto service needs.
      </p>
      <Link className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition" href="/RFQ/Services">
          Get Started
      </Link>
    </div>
      </motion.div>
  );
}
