import React from 'react';
import NominationList from './nominationList';

class User extends React.Component {
    
    constructor(props){
        super(props);
        this.name = 'Ellie';

        this.state = {
            nomListService: props.nomService
        }
    }

    render(){
        return <div>{this.name}</div>
    }
}

export default User;