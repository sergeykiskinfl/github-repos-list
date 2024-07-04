import useStore from "../../shared/model/store";
import { RepositoryEdge } from "../../shared/model/interfaces";
import { Link } from "react-router-dom";

// Отображенные репозитории
export default function RepoList(): JSX.Element {
  const [repos, currentPage] = useStore((state) => [
    state.repos,
    state.currentPage,
  ]);

  return (
    <ul>
      {repos
        .slice(currentPage * 10, (currentPage + 1) * 10)
        .map((edge: RepositoryEdge) => {
          const {
            node: { id, name, stargazerCount, updatedAt, url },
          } = edge;

          return (
            <li
              key={id}
              style={{ display: "flex", flexDirection: "row", gap: "5px" }}
            >
              <Link to={id}>{name}</Link>
              <span>-</span>
              {stargazerCount}
              <span>-</span>
              {updatedAt.split("T")[0]}
              <span>-</span>
              <a href={url}>{url}</a>
            </li>
          );
        })}
    </ul>
  );
}
