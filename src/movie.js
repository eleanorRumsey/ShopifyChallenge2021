import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/esm/Collapse";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Movie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			activeKey: "",
			details: <Spinner animation="border" />,
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
						details: this.formatDetails(result),
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

	formatDetails(details) {
		return (
			<div>
				<div>
					<Badge variant="secondary">{details.Rated}</Badge>
					{details.Runtime}
				</div>
				<div>{details.Plot}</div>
				<div>
					<b>Director: </b>
					{details.Director}
				</div>
				<div>
					<b>Cast: </b>
					{details.Actors}
				</div>
			</div>
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

		this.setActiveKey(newActiveKey);

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

	setActiveKey(key) {
		this.props.setActiveKey(key);
	}

	render() {
		let nomBtnVariant = this.props.disabled ? "success" : "primary";
		let nomBtnText = this.props.disabled ? "Nominated" : "Nominate";

		return (
			<>
				<Card>
					<Accordion.Toggle
						className="movie-header"
						as={Card.Header}
						eventKey={this.props.movie.imdbID}
						onClick={this.showDetails}
						// onMouseEnter={this.showDetails}
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
									<div className="movie-title">{this.props.movie.Title}</div>
									<div>({this.props.movie.Year})</div>
								</div>
							</div>
							<Button
								onClick={this.nominate}
								disabled={this.props.disabled}
								className="nominate-btn"
								variant={nomBtnVariant}
							>
								{nomBtnText}
							</Button>
						</div>
					</Accordion.Toggle>
					<Accordion.Collapse
						eventKey={this.props.movie.imdbID}
						// onMouseLeave={this.hideDetails}
					>
						<Card.Body>{this.state.details}</Card.Body>
					</Accordion.Collapse>
				</Card>
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
