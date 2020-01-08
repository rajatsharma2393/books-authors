import React, { Component } from "react";

import { connect } from "react-redux";
import { loadBooks } from "../../actions/bookActions";
import { loadAuthors } from "../../actions/authorActions";

export default ChildComponent => {
  class HOComponent extends Component {
    componentDidMount() {
      if (!this.props.books || this.props.books.length === 0) {
        this.props.loadBooks();
      }
      if (!this.props.authors || this.props.authors.length === 0) {
        this.props.loadAuthors();
      }
    }

    render() {
      if (this.props.books.length === 0 || this.props.authors.length === 0) {
        return <div>Loading..</div>;
      }

      return <ChildComponent />;
    }
  }

  function mapStateToProps(state) {
    return {
      books: state.books,
      authors: state.authors,
      apiCallInProgress: state.apiCallInProgress
    };
  }

  return connect(
    mapStateToProps,
    { loadBooks, loadAuthors }
  )(HOComponent);
};
