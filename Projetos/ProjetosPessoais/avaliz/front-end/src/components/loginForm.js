import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  // const [dataUser, setDataUser] = useState();

  return (
    <form className="login-container">
      <div className="container-div-login">
        <span>
          <label htmlFor="user-email">
            Email:
            <input id="user-email" />
          </label>
        </span>
        <span>
          <label htmlFor="user-password">
            Senha:
            <input id="user-password" />
          </label>
        </span>
        <button type="button" onClick={() => navigate('/admin/dashboard')}>Login</button>
      </div>
    </form>
  );
}
