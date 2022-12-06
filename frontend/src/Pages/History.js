import { useState, useEffect } from "react";

export default function History() {
    const [items, setItems] = useState();

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("https://deserted-island.onrender.com/history", {
            method: "GET"
          });
          const data = await response.json();
          setItems(data);
        }
        fetchData();
      }, []);

    return (
        <>
            <h1>Previous battles:</h1>
            <div className="wrapper">
            {   items ?
                items.map(element => (
                    <div className="tiny-wrapper">
                        <h3>BATTLE:</h3>
                        <div key={element._id} className='double-container'>
                            <div className="container">
                                <h6>WINNER:</h6>
                                <p>{element.winner.name}</p>
                                <img src={element.winner.imgName} alt="" />
                                <p>Wins: {element.winner.wins}, Defeats: {element.winner.defeats}</p>
                            </div>
                            <div className="container">
                                <h6>LOSER:</h6>
                                <p>{element.loser.name}</p>
                                <img src={element.loser.imgName} alt="" />
                                <p>Wins: {element.loser.wins}, Defeats: {element.loser.defeats}</p>
                            </div>
                        </div>
                    </div>
                )) : null
            }
            </div>
        </>
    )
}