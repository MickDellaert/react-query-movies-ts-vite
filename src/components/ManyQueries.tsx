import * as api from "../api/api";
import { Link } from "react-router-dom";
import useManyQueries from "../hooks/useManyQueries";

export const ManyQueries = () => {
  const { detailedQueriesMediaType } = useManyQueries(api.getTrending, "trending-movie-fetcher", "", 20);

  if (detailedQueriesMediaType.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  console.log(detailedQueriesMediaType);
  // console.log(detailedQueries)
  // console.log(data)

  return (
    <>
      <h3>Trending TV shows or movies with details</h3>
      <div className="movie-list">
        {detailedQueriesMediaType.map((many) => (
          <Link
            key={many.data?.id}
            to={`${many.media_type}/${many.data?.id}/title=${many.data?.title ? many.data?.title : many.data?.name}`} 
            state={{ type: many.media_type, searched: "" }}
          >
            <div>
              <p>{many.media_type}</p>
              {/* <h3>{many.data?.title}</h3>  */}
              <img className="movie-card-image" src={`${api.IMG_URL}${many.data?.poster_path}`} alt="" />

              {/* <h3>{many.data?.name}</h3> */}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
