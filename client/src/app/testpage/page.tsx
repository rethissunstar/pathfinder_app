
"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/common/ui/Card';
import { Input } from '@/components/common/ui/Input';
import { Button } from '@/components/common/ui/Button';
import { Avatar } from '@/components/common/ui/Avatar';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/userAtom';


const Testpage = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    fetch("http://localhost:3001")  
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
    <div className="theme-fire flex flex-col justify-center items-center min-h-screen bg-background text-foreground">
      <div className="text-lg">This is Testing the server</div>
      <div className="App">
        <h1>{message}</h1>
        <Card className="w-96 h-96">
          <div className="flex flex-col space-y-4">
            <Input placeholder="Test1" className="border rounded text-base" />
            <Input placeholder="Okay" className="border rounded text-base" />
            <Button>Submit</Button>
            {user ? (
              <Avatar
                src={user.profilePic}
                fallbackText={user.userName?.[0]}
                size="md"
              />
            ) : (
              <div className="text-muted text-sm italic">No user loaded</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
  
};

export default Testpage;