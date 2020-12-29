import React from "react";
import NominationList from "./nominationList";
import SearchResults from "./searchResults";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
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
			searchValue: "",
			nominations: [],
			maxReached: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.addNomination = this.addNomination.bind(this);
		this.removeNomination = this.removeNomination.bind(this);
		this.isMovieNominated = this.isMovieNominated.bind(this);
	}

	handleChange(event) {
		this.setState({
			searchValue: event.target.value,
			isLoaded: false,
		});
		fetch(
			`http://www.omdbapi.com/?s=*${event.target.value}*&type=movie&apikey=c470d743`
		)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						movieResults: result.Search,
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

	render() {
		const {
			searchValue,
			movieResults,
			nominations,
			isLoaded,
			error,
			maxReached,
		} = this.state;

		return (
			<div>
				<InputGroup>
					<InputGroup.Prepend>
						<InputGroup.Text className="search-input-prepend">
							<FontAwesomeIcon icon={faSearch} />
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="search-input"
						type="text"
						value={searchValue}
						onChange={this.handleChange}
						placeholder="Movie title"
					/>
				</InputGroup>
				<div>Results for "{searchValue}"</div>
				<Container>
					<Row>
						<Col>
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
								maxReached={maxReached}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Search;
