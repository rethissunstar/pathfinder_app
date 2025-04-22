
"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/common/ui/Card';
import { Input } from '@/components/common/ui/Input';
import { Button } from '@/components/common/ui/Button';


const Testpage = () => {
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
        // console.log("Received data:", data);
        setMessage(data.message || "No message received");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data.");
      });
  }, []);
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
     <div className='text-lg'>This is Testing the server</div>
      <div className="App">
      <h1>{message}</h1>
      <Card className='w-96 h-96'>
      <div className='flex flex-col space-y-4'>
        <Input placeholder='Test1' className='border rounded  text-base' />
        <Input placeholder='Okay' className='border rounded h-base test-base' />
        <Button>Submit</Button>
      </div>
      </Card>
    </div>
    </div>
  );
};

export default Testpage;