import css from "./Header.module.css";
import logo from "../../assets/logo.svg";
import "../../index.css";
import SearchAnime from "../SearchAnime/SearchAnime";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function Header({
  search,
  setSearch,
  onLoginClick,
  onRegisterClick,
}: Props) {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.wrapper}>
          <a className={css.logo} href="/">
            <img src={logo} alt="NekoStream logo" />
            <span>NekoStream</span>
          </a>

          <nav className={css.navigation}>
            <ul className={css.list}>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">Anime</a>
              </li>
              <li>
                <a href="/">New Season</a>
              </li>
              <li>
                <a href="/">Genres</a>
              </li>
              <li>
                <a href="/">Schedule</a>
              </li>
            </ul>
          </nav>

          <SearchAnime search={search} setSearch={setSearch} />

          <div className={css.actions}>
            <button onClick={onLoginClick} className={css.loginBtn}>
              Login
            </button>
            <button onClick={onRegisterClick} className={css.registerBtn}>
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
