import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Search from "./search";
import Header from "./header";

function App() {
	return (
		<div className="App">
			<Header></Header>
			<Search></Search>
		</div>
	);
}

export default App;
