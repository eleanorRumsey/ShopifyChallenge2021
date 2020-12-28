import React from 'react';

class Movie extends React.Component {
    constructor(props){
        super(props);

        this.title = props.title;
        this.year = props.year;
        this.poster = props.poster;
        this.id = props.id;

        this.state = {
            isNominated: false,
            nomListService: this.props.nomListService
        }
    }

    nominate(id){
        this.state.nomListService.addNomination(id);
    }

    render(){
        return (
            <div>
                <row>
                    {/* <div><img src={this.poster}/></div> */}
                    <div>{this.title}</div>
                    <div>{this.year}</div>
                </row>
            </div>
        );
    }
}

export default Movie;