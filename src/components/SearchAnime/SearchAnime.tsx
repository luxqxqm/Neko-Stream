import css from "../Header/Header.module.css";

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

export default function SearchAnime({ search, setSearch }: Props) {
  return (
    <label className={css.searchBox}>
      <svg className={css.searchIcon} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.44 4.44 1.41-1.41-4.44-4.44A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"
          fill="currentColor"
        />
      </svg>
      <input
        className={css.search}
        type="text"
        placeholder="Search anime..."
        name="userSearch"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <span className={css.searchHint}>Ctrl K</span>
    </label>
  );
}
