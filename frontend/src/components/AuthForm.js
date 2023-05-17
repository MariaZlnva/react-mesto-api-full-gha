import React, { useState } from "react";
import { Link } from "react-router-dom";

function AuthForm({ title, titleBtn, isShow, onSubmit }) {
  // const [emailInput, setEmailInput] = useState("");
  // const [passwordInput, setPasswordInput] =useState("");
  const [values, setValues] = useState({});

  function handleInput(evt) {
    const { name, value } = evt.target; //атрибуты inputa
    setValues((values) => ({ ...values, [name]: value })); // доб.в объект данные
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values);
  }

  return (
    <div className="sign page__sign">
      <div className="sign__content">
        <h2 className="sign__title">{title}</h2>
        <form className="sign__form" name="sign" onSubmit={handleSubmit}>
          <input
            id="email"
            className="sign__input sign__input_email"
            type="email"
            name="email"
            value={values.name}
            placeholder="E-mail"
            required
            onChange={handleInput}
          />
          <span id="emailInput-error" className="error"></span>
          <input
            id="password"
            className="sign__input sign__input_info"
            type="password"
            name="password"
            value={values.name}
            placeholder="Пароль"
            minLength="8"
            maxLength="20"
            required
            onChange={handleInput}
          />
          <span id="aboutUser-error" className="error"></span>
          <button className="sign__button" type="submit">
            {titleBtn}
          </button>
        </form>

        {isShow && (
          <Link to="/signin" className="sign__link" type="button">
            Уже зарегистрированы? Войти
          </Link>
        )}

      </div>
    </div>
  );
}

export default AuthForm;
