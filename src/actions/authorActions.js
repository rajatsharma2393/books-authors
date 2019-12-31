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
      bookIds: []
    },
    {
      id: 2,
      name: "Second Author",
      bookIds: []
    },
    {
      id: 3,
      name: "Third Author",
      bookIds: []
    }
  ];
  return function(dispatch) {
    dispatch(getAuthors(authors));
  };
}
