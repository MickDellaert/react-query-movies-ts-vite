import axios from "axios";

import { QueryFunctionContext } from "@tanstack/react-query";

import * as Interface from "../types/types";

const API_KEY: string = import.meta.env.VITE_APP_API_KEY;

const BASE_URL = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const IMG_URL = "https://image.tmdb.org/t/p/w1280/";

export const IMG_ORIGINAL_URL = "https://image.tmdb.org/t/p/orignal/";

export interface Media {
  results: MediaResult[]
}

export interface MediaResult {
  adult?: boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
  searched: string
}

export type Movies = {
  results: SingleMovie[];
};

export type SingleMovie = {
  id: number;
  title: string;
  poster_path: string;
  media_type: string;
  searched: string;
};

export type MoviesDetail = {
  results: MovieDetail[];
};

export type MovieDetail = {
  id: number;
  title: string;
  original_name: string;
  media_type: string;
  poster_path: string;
};

export type MultiMoviesDetail = {
  data: MultiMovieDetail;
  key: number;
};

export type MultiMovieDetail = {
  id: number;
  title: string;
  original_title: string;
  media_type: string;
  poster_path: string;
  images: MultiMovieImages
};

export type MultiMovieImages = {
  backdrops: MultiMovieBackdrops[];
};

export type MultiMovieBackdrops = {
  backdrop: MultiMovieBackdrop[];
  file_path: string;
};

export type MultiMovieBackdrop = {
  backdroppath: string;
};




export const getPopular = (): Promise<Media> => getMovies(`movie/popular?api_key=${API_KEY}`);

export const getTrending = (): Promise<Movies> =>
  getMovies(`trending/all/week?api_key=${API_KEY}&append_to_response=videos`);

export const queryMovies = ({ queryKey }: QueryFunctionContext): Promise<MoviesDetail> => {
  const movieQuery = queryKey[1];
  return getMovies(`search/movie?api_key=${API_KEY}&language=en-US&query=${movieQuery}&page=1&include_adult=false`);
};

export const queryTv = ({ queryKey }: QueryFunctionContext): Promise<MoviesDetail> => {
  const movieQuery = queryKey[1];
  return getMovies(`search/tv?api_key=${API_KEY}&language=en-US&query=${movieQuery}&page=1&include_adult=false`);
};

export const getDetails = (id: number, type: string): Promise<Interface.Details> => {
  return getMovies(`${type}/${id}?api_key=${API_KEY}&append_to_response=videos,images&include_image_language=en`);
};

export const getConfig = () => getMovies(`configuration?api_key=${API_KEY}`);

const getMovies = async <T,>(url: string): Promise<T> => {
  const response = await BASE_URL.get<T>(url);

  return response.data;
};
