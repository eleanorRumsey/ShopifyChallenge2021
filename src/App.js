import './App.css';
import User from './user';
import Search from './search';
import Header from './header';
import NominationListService from './nominationListService'

function App() {
  const nomService = new NominationListService();

  return (
    <div className="App">
      <User nomService={nomService}></User>
      <Header></Header>
      <Search nomService={nomService}></Search>
    </div>
  );
}

export default App;
