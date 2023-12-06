import PokeAPI from '@/services/pokeapi';

import state from './state';
import mutations from './mutations';

export default {
	async getPokemons(){
		const {
			setList,
			setIsPokemonSearch,
			setListHasError,
			setListHasNext,
			setListHasCompleted,
			updateOffset,
			setIsSearching
		} = mutations;

		try {
			setIsPokemonSearch(false);
			setListHasError(false);

			const pokemonsList = await PokeAPI.getPokemons({ limit: state.limit, offset: state.offset });

			if (pokemonsList?.results?.length) {
				const prepareInfo = pokemonsList.results.map(item => PokeAPI.getPokemonByName(item.name));
				const pokemonsInfo = await Promise.all(prepareInfo);

				setList(pokemonsInfo);
			}

			if (pokemonsList?.next) {
				setListHasNext(true);
				updateOffset();
			} else {
				setListHasNext(false);
				setListHasCompleted(true);
			}

		} catch (error) {
			setListHasError(true);
			setIsSearching(false);
		}
	},
	async getPokemonByName(name){
		const { setPokemonSearched } = mutations;

		const pokemon = await PokeAPI.getPokemonByName(name);

		if(pokemon){
			setPokemonSearched(pokemon);
		}
	},
	async searchPokemon(name) {
		const {
			setIsPokemonSearch,
			setIsSearching,
			setPokemonSearched,
			setSearchHasError,
			resetList,
		} = mutations;

		if (!name) {
			resetList();
			return;
		}

		try {
			setSearchHasError(false);
			setIsSearching(true);
			setIsPokemonSearch(true);

			const pokemon = state.tmpList.find(info => info.name.toLowerCase() === name.toLowerCase());

			if(state.list[0].name.trim() == name.trim()){
				return ;
			}

			if (pokemon) {
				setPokemonSearched(pokemon);
				return;
			}

			await this.getPokemonByName(name);
		} catch (error) {
			setSearchHasError(true);
		} finally {
			setIsSearching(false);
		}
	},
	async getPokemonByType(type){
		const {
			overwriteList,
			setIsPokemonSearch,
			setListHasError,
			setIsSearching,
			resetList
		} = mutations;

		try {
			setIsPokemonSearch(false);
			setListHasError(false);
			setIsSearching(true);
			resetList();

			const pokemonsList = await PokeAPI.getPokemonsByType(type.trim());

			if (pokemonsList?.id) {

				const prepareInfo = pokemonsList.pokemon.map(item => PokeAPI.getPokemonByName(item.pokemon.name));
				const pokemonsInfo = await Promise.all(prepareInfo);
				overwriteList(pokemonsInfo);
				setIsSearching(false);
			}


		} catch (error) {
			setListHasError(true);
			setIsSearching(false);
		}

	},
	async getExistingTypes(){
		const {
			setListHasError,
			setExistingTypes
		} = mutations;

		try {

			const types = await PokeAPI.getExistingTypes();

			//console.log(types.results);
			setExistingTypes(types.results);
		}catch (error) {
			setListHasError(true);

		}
	}

}
