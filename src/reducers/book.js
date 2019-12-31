import * as types from "../actions/actionType";
import initialState from "./initialState";

export default (state = initialState.books, action) => {
  switch (action.type) {
    case types.ADD_BOOK:
      return [...state, { ...action.book }];
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
