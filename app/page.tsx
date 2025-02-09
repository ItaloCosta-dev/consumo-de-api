"use client"

import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const USERS_PER_PAGE = 10;

export default function Home() {
  const { data: users, isLoading, error } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro ao carregar usuários</p>;

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, endIndex);

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

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
