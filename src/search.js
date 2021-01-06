import React from "react";
import NominationList from "./nominationList";
import SearchResults from "./searchResults";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faArrowRight,
	faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export const MAX_NOMINATIONS = 5;

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: true,
			movieResults: [],
			totalResults: 0,
			searchValue: "",
			nominations: [],
			maxNomsReached: false,
			currentPage: 1,
		};

		this.handleChange = this.handleChange.bind(this);
		this.addNomination = this.addNomination.bind(this);
		this.removeNomination = this.removeNomination.bind(this);
		this.isMovieNominated = this.isMovieNominated.bind(this);
		this.clickNext = this.clickNext.bind(this);
		this.clickPrevious = this.clickPrevious.bind(this);
	}

	handleChange(event) {
		this.setState({
			searchValue: event.target.value,
			isLoaded: false,
			currentPage: 1,
		});

		this.getMovieResultsPage(event.target.value, 1);
	}

	getMovieResultsPage(value, page) {
		const searchVal = value.trim();

		fetch(
			`http://www.omdbapi.com/?s=*${searchVal}*&type=movie&page=${page}&apikey=c470d743`
		)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						movieResults: result.Search,
						totalResults: result.totalResults,
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

	clickNext() {
		const nextPage = this.state.currentPage + 1;

		this.setState({
			currentPage: nextPage,
		});

		this.getMovieResultsPage(this.state.searchValue, nextPage);
	}

	clickPrevious() {
		const previousPage = this.state.currentPage - 1;

		this.setState({
			currentPage: previousPage,
		});

		this.getMovieResultsPage(this.state.searchValue, previousPage);
	}

	addNomination(movie) {
		if (this.isMovieNominated(movie)) {
			return;
		} else if (this.state.nominations.length < MAX_NOMINATIONS) {
			const newNoms = this.state.nominations.concat(movie);
			this.setState({
				nominations: newNoms,
			});
		} else {
			this.setState({
				maxNomsReached: true,
			});
		}
	}

	removeNomination(movie) {
		var noms = this.state.nominations;
		var nomIndex = noms.indexOf(movie);

		if (nomIndex > -1) {
			noms.splice(nomIndex, 1);

			this.setState({
				nominations: noms,
				maxNomsReached: false,
			});
		}
	}

	isMovieNominated(movie) {
		return this.state.nominations.some(
			(nomination) => nomination.imdbID === movie.imdbID
		);
	}

	paginationComponent() {
		if (
			this.state.searchValue === "" ||
			this.state.totalResults === 0 ||
			isNaN(this.state.totalResults)
		) {
			return;
		}

		let totalPages = Math.ceil(this.state.totalResults / 10);

		if (totalPages < 1) {
			totalPages = 1;
		}

		let nextPageExists = this.state.currentPage < totalPages;
		let prevPageExists = this.state.currentPage > 1;

		let nextButton = (
			<Button
				onClick={this.clickNext}
				disabled={!nextPageExists}
				variant="light"
				className="round-btn"
				size="sm"
			>
				<FontAwesomeIcon icon={faArrowRight} />
			</Button>
		);

		let prevButton = (
			<Button
				onClick={this.clickPrevious}
				disabled={!prevPageExists}
				variant="light"
				className="round-btn"
				size="sm"
			>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Button>
		);

		return (
			<div className="pagination-display">
				{prevButton}
				<div className="pagination-text">
					Page {this.state.currentPage} of {totalPages}
				</div>
				{nextButton}
			</div>
		);
	}

	render() {
		const {
			searchValue,
			movieResults,
			nominations,
			isLoaded,
			error,
			maxNomsReached,
		} = this.state;

		let searchValueDisplay =
			this.state.searchValue === "" ? (
				<div></div>
			) : (
				<div>Results for "{this.state.searchValue}"</div>
			);

		return (
			<div className="search-and-noms">
				<Col xs={8}>
					<InputGroup size="lg">
						<InputGroup.Prepend>
							<InputGroup.Text className="search-input-prepend">
								<FontAwesomeIcon icon={faSearch} />
							</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							className="search-input"
							type="text"
							value={searchValue}
							onChange={this.handleChange}
							placeholder="Movie title"
						/>
					</InputGroup>
					<div className="search-val-and-pagination">
						{searchValueDisplay}
						{this.paginationComponent()}
					</div>
					<SearchResults
						isLoaded={isLoaded}
						error={error}
						movieResults={movieResults}
						addNomination={this.addNomination}
						isMovieNominated={this.isMovieNominated}
						searchValue={searchValue}
					/>
				</Col>
				<Col>
					<NominationList
						nominations={nominations}
						removeNomination={this.removeNomination}
						maxReached={maxNomsReached}
					/>
				</Col>
			</div>
		);
	}
}

export default Search;
