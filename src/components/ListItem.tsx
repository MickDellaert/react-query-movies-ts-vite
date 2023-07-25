import * as api from "../api/api";

import { Link } from "react-router-dom";

import { SingleMovie } from "../api/api";

export const ListItem = ({ id, title, poster_path, media_type }: SingleMovie) => {
  return (
    <Link
      to={`${media_type}/${id}`}
      state={{ type: media_type }}
      // state={{ type: media_type, searched:searched }}
    >
      <div>
        <h3>{title}</h3>
        <img src={`${api.IMG_URL}${poster_path}`} alt="" />
      </div>
    </Link>
  );
};
