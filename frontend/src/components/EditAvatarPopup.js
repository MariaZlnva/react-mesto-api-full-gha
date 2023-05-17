import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarUrlRef = React.useRef(""); // вернет объект, к-рый с пом ref атрибута можно присвоить элементу для получен доступа к нему. объект содерж.поле current  - туда реает запишет указатель на дом эл-т
  const [inputError, setInputError] = useState("");
  const [isDisabledBtn, setIsDisableBtn] = useState(false);
  //очищаем инпуты при открытии
  // React.useEffect(() => {
  //   avatarUrlRef.current.value = "";
  //   setInputError("");
  //   setIsDisableBtn(false);
  // }, [isOpen]);

  const handleInput = (evt) => {
    if (evt.target.validity.valid) {
      setInputError("");
      setIsDisableBtn(true);
    } else {
      setInputError(evt.target.validationMessage);
    }
  };
  //обработчик submita формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar:
        avatarUrlRef.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
    resetValidation();
  }
  const resetValidation = () => {
    avatarUrlRef.current.value = "";
    setInputError("");
    setIsDisableBtn(false);
  };

  return (
    <PopupWithForm
      resetValidation={resetValidation}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isValidForm={isDisabledBtn}
      title="Обновить аватар"
      name="update-avatar"
    >
      <input
        ref={avatarUrlRef}
        id="urlAvatar"
        className="popup__input popup__input_link"
        placeholder="Ссылка"
        type="url"
        name="avatarUrl"
        // value= ''
        required
        onInput={handleInput}
      />
      <span id="urlAvatar-error" className="error popup__error_visible">
        {inputError}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
