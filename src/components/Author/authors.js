import React from "react";
import { connect } from "react-redux";
import * as bookActions from "../../actions/bookActions";
import * as authorActions from "../../actions/authorActions";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

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
    let authors = this.props.authors.map(author => (
      <span key={author.id}>
        <Link to={`/author/${author.id}`}>{author.name}</Link>
        <button onClick={() => this.props.deleteAuthor(author)}>Delete</button>
        <br />
      </span>
    ));
    return (
      <div>
        <h1>Authors</h1>
        <Link to="/author/0" className="btn btn-primary">
          Add Author
        </Link>
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
