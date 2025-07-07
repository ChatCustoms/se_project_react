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
        <div className="profile__user_info">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__avatar"
          />
        ) : (
          <div className="profile__avatar-placeholder">
            {currentUser.name.charAt(0)}
          </div>
        )}
        <p className="profile__name">{currentUser.name}</p>
        </div>

        <div className="profile__actions">
          <button className="profile__edit-button">Change profile data</button>
          <button className="profile__signout-button" onClick={onSignOut}>
            Log out
          </button>
        </div>
      </section>

      <section className="profile__main">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;