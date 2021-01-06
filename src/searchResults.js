import React from "react";
import Movie from "./movie";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";

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
					<Accordion
						activeKey={this.state.activeKey}
						className="search-results"
					>
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
					</Accordion>
				</div>
			);
		}
	}
}

export default SearchResults;
