import { useEffect, useDeferredValue } from "react";
import { useLazyQuery } from "@apollo/client";
import useStore from "../../shared/model/store";
import { GET_OWN_REPOSITORIES, GET_REPOSITORIES_BY_NAME } from "./api/queries";

import Paginator from "../../widgets/paginator";
import RepoList from "../../widgets/repos-list";
import SearchInput from "../../widgets/search-input";

export default function HomePage(): JSX.Element {
  // Главная страница - список репозиториев
  let repoListContent: JSX.Element = <p>Loading...</p>;

  const [setCurrentPage, query, setBtnCount, setRepos] = useStore((state) => [
    state.setCurrentPage,
    state.query,
    state.setBtnCount,
    state.setRepos,
  ]);

  const deferredQuery = useDeferredValue(query);

  const [
    getReposByName,
    {
      loading: getReposByNameLoading,
      error: getReposByNameError,
      data: getReposByNameData,
    },
  ] = useLazyQuery(GET_REPOSITORIES_BY_NAME, {
    onCompleted(data) {
      const {
        search: { edges },
      } = data;

      setBtnCount(Math.ceil(edges.length / 10));
      setRepos(edges);
    },
  });

  const [
    getOwnRepos,
    {
      loading: getOwnReposLoading,
      error: getOwnReposError,
      data: getOwnReposData,
    },
  ] = useLazyQuery(GET_OWN_REPOSITORIES, {
    onCompleted(data) {
      const {
        viewer: {
          repositories: { edges },
        },
      } = data;

      setBtnCount(Math.ceil(edges.length / 10));

      setRepos(edges);
    },
  });

  useEffect(() => {
    if (deferredQuery.length > 1) {
      getReposByName({
        variables: {
          queryString: `name:${deferredQuery}`,
        },
      });
    } else {
      setCurrentPage(0);
      getOwnRepos();
    }
  }, [deferredQuery, getReposByName, getOwnRepos, setCurrentPage]);

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
