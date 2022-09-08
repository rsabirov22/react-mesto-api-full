function InfoTooltip ({ isOpen, onClose, errorMessage }) {
  return (
    <div className={isOpen ? `popup popup_info-tooltip popup_opened` : `popup popup_info-tooltip`}>
      <div className="popup__container">
         {errorMessage &&
          <div className="popup__reg-result">
            <span className="popup__icon popup__icon_failed"></span>
            <p className="popup__reg-message">Что-то пошло не так! Попробуйте ещё раз.</p>
          </div>
          }
         {!errorMessage &&
          <div className="popup__reg-result">
            <span className="popup__icon popup__icon_success"></span>
            <p className="popup__reg-message">Вы успешно зарегистрировались!</p>
          </div>
         }
         <button
          type="button"
          aria-label="Закрыть"
          id="info-tooltip-close"
          onClick={onClose}
          className="popup__close-btn"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;

