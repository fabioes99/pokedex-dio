<template>
	<div class="search">
		<label for="search" class="search__label text--white bg--black">
			<h3 class="search__label--text">[.g.: Charizard]</h3>
			<input
				id="search"
				v-model.trim="name"
				type="text"
				class="search__input"
				@keyup.enter="searchPokemon"
			/>
		</label>

		<div class="types">
			<button v-for="type in types" :key="type.name" type="button" class="type" :class="`bg--${type.name}`" @click.prevent="() => searchTypePokemons(type.name)">
				{{ type.name }}
			</button>
		</div>

		<div class="buttons">
			<button class="btn btn--type" @click.prevent="searchTypePokemons">
				type
			</button>
			<button class="btn btn--clear" @click.prevent="clear">
				Clear
			</button>
			<button class="btn btn--search bg--gray text--yellow" @click.prevent="searchPokemon">
				Search
			</button>
		</div>
	</div>
</template>

<script>
import { actions, mutations, state } from '@/store';

export default {
  name: 'RightPanelContent',
	data(){
		return { name: '' };
	},
	mounted(){
		this.getExistingTypes();
	},
	methods: {
		clear(){
			this.name = '';
			mutations.resetList();
		},
		async searchPokemon() {
			await actions.searchPokemon(this.name);
		},
		async searchTypePokemons(type){
			await actions.getPokemonByType(type);
		},
		async getExistingTypes(){
				await actions.getExistingTypes();
			}
	},
	computed: {
			types(){
				return state.types.slice(0, -2);
			},
		}
};
</script>

<style lang="scss" scoped>
	.search {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		transform: rotateX(-180deg);
		min-height: 250px;

		@media (min-width: $viewport-medium) {
			transform: rotateY(-180deg);
			padding-top: 70px;
			min-width: 300px;
		}

		&__label {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			height: 50%;
			padding: 6px 12px 12px;

			@media (min-width: $viewport-medium) {
				height: 36%;
				padding: 12px 24px 24px;
			}
		}

		.types {
			display: grid;
			grid-template-columns: repeat(5, 1fr);

			@media (min-width: $viewport-medium) {
				grid-template-columns: repeat(3, 1fr);
			}
			.type {
				//flex: 0 0 20%;
				margin: 5px;
				padding: 0 8px;
				font-weight: bold;
				cursor: pointer;
				border-radius: 5px;
				border: none;
				&:hover{
					filter: brightness(1.2);
				}
				&:focus{
					border: 1px solid black;
				}
			}
		}

		&__input {
			color: inherit;
			background: transparent;
			border: none;
			border-bottom: 2px solid color(white);
			padding: 4px 8px;

			@media (min-width: $viewport-medium) {
				padding: 8px;
			}
		}

		.buttons {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: 10px;
			.btn {
				border-radius: 8px;
				font-size: 18px;
				font-weight: bold;
				cursor: pointer;
				align-self: flex-end;
				width: 80px;
				padding: 8px;
				border: none;
				justify-content: space-between;

				&--clear {
					&:hover{
						background-color: #ddd;
					}
				}

				&--search {
					&:hover{
						filter: brightness(1.2);
					}
				}

					@media (min-width: $viewport-medium) {
						width: 130px;
					}

			}

		}
	}
</style>
