export const BASE_URL = "https://api.mesto.msl.nomoredomainsrocks.ru";

const handleResponse = (res) => { 
  if (res.ok) { 
    return res.json(); 
  } else { 
    return Promise.reject(`Ошибка: ${res.status}`); 
  } 
}; 
 
export const register = (email, password) => { 
  return fetch(`${BASE_URL}/signup`, { 
    method: "POST", 
    headers: { 
      Accept: "application/json", 
      "Content-Type": "application/json", 
    }, 
    body: JSON.stringify({ email, password }), 
  }) 
    .then((res) => handleResponse(res)) 
    .then((data) => { 
      return { 
        data: { 
          _id: data._id, 
          email: data.email, 
        }, 
      }; 
    }); 
}; 
 
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => handleResponse(res));
};
 
export const checkToken = (token) => { 
  return fetch(`${BASE_URL}/users/me`, { 
    method: "GET", 
    headers: { 
      Accept: "application/json", 
      "Content-Type": "application/json", 
      'Authorization': `Bearer ${token}`
    }, 
  }) 
    .then((res) => handleResponse(res)) 
    .then((data) => data);
  };