import { React, useEffect } from "react";

function ImagePopup({ card, onClose }) {
  //закрытие попап по esc и оверлей
  useEffect(() => {
    if (card) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleMousedown);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleMousedown);
    };
  }, [card]);

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      onClose();
    }
  }

  function handleMousedown(evt) {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      onClose();
    }
  }

  return (
    card && (
      <div className="popup popup_big-picture popup_opened">
        <div className="popup__content-big">
          <img
            src={`${card.link}`}
            alt={card.name}
            className="popup__image-big"
          />
          <button
            aria-label="Закрыть"
            className="popup__close"
            type="button"
            onClick={onClose}
          ></button>
          <h2 className="popup__title-big">{card.name}</h2>
        </div>
      </div>
    )
  );
}

export default ImagePopup;
