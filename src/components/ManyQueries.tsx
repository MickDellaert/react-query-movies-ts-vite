import * as api from "../api/api";
import { Link } from "react-router-dom";
import useManyQueries from "../hooks/useManyQueries";
// import * as Interface from "../types/types"

export const ManyQueries = () => {
  const { detailedQueries, detailedQueriesMediaTypeData } = useManyQueries(
    api.getTrending,
    "trending-many-details-fetcher",
    "",
    20
  );

  if (detailedQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  if (detailedQueries.some((query) => query.isError)) {
    return <h2>"Error"</h2>;
  }

  return (
    <>
      <h3>Trending TV shows or movies with details</h3>
      <div className="movie-list">
        {detailedQueriesMediaTypeData.map((many) => (
          <Link
            key={many.id}
            to={`${many.media_type}/${many.id}/title=${many.title ? many.title : many.name}`}
            state={{ type: many.media_type, searched: "" }}
          >
            <div>
              <p>{many.media_type}</p>
              {/* <h3>{many.data?.title}</h3>  */}
              <img className="movie-card-image" src={`${api.IMG_URL}${many.poster_path}`} alt="" />

              {/* <h3>{many.data?.name}</h3> */}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
