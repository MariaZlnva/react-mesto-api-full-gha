//класс лписывает запросы к серверу
import { BASE_URL } from "./auth";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _dataHeaders = () => {
    this._token = localStorage.getItem('token');
    this._headers.authorization = `Bearer ${this._token}`
    return this._headers;
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
      headers: this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  getItemsServer() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  getInitialData() {
    return Promise.all([this.getInfoUserServer(), this.getItemsServer()]);
  }

  changeProfileData(dataInput) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._dataHeaders(),
      body: JSON.stringify({
        name: dataInput.nameUser,
        about: dataInput.aboutUser,
      }),
    }).then((res) => this._checkResponse(res));
  }

  changeAvatar(dataForm) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: dataForm.avatar,
      }),
      headers:this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  addNewCard(dataCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: dataCard.cardName,
        link: dataCard.cardUrl,
      }),
      headers: this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._dataHeaders(),
      }
    ).then((res) => this._checkResponse(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._dataHeaders(),
    }).then((res) => this._checkResponse(res));
  }

}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: 'application/json',
  },
});
