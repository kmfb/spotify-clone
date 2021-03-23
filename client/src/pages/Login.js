import React from 'react';
import { Container } from 'react-bootstrap';
import { AUTH_URL } from '../constants';

export default function Login() {
  return (
    <Container
      className={'d-flex justify-content-center align-items-center'}
      style={{ height: '100vh' }}
    >
      <a href={encodeURI(AUTH_URL)} className={'btn btn-success btn-lg'}>
        Login With Spotify
      </a>
    </Container>
  );
}
