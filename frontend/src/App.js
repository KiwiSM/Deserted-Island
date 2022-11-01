import './App.css';
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  async function GetItems() {
    const response = await fetch("http://localhost:3000/items", {
      method: "GET"
    });
    const data = await response.json();
    setItems(data);
  };

  GetItems();

  console.log(items);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hej</h1>
      </header>
    </div>
  );
}