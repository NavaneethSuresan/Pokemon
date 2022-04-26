import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetPokemon } from '../actions/PokemonActions';
import _ from 'lodash';

const Pokemon = (props) => {
    const {pokemon} = useParams();
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);

    React.useEffect(() => {
        dispatch(GetPokemon(pokemon));
    }, []);

    const showData = () => {
        if (!_.isEmpty(pokemonState.data[pokemon])) {
            const pokeData = pokemonState.data[pokemon];
            return (
                <div className='pokemon-wrapper'>
                    <div className='item'>
                        <h1>Sprites</h1>
                        <img src={pokeData.sprites.front_default} alt='' />
                        <img src={pokeData.sprites.back_default} alt='' />
                        <img src={pokeData.sprites.front_shiny} alt='' />
                        <img src={pokeData.sprites.back_shiny} alt=''/>
                    </div>
                    <div className='item'>
                        <h1>Stats</h1>
                        {pokeData.stats.map(el => {
                            return <p>{el.stat.name} {el.base_stat}</p>
                        })}
                    </div>
                    <div className='item'>
                        <h1>Abilities</h1>
                        {pokeData.abilities.map(el => {
                            return <p>{el.ability.name}</p>
                        })}
                    </div>
                </div>
            );
        }

        if (pokemonState.loading) {
            return <p>Loading...</p>
        }

        if(pokemonState.errorMsg !== '') {
            return <p>{pokemonState.errorMsg}</p>
        }

        return <p>Error getting pokemon</p>
    }

    return (
        <div className='poke'>
            <h1>{pokemon}</h1>
            {showData()}
        </div>
    );
}

export default Pokemon
