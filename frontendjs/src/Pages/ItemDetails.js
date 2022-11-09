import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ItemDetails() {
    const { id } = useParams();
    const [item, setItem] = useState();
    const [battles, setBattles] = useState();

    useEffect (() => async function ItemDetails() {
        const response = await fetch(`http://localhost:3000/item-details/${id}`, {
            method: "GET"
        });
        const item = await response.json()
        setItem(item.itemDetail)
        setBattles(item.battlesWon)
    }, [])

    return (
        <>
            {
                item ? 
                (
                    <div className="double-container">
                        <h4>{item[0].name}</h4>
                        <h4>{item[0].age}</h4>
                        <h5>{item[0].favUser}</h5>
                        <img src={item[0].imgName} alt="" />
                        <p>{item[0].usage}</p>
                        <h6>{item[0].wins}</h6>
                        <h6>{item[0].defeats}</h6>
                    </div>
                ) : null
            }
            {
                battles ? 
                (
                    battles.map(battle => (
                        <div className="container" key={battle._id}>
                            <h4>{battle.winner.name}</h4>
                            <img src={battle.winner.imgName} alt="" />
                            <h4>{battle.loser.name}</h4>
                            <img src={battle.loser.imgName} alt="" />
                        </div>
                    ))
                ) : null
            }
        </>
    )
}