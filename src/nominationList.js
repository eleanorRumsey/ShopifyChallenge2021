import React from "react";
import Movie from "./movie";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { MAX_NOMINATIONS } from "./search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class NominationList extends React.Component {
	removeNomination(movie) {
		this.props.removeNomination(movie);
	}

	render() {
		return (
			<Col className="nomination-list">
				<h2>Nominations</h2>
				<div>
					{this.props.nominations.length} of {MAX_NOMINATIONS}
				</div>
				<Alert variant={"warning"} show={this.props.maxReached}>
					Maximum reached
				</Alert>
				<ul className="movie-list">
					{this.props.nominations.map((movie) => (
						<li key={movie.imdbID}>
							<div className="movie-container">
								<div>{movie.Title}</div>
								<div className="delete-btn-container">
									<Button
										onClick={() => this.removeNomination(movie)}
										variant="light"
										className="delete-nom"
									>
										<FontAwesomeIcon icon={faTimes} />
									</Button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</Col>
		);
	}
}

export default NominationList;
