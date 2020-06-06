import {
	GET_FIRST_POKEMONS,
	GET_MORE_POKEMONS,
	GET_POKEMON_DETAIL,
	POKEMON_ERROR,
	SET_LOADING,
	CLEAR_CURRENT,
	SET_CAUGHT_PAGE
} from '../actions/types';

const initialState = {
	pokemons: [],
	caughtPokemons:[],
	current_pokemon: null,
	isCaughtPage:false,
	loading: true,
	error: null,
	pokemonTotalLength:0,
};
const unigArray = (arr)=>{
	var obj = {};

	for (var i = 0, len = arr.length; i < len; i++)
		obj[arr[i]['id']] = arr[i];

	arr = new Array();
	for (var key in obj)
		arr.push(obj[key]);
	
		return arr;
}
export default (state = initialState, action) => {
	switch (action.type) {
		
		case GET_FIRST_POKEMONS:
			
			let uniqueArray;
			{
				let a = action.payload.filter(function (pokemon) {
					return pokemon.isCaught;
				})
				uniqueArray =unigArray(state.caughtPokemons.concat(a));
			}
			return {
				...state,
				pokemons: action.payload,
				pokemonTotalLength:action.pokemonTotalLength,
				loading: false,
				caughtPokemons:uniqueArray,
			};
		case GET_MORE_POKEMONS:
			let newUniqueArray;
			{
				let a = action.payload.filter(function (pokemon) {
					return pokemon.isCaught;
				})
				newUniqueArray =unigArray(state.caughtPokemons.concat(a));
			}
			return {
				...state,
				pokemons: state.pokemons.concat(action.payload),
				caughtPokemons:newUniqueArray,
				loading: false,
			};
		case GET_POKEMON_DETAIL:
			return {
				...state,
				current_pokemon: action.payload,
				loading: false
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current_pokemon: null,
			};
		case POKEMON_ERROR:
			console.log(action.payload);
			return {
				...state,
				error: action.payload
			};
		case SET_CAUGHT_PAGE:
			return {
				...state,
				isPopa: true,
				isCaughtPage:action.payload
			};
		default:
			return state;
	}
};
