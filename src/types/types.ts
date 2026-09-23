export interface Anime {
  mal_id: number;
  title: string;
  title_english?: string | null;
  title_japanese?: string | null;
  synopsis: string;
  episodes: number | null;
  score: number | null;
  year: number | null;
  rank?: number;
  type?: string | null;
  duration?: string | null;
  season?: string | null;
  source?: string | null;
  images: {
    jpg: {
      image_url: string;
      large_image_url?: string;
    };
  };
  genres: Genre[];
  trailer: {
    url: string | null;
    embed_url?: string | null;
  };
  rating: string | null;
  status: string | null;
}

export interface Genre {
  mal_id: number;
  name: string;
}

export type Auth = "login" | "register";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}
