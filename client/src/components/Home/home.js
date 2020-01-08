import React from "react";
import { connect } from "react-redux";
import { loadBooks } from "../../actions/bookActions";
import { loadAuthors } from "../../actions/authorActions";
import PropTypes from "prop-types";
import "./home.css";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

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
        <div>
          <Link to={`/book/${book.id}`}>
            <img src="./logo192.png" />
            {book.name}
          </Link>
        </div>
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
        <div>
          <Link to={`/author/${author.id}`}>
            <img src="./logo192.png" />
            {author.name}
          </Link>
        </div>
        <StarRatings
          rating={author.rating}
          starRatedColor="blue"
          numberOfStars={5}
          name="rating"
        />
      </div>
    ));
    return (
      <>
        {this.props.apiCallInProgress ? (
          <div>Loading</div>
        ) : (
          <>
            <div className="top-books">
              <div className="label">Top Books</div>
              <div className="books">{books}</div>
            </div>
            <div className="top-authors">
              <div className="label">Top Authors</div>
              <div className="authors">{authors}</div>
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
