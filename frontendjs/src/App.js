import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Battle from './Pages/Battle';
import Gallery from './Pages/Gallery';
import Statistics from './Pages/Statistics';
import History from './Pages/History';
import ItemDetails from './Pages/ItemDetails';
import Menu from './Components/Menu';

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/history" element={<History />} />
          <Route path="/item-details/:id" element={<ItemDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}