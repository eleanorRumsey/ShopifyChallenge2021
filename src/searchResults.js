import React from "react";
import Movie from "./movie";
import Button from "react-bootstrap/Button";

class SearchResults extends React.Component {
  nominate(movie) {
    this.props.addNomination(movie);
  }

  isMovieNominated(movie) {
    return this.props.isMovieNominated(movie);
  }

  render() {
    if (this.props.error) {
      return <div>Error: {this.props.error.message}</div>;
    } else if (!this.props.isLoaded) {
      return <div>Loading...</div>;
    } else if (
      typeof this.props.searchValue === undefined ||
      this.props.searchValue === ""
    ) {
      return <div>Search for something</div>;
    } else if (this.props.movieResults === undefined) {
      return <div>No results found</div>;
    } else {
      return (
        <div>
          <ul>
            {this.props.movieResults.map((movie) => (
              <li key={movie.imdbID}>
                <Movie
                  movie={movie}
                  addNomination={this.props.addNomination}
                ></Movie>
                <Button
                  onClick={() => this.nominate(movie)}
                  disabled={this.isMovieNominated(movie)}
                >
                  Nominate
                </Button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default SearchResults;
