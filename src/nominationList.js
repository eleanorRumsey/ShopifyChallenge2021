import React from 'react';
import Movie from './movie';

class NominationList extends React.Component {
    constructor(props) { //remove
        super(props);
        this.maxNominations = 5; //make constant and import
    }

    render() {
        return (
            <>
                <h2>Nominations</h2>
                <ul>
                    {this.props.nominations.map(movie => (
                        <li key={movie.imdbID}>
                            <Movie
                                movie={movie}
                                isNominated={true}
                            ></Movie>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default NominationList;