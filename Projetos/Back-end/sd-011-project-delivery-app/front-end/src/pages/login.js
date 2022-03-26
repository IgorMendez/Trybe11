import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreDelivery from '../context/context';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(true);
  const [loginIsValid, setLoginIsValid] = useState();

  const navigate = useNavigate();
  const context = useContext(StoreDelivery);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      return navigate('/customer/products');
    }
  }, [navigate]);

  useEffect(() => {
    if (email === '' || password === '') {
      setValid(false);
      return;
    }
    // https://www.ti-enxame.com/pt/javascript/validacao-de-e-mail-de-expressao-regular-em-javascript/957575053/
    const regex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;
    const passwordConfig = 6;
    if (!regex.test(email) || password.length < passwordConfig) {
      setValid(false);
      return;
    }
    setValid(true);
  }, [email, password]);

  const handleLogin = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'token');
    const raw = JSON.stringify({
      email, password,
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    fetch('http://localhost:3001/login', requestOptions)
      .then((result) => result.json())
      .then((result) => {
        if (result.Error) {
          return setLoginIsValid(result.Error);
        }
        context.data = result;

        const paths = {
          customer: '/customer/products',
          administrator: '/admin/manage',
          seller: '/seller/orders',
        };

        const user = {
          userId: result.userId,
          name: result.name,
          email: result.email,
          role: result.role,
          token: result.token,
        };

        localStorage.setItem('user', JSON.stringify(user));

        return navigate(paths[result.role]);
      })
      .catch((e) => console.log({ Error: `${e} Deu ruim` }));
  };

  return (
    <form className="login-container">
      <label htmlFor="email">
        <input
          placeholder="Email"
          id="email"
          data-testid="common_login__input-email"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password">
        <input
          placeholder="Senha"
          id="password"
          data-testid="common_login__input-password"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <div className="buttons-login-container">
        <button
          className="button"
          type="button"
          data-testid="common_login__button-login"
          onClick={ () => handleLogin() }
          disabled={ !valid }
        >
          Login

        </button>
        <button
          className="button"
          type="button"
          onClick={ () => navigate('/register') }
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
        <p data-testid="common_login__element-invalid-email">{loginIsValid}</p>
      </div>
    </form>
  );
}
