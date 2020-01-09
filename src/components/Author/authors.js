import React from "react";
import { connect } from "react-redux";
import * as bookActions from "../../actions/bookActions";
import * as authorActions from "../../actions/authorActions";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ratingsStyle = {
  width: "30%",
  height: "20%",
  verticalAlign: "top",
  backgroundColor: "rgb(163, 223, 245)"
};
class Authors extends React.Component {
  componentDidMount() {
    if (!this.props.authors || this.props.authors.length === 0) {
      this.props.loadAuthors();
    }
    if (!this.props.books || this.props.books.length === 0) {
      this.props.loadBooks();
    }
  }

  render() {
    let authors = (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Rating</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.authors.map(author => {
              return (
                <tr key={author.id}>
                  <td>{author.id}</td>
                  <td>
                    <Link to={"/author/" + author.id}>{author.name}</Link>
                  </td>
                  <td>{author.age}</td>
                  <td style={ratingsStyle}>
                    <StarRatings
                      rating={author.rating}
                      starRatedColor="darkblue"
                      numberOfStars={5}
                      name="rating"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => this.props.deleteAuthor(author)}
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
      <div>
        <h1>Authors</h1>
        <Link to="/author/0" className="btn btn-primary">
          Add Author
        </Link>
        <br />
        <br />
        {authors}
      </div>
    );
  }
}

Authors.propTypes = {
  books: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  apiCallInProgress: PropTypes.bool.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books,
    authors: state.authors,
    apiCallInProgress: state.apiCallInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadBooks: () => dispatch(bookActions.loadBooks()),
    deleteAuthor: author => dispatch(authorActions.deleteAuthor(author)),
    loadAuthors: () => dispatch(authorActions.loadAuthors())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authors);
