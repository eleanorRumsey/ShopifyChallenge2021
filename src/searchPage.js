const { default: SearchBar } = require("./searchbar");
const { default: SearchResults } = require("./searchResults");

class SearchPage extends React.Component {

    render(){
        return (
            <>
            <SearchBar></SearchBar>
            <SearchResults></SearchResults>
            </>
        );
    }
}
