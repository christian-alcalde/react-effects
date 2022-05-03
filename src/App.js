import "./App.css";
import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

function App() {
  const [deck, setDeck] = useState({
    deckId: null,
    isLoading: true,
  });

  useEffect(function getDeck() {
    async function getDeckId() {
      const response = await axios.get(
        "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeck({
        deckId: response.data.deck_id,
        isLoading: false,
      });
    }
    getDeckId();
  }, []);

  if (deck.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => <Card deckId={deck.deckId} />}>Get a Card</button>
      <h1>{deck.deckId}</h1>

      <Card deckId={deck.deckId} />
    </div>
  );
}

export default App;
