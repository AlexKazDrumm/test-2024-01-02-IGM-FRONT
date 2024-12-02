export type CatalogType = 'movies' | 'games' | 'books' | 'board-games';

export interface Genre {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  title: string;
  description: string;
  release_date?: string;
  genres: Genre[];
  vote_average?: number;
  vote_count?: number;
  poster_path?: string | null;
  backdrop_path?: string | null;
  popularity?: number;
  publisher?: string | null;
  license_type?: string | null;
  platform?: string | null;
  imageUrl?: string | null; // Добавлено
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  genres: Genre[];
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  budget?: number;
  revenue?: number;
  runtime?: number;
}

export interface Book {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string | null;
  author_names: string[];
  genres: Genre[];
  publisher?: string | null;
  pages?: string | null;
  year?: string | null;
  download?: string | null;
}

export interface MediaItem {
  id: number | string;
  type: CatalogType;
  title: string;
  description?: string;
  imageUrl?: string | null;
  genres?: Genre[];
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  author_names?: string[];
  publisher?: string | null;
  pages?: string | null;
  year?: string | null;
  platform?: string | null;
  download?: string | null;
  [key: string]: any;
  players?: string;
  duration?: string;
}

export type OrderOption = 'asc' | 'desc';

export type SortOption =
  | 'popularity'
  | 'release_date'
  | 'vote_average'
  | 'new'
  | 'old'
  | 'random'
  | 'key'
  | 'relevance'
  | 'title'
  | 'min_players'
  | 'max_players';