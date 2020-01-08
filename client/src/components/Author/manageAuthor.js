import React, { Component } from "react";
import { updateAuthor, addAuthor } from "../../actions/authorActions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class ManageAuthor extends Component {
  state = { author: { ...this.props.currentAuthor } };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({
      author: {
        ...this.state.author,
        [name]: value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.author.id) {
      this.props.updateAuthor(this.state.author);
    } else {
      this.props.addAuthor(this.state.author);
    }
    this.props.history.push("/authors");
  };

  handleAddAnotherBook = () => {
    this.props.history.push("/book/0", {
      authorId: this.state.author.id
    });
  };

  render() {
    let author = this.state.author;
    let currentAuthorBooks = this.props.books.filter(
      book => book.authorId === author.id
    );
    let books = currentAuthorBooks.map(book => (
      <li key={book.id}>{book.name}</li>
    ));
    return (
      <>
        {this.props.books.length === 0 && <Redirect to="/" />}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="id">Author Id:</label>
          <input
            type="text"
            value={author.id}
            onChange={this.handleChange}
            name="id"
          />
          <br />
          <label htmlFor="name">Author Name:</label>
          <input
            type="text"
            value={author.name}
            onChange={this.handleChange}
            name="name"
          />
          <br />
          <ul>{books}</ul>
          <br />
          <button onClick={this.handleAddAnotherBook}>Add another Book</button>
          <br />
          <button type="submit">{author.id === 0 ? "Add" : "Update"}</button>
        </form>
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const authorId = parseInt(ownProps.match.params.id);

  let currentAuthor = {
    id: 0,
    name: "",
    bookIds: []
  };

  if (authorId !== 0 && state.authors.length > 0) {
    currentAuthor =
      state.authors.find(author => author.id === authorId) || currentAuthor;
  }

  return {
    currentAuthor: currentAuthor,
    books: state.books,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  updateAuthor,
  addAuthor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthor);
