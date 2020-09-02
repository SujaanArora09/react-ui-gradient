import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SimpleGradient from '../src';
import { useEffect, useState } from 'react';

const App = () => {
  const [deg, setDeg] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setDeg(deg + 1);
    }, 50);

  },[deg]);
  return (
    <SimpleGradient
      gradient={'Dawn'}
      type={'radial'}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SimpleGradient
        gradient={'After the Rain'}
        element={'h1'}
        style={{ fontWeight: 'bold', fontSize: '100px' }}
        target={'text'}
        angle={deg + 'deg'}
      >
        React UI Gradient
      </SimpleGradient>
    </SimpleGradient>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
