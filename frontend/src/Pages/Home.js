import Styles from "../Styles/Home.module.css"

export default function Home() {
    return (
        <>
            <h2 className={Styles.h2}>Welcome to Deserted Island</h2>
            <img className={Styles.img} src="https://images.unsplash.com/photo-1597316976176-92700ef7d9af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80" alt="" />
            <p className={Styles.p}>This game is all about chosing which item you would bring with you to a deserted island. With the help of the menu you can navigate between the different pages.</p>
            <p className={Styles.p}>In the Battle page you are presented with two random items, and you have to pick one of the two which you would bring with you to a deserted island.</p>
            <p className={Styles.p}>In the View the gallery page you can see all the different items which are available, and you're able to add new items to your liking.</p>
            <p className={Styles.p}>In the page Statistics you may see which items are the winners and losers. Currently you may only view the top 5 in the two categories, but other categories are to be expected in the future with coming patches.</p>
            <p className={Styles.p}>In the View history page you are presented with all of the battles which have ever occured between two items.</p>
            <p className={Styles.p}>We hope you will enjoy the game - make yourself at home!</p>
        </>
    )
}