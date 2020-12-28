import React from 'react';
import Movie from './movie';

class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            movieResults: this.props.movieResults,
            nomListService: this.props.nomListService
        };
    }

    render() {
        const { error, isLoaded, movieResults } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        // } else if (!isLoaded) {
            // return <div>Loading...</div>;
        } else if (typeof this.props.searchValue == undefined || this.props.searchValue == ""){
            return <div>Search for something</div>
        } else if (this.props.movieResults == undefined){
            return <div>No results found</div>
        } else {
            return (
                <div>
                    <ul>
                        {this.props.movieResults.map(movie => (
                            <li key={movie.imdbID}>
                                <Movie 
                                    title={movie.Title}
                                    year={movie.Year}
                                    poster={movie.Poster}
                                    id={movie.imdbID}
                                ></Movie>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default SearchResults;