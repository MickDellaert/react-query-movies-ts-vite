import * as api from "../api/api";
import { Link } from "react-router-dom";
import useManyQueries from "../hooks/useManyQueries";

export const ManyQueries = () => {
  const { userQueriesIndexed, data,  userQueries } = useManyQueries(api.getTrending, "trending-movie-fetcher", "", 20);

  if (userQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  // console.log(userQueriesIndexed);
  // console.log(userQueries)
  // console.log(data)
  // console.log(userQueriesTest)

  return (
    <>
      {/* <div>Many Details</div> */}
      <div className="movie-list">
        {userQueriesIndexed.map((many) => (
          <>
            <Link to={`${"movie"}/${many.data?.id}/title=${many.data?.title}`} state={{ type: "movie", searched: "" }}>
              <div key={many.data?.id}>
                 <p>{many.data?.media_type}</p>
                    {/* <h3>{many.data?.title}</h3>  */}
                <img className="movie-card-image" src={`${api.IMG_URL}${many.data?.poster_path}`} alt="" />

                {/* <h3>{many.data?.name}</h3> */}
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
};
