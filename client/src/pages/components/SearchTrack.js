const SearchTrack = (props) => {
  const { track, handleChooseTrack } = props;
  const { title, artist, albumImg, uri } = track;
  return (
    <div
      className={'d-flex m-2'}
      onClick={() => {
        handleChooseTrack(uri);
      }}
      style={{ cursor: 'pointer' }}
    >
      <img src={albumImg} style={{ width: '64px', height: '64px' }} />
      <div className={'ml-3'}>
        <div>{title}</div>
        <div className="text-muted">{artist}</div>
      </div>
    </div>
  );
};

export default SearchTrack;
