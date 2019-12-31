import { combineReducers } from "redux";
import books from "./book";
import authors from "./author";
import apiCallInProgress from "./apiStatusReducer";

export default combineReducers({ books, authors, apiCallInProgress });
