import './App.css';
import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => async function GetItems(){
    const response = await fetch("http://localhost:3000/items", {
      method: "GET"
    });
    const data = await response.json();
    setItems(data);
  }, []);

  async function UpdateItem(data) {
    console.log(items)
    const requestObject = {
      winningItem: data,
      items: items
    }

    const reponse = await fetch("http://localhost:3000/update-item", {
      method: "PATCH",
      body: JSON.stringify(requestObject),
      headers: {"Content-Type" : "application/json"}
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          items.map(element => (
            <p key={element.name} onClick={() => UpdateItem(element._id)} alt="">
              {element.name}
            </p>
          ))
        }
      </header>
    </div>
  );
}