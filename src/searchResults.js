import React from "react";
import Movie from "./movie";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey: "",
		};

		this.setActiveKey = this.setActiveKey.bind(this);
	}

	nominate(movie) {
		this.props.addNomination(movie);
	}

	isMovieNominated(movie) {
		return this.props.isMovieNominated(movie);
	}

	setActiveKey(key) {
		this.setState({
			activeKey: key,
		});
	}

	render() {
		if (this.props.error) {
			return (
				<div className="results-message">Error: {this.props.error.message}</div>
			);
		} else if (!this.props.isLoaded) {
			return (
				<div className="results-message">
					<Spinner
						animation="border"
						role="status"
						className="search-spinner"
					/>
				</div>
			);
		} else if (
			typeof this.props.searchValue === undefined ||
			this.props.searchValue === ""
		) {
			return <div className="results-message">Search for something</div>;
		} else if (this.props.movieResults === undefined) {
			return <div className="results-message">No results found</div>;
		} else {
			return (
				<div className="search-results">
					<ul className="movie-list">
						{this.props.movieResults.map((movie) => (
							<li key={movie.imdbID}>
								<Movie
									movie={movie}
									nominate={this.props.addNomination}
									disabled={this.isMovieNominated(movie)}
									setActiveKey={this.setActiveKey}
								/>
							</li>
						))}
					</ul>
				</div>
			);
		}
	}
}

export default SearchResults;
