import * as types from "../actions/actionType";
import initialState from "./initialState";

const max = 100;
const min = 4;

export default (state = initialState.authors, action) => {
  switch (action.type) {
    case types.ADD_AUTHOR:
      return [
        ...state,
        {
          ...action.author,
          id: Math.floor(Math.random() * (+max - +min)) + +min
        }
      ];
    case types.UPDATE_AUTHOR:
      return state.map(author => {
        return author.id === action.author.id ? action.author : author;
      });
    case types.GET_AUTHORS:
      return [...action.authors];
    case types.DELETE_AUTHOR:
      return state.filter(author => author.id !== action.author.id);
    default:
      return state;
  }
};
