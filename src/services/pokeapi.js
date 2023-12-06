import axios from '@/axios';

const getPokemons = ({limit = 25, offset = 0}) => axios.get(`/pokemon?limit=${limit}&offset=${offset}`);

const getPokemonByName = name => axios.get(`/pokemon/${name}`);

const getExistingTypes = () => axios.get('/type');

const getPokemonsByType = type => axios.get(`/type/${type}`);

export default {
	getPokemons,
	getPokemonByName,
	getExistingTypes,
	getPokemonsByType,
}
