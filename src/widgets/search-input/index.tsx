import useStore from "../../shared/model/store";
import { debounce } from "./model/utils";
import "./ui/index.css";

// Инпут для ввода запроса
export default function SearchInput(): JSX.Element {
  const [query, setQuery] = useStore((state) => [state.query, state.setQuery]);

  const debouncedSetQuery = debounce(setQuery, 200);

  return (
    <section className="search__container">
      <label htmlFor="search">Поиск по названию</label>
      <input
        type="text"
        id="searh"
        name="search"
        defaultValue={query}
        style={{ maxWidth: "900px" }}
        onChange={(e) => debouncedSetQuery(e.target.value)}
        data-cy="search-input"
      />
    </section>
  );
}
