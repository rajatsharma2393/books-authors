import React from "react";
import { connect } from "react-redux";
import { loadBooks, deleteBook } from "../../actions/bookActions";
import { loadAuthors } from "../../actions/authorActions";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ratingsStyle = {
  width: "30%",
  height: "20%",
  verticalAlign: "top",
  backgroundColor: "rgb(163, 223, 245)"
};

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
    let books = (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Rating</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.books.map(book => {
              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>
                    <Link to={"/book/" + book.id}>{book.name}</Link>
                  </td>
                  <td>{book.genre}</td>
                  <td style={ratingsStyle}>
                    <StarRatings
                      rating={book.rating}
                      starRatedColor="darkblue"
                      numberOfStars={5}
                      name="rating"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => this.props.deleteBook(book)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
    return (
      <>
        {this.props.apiCallInProgress ? (
          <div>Loading</div>
        ) : (
          <>
            <h1>Books</h1>
            <Link to="/book/0" className="btn btn-primary">
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
