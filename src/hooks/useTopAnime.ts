import { useQuery } from "@tanstack/react-query";
import { fetchTopAnime } from "../api/animeApi";

export const useTopAnime = () => {
    return useQuery({
    queryKey: ["top-anime"],
    queryFn:fetchTopAnime
})
}