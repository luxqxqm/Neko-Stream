import { useQuery } from "@tanstack/react-query"
import { fetchSeasonalAnime } from "../api/animeApi"

export const useSeasonalAnime = () => {
    return useQuery({
        queryKey: ["seasonal-anime"],
        queryFn:fetchSeasonalAnime
    })
}