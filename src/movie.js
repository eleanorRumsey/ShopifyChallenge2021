import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

class Movie extends React.Component {
	render() {
		return (
			<div className="movie">
				<div>
					<img
						src={this.props.movie.Poster}
						alt={this.props.movie.Title}
						className="movie-poster"
					/>
				</div>
				<div className="movie-info">
					<div>{this.props.movie.Title}</div>
					<div>{this.props.movie.Year}</div>
				</div>
			</div>
		);
	}
}

export default Movie;
