/**
 * Displays card component
 * @param {Obj} Card
 * @returns
 */
function Card({ card }) {
  return (
    <div>
      <img src={card.image} alt={card.code}></img>
    </div>
  );
}

export default Card;
