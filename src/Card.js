import { useEffect, useState } from "react";
import axios from "axios";

function Card({ deckId }) {
  const [card, setCard] = useState({});

  useEffect(function getCard() {
    async function getCardAxios() {
      const response = await axios.get(
        `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      setCard(response.data.cards[0]);
    }
    getCardAxios();
  });

  return (
    <div>
      <img src={card.image} alt={card.code}></img>
    </div>
  );
}

export default Card;
