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
      name: "First Author",
      bookIds: [],
      rating: 3.5
    },
    {
      id: 2,
      name: "Second Author",
      bookIds: [],
      rating: 2.5
    },
    {
      id: 3,
      name: "Third Author",
      bookIds: [],
      rating: 4.5
    }
  ];

  return function(dispatch) {
    dispatch(getAuthors(authors));
  };
}
