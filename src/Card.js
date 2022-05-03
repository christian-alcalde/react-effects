/**
 * Displays card component
 * @param {Obj} Card
 * @returns
 */
function Card({ key, card }) {
  return (
    <div key={key}>
      <img src={card.image} alt={card.code}></img>
    </div>
  );
}

export default Card;
