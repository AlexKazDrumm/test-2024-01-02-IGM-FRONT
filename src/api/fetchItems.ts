import { fetchBooks } from './fetchBooks';
import { fetchGames } from './fetchGames';
import { fetchMovies } from './fetchMovies';
import { fetchBoardGames } from './fetchBoardGames';
import { MediaItem, Genre, SortOption, OrderOption, CatalogType } from '@/types';

interface FetchItemsResponse {
  items: MediaItem[];
  genres: Genre[];
  count: number;
  num_pages: number;
  current_page: number;
}

export const fetchItems = async (
  type: CatalogType,
  page: number,
  searchQuery: string = '',
  sort: SortOption = 'popularity',
  order: OrderOption = 'desc'
): Promise<FetchItemsResponse> => {
  switch (type) {
    case 'books':
      const booksData = await fetchBooks(page, searchQuery, sort, order);
      return {
        items: booksData.books.map((book) => ({ ...book, type: 'books' })),
        genres: booksData.genres,
        count: booksData.count,
        num_pages: booksData.num_pages,
        current_page: booksData.current_page,
      };
    case 'games':
      const gamesData = await fetchGames(page, searchQuery, sort, order);
      return {
        items: gamesData.games,
        genres: gamesData.genres,
        count: gamesData.count,
        num_pages: gamesData.num_pages,
        current_page: gamesData.current_page,
      };
    case 'movies':
      const moviesData = await fetchMovies(page, searchQuery, sort, order);
      return {
        items: moviesData.movies.map((movie) => ({ ...movie, type: 'movies' })),
        genres: moviesData.genres,
        count: moviesData.count,
        num_pages: moviesData.num_pages,
        current_page: moviesData.current_page,
      };
    case 'board-games':
      const boardGamesData = await fetchBoardGames(page, searchQuery, sort, order);
      return {
        items: boardGamesData.items,
        genres: boardGamesData.genres,
        count: boardGamesData.count,
        num_pages: boardGamesData.num_pages,
        current_page: boardGamesData.current_page,
      };
    default:
      return {
        items: [],
        genres: [],
        count: 0,
        num_pages: 1,
        current_page: page,
      };
  }
};