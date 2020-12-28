import React from 'react';
import SearchResults from './searchResults';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          movieResults: [],
          searchValue: '',
          nomListService: this.props.nomService
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({searchValue: event.target.value});
        fetch("http://www.omdbapi.com/?s=*"+ event.target.value +"*&type=movie&apikey=c470d743")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    movieResults: result.Search
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.searchValue);
        event.preventDefault();
    }

    render(){
        const { searchValue, movieResults } = this.state;
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={searchValue} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div>Results for "{searchValue}"</div>
            <SearchResults movieResults = {movieResults} nomListService = {this.state.nomListService} />
        </div>);
    }
}

export default Search;