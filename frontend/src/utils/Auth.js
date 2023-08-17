class Auth {
  constructor({baseUrl}) {
    this.baseUrl = baseUrl;
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  register(email, password) {
    return this._request(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
  }

  signin(email, password) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(res => {
      if (res){
        localStorage.setItem('userId', res._id);
        return res;
      }
    });
  }

  signinWithToken(token) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

const auth = new Auth({
  baseUrl: 'https://api.elburrito.mesto.nomoreparties.co'
});

export default auth;