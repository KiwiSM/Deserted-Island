import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Battle from './Pages/Battle';
import Gallery from './Pages/Gallery';
import Statistics from './Pages/Statistics';
import History from './Pages/History';

export default function App() {
  return (
    <Router>
      <main className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </Router>
  );
}