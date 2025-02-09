'use client'

import { useUsers } from "../hooks/useUsers"
import { Button } from "@/components/ui/button";
import Image from "next/image"

export default function Home() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <p>Carregando usuários...</p>
  if (error) return <p>Erro ao carregar usuários</p>

  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4"> Lista de usuários </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user: any) => (
          <div key={user.id} className="bg-white p-4 shadow rounded-lg text-center">
            <Image 
              src={user.image}
              alt={user.firstName}
              width={100}
              height={100}
              className="rounded-full mx-auto"
            />
            <p className="font-semibold mt-2">{user.firstName} {user.lastName}</p>
            <Button className="mt-2">Abri card</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
