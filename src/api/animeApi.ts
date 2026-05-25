import axios from "axios";
import type { Anime } from "../types/types";

axios.defaults.baseURL = "https://api.jikan.moe/v4";

interface AnimeResponse {
  data:Anime
}

interface AnimeListResponse {
  data:Anime[]
}
export const fetchTopAnime = async ():Promise<Anime[]> => {
  const response = await axios.get<AnimeListResponse>("/top/anime");
  return response.data.data;
};

export const fetchSeasonalAnime = async ():Promise<Anime[]> => {
    const response = await axios.get<AnimeListResponse>("/seasons/now");
    return response.data.data;
  };

export const fetchAnimeById = async (id: number):Promise<Anime> => {
  const response = await axios.get<AnimeResponse>(`/anime/${id}/full`);
  return response.data.data;
};

export const searchAnime = async (search: string):Promise<Anime[]> => {
  const response = await axios.get<AnimeListResponse>("/anime",
    {
      params: {
        q: search,
      },
    }
  );
  
  return response.data.data;
};