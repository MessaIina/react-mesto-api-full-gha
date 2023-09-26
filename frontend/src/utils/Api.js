class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
  }
  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._handleResponse);
  }
  getUserAvatar() {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._handleResponse);
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._handleResponse);
  }
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleResponse);
  }
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponse);
  }
  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._handleResponse);
  }
  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._handleResponse);
  }
  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._handleResponse);
  }
}
export const api = new Api({
  baseUrl: "https://api.mesto.msl.nomoredomainsrocks.ru",
});
