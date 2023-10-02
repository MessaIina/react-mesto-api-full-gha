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
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      credentials: 'include',
    }).then(this._handleResponse);
  }
  getUserAvatar(token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    }).then(this._handleResponse);
  }
  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    }).then(this._handleResponse);
  }
  setUserAvatar(avatarLink, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
      credentials: 'include',
    }).then(this._handleResponse);
  }
  setUserInfo(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
      credentials: 'include',
    }).then(this._handleResponse);
  }
  createCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }
  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    }).then(this._handleResponse);
  }
  likeCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    }).then(this._handleResponse);
  }
  dislikeCard(id, token) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    }).then(this._handleResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://api.mesto.msl.nomoredomainsrocks.ru',
})
