export async function updateUser(
    userId: number,
    updates: Partial<{
      theme: "light" | "dark";
      language: string;
      profilePic: string;
    }>
  ) {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token provided");
  
    const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to update user:", errorText);
      throw new Error(`Update failed: ${response.statusText}`);
    }
  
    return response.json();
  }
  