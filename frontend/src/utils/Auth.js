class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

_handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

register({ email, password }) {
  return fetch(`${this._baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(this._handleResponse);
}

login({ email, password }) {
  return fetch(`${this._baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(this._handleResponse);
}

signOut() {
  return fetch(`${this._baseUrl}/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(this._handleResponse);
}

// checkToken() {
//   return fetch(`${this._baseUrl}/users/me`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${localStorage.getItem("jwt")}`,
//     }
//   })
//   .then(this._handleResponse);
// }
}
export const auth = new Auth("https://api.mesto.msl.nomoredomainsrocks.ru");