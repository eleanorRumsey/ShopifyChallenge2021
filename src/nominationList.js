import React from "react";
import Movie from "./movie";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

class NominationList extends React.Component {
	removeNomination(movie) {
		this.props.removeNomination(movie);
	}

	render() {
		return (
			<Col>
				<h2>Nominations</h2>
				<Alert variant={"warning"} show={this.props.maxReached}>
					Maximum reached
				</Alert>
				<ul>
					{this.props.nominations.map((movie) => (
						<li key={movie.imdbID}>
							<Movie movie={movie} isNominated={true}></Movie>
							<Button onClick={() => this.removeNomination(movie)}>
								Remove
							</Button>
						</li>
					))}
				</ul>
			</Col>
		);
	}
}

export default NominationList;
