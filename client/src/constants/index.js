export const BASE_URL = 'https://accounts.spotify.com';

export const AUTH_URL = `${BASE_URL}/authorize?client_id=76828603dd284ae4a7f859fdab19e990&response_type=code&redirect_uri=http://localhost:7447&scope=streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state`;

export const TOKEN_URL = `${BASE_URL}/api/token`;
