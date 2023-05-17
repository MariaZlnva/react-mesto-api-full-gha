import React from "react";
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../hooks/useValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const {
    valuesInput,
    errors,
    onChange,
    resetValidation,
    setValuesInput,
    isValidForm,
    setIsValidForm,
  } = useValidation();

  // const [name, setName] = useState(currentUser.name);
  // const [description, setDescription] = useState(currentUser.about);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах
  // useEffect(() => {
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser, isOpen]);
  useEffect(() => {
    setValuesInput((values) => ({
      ...values,
      nameUser: currentUser.name,
      aboutUser: currentUser.about,
    }));
    setIsValidForm(true);
  }, [currentUser, isOpen]);

  // function handleInputNameClick(evt) {
  //   setName(evt.target.value);
  // }

  // function handleInputDiscriptionClick(evt) {
  //   setDescription(evt.target.value);
  // }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(valuesInput, resetValidation);
  }

  return (
    <PopupWithForm
      resetValidation={resetValidation}
      isValidForm={isValidForm}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="edit-profile"
    >
      <input
        id="nameUser"
        className="popup__input popup__input_name"
        type="text"
        name="nameUser"
        value={valuesInput.nameUser || ""}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={onChange}
      />
      <span id="nameUser-error" className="error popup__error_visible">
        {errors.nameUser}
      </span>
      <input
        id="aboutUser"
        className="popup__input popup__input_info"
        type="text"
        name="aboutUser"
        value={valuesInput.aboutUser || ""}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        onChange={onChange}
      />
      <span id="aboutUser-error" className="error popup__error_visible">
        {errors.aboutUser}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
