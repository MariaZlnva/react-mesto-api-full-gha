
// export const BASE_URL = "https://auth.nomoreparties.co";
// export const BASE_URL = 'http://localhost:3000'
export const BASE_URL = "https://api.mesto.zlnva.nomoredomains.monster";

export const register = (email, password) => {
  return (
    fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
      credentials: 'include'
    })
      .then(checkResponse) 
  )
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
    credentials: 'include'
  })
    .then(checkResponse);
};

//проверки валидности токена и получения email для вставки в шапку сайта:
export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    },
    credentials: 'include'
  })
  .then(checkResponse)
}

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);
