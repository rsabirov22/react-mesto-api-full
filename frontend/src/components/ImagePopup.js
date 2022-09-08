function ImagePopup({ card, onClose }) {

  return (
    <div className={card.link ? 'gallery popup_opened' : 'gallery'}>
      <div className="gallery__container">
        <img src={card.link} className="gallery__img" alt={card.name}/>
        <p className="gallery__description">{card.name}</p>
        <button type="button" aria-label="Закрыть" className="gallery__close-btn" onClick={onClose}></button>
      </div>
    </div>
  );

}

export default ImagePopup;
