import { useState, useEffect } from "react";

export default function Battle(){
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
    }

    return (
        <>
            {
                oldItems ?
                oldItems.map(element => (
                    <div key={element._id} className='Container'>
                        <p>{element.name}</p>
                        <img src={element.imgName} alt="" />
                    </div>
                )) : null
            }
            {
                items.map(element => (
                    <div key={element._id} className='Container'>
                        <p>{element.name}</p>
                        <img onClick={() => Update(element._id)} src={element.imgName} alt="" />
                    </div>
                ))
            }
        </>
    )
}