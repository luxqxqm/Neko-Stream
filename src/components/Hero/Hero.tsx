import css from "./Hero.module.css";
import { useTopAnime } from "../../hooks/useTopAnime";

export default function Hero() {
  const { data: topAnime } = useTopAnime();
  const featured = topAnime?.[0];

  const backgroundImage = featured?.images.jpg.image_url ?? "/hero-bg.jpg";
  const title = featured?.title ?? "One Piece";
  const score = featured?.score ? featured.score.toFixed(1) : "9.0";
  const episodes = featured?.episodes ?? 1100;
  const year = featured?.year ?? 1999;
  const synopsis =
    featured?.synopsis ??
    "A fearless pirate with dreams of becoming King of the Pirates sails through the Grand Line in search of the legendary treasure.";

  return (
    <section className={css.heroSection}>
      <div className="container">
        <div
          className={css.hero}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className={css.overlay}></div>
          <div className={css.glow}></div>

          <div className={css.content}>
            <span className={css.badge}>Top pick this week</span>

            <h1 className={css.title}>{title}</h1>

            <p className={css.info}>
              TV Series | {year} | {episodes} Episodes | Score {score}
            </p>

            <p className={css.description}>{synopsis}</p>

            <div className={css.pills}>
              <span>Adventure</span>
              <span>Fantasy</span>
              <span>Shounen</span>
            </div>

            <div className={css.actions}>
              <button className={css.watchBtn}>Watch now</button>
              <button className={css.detailsBtn}>Details</button>
            </div>

            <div className={css.stats}>
              <div>
                <strong>{score}</strong>
                <span>User score</span>
              </div>
              <div>
                <strong>{episodes}</strong>
                <span>Episodes</span>
              </div>
              <div>
                <strong>{year}</strong>
                <span>Release year</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
