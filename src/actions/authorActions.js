import * as types from "./actionType";

export function addAuthor(author) {
  return { type: types.ADD_AUTHOR, author };
}

export function updateAuthor(author) {
  return { type: types.UPDATE_AUTHOR, author };
}

export function getAuthors(authors) {
  return { type: types.GET_AUTHORS, authors };
}

export function deleteAuthor(author) {
  return { type: types.DELETE_AUTHOR, author };
}

export function loadAuthors() {
  let authors = [
    {
      id: 1,
      name: "Dan",
      bookIds: [],
      rating: 3.5,
      age: 25
    },
    {
      id: 2,
      name: "Sam",
      bookIds: [],
      rating: 2.5,
      age: 30
    },
    {
      id: 3,
      name: "Peter",
      bookIds: [],
      rating: 4.5,
      age: 20
    }
  ];

  return function(dispatch) {
    dispatch(getAuthors(authors));
  };
}
