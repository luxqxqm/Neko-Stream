import { useQuery } from "@tanstack/react-query"
import { searchAnime } from "../api/animeApi"

export const useSearchAnime = (search:string) => {
    return useQuery({
        queryKey: ["search-anime", search],
        queryFn: () => searchAnime(search),
        enabled: !!search
    })
}