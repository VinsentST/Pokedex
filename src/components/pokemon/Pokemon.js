import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFirstPokemons, getMorePokemons,setCaughtPage } from '../../store/actions/pokemonAction';

import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../layout/Spinner';
import PokemonItem from './PokemonItem';

import uuid from 'uuid';
 

const Pokemon = ({
	getFirstPokemons,
	getMorePokemons,
	setCaughtPage,
	pokemons: { loading, pokemons,caughtPokemons },
	isCaughtPage
}) => {
	useEffect(() => {
		getFirstPokemons();
		setCaughtPage(isCaughtPage);
		 
	}, []);
	const [count, setCount] = useState(0);

	if (loading) {
		return <Spinner />;
	} else if (pokemons !== null && pokemons.length !== 0) {
		
		let newCaughtPokemons=[];
		if (isCaughtPage) {
			newCaughtPokemons= pokemons.filter(function (pokemon) {
				return pokemon.isCaught;
			})
		}
		const pressButton = function () {
			
			if (this !== undefined) {
				// callBack
				pokemons[this.id - 1].isCaught = true;
				pokemons[this.id - 1].date = new Date().toLocaleString('en-GB')
				const pokemon = pokemons[this.id - 1];
				caughtPokemons.push(pokemon);
				var headers = new Headers();
				headers.append('Content-Type', 'application/json');
				fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
					credentials: 'same-origin',
					method: 'PUT',
					headers: headers,
					body: JSON.stringify({
						isCaught: pokemon.isCaught,
						date: pokemon.date,
						name: pokemon.name,
						id: pokemon.id,
					}),
				})
				.then(response => response.json())
				.catch(error => console.log(error));
			}
			else {
				alert("no name")
			}
			setCount(count + 1)
		};
		console.log("newCaughtPokemons ",newCaughtPokemons)
		console.log("caughtPokemons ",caughtPokemons)
		return (
			<InfiniteScroll
			      // dataLength={pokemons.length}
			      dataLength={isCaughtPage?caughtPokemons.length:pokemons.length}
				next={getMorePokemons}
				// hasMore={true}
				hasMore={isCaughtPage?(newCaughtPokemons.length>caughtPokemons.length ? true : false):(newCaughtPokemons.length<pokemons.length ? true : false)}
				loader={<h4 className='text-center'>Loading....</h4>}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				<div className='card-group d-flex align-items-center py-4'>

					{
						(isCaughtPage ? (caughtPokemons.map(pokemon => (
							<PokemonItem key={uuid.v4()} pokemon={pokemon} onClick={pressButton.bind(pokemon)} />
						))):(pokemons.map(pokemon => (
							<PokemonItem key={uuid.v4()} pokemon={pokemon} onClick={pressButton.bind(pokemon)} />
						))))
					}
				</div>

			</InfiniteScroll>
		);
	} else {
		return <h1>No Results Found</h1>;
	}
};

Pokemon.propTypes = {
	pokemons: PropTypes.object.isRequired,
	getFirstPokemons: PropTypes.func.isRequired,
	getMorePokemons: PropTypes.func.isRequired,
	setCaughtPage:PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	pokemons: state.pokemons,
	caughtPokemons:state.caughtPokemons
});
export default connect(
	mapStateToProps,
	{ getFirstPokemons, getMorePokemons,setCaughtPage}
)(Pokemon);
