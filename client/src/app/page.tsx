
"use client"
import React from 'react';
import { useEffect, useState } from 'react';


const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000")  
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON
      })
      .then((data) => {
        console.log("Received data:", data);
        setMessage(data.message || "No message received");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data.");
      });
  }, []);
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
     <div className='text-lg'>This is Home</div>
      <div className="App">
      <h1>{message}</h1>
    </div>
    </div>
  );
};

export default Home;
