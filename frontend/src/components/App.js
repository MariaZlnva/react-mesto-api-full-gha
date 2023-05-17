import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

import success from "../images/success.svg";
import fail from "../images/fail.svg";

function App() {
  const confirm = {
    text: "Вы успешно зарегистрировались!",
    src: success,
    alt: "Выполнено",
  };
  const notConfirm = {
    text: "Что-то пошло не так! Попробуйте ещё раз.",
    src: fail,
    alt: "Ошибка",
  };

  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  //переменные состояния, отвечающие за видимость попапов:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  //стейт перем., отвечающая за состояние авторизации
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [emailUser, setEmailUser] = useState("");
  const [isDataInfoToolTip, setIsDataInfoToolTip] = useState(confirm);
  const [isBurgerOpen, setIiBurgerOpen] = useState(false);

  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem("authorized");
    if (token) {
      auth
        .getContent()
        .then((res) => {
          if (res) {
            setEmailUser(res.email);
            setIsloggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    checkToken()
  }, []);

  useEffect(() => {
    if (isloggedIn) {
      api
        .getInitialData()
        .then(([dataUser, cardsServer]) => {
          setCurrentUser(dataUser);
          setCards(cardsServer);
        })
        .catch((err) => console.log("Error getInitialData!"));
    }
  }, [isloggedIn]);

  function handleSubmitLogin({ email, password }) {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem("authorized", "true");
          setIsDataInfoToolTip(confirm);
          setIsloggedIn(true);
          setEmailUser(email);
          navigate("/", { replace: true });
        } else {
          return;
        }
      })
      .catch((err) => {
        setIsDataInfoToolTip(notConfirm);
        setIsInfoToolTipOpen(true);
        console.log(err);
      });
  }

  function handleSubmitRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setIsDataInfoToolTip(confirm);
        setIsInfoToolTipOpen(true);
        navigate("/signin", { replace: true });
      })
      .catch(() => {
        setIsDataInfoToolTip(notConfirm);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("authorized");
    setEmailUser("");
    setIsloggedIn(false);
    setIsShow(true);
    setIiBurgerOpen(false);
    navigate("/signin", { replace: true });
  }

  function handleUpdateUser(dataInput, resetValidation) {
    api
      .changeProfileData(dataInput)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        closeAllPopups();
        resetValidation(dataInput);
      })
      .catch((err) => console.log("Error user data updates!"));
  }

  function handleUpdateAvatar(dataAvatar) {
    api
      .changeAvatar(dataAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("Error avatar data updates!"));
  }

  function handleAddPlaceSubmit(dataCard, resetValidation) {
    api
      .addNewCard(dataCard)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
        resetValidation();
      })
      .catch((err) => console.log("Error add card!"));
  }

  //  меняет стейт перемен. при увелич. ширины экрана
  function handleResize() {
    const windowInnerWidth = window.innerWidth;
    if (windowInnerWidth > 570) {
      setIiBurgerOpen(false);
    }
  }
  window.addEventListener("resize", handleResize);

  const handlerClickBurger = () => {
    setIiBurgerOpen(!isBurgerOpen);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoToolTipOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    (isLiked ? api.deleteLike(card._id) : api.addLike(card._id))
      .then((updateDataCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? updateDataCard : c))
        );
      })
      .catch((err) => console.log("Error button-like processing!!!"));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log("Error delete card!!!"));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          emailUser={emailUser}
          onLogout={handleLogout}
          isBurgerOpen={isBurgerOpen}
          onOpenBurger={handlerClickBurger}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isloggedIn={isloggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          // для регистрации пользователя
          <Route
            path="/signup"
            element={
              <Register isShow={isShow} onSubmit={handleSubmitRegister} />
            }
          />
          // для авторизации пользователя
          <Route
            path="/signin"
            element={<Login onSubmit={handleSubmitLogin} />}
          />
        </Routes>

        <Footer isloggedIn={isloggedIn} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isShow={isShow}
          dataInfo={isDataInfoToolTip}
        />

        <PopupWithForm title="Вы уверены?" name="delete-card" titleBtn="Да" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
