import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const code = new URLSearchParams(window.location.search).get('code');
  return <div className="App">{code ? <Dashboard {...{ code }} /> : <Login />}</div>;
}

export default App;
