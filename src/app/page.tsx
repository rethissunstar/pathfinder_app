

import React from 'react';

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to your Next.js App with Tailwind CSS!
        </h1>
        <p className="text-lg text-gray-700">
          Tailwind CSS is working, and you can start building your app with it now.
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
