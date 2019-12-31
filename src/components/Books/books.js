import React from "react";
import { connect } from "react-redux";
import { loadBooks, deleteBook } from "../../actions/bookActions";
import { loadAuthors } from "../../actions/authorActions";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

class Books extends React.Component {
  componentDidMount() {
    if (!this.props.books || this.props.books.length === 0) {
      this.props.loadBooks();
    }
    if (!this.props.authors || this.props.authors.length === 0) {
      this.props.loadAuthors();
    }
  }

  render() {
    let books = this.props.books.map(book => (
      <span key={book.id}>
        <Link to={`/book/${book.id}`}>{book.name}</Link>
        <button onClick={() => this.props.deleteBook(book)}>Delete</button>
        <br />
      </span>
    ));
    return (
      <>
        {this.props.apiCallInProgress ? (
          <div>Loading</div>
        ) : (
          <>
            <h1>Books</h1>
            <Link to="/book/0" className="btn">
              Add book
            </Link>
            <br />
            {books}
          </>
        )}
      </>
    );
  }
}

Books.propTypes = {
  books: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  apiCallInProgress: PropTypes.bool.isRequired,
  loadBooks: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books,
    authors: state.authors,
    apiCallInProgress: state.apiCallInProgress
  };
}

export default connect(
  mapStateToProps,
  { loadBooks, loadAuthors, deleteBook }
)(Books);
