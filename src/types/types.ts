// import * as api from "../api/api";
import { SetStateAction } from "react";
// import { QueryFunctionContext } from "@tanstack/react-query";


export interface SliderType  {
  children: React.ReactNode
  trendingDataCombined: (Details | undefined)[];
  currentIndex: number;
  itemNumber: number;
  singlePadding: number;
  containerPadding: number;
  divHeight?: string;
  transition: boolean;
  handleClick:(item: SetStateAction<number>) => void 
  handleTransition: () => void
  // transition:
}


export interface Media {
  results: MediaResult[]
}

export interface MediaResult {
  adult?: boolean
  backdrop_path?: string
  id: number
  title: string
  original_language?: string
  original_title?: string
  overview?: string
  poster_path: string
  media_type: string
  genre_ids?: number[]
  popularity?: number
  release_date?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  searched: string
}


export interface Details {
  media_type?: string
  key?: number
  adult?: boolean
  backdrop_path?: string
  belongs_to_collection?: BelongsToCollection
  budget?: number
  genres?: Genre[]
  homepage?: string
  id?: number
  imdb_id?: string
  name?: string
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  poster_path?: string
  production_companies?: ProductionCompany[]
  production_countries?: ProductionCountry[]
  release_date?: string
  revenue?: number
  runtime?: number
  spoken_languages?: SpokenLanguage[]
  status?: string
  tagline?: string
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  videos?: Videos
  images?: Images
}

export interface BelongsToCollection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface Videos {
  results: VideoResult[]
}

export interface VideoResult {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface Images {
  backdrops: Backdrop[]
  logos: Logo[]
  posters: Poster[]
}

export interface Backdrop {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Logo {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Poster {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}