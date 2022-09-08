// const token = localStorage.getItem('jwt');

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._token = options.headers.authorization;
    this._headers = options.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      // headers: {
      //   authorization: this._token
      // }
      headers: this._headers
    })
    .then(this.handleResponse);
  }

  postCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      // headers: {
      //   authorization: this._token,
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify(data)
    })
    .then(this.handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      // headers: {
      //   authorization: this._token,
      //   'Content-Type': 'application/json'
      // }
    })
    .then(this.handleResponse);
  }

  patchProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      // headers: {
      //   authorization: this._token,
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify(data)
    })
    .then(this.handleResponse);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
      // headers: {
      //   authorization: this._token,
      //   'Content-Type': 'application/json'
      // }
    })
    .then(this.handleResponse);
  }

  patchAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      // headers: {
      //   authorization: this._token,
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify(data)
    })
    .then(this.handleResponse);
  }

  changeLikeCardStatus(cardId, status) {
    if (status === true) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
        // headers: {
        //   authorization: this._token,
        //   'Content-Type': 'application/json'
        // }
      })
      .then(this.handleResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
        // headers: {
        //   authorization: this._token,
        //   'Content-Type': 'application/json'
        // }
      })
      .then(this.handleResponse);
    }
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    // authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  credentials: 'include',
});

export default api;
