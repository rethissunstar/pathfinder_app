
"use client"
import React from 'react';
import { useEffect, useState } from 'react';


const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const tokenMatch = document.cookie.match(/token=([^;]+)/);
    const token = tokenMatch?.[1];
  
    fetch("http://localhost:3001", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        setMessage(`Welcome, ${data.user.userName}!`);
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
