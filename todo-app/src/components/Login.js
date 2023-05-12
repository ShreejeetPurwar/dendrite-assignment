import React, { useEffect } from 'react';
import keycloak from '../keycloak';

function Login() {
  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
      if (authenticated) {
        localStorage.setItem('token', keycloak.token);
        window.location.href = '/';
      } else {
        console.warn('Failed to authenticate');
      }
    });
  }, []);

  return (
    <div>
      <h2>Login</h2>
    </div>
  );
}

export default Login;
