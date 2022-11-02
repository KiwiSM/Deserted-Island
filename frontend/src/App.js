import './App.css';
import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [oldItems, setOldItems] = useState([]);

  useEffect(() => async function GetItems(){
    const response = await fetch("http://localhost:3000/items", {
      method: "GET"
    });
    const data = await response.json();
    setItems(data);
  }, [oldItems]);

  function Update(data) {
    async function UpdateItem(data) {
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
    UpdateItem(data)
    setOldItems(items);
    console.log(oldItems);
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          oldItems ?
          
          oldItems.map(element => (
            <p key={element.name} alt="">
              {element.name}
            </p>
          )) : null
        }
        {
          items.map(element => (
            <p key={element.name} onClick={() => Update(element._id)} alt="">
              {element.name}
            </p>
          ))
        }
      </header>
    </div>
  );
}