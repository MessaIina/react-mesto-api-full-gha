import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { InfoTooltip } from "./InfoTooltip";
import { ProtectedRouteElement } from "./ProtectedRoute";
import * as Auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isZoomImagePopupOpen, setIsZoomImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [isResGood, setIsResGood] = useState(false);

  const isAnyPopupOpen =
  isEditProfilePopupOpen ||
  isAddPlacePopupOpen ||
  isEditAvatarPopupOpen ||
  isZoomImagePopupOpen ||
  isDeletePopupOpen ||
  isInfoToolTipOpen;

  const token = localStorage.getItem("jwt");

  useEffect(() => {  
    checkToken();
    if (loggedIn) {
      Promise.all([api.getInitialCards(token), api.getUserInfo(token)])
        .then(([resultInitial, resultInformation]) => {
          setCurrentUser(resultInformation);
          setCards(resultInitial.cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);
 
  function handleCardDelete() { 
    api 
      .deleteCard(selectedCard._id, token) 
      .then((deletedCard) => { 
        const filteredCards = cards.filter((item) => { 
          return selectedCard._id !== item._id; 
        }); 
 
        setCards(filteredCards); 
        closeAllPopups(); 
      }) 
      .catch((err) => { 
        console.log(err); 
      }); 
  } 
 
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id); 
    if (isLiked) { 
      api 
        .dislikeCard(card._id, token) 
        .then((newCard) => { 
          setCards((state) => 
            state.map((c) => (c._id === card._id ? newCard : c)), 
          ); 
        }) 
        .catch((err) => { 
          console.log(err); 
        }); 
    } else { 
      api 
        .likeCard(card._id, token) 
        .then((newCard) => { 
          setCards((state) => 
            state.map((c) => (c._id === card._id ? newCard : c)), 
          ); 
          closeAllPopups(); 
        }) 
        .catch((err) => { 
          console.log(err); 
        }); 
    } 
  } 
 
  function handleUpdateAvatar(avatarLink) { 
    api 
      .setUserAvatar(avatarLink.avatar, token) 
      .then((result) => { 
        setCurrentUser(result); 
        closeAllPopups(); 
      }) 
      .catch((err) => { 
        console.log(err); 
      }); 
  } 
 
  function handleUpdateUser(data) { 
    api 
      .setUserInfo(data.name, data.about, token) 
      .then((result) => { 
        setCurrentUser(result); 
        closeAllPopups(); 
      }) 
      .catch((err) => { 
        console.log(err); 
      }); 
  } 
 
  function handleAddImage(data) { 
    api 
      .createCard(data.name, data.link, token) 
      .then((result) => { 
        setCards([result.data, ...cards]); 
        closeAllPopups(); 
      }) 
      .catch((err) => { 
        console.log(err); 
      }); 
  } 
 
  function handleRegister({ email, password }) { 
    return Auth.register(email, password) 
      .then((res) => { 
        navigate("/signin", { replace: true }); 
        setIsInfoToolTipOpen(true); 
        setIsResGood(true); 
      }) 
      .catch((err) => { 
        setIsInfoToolTipOpen(true); 
        setIsResGood(false); 
        console.log(err); 
      }); 
  } 
 
  function handleLogin(email, password) { 
    return Auth.login(email, password)  
      .then((res) => {  
        if (res) { 
          localStorage.setItem("jwt", res.token);
          setUserEmail(email);
          setLoggedIn(true);  
          navigate("/");  
        }  
      })  
      .catch((err) => console.log(err));  
  }  
 
  function checkToken() {  
    if (token) {  
      Auth.checkToken(token) 
        .then((res) => { 
          if (res && res.email) {  
            const userEmail = res.email;    
            setUserEmail(userEmail);  
            setLoggedIn(true);  
            navigate("/",);  
          }  
        }) 
        .catch((err) => console.log(err));  
    }  
  } 

 
  function signOut() { 
    localStorage.removeItem("jwt"); 
    setUserEmail(""); 
  }

  const closeAllPopups = () => {
    setIsZoomImagePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setIsZoomImagePopupOpen(false);
  };

  useEffect(() => {
    if (isAnyPopupOpen) {
      function handleCloseByEscOrOverlay(evt) {
        if (evt.key === 'Escape' || evt.target.classList.contains('popup_opened')) {
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', handleCloseByEscOrOverlay);
      document.addEventListener('click', handleCloseByEscOrOverlay);
      return () => {
        document.removeEventListener('keydown', handleCloseByEscOrOverlay);
        document.removeEventListener('click', handleCloseByEscOrOverlay);
      };
    }
  }, [isAnyPopupOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleZoomClick() {
    setIsZoomImagePopupOpen(true);
  }

  function handleDeleteClick() {
    setIsDeletePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} onSignOut={signOut} loggedIn={loggedIn} />
        <Routes>
        <Route
            path="/"
            element={
              <ProtectedRouteElement
                component={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                selectedCard={setSelectedCard}
                onZoom={handleZoomClick}
                onDelete={handleDeleteClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} loggedIn={loggedIn} />}
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          />
        </Routes>
        <Footer />
        <ImagePopup
          src={selectedCard.link}
          alt={selectedCard.name}
          isOpen={isZoomImagePopupOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          onUpdateImage={handleAddImage}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <DeleteCardPopup
          onDelete={handleCardDelete}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isResGood={isResGood}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          goodInfo={"Вы успешно зарегистрировались!"}
          errorInfo={"Что-то пошло не так!"}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
