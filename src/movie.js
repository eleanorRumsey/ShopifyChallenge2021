import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/esm/Collapse";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

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
		this.getMovieDetails(this.props.movie.imdbID);
		return this.state.details;
	}

	nominate() {
		this.props.nominate(this.props.movie);
	}

	setActiveKey(key) {
		this.props.setActiveKey(key);
	}

	displayPoster() {
		if (this.props.movie.Poster === "N/A") {
			return <FontAwesomeIcon icon={faFilm} className="fa-2x movie-poster" />;
		}

		return (
			<img
				src={this.props.movie.Poster}
				alt={this.props.movie.Title}
				className="movie-poster"
			/>
		);
	}

	render() {
		let nomBtnVariant = this.props.disabled ? "success" : "primary";
		let nomBtnText = this.props.disabled ? "Nominated" : "Nominate";

		let details = (
			<Popover class="movie-overlay">
				<Popover.Title>
					<div className="movie-info">
						<div>
							{this.props.movie.Title} ({this.props.movie.Year})
						</div>
					</div>
				</Popover.Title>
				<Popover.Content>{this.state.details}</Popover.Content>
			</Popover>
		);

		return (
			<>
				<OverlayTrigger
					placement="right"
					delay={{ show: 250, hide: 400 }}
					onToggle={this.showDetails}
					overlay={details}
				>
					<div className="movie-container">
						<Card className="movie">
							<Card.Img
								variant="top"
								src={this.props.movie.Poster}
								className="movie-poster"
							/>
							<Button
								onClick={this.nominate}
								disabled={this.props.disabled}
								variant={nomBtnVariant}
								size="sm"
								className="nominate-btn"
							>
								{nomBtnText}
							</Button>
						</Card>
					</div>
				</OverlayTrigger>
			</>
		);
	}
}

export default Movie;
