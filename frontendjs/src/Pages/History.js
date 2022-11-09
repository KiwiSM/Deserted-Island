import { useState, useEffect } from "react";
import Menu from "../Components/Menu";

export default function History() {
    const [items, setItems] = useState();

    useEffect(() => async function GetItems(){
        const response = await fetch("http://localhost:3000/history", {
          method: "GET"
        });
        const data = await response.json();
        setItems(data);
    }, []);

    console.log(items);

    return (
        <>
            <Menu />
            <h1>Previous battles:</h1>
            {   items ?
                items.map(element => (
                    <div key={element._id} className='history'>
                        <h3>BATTLE:</h3>
                        <h6>WINNER:</h6>
                        <p>{element.winner.name}</p>
                        <img src={element.winner.imgName} alt="" />
                        <p>Wins: {element.winner.wins}, Defeats: {element.winner.defeats}</p>
                        <h6>LOSER:</h6>
                        <p>{element.loser.name}</p>
                        <img src={element.loser.imgName} alt="" />
                        <p>Wins: {element.winner.wins}, Defeats: {element.winner.defeats}</p>
                    </div>
                )) : null
            }
        </>
    )
}