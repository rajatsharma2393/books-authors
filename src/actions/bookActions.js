import * as types from "./actionType";

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
      authorId: 2
    },
    {
      id: 2,
      name: "Second Book",
      authorId: 1
    },
    {
      id: 3,
      name: "Third Book",
      authorId: 3
    }
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });
}

export function loadBooks() {
  return function(dispatch) {
    dispatch(switchApiCallStatus());
    return getBooksFromApi().then(books => {
      dispatch(getBooks(books));
      dispatch(switchApiCallStatus());
    });
  };
}

export function deleteBook(book) {
  return { type: types.DELETE_BOOK, book };
}
