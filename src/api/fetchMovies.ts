import { Movie, Genre, SortOption, OrderOption } from '@/types';

export async function fetchMovies(
  page: number,
  query: string = '',
  sort: SortOption = 'popularity',
  order: OrderOption = 'desc'
): Promise<{
  movies: Movie[];
  genres: Genre[];
  count: number;
  num_pages: number;
  current_page: number;
}> {
  const sortParam = `${sort}.${order}`;
  const validPage = Math.max(1, Math.min(page, 500));

  const endpoint = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=ru-RU&query=${encodeURIComponent(
        query
      )}&page=${validPage}`
    : `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=ru-RU&sort_by=${sortParam}&page=${validPage}`;


  const [moviesRes, genresRes] = await Promise.all([
    fetch(endpoint),
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=ru-RU`
    ),
  ]);

  if (!moviesRes.ok || !genresRes.ok) {
    throw new Error('Ошибка при получении данных от TMDB');
  }

  const moviesData = await moviesRes.json();
  const genresData = await genresRes.json();

  const genresMap: { [key: number]: string } = {};
  genresData.genres.forEach((genre: Genre) => {
    genresMap[genre.id] = genre.name;
  });

  const movies: Movie[] = (moviesData.results || []).map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    description: movie.overview || '',
    imageUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    genres: (movie.genre_ids || []).map((genreId: number) => ({
      id: genreId,
      name: genresMap[genreId] || 'Неизвестно',
    })),
    release_date: movie.release_date || null,
    vote_average: movie.vote_average || null,
    vote_count: movie.vote_count || null,
    popularity: movie.popularity || null,
  }));

  const totalPages = Math.min(moviesData.total_pages || 0, 500);
  const totalResults = Math.min(moviesData.total_results || 0, 500 * 20);

  return {
    movies,
    genres: genresData.genres || [],
    count: totalResults,
    num_pages: totalPages,
    current_page: validPage,
  };
}
