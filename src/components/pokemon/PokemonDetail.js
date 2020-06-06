import React, {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	getPokemonDetail,
	clearCurrent
} from '../../store/actions/pokemonAction';

import Spinner from '../layout/Spinner';


const PokemonDetail = ({ clearCurrent, getPokemonDetail, pokemons, match }) => {
	const PokeId = Number(match.params.id);

	useEffect(() => {
		clearCurrent();
		getPokemonDetail(PokeId);

	}, [match]);
	const { loading, current_pokemon } = pokemons;
	if (current_pokemon === null || loading
	) {
		return <Spinner />;
	}
	const {
		id,
		name,
		date,
		isCaught
	} = current_pokemon;
	// console.log( current_pokemon)
	return (
		<Fragment>

			<div
				id='carouselExampleControls'
				className='carousel slide'
				data-ride='carousel'
			>
				<div className='card align-items-center'>
					<img
						src={`/img/${id}.png`}
						onError={e => {
							e.target.onerror = null;
							e.target.src =
								'https://free-images.com/or/d3fc/vanamo_logo_svg.jpg';
						}}
						alt={name}
						className='card-img-top pokeimg'
					/>
					<div className='card-body'>
						<h1 className='card-title text-center text-capitalize'>
							{name}
						</h1>
						{isCaught ? (
							<p>
								<span >Status: </span>caught on{' '}
								{date}
							</p>
						) : (
								<p>
									<span >Status: </span>not caught yet
            				</p>
							)}
						<Link
							to={`/`}
							className='card-title h4 text-capitalize'
						>
							Go back 	
						</Link>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

PokemonDetail.propTypes = {
	pokemons: PropTypes.object.isRequired,
	getPokemonDetail: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	pokemons: state.pokemons
});
export default connect(
	mapStateToProps,
	{ getPokemonDetail, clearCurrent }
)(PokemonDetail);
