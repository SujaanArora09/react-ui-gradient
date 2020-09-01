import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SimpleGradient from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SimpleGradient gradient={'50 Shades of Grey'} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
