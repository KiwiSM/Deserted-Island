import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <nav className="menu">
            <Link to={"/"}>Home</Link>
            <Link to={"/battle"}>Go battle</Link>
            <Link to={"/gallery"}>View the gallery</Link>
            <Link to={"/statistics"}>View statistics</Link>
            <Link to={"/history"}>View history</Link>
        </nav>
    )
}