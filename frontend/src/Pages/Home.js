import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <Link to={"/battle"}>Go battle</Link>
            <h1>Welcome to Deserted Island</h1>
            <h3>This game is all about chosing which item you would bring with you to a deserted island</h3>
        </>
    )
}