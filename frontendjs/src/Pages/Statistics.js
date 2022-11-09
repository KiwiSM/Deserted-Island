import { useState, useEffect } from "react";

export default function Statistics() {
    const [items, setItems] = useState();

    useEffect(() => async function GetItems(){
        const response = await fetch("http://localhost:3000/statistics", {
          method: "GET"
        });
        const data = await response.json();
        setItems(data);
    }, []);

    console.log(items);

    return (
        <>
            <div className="wrapper">
                <h1>Top 2 winners:</h1>
                <div className="tiny-wrapper">
                {   items ?
                    items[0].map(element => (
                        <div key={element._id} className='container'>
                            <p>{element.name}</p>
                            <img src={element.imgName} alt="" />
                        </div>
                    )) : null
                }
                </div>
                <h1>Top 2 losers:</h1>
                <div className="tiny-wrapper">
                {   items ?
                    items[1].map(element => (
                        <div key={element._id} className='container'>
                            <p>{element.name}</p>
                            <img src={element.imgName} alt="" />
                        </div>
                    )) : null
                }
                </div>
            </div>
        </>
    )
}