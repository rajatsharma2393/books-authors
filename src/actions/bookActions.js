import * as types from "./actionType";
import { batch } from "react-redux";

export function addBook(book) {
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
      name: "First Book",
      authorId: 2,
      rating: 3.5
    },
    {
      id: 2,
      name: "Second Book",
      authorId: 1,
      rating: 2.5
    },
    {
      id: 3,
      name: "Third Book",
      authorId: 3,
      rating: 4.5
    }
  ];
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    //   resolve(books);
    // }, 1000);
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
