import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expireIn, setExpireIn] = useState();

  useEffect(() => {
    axios
      .post('http://localhost:4444/login', {
        code,
      })
      .then((res) => {
        const { accessToken, refreshToken, expiresIn } = res.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setExpireIn(expiresIn);
      })
      .catch(() => {
        window.location = '/';
      });
  }, [code]);

  return accessToken;
}
