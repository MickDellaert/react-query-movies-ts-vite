import React from "react";
// import { Movies } from "../../components/Movies";
import { SearchContainer } from "../../components/SearchContainer";
// import { ManyQueries } from "../../components/ManyQueries";
// import { Movies } from "../../components/Movies";
import { Slider } from "../../components/Slider";
import useManyQueries from "../../hooks/useManyQueries";
import * as api from "../../api/api";
// import { SliderCopy } from "../../components/SliderCopy";

export const Home = () => {
  const totalNumber = 12;
  const { detailedQueries } = useManyQueries(api.getTrending, "trending-movie-details-fetcher", "", totalNumber);

  if (detailedQueries.some((query) => query.isLoading)) {
    return <h2>"Multi Loading"</h2>;
  }

  if (detailedQueries.some((query) => query.isError)) {
    return <h2>"Multi Error"</h2>;
  }

  return (
    <>
      <SearchContainer />
      {/* <ManyQueries/> */}
      {/* <Movies /> */}
      <Slider />
      {/* <SliderCopy/> */}
    </>
  );
};
