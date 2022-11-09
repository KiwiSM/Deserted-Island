import { useRef } from "react";

export default function Form() {
    const itemName = useRef();
    const itemAge = useRef();
    const itemUser = useRef();
    const itemUsage = useRef();
    const itemURL = useRef();

    function PostItem() {
        const newItem = {
            name: itemName.current.value,
            age: itemAge.current.value,
            favUser: itemUser.current.value,
            usage: itemUsage.current.value,
            imgName: itemURL.current.value,
            wins: 0,
            defeats: 0,
            games: 0
        }

        fetch("http://localhost:3000/post-item", {
            method: "POST",
            body: JSON.stringify(newItem),
            headers: {"Content-Type" : "application/json"}
        })
    }

    return (
        <>
        <form>
            <label htmlFor="name">Name of the item: </label><br />
            <input ref={itemName} type="text" id="name" /><br />
            <label htmlFor="age">When was the item invented? </label><br />
            <input ref={itemAge} type="text" id="age" /><br />
            <label htmlFor="favUser">Who loves using this item?</label><br />
            <input ref={itemUser} type="text" id="favUser" /><br />
            <label htmlFor="usage">What can you use this item for?</label><br />
            <input ref={itemUsage} type="text" id="usage" /><br />
            <label htmlFor="url">Copy/paste URL of image here: </label><br />
            <input ref={itemURL} type="text" id="url" /><br />
            <input type="button" onClick={() => PostItem()} value="Submit"/>
        </form>
        </>
    )
}