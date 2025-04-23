export async function retrieveUserData() {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) {
      throw new Error("No token found in cookies");
    }
  
    const response = await fetch("http://localhost:3001", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server responded with:", errorText);
      throw new Error(`Failed to retrieve user: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.user;
  }
  