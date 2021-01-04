import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/esm/Collapse";

class Movie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			activeKey: "",
			details: <div></div>,
		};

		this.getMovieDetails = this.getMovieDetails.bind(this);
		this.showDetails = this.showDetails.bind(this);
		this.hideDetails = this.hideDetails.bind(this);
		this.nominate = this.nominate.bind(this);
	}

	getMovieDetails(imdbID) {
		fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=c470d743`)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						details: (
							<div>
								<div>{result.Rated}</div>
								<div>{result.Runtime}</div>
								<div>{result.Plot}</div>
								<div>
									<b>Director:</b>
									{result.Director}
								</div>
								<div>{this.Actors}</div>
							</div>
						),
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);
	}

	showDetails() {
		let newActiveKey = "";

		if (this.state.activeKey === "") {
			newActiveKey = this.props.movie.imdbID;
		}

		this.setState({
			hovered: true,
			activeKey: newActiveKey,
		});

		this.getMovieDetails(this.props.movie.imdbID);
	}

	hideDetails() {
		this.setState({
			activeKey: "",
			details: <div></div>,
		});
	}

	nominate() {
		this.props.nominate(this.props.movie);
	}

	render() {
		return (
			<>
				<Accordion activeKey={this.state.activeKey}>
					<Card>
						<Accordion.Toggle
							as={Card.Header}
							eventKey={this.props.movie.imdbID}
							onClick={this.showDetails}
							onMouseEnter={this.showDetails}
						>
							<div className="movie-container">
								<div className="movie">
									<div>
										<img
											src={this.props.movie.Poster}
											alt={this.props.movie.Title}
											className="movie-poster"
										/>
									</div>
									<div className="movie-info">
										<h4>{this.props.movie.Title}</h4>
										<div>({this.props.movie.Year})</div>
									</div>
								</div>
								<Button
									onClick={this.nominate}
									disabled={this.props.disabled}
									className="nominate-btn"
								>
									Nominate
								</Button>
							</div>
						</Accordion.Toggle>
						<Accordion.Collapse
							eventKey={this.props.movie.imdbID}
							onMouseLeave={this.hideDetails}
						>
							<Card.Body>{this.state.details}</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
				{/* <div className="movie-container" onMouseEnter={this.showDetails}>
					<div
						className="movie"
						onMouseEnter={this.showDetails}
						onMouseLeave={this.hideDetails}
					>
						<div>
							<img
								src={this.props.movie.Poster}
								alt={this.props.movie.Title}
								className="movie-poster"
							/>
						</div>
						<div className="movie-info">
							<h4>{this.props.movie.Title}</h4>
							<div>({this.props.movie.Year})</div>
						</div>
					</div>
					<Button
						onClick={this.nominate}
						disabled={this.props.disabled}
						className="nominate-btn"
					>
						Nominate
					</Button>
				</div>
				<Collapse in={this.state.hovered}>{this.state.details}</Collapse> */}
			</>
		);
	}
}

export default Movie;
