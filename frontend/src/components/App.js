import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import { AppContext } from '../contexts/AppContext.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import InfoToolTip from './InfoToolTip.js';
import ProtectedRouteElement from './ProtectedRouteElement.js';
import auth from '../utils/Auth.js';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [infoToolTipData, setInfoToolTipData] = React.useState({
    isOpen: false,
    isSuccess: false,
    text: "",
  });
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar:"",
    "_id": "e20537ed11237f86bbb20ccb",
    cohort: "cohort0"
  });
  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isConfirmPopupOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  React.useEffect(() => {
    const token = localStorage.getItem('userId');
    if (token) {
      api.getUserInfo()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(err => {
        console.log(err);
      });

      api.getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(err => {
        console.log(err);
      });
    }
    tokenCheck();
  }, [loggedIn]);

  function tokenCheck() {
    const token = localStorage.getItem('userId');
    if (token) {
      auth.signinWithToken(token)
        .then(res => {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate("/", {replace: true})
        })
        .catch(err => {
          let errorText;
          switch (err) {
            case 400:
              errorText = "Токен не передан или передан не в том формате";
              break;
            case 401:
              errorText = "Переданный токен некорректен";
              break;
            default:
              errorText = "Что-то пошло не так. Пу-пу-пуу";
              break;
          }

        setInfoToolTipData({
          isOpen: true,
          isSuccess: false,
          text: errorText,
        });
      })
    }

  }

  function handleLoggin(userEmail) {
    setLoggedIn(true);
    setUserEmail(userEmail);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setInfoToolTipData({isOpen: false, text: "", isSuccess: false});
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(userId => userId === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deletePlaceCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(item => item._id !== card._id));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setConfirmPopupOpen(false);
      });
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.setUserInfo(userData)
      .then(newUserData => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.updateAvatar(avatar)
      .then(() => {
        setCurrentUser({...currentUser, avatar});
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addPlaceCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    navigate('/signin');
  }

  return (
    <AppContext.Provider value={{isLoading, closeAllPopups}}>
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__content'>
          <Header
            loggedIn={loggedIn}
            userEmail={userEmail}
            onSignOut={handleSignOut}
          />
          <main className="main">
            <Routes>
              <Route path="/" element={
                <ProtectedRouteElement
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={loggedIn}
                />}
              />
              <Route path="/signup" element={<Register showInfoToolTip={setInfoToolTipData}/>} />
              <Route path="/signin" element={<Login showInfoToolTip={setInfoToolTipData} onLoggin={handleLoggin}/>} />
            </Routes>
          </main>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            submitTitle="Да"
            isOpen={isConfirmPopupOpen}
            onSubmit={() => handleCardDelete(selectedCard)}
          />
          <ImagePopup
            card={selectedCard}
          />
          <InfoToolTip
            isOpen={infoToolTipData.isOpen}
            isSuccess={infoToolTipData.isSuccess}
            text={infoToolTipData.text}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
