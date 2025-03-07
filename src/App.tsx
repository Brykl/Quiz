import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import CardPage from "./pages/card/CardPage";

const App = () => {
    return (
      <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/card/:id" element={<CardPage />} />
      </Routes>
  </Router>    
    )
}

export default App
