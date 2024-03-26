import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Board } from "../types.ts";

const url = "https://api.ticketing.kir-dev.hu/boards";

export function useBoards() {
  return useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: async () => {
      const response = await axios.get<Board[]>(url);
      return response.data;
    },
    select: (boards) => {
      const sorted = [...boards.sort((a, b) => b.id - a.id)];
      return sorted.splice(0, 20);
    },
  });
}
