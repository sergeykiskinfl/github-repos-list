import { useLazyQuery } from "@apollo/client";
import useStore from "../../../shared/model/store";
import { GET_OWN_REPOSITORIES, GET_REPOSITORIES_BY_NAME } from "./queries";

export default function useGetRepos() {
  const [setBtnCount, setRepos] = useStore((state) => [
    state.setBtnCount,
    state.setRepos,
  ]);

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

  return {
    getReposByName,
    getReposByNameLoading,
    getReposByNameError,
    getReposByNameData,
    getOwnRepos,
    getOwnReposLoading,
    getOwnReposError,
    getOwnReposData,
  };
}
