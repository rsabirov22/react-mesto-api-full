import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleImageClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleImageClick}/>
      <div className="element__description">
        <p className="element__title">{card.name}</p>
        <div className="element__likes">
          <button type="button" aria-label="Лайк" className={isLiked ? 'element__btn element__btn_active' : 'element__btn'} onClick={handleLikeClick}></button>
          <span className="element__counter">{card.likes.length}</span>
        </div>
      </div>
      <button type="button" aria-label="Удалить" className={isOwn ? 'element__del element__del_visible' : 'element__del'} onClick={handleDeleteClick}></button>
    </div>
  );

}

export default Card;
