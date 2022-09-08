import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          onChange={handleChangeName}
          className="popup__input popup__input_type_name"
          id="nickname"
          name="name"
          value={name}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
        />
        <span id="nickname-error" className="popup__error"></span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          onChange={handleChangeDescription}
          className="popup__input popup__input_type_description"
          id="job"
          name="about"
          value={description}
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
        />
        <span id="job-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );

}

export default EditProfilePopup;
