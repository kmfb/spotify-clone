import SpotifyPlayer from 'react-spotify-web-playback';
import { useState, useEffect } from 'react';

export default function Player(props) {
  const [play, setPlay] = useState(false);

  const { accessToken, trackUri } = props;
  console.log(accessToken, 'im accessToken');

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      play={play}
      uris={trackUri ? [trackUri] : []}
      token={accessToken}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
    />
  );
}
