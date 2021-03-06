import React from "react";
import Movie from "./movie";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { MAX_NOMINATIONS } from "./search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrophy } from "@fortawesome/free-solid-svg-icons";

class NominationList extends React.Component {
	removeNomination(movie) {
		this.props.removeNomination(movie);
	}

	getNomKey(id) {
		return id + "-nom";
	}

	render() {
		return (
			<Col className="nomination-list">
				<div className="nomination-logo-container">
					<div className="nomination-logo">
						<FontAwesomeIcon icon={faTrophy} className="fa-2x" />
					</div>
				</div>
				<div className="nominations-title">
					<h4>Nominations</h4>
					<div style={{ color: "#495057" }}>
						{this.props.nominations.length} of {MAX_NOMINATIONS}
					</div>
				</div>
				<Alert variant={"warning"} show={this.props.maxReached}>
					You may only nominate 5 movies
				</Alert>
				<ul className="movie-list">
					{this.props.nominations.map((movie) => (
						<li key={this.getNomKey(this.getNomKey(movie.imdbID))}>
							<div className="nomination-container">
								<div>{movie.Title}</div>
								<div className="delete-btn-container">
									<Button
										onClick={() => this.removeNomination(movie)}
										variant="light"
										className="round-btn"
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
