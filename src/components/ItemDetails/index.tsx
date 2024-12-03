import React from 'react';
import BookDetails from './BookDetails';
import BoardGameDetails from './BoardGameDetails';
import GameDetails from './GameDetails';
import MovieDetails from './MovieDetails';
import { CatalogType, MediaItem } from '@/types';

const detailsComponents: Record<CatalogType, React.FC<{ item: MediaItem }>> = {
  books: BookDetails,
  'board-games': BoardGameDetails,
  games: GameDetails,
  movies: MovieDetails,
};

export const getDetailsComponent = (type: CatalogType) => detailsComponents[type];