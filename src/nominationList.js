import NominationListService from './nominationListService';
import React from 'react';

class NominationList extends React.Component {
    constructor(props){
        super(props);
        this.maxNominations = 5;
        this.state = {nominations: new Array(this.maxNominations)}
    }

    addNomination(movieID){
        this.setState({
            nominations: this.state.nominations.concat(movieID)
        });
    }

    removeNomination(movieID){
        var noms = this.state.nominations;
        var nomIndex = noms.indexOf(movieID);

        if(nomIndex > -1) {
            noms.splice(nomIndex, 1)

            this.setState({
                nominations: noms
            })
        }
    }

    isMovieNominated(movieID){
        return this.state.nominations.includes(movieID);
    }
}

export default NominationList;