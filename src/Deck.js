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
  const [deckId, setDeckId] = useState(null);
  const [deck, setDeck] = useState([]);
  // const [cardsRemaining, setCardsRemaining] = useState(52);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleDisabled, setToggleDisabled] = useState(false);
  const [toggleShuffle, setToggleShuffle] = useState(false);

  useEffect(function getDeck() {
    async function getDeckId() {
      const response = await axios.get(
        "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setIsLoading(false);
      setDeckId(response.data.deck_id);
    }
    getDeckId();
  }, []);

  async function getCardAxios() {
    const response = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deckId}/draw/`
    );
    console.log("remaining", response.data.remaining);
    if (response.data.remaining === 0) {
      setToggleDisabled(true);
    }
    setDeck((prevDeck) => [...prevDeck, response.data.cards[0]]);
    // setCardsRemaining(response.data.remaining);
  }
  async function shuffleDeck() {
    setToggleShuffle(true);
    await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/shuffle`);
    setDeck([]);

    setToggleShuffle(false);
  }

  if (isLoading) return <div>Loading...</div>;
  console.log("deck length", deck.length);

  return (
    <div>
      <button disabled={toggleShuffle} onClick={shuffleDeck}>
        shuffle deck
      </button>{" "}
      <span />
      <button disabled={toggleDisabled} onClick={getCardAxios}>
        Get a Card
      </button>
      {deck.length === 52 && <h2>No more Cards</h2>}
      {deck && deck.map((card) => <Card key={card.code} card={card} />)}
    </div>
  );
}

export default Deck;
