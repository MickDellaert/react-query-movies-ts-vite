import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";
import * as api from "../api/api";
import { ListItem } from "./ListItem";

type Search = {
  movieQuery: string;
};

export const SearchResults = ({ movieQuery }: Search) => {
  const searchTerm = useDebounce(movieQuery, 500);

  const { data: queryData, isFetching } = useQuery(["query-movies", searchTerm], api.queryMovies, {
    enabled: !!searchTerm,
  });

  // const { data: queryTvData } = useQuery(
  //   ["query-tv", searchTerm],
  //   api.queryTv,
  //   {
  //     enabled: !!searchTerm,
  //   }
  // );

  if (isFetching) {
    return <h2>Loading</h2>;
  }

  if (queryData && queryData.results.length === 0) {
    return <h2>Sorry, no results were found</h2>;
  }

  console.log(queryData);

  return (
    <>
      <div className="search-results">
        <div className="search-results-movies">
          {queryData && <h2>you searched for: {searchTerm}</h2>}
          <div className="search-results-movies-wrapper">
            {queryData?.results.map((item) => (
              <div className="search-results-item">
                <ListItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  poster_path={item.poster_path}
                  media_type="movie"
                  searched={movieQuery}
                />
              </div>
            ))}
          </div>
        </div>
        {/* 
        {queryTvData && <h2>TV Shows</h2>}

        {queryTvData?.results.map((item) => (
          <ListItem key={item.id} item={item} mediaType="tv" />
        ))} */}
      </div>
    </>
  );
};
