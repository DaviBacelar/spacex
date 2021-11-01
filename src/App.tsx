import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeView from './views/Home.view'
import LaunchesView from './views/Launches.view';
import FavouritesView from './views/Favourites.view'
import NotFound from './views/NotFound.view';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/launches" component={LaunchesView} />
        <Route path="/favourites" component={FavouritesView}/>
        <Route path="/" exact component={HomeView} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;