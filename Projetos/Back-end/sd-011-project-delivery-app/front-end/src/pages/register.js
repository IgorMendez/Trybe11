import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreDelivery from '../context/context';

export default function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginIsValid, setLoginIsValid] = useState();
  const [valid, setValid] = useState(true);
  const context = useContext(StoreDelivery);
  const navigate = useNavigate();

  useEffect(() => {
    if (email === '' || password === '' || name === '') {
      setValid(false);
      return;
    }
    const userConfig = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;
    const passwordConfig = 6;
    const nameConfig = 12;
    if (!userConfig
      .test(email)
      || password.length < passwordConfig || name.length < nameConfig) {
      setValid(false);
      return;
    }
    setValid(true);
  }, [email, name, password, valid]);

  const registerUser = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'token');
    const user = { name, password, email, role: 'customer' };
    if (email === '' || password === '' || name === '') {
      return setLoginIsValid('Favor preencher os campos');
    }
    fetch('http://localhost:3001/register', {
      body: JSON.stringify(user),
      headers: myHeaders,
      method: 'POST',
    })
      .then((result) => result.json())
      .then((e) => {
        if (!e.Error) {
          context.data = e;
          localStorage.setItem('user', JSON.stringify(e));
          return navigate('/customer/products');
        }
        return setLoginIsValid(e.Error);
      });
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form>
        <label htmlFor="fRegisterName">
          Nome
          <input
            id="fRegisterName"
            name="fRegisterName"
            data-testid="common_register__input-name"
            onChange={ ({ target: { value } }) => setName(value) }
          />
        </label>
        <label htmlFor="fRegisterEmail">
          Email
          <input
            id="fRegisterEmail"
            name="fRegisterEmail"
            data-testid="common_register__input-email"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>
        <label htmlFor="fRegisterPassword">
          Senha
          <input
            id="fRegisterPassword"
            name="fRegisterPassword"
            data-testid="common_register__input-password"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
        <div>
          <button
            type="button"
            onClick={ () => registerUser() }
            data-testid="common_register__button-register"
            disabled={ !valid }
          >
            register
          </button>

        </div>
        <p
          data-testid="common_register__element-invalid_register"
        >
          {loginIsValid}
        </p>
      </form>
    </div>
  );
}
