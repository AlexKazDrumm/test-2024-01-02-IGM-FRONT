import { Book, Genre, SortOption, OrderOption } from '@/types';

interface FetchBooksResponse {
  books: Book[];
  genres: Genre[];
  count: number;
  num_pages: number;
  current_page: number;
}

export const fetchBooks = async (
  page: number,
  searchQuery: string = '',
  sort: SortOption = 'title',
  order: OrderOption = 'asc'
): Promise<FetchBooksResponse> => {
  const baseUrl = 'https://www.dbooks.org/api';

  let booksUrl = '';
  if (searchQuery) {
    booksUrl = `${baseUrl}/search/${encodeURIComponent(searchQuery)}`;
  } else {
    booksUrl = `${baseUrl}/search/programming`;
  }

  try {
    const booksRes = await fetch(booksUrl);
    if (!booksRes.ok) {
      throw new Error('Не удалось получить данные о книгах');
    }

    const booksData = await booksRes.json();

    const booksPerPage = 20;
    const totalBooks = parseInt(booksData.total) || (booksData.books ? booksData.books.length : 0);
    const numPages = Math.ceil(totalBooks / booksPerPage);

    const startIndex = (page - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksPage = booksData.books ? booksData.books.slice(startIndex, endIndex) : [];

    const books: Book[] = booksPage.map((book: any) => ({
      id: book.id,
      title: book.title,
      description: book.description || book.subtitle || '',
      imageUrl: book.image || null,
      author_names: book.authors ? book.authors.split(', ') : [],
      genres: [],
      publisher: book.publisher || null,
      pages: book.pages || null,
      year: book.year || null,
      download: book.download || null,
    }));

    if (sort === 'title') {
      books.sort((a, b) => {
        if (a.title < b.title) return order === 'asc' ? -1 : 1;
        if (a.title > b.title) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return {
      books,
      genres: [],
      count: totalBooks,
      num_pages: numPages,
      current_page: page,
    };
  } catch (error) {
    console.error('Ошибка при получении данных книг:', error);
    return {
      books: [],
      genres: [],
      count: 0,
      num_pages: 1,
      current_page: page,
    };
  }
};
