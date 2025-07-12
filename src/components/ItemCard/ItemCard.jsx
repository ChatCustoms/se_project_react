import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeIcon from "../../images/Like-button.png";
import Liked_button from "../../images/liked-button.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser?._id);

  const isLiked = isLoggedIn && item.likes.includes(currentUser?._id);
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    console.log("Like button clicked");
    onCardLike(item);
  };

  return (
    <li className="card__item">
      <div className="card" onClick={handleCardClick}>
        <div className="card__header">
          <p className="card__name">{item.name}</p>
          <button
            className={itemLikeButtonClassName}
            type="button"
            onClick={handleLike}
            disabled={!isLoggedIn}
          >
            <img
              src={isLiked ? Liked_button : likeIcon}
              alt="Like"
              className="card__like-icon"
            />
          </button>
        </div>
        <img src={item.imageUrl} alt={item.name} className="card__image" />
      </div>
    </li>
  );
}

export default ItemCard;
