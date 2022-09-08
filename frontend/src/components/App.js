import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import logo from '../images/logo.svg';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as mestoAuth from '../mestoAuth.js';
import InfoTooltip from './InfoTooltip';

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [userData, setUserData] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({})
  }

  function handleAddPlaceSubmit(newCard) {
    api.postCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(userInfo) {
    api.patchProfile(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatarLink) {
    api.patchAvatar(avatarLink)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  const auth = async (jwt) => {
    const content = await mestoAuth.getContent(jwt).then((res) => {
      if (res) {
        setLoggedIn(true);
        setUserData({
          id: res.data._id,
          email: res.data.email
        });
      }
    })
    .catch(err => console.log(err));

    return content;
  }

  const onRegister = ({ password, email }) => {
    return mestoAuth.register(password, email)
    .then((res) => {
      if (res.data) {
        setErrorMessage('');
        history.push('/sign-in');
      } else {
        setErrorMessage(res.error);
        setIsInfoTooltipOpen(true);
      }
      setIsInfoTooltipOpen(true);
    })
    .catch(err => {
      setErrorMessage(err);
      setIsInfoTooltipOpen(true);
    });
  }

  const onLogin = ({ password, email }) => {
    if (password && email) {
      return mestoAuth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          history.push('/');
        } else {
          setErrorMessage(data.error);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch(err => {
        setErrorMessage(err);
        setIsInfoTooltipOpen(true);
      });
    }
  }

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    // проверка наличия токена и валидности токена
    if (jwt) {
      mestoAuth.getContent(jwt)
      .then((res) => {
        if (res) {
          auth(jwt);
        } else {
          localStorage.removeItem('jwt');
          history.push('/sign-in');
        }
      })
      .catch(err => console.log(err));
    }
    // проверка наличия токена и валидности токена
  }, []);

  React.useEffect(() => {
    // Загрузка информации о пользователе
    if (loggedIn) {
      api.getProfile()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(err => console.log(err));
    }
    // Загрузка информации о пользователе
  }, [loggedIn]);

  React.useEffect(() => {
    // Загрузка карточек
    if (loggedIn) {
      api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch(err => console.log(err));
    }
    // Загрузка карточек
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn])

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
            <Header logo={logo} userData={userData} loggedIn={loggedIn} signOut={signOut} />
            <Switch>
              <ProtectedRoute
                component={Main}
                exact
                path="/"
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditProfile={handleEditProfileClick}
                onAddPlace ={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                loggedIn={loggedIn}
              />
              <Route path="/sign-in">
                <Login onLogin={onLogin} />
              </Route>
              <Route path="/sign-up">
                <Register onRegister={onRegister} />
              </Route>
              <Route path="/">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              errorMessage={errorMessage}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
            />
            <Footer/>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
