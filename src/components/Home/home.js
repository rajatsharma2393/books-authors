import React from "react";
import { connect } from "react-redux";
import { loadBooks } from "../../actions/bookActions";
import { loadAuthors } from "../../actions/authorActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

class Home extends React.Component {
  componentDidMount() {
    if (!this.props.books || this.props.books.length === 0) {
      this.props.loadBooks();
    }
    if (!this.props.authors || this.props.authors.length === 0) {
      this.props.loadAuthors();
    }
  }

  render() {
    let topAuthors = [...this.props.authors]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2);
    let topBooks = [...this.props.books]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2);

    let books = topBooks.map(book => (
      <div key={book.id}>
        <span>{book.name}</span>
        <br />
        <StarRatings
          rating={book.rating}
          starRatedColor="blue"
          numberOfStars={5}
          name="rating"
        />
        <br />
      </div>
    ));
    let authors = topAuthors.map(author => (
      <div key={author.id}>
        <span>{author.name}</span>
        <br />
        <StarRatings
          rating={author.rating}
          starRatedColor="blue"
          numberOfStars={5}
          name="rating"
        />
        <br />
      </div>
    ));
    return (
      <>
        {this.props.apiCallInProgress ? (
          <div>Loading</div>
        ) : (
          <>
            <div>
              Top books
              {books}
            </div>
            <div>
              Top authors
              {authors}
            </div>
          </>
        )}
      </>
    );
  }
}

Home.propTypes = {
  books: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  apiCallInProgress: PropTypes.bool.isRequired,
  loadBooks: PropTypes.func.isRequired
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
  { loadBooks, loadAuthors }
)(Home);
