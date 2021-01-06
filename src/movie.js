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
		return this.state.details;
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
			<Popover>
				<Popover.Content>{this.state.details}</Popover.Content>
			</Popover>
		);

		return (
			<>
				<OverlayTrigger
					placement="right"
					delay={{ show: 250, hide: 400 }}
					overlay={details}
				>
					<div className="movie-container" onMouseEnter={this.showDetails}>
						<div className="movie">
							<div>{this.displayPoster()}</div>
							<div className="movie-info">
								<div className="movie-title">{this.props.movie.Title}</div>
								<div>({this.props.movie.Year})</div>
							</div>
						</div>
						<Button
							onClick={this.nominate}
							disabled={this.props.disabled}
							variant={nomBtnVariant}
							size="sm"
						>
							{nomBtnText}
						</Button>
					</div>
				</OverlayTrigger>
			</>
		);
	}
}

export default Movie;
