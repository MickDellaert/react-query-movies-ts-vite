import { useEffect, useState } from "react";

import { SearchInput } from "./SearchInput";

export const SearchContainer = () => {
  const [movieQuery, setMovieQuery] = useState(localStorage.getItem("query") as string);

  // const searched = useLocation()

  // console.log(searched)

  const getInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieQuery(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("query", movieQuery);

    console.log(movieQuery);
  }, [movieQuery]);

  return (
    <>
      <div>SearchContainer</div>

      <div>Search</div>

      <SearchInput getInput={getInput} movieQuery={movieQuery} />
      {/* <SearchResults movieQuery={movieQuery} /> */}
    </>
  );
};
