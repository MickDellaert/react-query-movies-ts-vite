import React from "react";
// import { Movies } from "../../components/Movies";
import { SearchContainer } from "../../components/SearchContainer";
import { ManyQueries } from "../../components/ManyQueries";
import { Movies } from "../../components/Movies";
import { Slider } from "../../components/Slider";

export const Home = () => {

  
  return (
    <>
      <SearchContainer />
      <ManyQueries/>
      <Movies />
      <Slider/>
    </>
  );
};
