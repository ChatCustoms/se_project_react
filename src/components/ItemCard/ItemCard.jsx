import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.includes(currentUser?._id);
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleCardClick}
      />
      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          type="button"
          onClick={handleLike}
        >
          Like
        </button>
      )}
    </li>
  );
}

export default ItemCard;
