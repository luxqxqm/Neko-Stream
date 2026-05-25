import css from "./HomePage.module.css";
import { useTopAnime } from "../../hooks/useTopAnime";
import { useSeasonalAnime } from "../../hooks/useSeasonalAnime";
import { useSearchAnime } from "../../hooks/useSearchAnime";
import AnimeCard from "../../components/AnimeCard/AnimeCard";

interface Props {
  search: string;
  onAnimeSelect: (animeId: number) => void;
}

export default function HomePage({ search, onAnimeSelect }: Props) {
  const { data: topAnime } = useTopAnime();
  const { data: seasonalAnime } = useSeasonalAnime();
  const { data: searchResults } = useSearchAnime(search);

  const sections = search.trim()
    ? [
        {
          title: `Search Results for "${search}"`,
          subtitle: "Live results from Jikan API",
          items: searchResults ?? [],
        },
      ]
    : [
        {
          title: "Trending Now",
          subtitle: "Most watched titles right now",
          items: topAnime?.slice(0, 6) ?? [],
        },
        {
          title: "Seasonal Anime",
          subtitle: "Fresh picks from the current season",
          items: seasonalAnime?.slice(0, 6) ?? [],
        },
        {
          title: "Top Rated",
          subtitle: "High-score series worth your watchlist",
          items: topAnime?.slice(6, 12) ?? [],
        },
      ];

  return (
    <section className={css.home}>
      <div className="container">
        <div className={css.wrapper}>
          {sections.map((section) => (
            <section key={section.title} className={css.section}>
              <div className={css.sectionHeader}>
                <div>
                  <h2 className={css.title}>{section.title}</h2>
                  <p className={css.subtitle}>{section.subtitle}</p>
                </div>
                <a href="/" className={css.viewAll}>
                  View all
                </a>
              </div>

              {section.items.length > 0 ? (
                <ul className={css.animeGrid}>
                  {section.items.map((anime, index) => (
                    <AnimeCard
                      key={anime.mal_id}
                      anime={anime}
                      index={index}
                      onClick={onAnimeSelect}
                    />
                  ))}
                </ul>
              ) : (
                <div className={css.emptyState}>
                  No anime found yet. Try another title.
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
