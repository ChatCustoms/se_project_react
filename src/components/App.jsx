import { act, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "../blocks/App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import Footer from "./Footer/Footer";
import { filterWeatherData, getWeather } from "../utils/weatherApi";
import { APIkey } from "../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "./AddItemModal/AddItemModal";
import Profile from "./Profile/Profile";
import { addItem, deleteItem, getItems, updateProfile } from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";
import CurrentUserContext from "../contexts/CurrentUserContext";
import auth from "../utils/auth";
import * as api from "../utils/api";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import { use } from "react";
import EditProfileModal from "./EditProfileModal/EditProfileModal";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 555, C: 555 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleDelete = () => {
    const token = localStorage.getItem("jwt");
    console.log("Token being sent to deleteItem:", token);
    api
      .deleteItem(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        handleModalClose();
        setSelectedCard({});
      })
      .catch(console.error);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weatherType }) => {
    const token = localStorage.getItem("jwt");
    addItem(
      {
        name,
        imageUrl: imageUrl,
        weather: weatherType,
      },
      token
    )
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        auth.checkToken(res.token).then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
          handleModalClose();
        });
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    const userData = {
      name,
      avatar,
      email,
      password,
    };
    const loginData = {
      email,
      password,
    };
    auth
      .register(userData)
      .then(() => handleLogin(loginData))
      .catch(console.error);
  };

  const checkLoggedIn = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          setLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    } else {
      setLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const checkRegistered = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          setLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    } else {
      setLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");

    if (!currentUser || !currentUser._id || !token) {
      console.error("User not logged in or token missing");
      return;
    }

    const isLiked = likes.includes(currentUser._id);

    const request = isLiked ? api.removeCardLike : api.addCardLike;

    request(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) => [
          ...cards.map((item) => (item._id === _id ? updatedCard : item)),
        ]);
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setLoggedIn(false);
    setActiveModal("");
  };

  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem("jwt");
    updateProfile(userData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleModalClose();
      })
      .catch(console.error);
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error;
        });
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => console.log("Geo error:", err)
    );
  }, []);

  useEffect(() => {
    if (!coordinates?.latitude || !coordinates?.longitude) return;

    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        console.log("Weather data:", filterData);
        setWeatherData(filterData);
      })
      .catch((err) => {
        console.log("Weather fetch failed:", err);
      });
  }, [coordinates]);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);
  console.log("App - LoggedIn value:", loggedIn);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter basename="/se_project_react">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app">
            <div className="app__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                onLogin={openLoginModal}
                onRegister={openRegisterModal}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleCardLike={handleCardLike}
                      handleAddClick={handleAddClick}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      loggedIn={loggedIn}
                      element={
                        <Profile
                          onSignOut={handleSignOut}
                          loggedIn={loggedIn}
                          clothingItems={clothingItems}
                          handleCardClick={handleCardClick}
                          handleAddClick={handleAddClick}
                          handlEditProfileClick={() =>
                            setActiveModal("edit-profile")
                          }
                        />
                      }
                    />
                  }
                />
              </Routes>
            </div>
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={handleModalClose}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={handleModalClose}
              onDelete={handleDelete}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={handleModalClose}
              onUpdateUser={handleUpdateUser}
            />
            <Footer />
            <LoginModal
              isOpen={activeModal === "login"}
              onOpen={openLoginModal}
              onClose={handleModalClose}
              onLogin={handleLogin}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onOpen={openRegisterModal}
              onClose={handleModalClose}
              onRegister={handleRegister}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
