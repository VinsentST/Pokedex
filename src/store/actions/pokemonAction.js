import {
	GET_FIRST_POKEMONS,
	GET_MORE_POKEMONS,
	GET_POKEMON_DETAIL,
	SET_LOADING,
	POKEMON_ERROR,
	CLEAR_CURRENT,
	SET_CAUGHT_PAGE
} from './types';
import axios from 'axios';


export const LIMIT = 20;
export const getFirstPokemons = () => async dispatch => {
	try {
		dispatch(setLoading());
		const res1 = await axios.get(
			`http://localhost:3000/pokemons?_page=1&_limit=${LIMIT}`
		);
		const pokemonTotalLength=res1.headers["x-total-count"];
		const data = await res1.data;
		dispatch({
			type: GET_FIRST_POKEMONS,
			payload: data,
			pokemonTotalLength:pokemonTotalLength
		});
	} catch (err) {
		dispatch({
			type: POKEMON_ERROR,
			payload: err
		});
	}
};


export const getMorePokemons = () => async (dispatch, state) => {
	try {
		/* This is the starting number from which pokemons to fetch for infinite scroll. This implies that the next request will start from last pokemon*/
		const start = state().pokemons.pokemons.length / LIMIT + 1;
		
		const res1 = await axios.get(
			`http://localhost:3000/pokemons?_page=${start}&_limit=${LIMIT}`
		);
		const data = await res1.data;
		dispatch({
			type: GET_MORE_POKEMONS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: POKEMON_ERROR,
			payload: err
		});
	}
};


export const setCaughtPage = (isCaughtPage) => {
	return {
		type:SET_CAUGHT_PAGE,
		payload:isCaughtPage
	
	};
};
export const getPokemonDetail = id => async dispatch => {
	try {
		setLoading();
		const res = await axios.get(`
		http://localhost:3000/pokemons/${id}`);
		const data = await res.data;
		dispatch({
			type: GET_POKEMON_DETAIL,
			payload: data
		});
	} catch (err) {
		dispatch({
			type: POKEMON_ERROR,
			payload: err
		});
	}
};


export const setLoading = () => dispatch => {
	dispatch({
		type: SET_LOADING
	});
};
export const clearCurrent = () => dispatch => {
	dispatch({
		type: CLEAR_CURRENT
	});
};


