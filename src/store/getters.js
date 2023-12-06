import { parsePokemonInfo } from '@/utils/index.js';
import state from './state';

export default {
	get pokemonsInfo() {
		return state.list.map(parsePokemonInfo);
	},
};
