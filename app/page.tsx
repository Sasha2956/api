"use client"

import { UserDTO } from "@/@types/dto/user";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<UserDTO[]>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get<UserDTO[]>(
        "https://api-xi-sooty-81.vercel.app/api/users"
      );

      setUsers(response.data);
    } catch (error) {
      setError("Error!");
      throw error;
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">All users</h1>
      {error && <p>{error}</p>}
      <ul className="border rounded-xl p-4 space-y-4">
        {isLoading && <Loader2 size={16} className="animate-spin" />}

        {users?.map((user) => (
          <div key={user.id}>
            <h1 className="font-bold">{user.name}</h1>
            <p>{user.age} years old</p>
            <button>Send</button>
          </div>
        ))}
      </ul>
    </>
  );
}
