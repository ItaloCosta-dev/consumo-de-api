"use client"

import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const USERS_PER_PAGE = 10;
const TOTAL_PAGES = 3; // 3 paginas

export default function Home() {
  const { data: users, isLoading, error } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro ao carregar usuários</p>;

  // 30 usuário são retornados
  const limitedUsers = users.slice(0, USERS_PER_PAGE * TOTAL_PAGES);

  // Calculando exibição
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedUsers = limitedUsers.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de usuários</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedUsers.map((user: any) => (
          <div key={user.id} className="bg-white p-4 shadow rounded-lg text-center">
            <Image
              src={user.image}
              alt={user.firstName}
              width={100}
              height={100}
              className="rounded-full mx-auto"
            />
            <p className="font-semibold mt-2">{user.firstName} {user.lastName}</p>
            <Button className="mt-2">Abrir card</Button>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {[1, 2, 3].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES))}
              className={currentPage === TOTAL_PAGES ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
