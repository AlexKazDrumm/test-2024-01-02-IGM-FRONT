import { MediaItem, Genre } from '@/types';

interface FetchBoardGamesResponse {
  items: MediaItem[];
  genres: Genre[];
  count: number;
  num_pages: number;
  current_page: number;
}

export const fetchBoardGames = async (
  page: number,
  searchQuery: string = '',
  sort: string = 'title',
  order: string = 'asc'
): Promise<FetchBoardGamesResponse> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/board-games/`;

  const params = new URLSearchParams({
    page: page.toString(),
  });

  const pageSize = 20;
  params.append('page_size', pageSize.toString());

  if (searchQuery) {
    params.append('query', searchQuery);
  }

  params.append('sort', sort);
  params.append('order', order);

  const boardGamesUrl = `${baseUrl}?${params.toString()}`;

  try {
    const res = await fetch(boardGamesUrl);
    if (!res.ok) {
      throw new Error('Не удалось получить данные о настольных играх');
    }
    const data = await res.json();

    const items: MediaItem[] = data.results.map((game: any) => ({
      id: game.id,
      type: 'board-games',
      title: game.title,
      description: game.description,
      imageUrl: game.image_url || null,
      genres: (game.genres || []).map((genreName: string) => ({ name: genreName })),
      players: game.players,
      duration: game.duration,
      min_players: game.min_players,
      max_players: game.max_players,
    }));

    return {
      items,
      genres: [],
      count: data.count,
      num_pages: Math.ceil(data.count / pageSize),
      current_page: page,
    };
  } catch (error) {
    console.error('Ошибка при получении данных настольных игр:', error);
    return {
      items: [],
      genres: [],
      count: 0,
      num_pages: 1,
      current_page: page,
    };
  }
};