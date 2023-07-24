import axios from "axios";

const API_KEY: string = import.meta.env.VITE_APP_API_KEY;

const BASE_URL = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export type Movies = {
  results: SingleMovie[];
};

export type SingleMovie = {
  id: number;
  title: string;
  poster_path: string;
};

export const IMG_URL = "https://image.tmdb.org/t/p/w1280/";

export const IMG_ORIGINAL_URL = "https://image.tmdb.org/t/p/orignal/";

export const getPopular = () => getMovies(`movie/popular?api_key=${API_KEY}`);

export const getTrending = () => getMovies(`trending/all/week?api_key=${API_KEY}&append_to_response=videos`);

export const getConfig = () => getMovies(`configuration?api_key=${API_KEY}`);

const getMovies = async (url: string): Promise<Movies> => {
  const response = await BASE_URL.get<Movies>(url);
  return response.data;
};


