import type { Anime } from "../../types/types";
import css from "./AnimeCard.module.css";

interface Props {
  anime: Anime;
  index?: number;
  onClick?: (animeId: number) => void;
}

export default function AnimeCard({ anime, index, onClick }: Props) {
  return (
    <li
      className={css.card}
      onClick={() => onClick?.(anime.mal_id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.(anime.mal_id);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {typeof index === "number" && <span className={css.rank}>{index + 1}</span>}
      <div className={css.posterWrapper}>
        <img
          className={css.poster}
          src={anime.images.jpg.image_url}
          alt={anime.title}
        />
      </div>

      <div className={css.content}>
        <h3 className={css.title}>{anime.title}</h3>
        <p className={css.genre}>
          {anime.genres?.slice(0, 2).map((genre) => genre.name).join(" • ") ||
            "Anime Series"}
        </p>

        <div className={css.info}>
          <p className={css.rating}>★ {anime.score ?? "N/A"}</p>
          <p>{anime.episodes ?? "?"} ep</p>
        </div>
      </div>
    </li>
  );
}
