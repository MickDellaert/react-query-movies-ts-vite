import * as api from "../api/api";

import { Link } from "react-router-dom";

import { SingleMovie } from "../api/api";

export const ListItem = ({ id, title, poster_path, media_type, searched }: SingleMovie) => {
  return (
    <Link to={`${media_type}/${id}/title=${title}`} state={{ type: media_type, searched: searched }}>
      <div className="movie-card">
        {/* <h3 className="movie-card-title">{title}</h3> */}
        <img className="movie-card-image" src={`${api.IMG_URL}${poster_path}`} alt="" />
      </div>
    </Link>
  );
};
