import React from "react";
import Movie from "./movie";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { MAX_NOMINATIONS } from "./search";

class NominationList extends React.Component {
	removeNomination(movie) {
		this.props.removeNomination(movie);
	}

	render() {
		return (
			<Col>
				<div>
					<h2>Nominations</h2>
					<div>
						{this.props.nominations.length} of {MAX_NOMINATIONS}
					</div>
				</div>
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
