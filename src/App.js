
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'
import CreateEmp from './pages/CreateEmp';
import EditEmp from './pages/EditEmp';
import ShowEmp from './pages/ShowEmp';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateEmp />} />
          <Route path="/show" element={<ShowEmp />} />
          <Route path="/edit/:id" element={<EditEmp />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
