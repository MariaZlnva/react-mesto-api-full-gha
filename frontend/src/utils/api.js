//класс лписывает запросы к серверу
import { BASE_URL } from "./auth";

class Api {
  constructor({ baseUrl, headers, idGroup }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    // this._idGroup = idGroup;
  }
  //метод проверки ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfoUserServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then(this._checkResponse);
  }

  getItemsServer() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    }).then(this._checkResponse);
  }

  getInitialData() {
    return Promise.all([this.getInfoUserServer(), this.getItemsServer()]);
  }

  changeProfileData(dataInput) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: dataInput.nameUser,
        about: dataInput.aboutUser,
      }),
      credentials: 'include'
    }).then(this._checkResponse);
  }

  changeAvatar(dataForm) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: dataForm.avatar,
      }),
      headers: this._headers,
      credentials: 'include'
    }).then(this._checkResponse);
  }

  addNewCard(dataCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: dataCard.cardName,
        link: dataCard.cardUrl,
      }),
      headers: this._headers,
      credentials: 'include'
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}`, //Вместо cardId в URL нужно подставить параметр _id карточки, которую нужно удалить. _id каждой карточки есть в её JSON:
      {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include'
      }
    ).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: 'include'
    }).then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include'
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  // baseUrl: "https://nomoreparties.co/v1/",
  baseUrl: BASE_URL,
  headers: {
    // authorization: "d9d74726-0f35-4f64-a4f4-3690ec473717",
    "Content-Type": "application/json",
  },
  // idGroup: "cohort-59",
});
