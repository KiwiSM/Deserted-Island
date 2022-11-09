import './App.css';
import { useEffect, useState } from "react";

export default function App() {
  const [pokemon, setPokemon] = useState<string>()
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    async function getPokemon() {
      const list = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0", {
        method: "GET"
      })
      const data = await list.json()
      setPokemon(data)
    }
    getPokemon()
  }, [count])

  return (
    <main className="App">
      <h1 onClick={() => setCount(count + 1)}>Hej</h1>
    </main>
  );
}