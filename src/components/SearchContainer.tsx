import { useEffect, useState } from "react";

import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

export const SearchContainer = () => {
  const [movieQuery, setMovieQuery] = useState(localStorage.getItem("query") as string);

  const getInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieQuery(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("query", movieQuery);

    console.log(movieQuery);
  }, [movieQuery]);

  return (
    <>
      <SearchInput getInput={getInput} movieQuery={movieQuery} />
      <SearchResults movieQuery={movieQuery} />
    </>
  );
};
