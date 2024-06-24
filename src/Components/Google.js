import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Google(){
  const handleSuccess = (response) => {
    // console.log('Login successful!', response);
    const credResponse = jwtDecode(response.credential);
    console.log(credResponse);
  };

  const handleFailure = (error) => {
    console.error('Login failed!', error);
    // Handle login failure
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleFailure}
      render={({ onClick }) => (
        <button onClick={onClick}>Sign In With Google</button>
      )}
    />
  );
};

