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
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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

		this.getMovieResultsPage();
	}

	getMovieResultsPage() {
		fetch(
			`http://www.omdbapi.com/?s=*${this.state.searchValue}*&type=movie&page=${this.state.currentPage}&apikey=c470d743`
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

		this.setState(
			{
				currentPage: nextPage,
			},
			() => this.getMovieResultsPage()
		);
	}

	clickPrevious() {
		const previousPage = this.state.currentPage - 1;

		this.setState(
			{
				currentPage: previousPage,
			},
			() => this.getMovieResultsPage()
		);
	}

	addNomination(movie) {
		if (this.state.nominations.length < MAX_NOMINATIONS) {
			const newNoms = this.state.nominations.concat(movie);
			this.setState({
				nominations: newNoms,
			});
		} else {
			this.setState({
				maxReached: true,
			});
		}

		return this.state.nominations;
	}

	removeNomination(movie) {
		var noms = this.state.nominations;
		var nomIndex = noms.indexOf(movie);

		if (nomIndex > -1) {
			noms.splice(nomIndex, 1);

			this.setState({
				nominations: noms,
				maxReached: false,
			});
		}
	}

	isMovieNominated(movie) {
		return this.state.nominations.includes(movie);
	}

	paginationComponent() {
		if (this.state.searchValue === "" || this.state.totalResults === 0) {
			return;
		}

		let totalPages = Math.ceil(this.state.totalResults / 10);

		if (totalPages < 1) {
			totalPages = 1;
		}

		let nextPageExists = this.state.currentPage < totalPages;
		let prevPageExists = this.state.currentPage > 1;

		let nextButton = (
			<Button onClick={this.clickNext} disabled={!nextPageExists}>
				Next
			</Button>
		);

		let prevButton = (
			<Button onClick={this.clickPrevious} disabled={!prevPageExists}>
				Previous
			</Button>
		);

		return (
			<div className="pagination-display">
				{prevButton}
				<div>
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
			maxNomsReached: maxReached,
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
					<div className="search-val-display">{searchValueDisplay}</div>
					<SearchResults
						isLoaded={isLoaded}
						error={error}
						movieResults={movieResults}
						addNomination={this.addNomination}
						isMovieNominated={this.isMovieNominated}
						searchValue={searchValue}
					/>
					{this.paginationComponent()}
				</Col>
				<Col>
					<NominationList
						nominations={nominations}
						removeNomination={this.removeNomination}
						maxReached={maxReached}
					/>
				</Col>
			</div>
		);
	}
}

export default Search;
