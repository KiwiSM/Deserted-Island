import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
    const [items, setItems] = useState();
    const navigate = useNavigate();

    useEffect(() => async function GetItems(){
        const response = await fetch("http://localhost:3000/all-items", {
          method: "GET"
        });
        const data = await response.json();
        setItems(data);
      }, []);

    function ViewItem(item) {
        navigate(`/item-details/${item}`)
    }

    function DeleteItem(item) {
        fetch("http://localhost:3000/delete-item", {
            method: "DELETE",
            body: JSON.stringify({item}),
            headers: { "Content-Type" : "application/json"}
        })
    }

    return (
        <>
            <h1>Here are all the available in-game items</h1>
            <span>Do you wish to submit another item? Fill out the form: </span> 
            <span onClick={() => {navigate("/form")}} className="submit-item">Submit item</span>
            <div className="wrapper">
                {   
                    items ?
                    items.map(element => (
                        <div key={element._id} className='container'>
                            <p>{element.name}</p>
                            <img onClick={() => ViewItem(element._id)} src={element.imgName} alt="" />
                            <button className="delete-button" onClick={() => DeleteItem(element._id)}>X</button>
                        </div>
                    )) : null
                }
            </div>
        </>
    )
}