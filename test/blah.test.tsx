import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SimpleGradient from '../src';

const Hello: React.FC<{ foo: string }> = ({ foo }) => {
  return <div>{foo}</div>;
};

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SimpleGradient gradient={'50 Shades of Grey'} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('extends element props', () => {
    const el = <SimpleGradient gradient={'Abbas'} element={Hello} />;
    console.log(el.props);
  });
});
