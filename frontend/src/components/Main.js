import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, loggedIn, userData }) {
  const currentUser = useContext(CurrentUserContext);
  const cardsElements = cards.map(card => {
    return <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="аватар" className="profile__avatar"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button type="button" aria-label="Редактировать" id="edit-profile" className="profile__edit-button" onClick={onEditProfile}></button>
        </div>
        <button type="button" aria-label="Добавить" id="add-mesto" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cardsElements}
      </section>
    </main>
  );

}

export default Main;
