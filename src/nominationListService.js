import React from 'react';
import NominationList from './nominationList';

class NominationListService extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            nominationList: new NominationList()
        }
    }

    addNomination(movieId){
        this.nominationList.addNomination(movieId);
    }

    removeNomination(movieId){
        this.nominationList.removeNomination(movieId);
    }

    isMovieNominated(movieId){
        this.nominationList.isMovieNominated(movieId);
    }
}

export default NominationListService;