import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../hooks/useValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { valuesInput, errors, onChange, resetValidation, isValidForm } =
    useValidation();

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(valuesInput, resetValidation);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      resetValidation={resetValidation}
      isValidForm={isValidForm}
      title="Новое место"
      name="add-cards"
      titleBtn="Создать"
    >
      <input
        id="nameCard"
        className="popup__input popup__input_title"
        placeholder="Название"
        type="text"
        name="cardName"
        value={valuesInput.cardName || ""}
        minLength="2"
        maxLength="30"
        required
        onChange={onChange}
      />
      <span id="nameCard-error" className="error popup__error_visible">
        {errors.cardName}
      </span>

      <input
        id="urlCard"
        className="popup__input popup__input_link"
        placeholder="Ссылка на картинку"
        type="url"
        name="cardUrl"
        value={valuesInput.cardUrl || ""}
        required
        onChange={onChange}
      />
      <span id="urlCard-error" className="error popup__error_visible">
        {errors.cardUrl}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
