import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Battle from './Pages/Battle';

export default function App() {
  return (
    <Router>
      <main className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/gallery" />
          <Route path="/statistics" />
          <Route path="/history" />
        </Routes>
      </main>
    </Router>
  );
}