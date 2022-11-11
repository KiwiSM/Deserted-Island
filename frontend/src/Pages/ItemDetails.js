import Styles from "../Styles/ItemDetails.module.css";
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
        <div className="wrapper">
            {
                item ? 
                (
                    <div className={Styles.container}>
                        <h2>Item: {item[0].name}</h2>
                        <h3>Invented: {item[0].age}</h3>
                        <h3>Favourite user: {item[0].favUser}</h3>
                        <img src={item[0].imgName} alt="" />
                        <p className={Styles.p}>Description: {item[0].usage}</p>
                        <p className={Styles.p}>Wins: {item[0].wins} Defeats: {item[0].defeats}</p>
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
        </div>
        </>
    )
}