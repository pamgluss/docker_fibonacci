import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import FibCalculator from './Calculator';
import LandingPage from './LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to='/'>Home</Link>
          <Link to='/calculator'>Calculator</Link>
        </header>
        <Route path='/' exact component={LandingPage} />
        <Route path='/calculator' exact component={FibCalculator} />
      </div>
    </Router>
  );
}

export default App;
