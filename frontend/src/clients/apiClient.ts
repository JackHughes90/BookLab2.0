const backendUrl = process.env["REACT_APP_BACKEND_DOMAIN"];

export interface ListResponse<T> {
  items: T[];
}

export interface Book {
  id: number;
  title: string;
  coverUrl: string;
  description: string;
  authors: Author[];
  genres: Genre[];
}

export interface Author {
  id: number;
  name: string;
  books: Book[];
  description: string;
  imageUrl: string;
}

export interface Genre {
  id: number;
  name: string;
  books: Book[];
}

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${backendUrl}/books`);
  const bookListResponse: ListResponse<Book> = await response.json();
  return bookListResponse.items;
};

export const getBookById = async (bookId: string): Promise<Book> => {
  const response = await fetch(`${backendUrl}/books/${bookId}`);
  return await response.json();
};

export const getBooksBySearch = async (searchTerm: string): Promise<Book[]> => {
  const response = await fetch(`${backendUrl}/books/search/${searchTerm}`);
  const bookListResponse: ListResponse<Book> = await response.json();
  return bookListResponse.items;
};

export const getAllAuthors = async (): Promise<Author[]> => {
  const response = await fetch(`${backendUrl}/authors`);
  const authorListResponse: ListResponse<Author> = await response.json();
  return authorListResponse.items;
};

export const getAuthorById = async (authorId: string): Promise<Author> => {
  const response = await fetch(`${backendUrl}/authors/${authorId}`);
  return await response.json();
};

export const getAuthorsBySearch = async (
  searchTerm: string
): Promise<Author[]> => {
  const response = await fetch(`${backendUrl}/authors/search/${searchTerm}`);
  const authorListResponse: ListResponse<Author> = await response.json();
  return authorListResponse.items;
};
