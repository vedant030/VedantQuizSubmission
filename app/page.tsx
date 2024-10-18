import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function StartPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-purple-100 p-4">
      <div className="w-64 bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15L8 11H16L12 15Z" fill="#FF6B00"/>
              <path d="M2 8.5C2 5.46243 4.46243 3 7.5 3H16.5C19.5376 3 22 5.46243 22 8.5V15.5C22 18.5376 19.5376 21 16.5 21H7.5C4.46243 21 2 18.5376 2 15.5V8.5Z" stroke="#FF6B00" strokeWidth="2"/>
            </svg>
            <span className="text-gray-500 font-semibold">upraised</span>
          </div>
          <div className="h-32 bg-gradient-to-b from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
            <span className="text-red-500 text-3xl font-bold">Quiz</span>
          </div>
          <Button
            asChild
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-full transition-all duration-300 ease-in-out"
          >
            <Link href="/quiz">Start</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}