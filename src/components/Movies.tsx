import { useQuery } from "@tanstack/react-query";
import * as api from "../api/api";
import { ListItem } from "./ListItem";

export const Movies = () => {
  const { isLoading: popularLoading, data: popularData } = useQuery(["popular-movies"], api.getPopular);
  const { isLoading: trendingLoading, data: trendingData } = useQuery(["trending-movies"], api.getTrending);


  if (popularLoading || trendingLoading) {
    return <h2>"Loading"</h2>;
  }


  return (
    <>
      {/* <SearchContainer /> */}
      <h3>Popular movies</h3>
      <div className="movie-list popular">
        {popularData?.results.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            title={item.title}
            poster_path={item.poster_path}
            media_type="movie"
            searched=""
            original_language={item.original_language}
          />
        ))}
      </div>

      <h3>Trending TV shows or movies</h3>
      <div className="movie-list trending">
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
