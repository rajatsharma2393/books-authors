import * as types from "./actionType";
import { batch } from "react-redux";

export function addBook(book) {
  console.log(book);
  return { type: types.ADD_BOOK, book };
}

export function updateBook(book) {
  return { type: types.UPDATE_BOOK, book };
}

export function getBooks(books) {
  return { type: types.GET_BOOKS, books };
}

function switchApiCallStatus() {
  return { type: types.SWITCH };
}

function getBooksFromApi() {
  let books = [
    {
      id: 1,
      name: "React1JS",
      genre: "1",
      authorId: 2,
      rating: 3.5
    },
    {
      id: 2,
      name: "React-Router",
      genre: "2",
      authorId: 1,
      rating: 2.5
    },
    {
      id: 3,
      name: "React-Redux",
      genre: "3",
      authorId: 3,
      rating: 4.5
    }
  ];
  return new Promise((resolve, reject) => {
    resolve(books);
  });
}

export function loadBooks() {
  return function(dispatch) {
    dispatch(switchApiCallStatus());
    return getBooksFromApi().then(books => {
      batch(() => {
        dispatch(getBooks(books));
        dispatch(switchApiCallStatus());
      });
    });
  };
}

export function deleteBook(book) {
  return { type: types.DELETE_BOOK, book };
}
