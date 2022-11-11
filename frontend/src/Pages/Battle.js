import { useState, useEffect } from "react";

export default function Battle() {
/*   interface Item {
    _id: string | undefined,
    name: string,
    age: string,
    favUser: string,
    usage: string,
    imgName: string,
    wins: number,
    defeats: number,
    games: number
  } */

  const [items, setItems] = useState([]);
  const [oldItems, setOldItems] = useState([]);
  const [previous, setPrevious] = useState(false);

  useEffect(() => async function GetItems() {
      const response = await fetch("http://localhost:3000/items", {
        method: "GET"
      });
      const data = await response.json();
      console.log(data);
      setItems(data)
    }, [oldItems]);  

  function Update(data) {
     function UpdateItem(data) {
      const requestObject = {
        winningItem: data,
        losingItem: items
      }
        fetch("http://localhost:3000/update-item", {
        method: "PATCH",
        body: JSON.stringify(requestObject),
        headers: {"Content-Type" : "application/json"}
      })
      setOldItems(items);
    }
    UpdateItem(data)
    setPrevious(true);
  }

  return (
    <>
      <div className="wrapper">
        <div className="tiny-wrapper">
          <h2>BATTLE:</h2>
          {
            items.map(element => (
                <div key={element._id} className='container'>
                    <p>{element.name}</p>
                    <img onClick={() => Update(element)} src={element.imgName} alt="" />
                </div>
            ))
          }
        </div>
        <div className={`${previous ? "tiny-wrapper" : "hide-tiny-wrapper"}`}>
          <h2>Previous items: </h2>
          {
            oldItems ?
            oldItems.map(element => (
                <div key={element._id} className='container'>
                    <p>{element.name}</p>
                    <img src={element.imgName} alt="" />
                    <p>Wins: {element.wins} Defeats: {element.defeats}</p>
                </div>
            )) : null
          }
        </div>
      </div>
    </>
  )
}