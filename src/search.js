import React from "react";
import NominationList from "./nominationList";
import SearchResults from "./searchResults";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movieResults: [],
      searchValue: "",
      nominations: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNomination = this.addNomination.bind(this);
    this.isMovieNominated = this.isMovieNominated.bind(this);
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
    fetch(
      `http://www.omdbapi.com/?s=*${event.target.value}*&type=movie&apikey=c470d743`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            movieResults: result.Search,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  addNomination(movie) {
    // if(this.state.nominations.length <= this.maxNominations){
    const newNoms = this.state.nominations.concat(movie);
    this.setState({
      nominations: newNoms,
    });
    // }
    // else {
    // alert("Maximum reached!");
    // }

    // console.log(this.state.nominations);
    return this.state.nominations;
  }

  removeNomination(movieID) {
    var noms = this.state.nominations;
    var nomIndex = noms.indexOf(movieID);

    if (nomIndex > -1) {
      noms.splice(nomIndex, 1);

      this.setState({
        nominations: noms,
      });
    }
  }

  isMovieNominated(movie) {
    return this.state.nominations.includes(movie);
  }

  render() {
    const {
      searchValue,
      movieResults,
      nominations,
      isLoaded,
      error,
    } = this.state;

    return (
      <div>
        <label>
          Name:
          <input type="text" value={searchValue} onChange={this.handleChange} />
        </label>
        <div>Results for "{searchValue}"</div>
        <SearchResults
          isLoaded={isLoaded}
          error={error}
          movieResults={movieResults}
          addNomination={this.addNomination}
          isMovieNominated={this.isMovieNominated}
        />
        <NominationList nominations={nominations}></NominationList>
      </div>
    );
  }
}

export default Search;
