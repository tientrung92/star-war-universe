import React, { Component } from 'react';
import NavBar from './components/NavBar';
import CharacterList from './components/CharacterList';
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CharacterList />
      </div>
    )
  }
}
export default App