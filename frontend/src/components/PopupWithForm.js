function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit }) {

  return (
    <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
      <div className="popup__container">
        <form className={`popup__form popup__form_${name}`} name={name} onSubmit={onSubmit} noValidate>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button
            type="submit"
            className="popup__button"
          >
            Создать
          </button>
        </form>
        <button
          type="button"
          aria-label="Закрыть"
          id={`${name}-close`}
          onClick={onClose}
          className="popup__close-btn"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
