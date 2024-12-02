import { Game, Genre, SortOption, OrderOption, MediaItem } from '../types';

interface FetchGamesResponse {
  games: MediaItem[];
  genres: Genre[];
  count: number;
  num_pages: number;
  current_page: number;
}

export const fetchGames = async (
  page: number,
  searchQuery: string = '',
  sort: SortOption = 'popularity',
  order: OrderOption = 'desc'
): Promise<FetchGamesResponse> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/games/`;
  const genresUrl = `${process.env.NEXT_PUBLIC_API_URL}/genres/`;

  const ordering = order === 'asc' ? sort : `-${sort}`;

  const params = new URLSearchParams({
      page: page.toString(),
  });

  if (searchQuery) {
      params.append('search', searchQuery);
  }

  params.append('ordering', ordering);

  const gamesUrl = `${baseUrl}?${params.toString()}`;

  try {
    const [gamesRes, genresRes] = await Promise.all([
      fetch(gamesUrl),
      fetch(genresUrl),
    ]);

    if (!gamesRes.ok) {
      throw new Error('Не удалось получить данные об играх');
    }

    if (!genresRes.ok) {
      throw new Error('Не удалось получить данные о жанрах');
    }

    const gamesData = await gamesRes.json();
    const genresData = await genresRes.json();

    const genresMap: { [key: number]: string } = {};
    if (genresData) {
      genresData.forEach((genre: Genre) => {
        genresMap[genre.id] = genre.name;
      });
    }

    const games: MediaItem[] = (gamesData.results || []).map((game: any) => ({
      id: game.id,
      type: 'games',
      title: game.title,
      description: game.description || '',
      imageUrl: game.poster_path || game.backdrop_path || null,
      genres: (game.genres || []).map((genre: Genre) => ({
        id: genre.id,
        name: genre.name,
      })),
      release_date: game.release_date || null,
      vote_average: game.vote_average || null,
      vote_count: game.vote_count || null,
      popularity: game.popularity || null,
      publisher: game.publisher || null,
      platform: game.platform || null,
    }));

    return {
      games,
      genres: genresData || [],
      count: gamesData.count || 0,
      num_pages: Math.ceil((gamesData.count || 0) / 20),
      current_page: page,
    };
  } catch (error) {
    console.error('Ошибка при получении данных игр:', error);
    return {
      games: [],
      genres: [],
      count: 0,
      num_pages: 1,
      current_page: page,
    };
  }
};