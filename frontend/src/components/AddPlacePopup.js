import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  function handleAddNewCardName(e) {
    setCardName(e.target.value);
  }

  function handleAddNewCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink
    });
  }

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen])

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          onChange={handleAddNewCardName}
          value={cardName}
          id="card-name"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          autoComplete="off"
        />
        <span id="card-name-error" className="popup__error"></span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          className="popup__input"
          onChange={handleAddNewCardLink}
          value={cardLink}
          id="img-link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          autoComplete="off"
        />
        <span id="img-link-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );

}

export default AddPlacePopup;
