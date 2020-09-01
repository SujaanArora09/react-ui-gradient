import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SimpleGradient from '../src';

const App = () => {
  return (
    <SimpleGradient
      gradient="Dark Ocean"
      element="h1"
      property="backgroundImage"
      style={{
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        fontSize: '100px',
      }}
    >
      Hello World!
    </SimpleGradient>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
