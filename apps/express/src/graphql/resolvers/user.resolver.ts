import { books } from '../dataset/dataset';

export const resolvers = {
  Query: {
    books: () => books,
  },
};
