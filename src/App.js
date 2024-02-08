import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar';
import Home from './pages/Home';

function App() {
  return (
    <div className='app'>
      <Router>
        <AppBar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
