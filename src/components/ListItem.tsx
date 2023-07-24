import * as api from "../api/api";

import { SingleMovie } from "../api/api";

export const ListItem = ({ title, poster_path }: SingleMovie) => {
  return (
    <div>
      <h3>{title}</h3>
      <img src={`${api.IMG_URL}${poster_path}`} alt="" />
    </div>
  );
};
