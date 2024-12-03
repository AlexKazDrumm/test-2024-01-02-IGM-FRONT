import { MediaItem, CatalogType } from '@/types';

export async function fetchItemDetails(type: CatalogType, id: string): Promise<MediaItem | null> {
  try {
    switch (type) {
      case 'books':
        return await fetchBookDetails(id);
      case 'games':
        return await fetchGameDetails(id);
      case 'movies':
        return await fetchMovieDetails(id);
      case 'board-games':
        return await fetchBoardGameDetails(id);
      default:
        console.error(`Неизвестный тип контента: ${type}`);
        return null;
    }
  } catch (error) {
    console.error(`Ошибка при получении данных для типа ${type} с id ${id}:`, error);
    return null;
  }
}

async function fetchBookDetails(id: string): Promise<MediaItem | null> {
  const res = await fetch(`https://www.dbooks.org/api/book/${id}`);
  if (!res.ok) {
    throw new Error(`Ошибка при получении данных книги: ${res.statusText}`);
  }
  const data = await res.json();

  return {
    id: data.id,
    type: 'books',
    title: data.title,
    description: data.description || data.subtitle || '',
    imageUrl: data.image || null,
    genres: [],
    author_names: data.authors ? data.authors.split(', ') : [],
    publisher: data.publisher || null,
    pages: data.pages || null,
    year: data.year || null,
    download: data.download || null,
  };
}

async function fetchGameDetails(id: string): Promise<MediaItem | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}/`);
  if (!res.ok) {
    throw new Error(`Ошибка при получении данных игры: ${res.statusText}`);
  }
  const data = await res.json();

  return {
    id: data.id,
    type: 'games',
    title: data.title,
    description: data.description || '',
    imageUrl: data.poster_path || data.backdrop_path || null,
    genres: data.genres || [],
    release_date: data.release_date || null,
    vote_average: data.vote_average || null,
    vote_count: data.vote_count || null,
    popularity: data.popularity || null,
    publisher: data.publisher || null,
    platform: data.platform || null,
  };
}

async function fetchMovieDetails(id: string): Promise<MediaItem | null> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=ru-RU`
  );
  if (!res.ok) {
    throw new Error(`Ошибка при получении данных фильма: ${res.statusText}`);
  }
  const data = await res.json();

  return {
    id: data.id,
    type: 'movies',
    title: data.title,
    description: data.overview || '',
    imageUrl: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : null,
    genres: data.genres || [],
    release_date: data.release_date || null,
    vote_average: data.vote_average || null,
    vote_count: data.vote_count || null,
    popularity: data.popularity || null,
  };
}

async function fetchBoardGameDetails(id: string): Promise<MediaItem | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board-games/${id}/`);
  if (!res.ok) {
    throw new Error(`Ошибка при получении данных настольной игры: ${res.statusText}`);
  }
  const data = await res.json();

  return {
    id: data.id,
    type: 'board-games',
    title: data.title,
    description: data.description || '',
    imageUrl: data.image_url || null,
    genres: (data.genres || []).map((genreName: string) => ({ name: genreName })),
    players: data.players,
    duration: data.duration,
    min_players: data.min_players,
    max_players: data.max_players,
  };
}