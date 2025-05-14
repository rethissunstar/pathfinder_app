const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export async function getUserByUsername(username: string) {
  console.log("this is username", username)
  try {
    const res = await fetch(`${BASE_URL}/api/users/by-name/${encodeURIComponent(username)}`);

    if (!res.ok) {
      throw new Error("User not found");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch user by username:", err);
    throw err;
  }
}



export async function loginUser({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) {
    //Update this for LIVE
    const response = await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server responded with:", errorText);
      throw new Error(`Login failed: ${response.statusText}`);
    }
  
    const data = await response.json();
  
    // 🧾 Log the full data received from backend
    console.log("🔐 Received from backend:", data);
  
    // 🔐 Save token in cookie (optional)
    document.cookie = `token=${data.token}; path=/; max-age=3600`;
    document.cookie = `loggedIn=true; path=/; max-age=3600`;
  
    return {
      token: data.token,
      user: data.user,
    };
  }
  