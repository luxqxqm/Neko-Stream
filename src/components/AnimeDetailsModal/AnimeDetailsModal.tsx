import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useAnimeById } from "../../hooks/useAnimeById";
import css from "./AnimeDetailsModal.module.css";

interface Props {
  animeId: number;
  onClose: () => void;
}

export default function AnimeDetailsModal({ animeId, onClose }: Props) {
  const { data: anime, isLoading, isError } = useAnimeById(animeId);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const trailerUrl = anime?.trailer?.embed_url ?? anime?.trailer?.url ?? "";
  const heroImage =
    anime?.images.jpg.large_image_url ?? anime?.images.jpg.image_url ?? "";

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={css.closeBtn} onClick={onClose} aria-label="Close">
          x
        </button>

        {isLoading && <div className={css.state}>Loading anime details...</div>}

        {isError && (
          <div className={css.state}>
            Failed to load anime details. Try again in a moment.
          </div>
        )}

        {!isLoading && !isError && anime && (
          <div className={css.content}>
            <div className={css.mediaColumn}>
              <div className={css.posterWrap}>
                <img
                  className={css.poster}
                  src={heroImage}
                  alt={anime.title}
                />
              </div>

              {trailerUrl ? (
                <div className={css.trailerWrap}>
                  <iframe
                    className={css.trailer}
                    src={trailerUrl}
                    title={`${anime.title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className={css.noTrailer}>No trailer available for this title.</div>
              )}
            </div>

            <div className={css.infoColumn}>
              <span className={css.eyebrow}>Anime overview</span>
              <h2 className={css.title}>{anime.title}</h2>
              {anime.title_english && anime.title_english !== anime.title && (
                <p className={css.altTitle}>{anime.title_english}</p>
              )}

              <div className={css.metaGrid}>
                <div>
                  <span>Score</span>
                  <strong>{anime.score ?? "N/A"}</strong>
                </div>
                <div>
                  <span>Episodes</span>
                  <strong>{anime.episodes ?? "?"}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{anime.status ?? "Unknown"}</strong>
                </div>
                <div>
                  <span>Year</span>
                  <strong>{anime.year ?? "Unknown"}</strong>
                </div>
              </div>

              <div className={css.tags}>
                {anime.type && <span>{anime.type}</span>}
                {anime.source && <span>{anime.source}</span>}
                {anime.duration && <span>{anime.duration}</span>}
                {anime.rating && <span>{anime.rating}</span>}
                {anime.genres.map((genre) => (
                  <span key={genre.mal_id}>{genre.name}</span>
                ))}
              </div>

              <p className={css.synopsis}>
                {anime.synopsis || "No synopsis available for this anime yet."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
