import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const PokemonItem = ({ pokemon,onClick }) => {
	return (
		<div
			className='card m-auto flex-fill align-items-center'
			style={cardStyle}
		>
			<img

				src={`/img/${pokemon.id}.png`}
				className='card-img-top pokeimg'
				alt={pokemon.name}
				onError={e => {
					e.target.onerror = null;
					e.target.src = 'https://free-images.com/or/d3fc/vanamo_logo_svg.jpg';
				  }}
			/>
			<Link
				to={`/pokemon/${pokemon.id}`}
				className='card-title h4 text-capitalize'
			>
				{pokemon.name}
			</Link>
			<button className="pokemon-card__catch" onClick={onClick} disabled={pokemon.isCaught}> {pokemon.isCaught ? 'I was caught' : 'Catch'}</button>
		
		</div>
	);
};

const cardStyle = {
	width: '200px',
	height: '200px',
	backgroundColor: '#3B4CCA',
	margin: '5px'
};
PokemonItem.propTypes = {
	pokemon: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired
};

export default PokemonItem;
