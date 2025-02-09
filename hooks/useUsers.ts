// hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const { data } = await axios.get("https://dummyjson.com/users?limit=10");
  return data.users; 
};

export function useUsers() {
  return useQuery({
    queryKey: ["users"], 
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, 
  });
}
