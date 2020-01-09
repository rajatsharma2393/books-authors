import React, { Component } from "react";
import { updateAuthor, addAuthor } from "../../actions/authorActions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import StarRatings from "react-star-ratings";

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

  handleChangeRating = event => {
    let { name, value } = event.target;
    value = parseFloat(value);
    this.setState({
      author: {
        ...this.state.author,
        [name]: +value
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
    let currentAuthor = this.state.author;

    let author = (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="authorName">Name</label>
          <input
            type="text"
            className="form-control"
            id="authorName"
            value={currentAuthor.name}
            placeholder="Enter Name"
            onChange={this.handleChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label for="authorAge">Age</label>
          <input
            type="number"
            className="form-control"
            id="authorAge"
            value={currentAuthor.age}
            placeholder="Enter Age"
            onChange={this.handleChange}
            name="age"
          />
        </div>
        <div className="form-group">
          <label for="authorRating">Rating</label>
          <input
            type="number"
            className="form-control"
            id="authorRating"
            value={currentAuthor.rating}
            placeholder="Enter Rating from 1-5"
            onChange={this.handleChangeRating}
            name="rating"
            step="0.01"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {currentAuthor.id === 0 ? "Add" : "Update"}
        </button>
      </form>
    );

    return (
      <>
        {author}
        <br />
        {currentAuthor.id !== 0 && (
          <button
            className="btn btn-secondary"
            onClick={this.handleAddAnotherBook}
          >
            Add Book for this Author
          </button>
        )}
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
