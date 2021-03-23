import useAuth from '../hooks/useAuth';
import { Container, Form } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import _ from 'lodash';
import SearchTrack from './components/SearchTrack';
import Player from './components/Player';

const spotifyWebApi = new SpotifyWebApi({
  clientId: '76828603dd284ae4a7f859fdab19e990',
});

const Dashboard = (props) => {
  const { code } = props;
  const accessToken = useAuth(code);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [chooseTrack, setChooseTrack] = useState('');

  const fetchData = () => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyWebApi.searchTracks(search).then((res) => {
      const formatRes = res.body.tracks.items.map((track) => {
        const smallestAlbumImg = track.album.images.reduce((smallest, nextImg) => {
          if (nextImg.width < smallest.width) return nextImg;
          return smallest;
        }, track.album.images[0]);

        return {
          title: track.name,
          artist: track.artists[0].name,
          albumImg: smallestAlbumImg.url,
          uri: track.uri,
        };
      });
      setSearchResults(formatRes);
    });
  };

  const fetchDataCallback = useCallback(fetchData, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyWebApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDataCallback();
    }, 1500);

    return () => clearTimeout(timer);
  }, [fetchDataCallback]);

  const handleSearchOnchange = (e) => {
    setSearch(e.target.value);
  };

  const handleChooseTrack = (trackUri) => {
    setChooseTrack(trackUri);
  };

  return (
    <Container className={'d-flex flex-column py-2'} style={{ height: '100vh' }}>
      <Form.Control value={search} onChange={handleSearchOnchange} />
      <div className={'flex-grow-1 my-2'}>
        {searchResults?.map((track) => (
          <SearchTrack {...{ track, handleChooseTrack }} />
        ))}
      </div>
      <Player accessToken={accessToken} trackUri={chooseTrack} />
    </Container>
  );
};

export default Dashboard;
