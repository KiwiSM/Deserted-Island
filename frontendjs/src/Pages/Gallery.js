import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Components/Form";
import Menu from "../Components/Menu";

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

    const ViewItem = async (item) => {
        navigate(`${item}`)
        const response = await fetch(`http://localhost:3000/${item}`, {
            method: "GET"
        })
        const data = await response.json()
        console.log(data[0].name);
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
            <Menu />
            {   items ?
                items.map(element => (
                    <div key={element._id} className='Container'>
                        <p>{element.name}</p>
                        <img onClick={() => ViewItem(element._id)} src={element.imgName} alt="" />
                        <button className="delete-button" onClick={() => DeleteItem(element._id)}>X</button>
                    </div>
                )) : null
            }
            <Form />
        </>
    )
}