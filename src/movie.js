import React from "react";
import Row from "react-bootstrap/Row";

class Movie extends React.Component {
	render() {
		return (
			<div className="movie">
				{/* <div><img src={this.poster}/></div> */}
				<div>{this.props.movie.Title}</div>
				<div>{this.props.movie.Year}</div>
			</div>
		);
	}
}

export default Movie;
