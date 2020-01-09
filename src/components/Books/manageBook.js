import React, { Component } from "react";
import { updateBook, addBook } from "../../actions/bookActions";
import { connect } from "react-redux";

class ManageBook extends Component {
  state = { book: { ...this.props.currentBook } };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({
      book: {
        ...this.state.book,
        [name]: value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.book.id) {
      this.props.updateBook(this.state.book);
    } else {
      this.props.addBook(this.state.book);
    }
    this.props.history.push("/books");
  };

  handleChangeRating = event => {
    let { name, value } = event.target;
    value = parseFloat(value);
    this.setState({
      book: {
        ...this.state.book,
        [name]: +value
      }
    });
  };

  render() {
    let currentBook = this.state.book;

    let book = (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="bookName">Name</label>
            <input
              type="text"
              className="form-control"
              id="bookName"
              value={currentBook.name}
              placeholder="Enter Name"
              onChange={this.handleChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bookGenre">Genre</label>
            <input
              type="text"
              className="form-control"
              id="bookGenre"
              value={currentBook.genre}
              placeholder="Enter Genre"
              onChange={this.handleChange}
              name="genre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="authorRating">Rating</label>
            <input
              type="number"
              className="form-control"
              id="authorRating"
              value={currentBook.rating}
              placeholder="Enter Rating from 1-5"
              onChange={this.handleChangeRating}
              name="rating"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label htmlFor="authors">Select Author</label>
            <div className="field">
              <select
                name="authors"
                className="form-control"
                defaultValue={currentBook.authorId}
                onChange={this.handleChange}
                name="authorId"
              >
                {this.props.authors.map(author => {
                  return (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            {currentBook.id === 0 ? "Add" : "Update"}
          </button>
        </form>
      </>
    );

    return <>{book}</>;
  }
}

function mapStateToProps(state, ownProps) {
  const bookId = parseInt(ownProps.match.params.id);
  let authorId = 0;
  if (ownProps.location.state) authorId = ownProps.location.state.authorId;
  let currentBook = {
    id: 0,
    name: "",
    genre: "",
    authorId: authorId ? authorId : 0
  };

  if (bookId !== 0 && state.books.length > 0) {
    currentBook = state.books.find(book => book.id === bookId) || currentBook;
  }

  return {
    currentBook: currentBook,
    books: state.books,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  updateBook,
  addBook
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBook);
