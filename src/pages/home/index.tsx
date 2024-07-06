import { useEffect } from "react";
import useStore from "../../shared/model/store";

import Paginator from "../../widgets/paginator";
import RepoList from "../../widgets/repos-list";
import SearchInput from "../../widgets/search-input";
import useGetRepos from "./api/custom-queries-hooks";

export default function HomePage(): JSX.Element {
  // Главная страница - список репозиториев
  let repoListContent: JSX.Element = <p>Loading...</p>;

  const [setCurrentPage, query] = useStore((state) => [
    state.setCurrentPage,
    state.query,
    state.setBtnCount,
    state.setRepos,
  ]);

  const {
    getReposByName,
    getReposByNameLoading,
    getReposByNameError,
    getReposByNameData,
    getOwnRepos,
    getOwnReposLoading,
    getOwnReposError,
    getOwnReposData,
  } = useGetRepos();

  useEffect(() => {
    if (query.length > 1) {
      getReposByName({
        variables: {
          queryString: `name:${query}`,
        },
      });
    } else {
      setCurrentPage(0);
      getOwnRepos();
    }
  }, [query, getReposByName, getOwnRepos, setCurrentPage]);

  if (getReposByNameLoading || getOwnReposLoading) {
    repoListContent = <p>Loading...</p>;
  }

  if (getReposByNameError)
    repoListContent = <p>Error : {getReposByNameError.message}</p>;
  if (getOwnReposError)
    repoListContent = <p>Error : {getOwnReposError.message}</p>;

  if (getReposByNameData || getOwnReposData) {
    repoListContent = (
      <>
        <h2 style={{ fontSize: "medium", marginLeft: "40px" }}>
          Название репозитория - кол-во звезд на github - дата последнего
          коммита - ссылка на Github
        </h2>
        <RepoList />
      </>
    );
  }

  return (
    <main>
      <SearchInput />
      {repoListContent}
      <Paginator />
    </main>
  );
}
