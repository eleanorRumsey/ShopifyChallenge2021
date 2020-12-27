import React from 'react';

class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        //   movieResults: []
        };
    }

    // componentDidMount(){
    //     fetch("http://www.omdbapi.com/?s=*"+ "spiderman" +"*&apikey=c470d743")
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             this.setState({
    //                 isLoaded: true,
    //                 movieResults: result.Search
    //             });
    //         },
    //         (error) => {
    //             this.setState({
    //                 isLoaded: true,
    //                 error
    //             });
    //         }
    //     )
    // }

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
                    {/* {this.props.searchValue} */}
                    <ul>
                        {this.props.movieResults.map(movie => (
                            <li key={movie.imdbID}>
                                {movie.Title}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default SearchResults;