import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <p className="header__username">{currentUser.name}</p>
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="header__avatar"
          />
        ) : (
          <div className="header__avatar-placeholder">
            {currentUser.name.charAt(0)}
          </div>
        )}
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
      <button className="change__profile_button">Change profile data</button>
      <button className="profile__signout-button" onClick={onSignOut}>
        Log out
      </button>
    </div>
  );
}

export default Profile;
