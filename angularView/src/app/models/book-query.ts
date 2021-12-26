import { Book } from "./book";

export interface BookQuery {
    books: Book[],
    current: number,
    pages: number
}
