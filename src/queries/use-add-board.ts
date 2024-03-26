import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const url = "https://api.ticketing.kir-dev.hu/boards";

export function useAddBoard() {
  return useMutation({
    mutationFn: async (title: string) => {
      const response = await axios.post(url, {
        title: title,
      });
      return response.data;
    },
  });
}
