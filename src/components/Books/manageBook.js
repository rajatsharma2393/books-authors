import React, { Component } from "react";
import { updateBook, addBook } from "../../actions/bookActions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

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

  render() {
    let book = this.state.book;
    let authors = this.props.authors.map(author => (
      <option value={author.id} key={author.id}>
        {author.name}
      </option>
    ));
    return (
      <>
        {this.props.books.length === 0 && <Redirect to="/" />}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="id">Book Id:</label>
          <input
            type="text"
            value={book.id}
            onChange={this.handleChange}
            name="id"
          />
          <br />
          <label htmlFor="name">Book Name:</label>
          <input
            type="text"
            value={book.name}
            onChange={this.handleChange}
            name="name"
          />
          <br />
          <select
            defaultValue={book.authorId}
            onChange={this.handleChange}
            name="authorId"
          >
            {authors}
          </select>
          <br />
          <button type="submit">{book.id === 0 ? "Add" : "Update"}</button>
        </form>
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const bookId = parseInt(ownProps.match.params.id);
  let authorId = 0;
  if (ownProps.location.state) authorId = ownProps.location.state.authorId;
  let currentBook = {
    id: 0,
    name: "",
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
