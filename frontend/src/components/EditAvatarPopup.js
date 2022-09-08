import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="url"
          ref={avatarRef}
          className="popup__input"
          id="avatar-url"
          name="avatar"
          placeholder="Ссылка на картинку"
          minLength="2"
          required
          autoComplete="off"
        />
        <span id="avatar-url-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );

}

export default EditAvatarPopup;
