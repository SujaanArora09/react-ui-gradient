import React from 'react'

import SimpleGradient from 'react-ui-gradient'

const App = () => {
  return <SimpleGradient gradient={"Dark Ocean"} element='h1' property='backgroundImage' style={{WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', fontSize:'100px'}}>Hello World!</SimpleGradient>
}

export default App
