import { SortOption, OrderOption, CatalogType } from '../types';

interface SortOptionLabel {
  value: SortOption;
  label: string;
}

interface HomeSection {
  title: string;
  description: string;
  imageUrl: string;
  detailsUrl: string;
  placeholderUrl: string;
  type: CatalogType;
}

interface SearchConfig {
  endpoint: string;
  title: string;
}

interface CatalogTypeConfig {
  defaultSort: SortOption;
  defaultOrder: OrderOption;
  typeTitle: string;
  placeholderUrl: string;
  sortOptions: SortOptionLabel[];
  homeSection: HomeSection;
  search: SearchConfig;
}

const catalogSettings: Record<CatalogType, CatalogTypeConfig> = {
  movies: {
    defaultSort: 'popularity',
    defaultOrder: 'desc',
    typeTitle: 'фильмов',
    placeholderUrl: '/placeholders/movies.webp',
    sortOptions: [
      { value: 'popularity', label: 'По популярности' },
      { value: 'release_date', label: 'По дате выхода' },
      { value: 'vote_average', label: 'По рейтингу' },
    ],
    homeSection: {
      title: 'Фильмы',
      description: 'Откройте для себя лучшие фильмы',
      imageUrl: '/placeholders/movies.webp',
      detailsUrl: '/catalog/movies',
      placeholderUrl: '/placeholders/movie-placeholder.png',
      type: 'movies',
    },
    search: {
      endpoint: '/api/search/movies',
      title: 'Фильмы',
    },
  },
  games: {
    defaultSort: 'popularity',
    defaultOrder: 'desc',
    typeTitle: 'игр',
    placeholderUrl: '/placeholders/pcgames.webp',
    sortOptions: [
      { value: 'popularity', label: 'По популярности' },
      { value: 'release_date', label: 'По дате выхода' },
      { value: 'vote_average', label: 'По рейтингу' },
    ],
    homeSection: {
      title: 'Игры',
      description: 'Исследуйте наш каталог игр',
      imageUrl: '/placeholders/pcgames.webp',
      detailsUrl: '/catalog/games',
      placeholderUrl: '/placeholders/game-placeholder.png',
      type: 'games',
    },
    search: {
      endpoint: '/api/search/games',
      title: 'Игры',
    },
  },
  books: {
    defaultSort: 'title',
    defaultOrder: 'asc',
    typeTitle: 'книг',
    placeholderUrl: '/placeholders/books.webp',
    sortOptions: [
      { value: 'title', label: 'По названию' },
      { value: 'relevance', label: 'По релевантности' },
    ],
    homeSection: {
      title: 'Книги',
      description: 'Погрузитесь в наш каталог книг',
      imageUrl: '/placeholders/books.webp',
      detailsUrl: '/catalog/books',
      placeholderUrl: '/placeholders/book-placeholder.png',
      type: 'books',
    },
    search: {
      endpoint: '/api/search/books',
      title: 'Книги',
    },
  },
  'board-games': {
    defaultSort: 'title',
    defaultOrder: 'asc',
    typeTitle: 'настольных игр',
    placeholderUrl: '/placeholders/tbgames.webp',
    sortOptions: [
      { value: 'title', label: 'По названию' },
      { value: 'min_players', label: 'По мин. кол-ву игроков' },
      { value: 'max_players', label: 'По макс. кол-ву игроков' },
    ],
    homeSection: {
      title: 'Настольные игры',
      description: 'Откройте для себя настольные игры',
      imageUrl: '/placeholders/tbgames.webp',
      detailsUrl: '/catalog/board-games',
      placeholderUrl: '/images/board-game-placeholder.jpg',
      type: 'board-games',
    },
    search: {
      endpoint: '/api/search/board-games',
      title: 'Настольные игры',
    },
  },
};

export default catalogSettings;