import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.brand}>
            <a href="/" className={css.logo}>
              NekoStream
            </a>

            <p className={css.description}>
              Watch trending anime with a modern streaming experience.
            </p>
          </div>

          <nav className={css.navigation}>
            <a href="/">Home</a>
            <a href="/">Anime</a>
            <a href="/">Trending</a>
            <a href="/">Genres</a>
          </nav>

          <div className={css.socials}>
            <a href="https://github.com/luxqxqm">GitHub</a>
            <a href="https://www.linkedin.com/in/denis-yaseniuk/">Linkedin</a>
            <a href="https://t.me/">Telegram</a>
          </div>
        </div>

        <div className={css.bottom}>
          <p>(c) 2026 Den Yaseniuk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
