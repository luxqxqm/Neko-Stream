import { useQuery } from "@tanstack/react-query"
import { fetchAnimeById } from "../api/animeApi"

export const useAnimeById = (id:number) => {
    
    return useQuery({
        queryKey: ["anime", id],
        queryFn: () => fetchAnimeById(id),
        enabled:!!id
    })
}