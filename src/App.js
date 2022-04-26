import React from 'react';
import './App.css';
import {Routes ,Route, NavLink, Navigate} from 'react-router-dom';
import PokemonList from './containers/PokemonList';
import Pokemon from './containers/Pokemon';


function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to={'/'}>Search</NavLink>
      </nav>
      <Routes>
        <Route path={'/'} element={<PokemonList/>}/>
        <Route path={'/pokemon/:pokemon'} element={<Pokemon/>}/>
        <Route path='*' element ={<Navigate replace to ="/"/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
