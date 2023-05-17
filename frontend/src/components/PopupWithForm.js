import React from "react";
import { useEffect } from "react";

function PopupWithForm({
  title,
  name,
  titleBtn,
  isOpen,
  onClose,
  children,
  onSubmit,
  resetValidation,
  isValidForm,
}) {
  //закрытие попап по esc и оверлей
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleMousedown);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleMousedown);
    };
  }, [isOpen]);

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      onClose();
      resetValidation();
    }
  }

  function handleMousedown(evt) {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      onClose();
      resetValidation();
    }
  }

  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          aria-label="Закрыть"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button
            disabled={!isValidForm}
            className={
              isValidForm
                ? "popup__button"
                : "popup__button popup__button_disabled"
            }
            type="submit"
          >
            {titleBtn || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
