import Styles from "../Styles/Statistics.module.css";
import { useState, useEffect } from "react";

export default function Statistics() {
    const [items, setItems] = useState();

    useEffect(() => async function GetItems(){
        const response = await fetch("https://deserted-island.onrender.com/statistics", {
          method: "GET"
        });
        const data = await response.json();
        setItems(data);
    }, []);

    return (
        <>
            <h1 className={Styles.h1}>Top 5 winners:</h1>
            <div className={Styles.tinyWrapper}>
            {   items ?
                items[0].map(element => (
                    <div key={element._id} className='container'>
                        <p className={Styles.p}>{element.name}</p>
                        <img className={Styles.img} src={element.imgName} alt="" />
                        <p className={Styles.p}>Wins: {element.wins}</p>
                    </div>
                )) : null
            }
            </div>
            <h1 className={Styles.h1}>Top 5 losers:</h1>
            <div className={Styles.tinyWrapper}>
            {   items ?
                items[1].map(element => (
                    <div key={element._id} className='container'>
                        <p className={Styles.p}>{element.name}</p>
                        <img className={Styles.img} src={element.imgName} alt="" />
                        <p className={Styles.p}>Defeats: {element.defeats}</p>
                    </div>
                )) : null
            }
            </div>
        </>
    )
}