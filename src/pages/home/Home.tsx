import React from "react";
// import { Movies } from "../../components/Movies";
import { SearchContainer } from "../../components/SearchContainer";
import { ManyQueries } from "../../components/ManyQueries";
import { Movies } from "../../components/Movies";

export const Home = () => {

  
  return (
    <>
      <SearchContainer />
      <ManyQueries/>
      <Movies />
    </>
  );
};
