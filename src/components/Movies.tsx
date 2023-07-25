import { useQuery } from "@tanstack/react-query";
import * as api from "../api/api";
import { ListItem } from "./ListItem";
import { SearchContainer } from "./SearchContainer";

export const Movies = () => {
  const { isLoading: popularLoading, data: popularData } = useQuery(["popular-movies"], api.getPopular);
  const { isLoading: trendingLoading, data: trendingData } = useQuery(["trending-movies"], api.getTrending);

  // console.log(popularData);
  // console.log(trendingData);

  // const { isLoading: configLoading, data: configData } = useQuery(
  //   ["config"],
  //   api.getConfig
  // );

  if (popularLoading || trendingLoading) {
    return <h2>"Loading"</h2>;
  }
  // console.log(configData);

  // console.log(trendingData);

  return (
    <>
      <SearchContainer />

      <div className="popular">
        <h2>Trending TV shows or movies</h2>
        {popularData?.results.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            title={item.title}
            poster_path={item.poster_path}
            media_type="movie"
            searched=""
          />
        ))}
      </div>

      <div className="trending">
        <h2>Trending TV shows or movies</h2>
        {trendingData?.results.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            title={item.title}
            poster_path={item.poster_path}
            media_type={item.media_type}
            searched=""
          />
        ))}
      </div>

      {/* <h2>Popular Movies</h2>
      {popularData?.results.map((item) => (
        <ListItem key={item.id} item={item} mediaType="movie" />
        
      ))} */}
    </>
  );
};
