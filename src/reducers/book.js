import * as types from "../actions/actionType";
import initialState from "./initialState";

const max = 100;
const min = 4;

export default (state = initialState.books, action) => {
  switch (action.type) {
    case types.ADD_BOOK:
      return [
        ...state,
        { ...action.book, id: Math.floor(Math.random() * (+max - +min)) + +min }
      ];
    case types.UPDATE_BOOK:
      return state.map(book => {
        return book.id === action.book.id ? action.book : book;
      });
    case types.GET_BOOKS:
      return [...action.books];
    case types.DELETE_BOOK:
      return state.filter(book => book.id !== action.book.id);
    default:
      return state;
  }
};
