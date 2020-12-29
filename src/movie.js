import React from "react";
import Row from "react-bootstrap/Row";

class Movie extends React.Component {
	render() {
		return (
			<div>
				<Row>
					{/* <div><img src={this.poster}/></div> */}
					<div>{this.props.movie.Title}</div>
					<div>{this.props.movie.Year}</div>
				</Row>
			</div>
		);
	}
}

export default Movie;
