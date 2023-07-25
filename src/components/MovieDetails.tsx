import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

import * as api from "../api/api";


export const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const type = location.state.type;

  // const searched = location.state.searched;

  console.log(id);
  console.log(location);
  // console.log("location searched" + searched);

  const { data: details, isLoading: detailsLoading } = useQuery(
    ["getDetails", id, type],
    () => api.getDetails(id as string, type)
    // {
    //   enabled: type !== "",
    // }
  );

  if (detailsLoading) {
    return <h2>"Loading"</h2>;
  }

  console.log(details)

  return (
    <>
      <h3>Details</h3>
      {details?.title && <h2>{details.title}</h2>}
      {details?.original_name && <h2>{details.original_name}</h2>}
    </>
  );
};
