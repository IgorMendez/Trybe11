import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function AdminManage() {
  const initialRegisterState = { name: '', email: '', password: '', role: 'seller' };
  const [registerData, setRegisterData] = useState(initialRegisterState);
  const [loginIsValid, setLoginIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setRegisterData({ ...registerData, [name]: value });
  };

  useEffect(() => {
    const { name, email, password } = registerData;

    if (email === '' || password === '' || name === '') {
      setLoginIsValid(false);
      return;
    }
    const userConfig = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;
    const passwordConfig = 6;
    const nameConfig = 12;
    if (!userConfig
      .test(email)
      || password.length < passwordConfig || name.length < nameConfig) {
      setLoginIsValid(false);
      return;
    }
    setLoginIsValid(true);
  }, [registerData, setRegisterData]);

  const registerUser = () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);

    fetch('http://localhost:3001/register', {
      body: JSON.stringify(registerData),
      headers: myHeaders,
      method: 'POST',
    })
      .then((result) => result.json())
      .then((e) => {
        if (e.Error) return setErrorMessage(e.Error);
        setErrorMessage('');
      }).catch((e) => console.log({ Error: `${e} Deu ruim` }));
  };

  return (
    <div>
      <Header />
      <form>

        <label htmlFor="name-input">
          Nome
          <input
            name="name"
            id="name-input"
            data-testid="admin_manage__input-name"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="email-input">
          Email
          <input
            name="email"
            id="email-input"
            data-testid="admin_manage__input-email"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password-input">
          Senha
          <input
            name="password"
            id="password-input"
            data-testid="admin_manage__input-password"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="role-input">
          Tipo
          <select
            name="role"
            id="role-input"
            data-testid="admin_manage__select-role"
            onChange={ handleChange }
          >
            <option default value="seller">Vendedor</option>
            <option value="administrator">Admnistrador</option>
            <option value="customer">Cliente</option>
          </select>
        </label>

        <button
          disabled={ !loginIsValid }
          type="button"
          data-testid="admin_manage__button-register"
          onClick={ registerUser }
        >
          Cadastrar
        </button>
        <p data-testid="admin_manage__element-invalid-register">{ errorMessage }</p>
      </form>
    </div>
  );
}

export default AdminManage;
