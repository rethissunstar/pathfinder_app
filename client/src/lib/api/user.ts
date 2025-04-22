

export async function loginUser({ userName, password }: { userName: string; password: string }) {
    const response = await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
  
    if (!response.ok) {
      const errorText = await response.text(); // log this
      console.error("Server responded with:", errorText);
      throw new Error(`Login failed: ${response.statusText}`);
    }
  
    return response.json();
  }
  