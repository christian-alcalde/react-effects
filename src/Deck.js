import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

/**
 * Gets new deck when mounted
 * gets new card when button clicked
 * @returns Card component
 */
function Deck() {
  const [deck, setDeck] = useState({
    deckId: null,
    isLoading: true,
    cardDrawn: null,
    cardsRemaining: 52,
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

  async function getCardAxios() {
    const response = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deck.deckId}/draw/?count=1`
    );
    if (deck.cardsRemaining === 0) {
      return;
    }
    setDeck({
      ...deck,
      cardDrawn: response.data.cards[0],
      cardsRemaining: response.data.remaining,
    });
  }

  if (deck.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={getCardAxios}>Get a Card</button>
      {deck.cardsRemaining === 0 && <div>No more Cards</div>}
      {deck.cardDrawn && <Card card={deck.cardDrawn} />}
    </div>
  );
}

export default Deck;
