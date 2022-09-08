import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({ password, email })
    .then(() => resetForm());
  }

  return (
    <div className="auth">
      <p className="auth__title">
        Вход
      </p>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          id="email"
          required
          name="email"
          type="email"
          className="auth__input"
          placeholder="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          id="password"
          required
          name="password"
          type="password"
          className="auth__input"
          placeholder="Пароль"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit" className="auth__btn">Войти</button>
      </form>
    </div>
  );

}

export default Login;
