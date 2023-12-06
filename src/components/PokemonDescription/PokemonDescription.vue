<template>
	<div class="pokemon"  >
		<ListItem v-bind="mainInfo" />
		<ul class="stats" v-if="isShowingStats">
			<li v-for="(stat, index) in stats" ::key="index">
				{{ parseStatName(stat.stat.name) }}: {{ stat.base_stat }}
			</li>
			<button @click="close" class="close">Close</button>
		</ul>
	</div>
</template>

<script>
import ListItem from '@/components/List/ListItem.vue';
import { state, mutations } from '@/store';
import { parsePokemonInfo } from '@/utils';


const statsNames = {
		hp: 'HP',
		attack: 'Attack',
		defense: 'Defense',
		speed: 'Speed',
		'special-attack': 'Sp. Atk',
		'special-defense': 'Sp. Def',
	};

export default{
	name: 'PokemonDescription',
	components: { ListItem },
	props: {
		id: {
			type: Number,
			required: true
		}
	},
	computed: {
		isShowingStats(){
				return state.isShowingStats;
			},
	},
	data(){
		return {
			mainInfo: null,
			stats: [],
		}
	},
	created(){
		const pokemonInfo = state.list.find(pokemon => pokemon.id === this.id);
		if(pokemonInfo){
			const infoParsed = parsePokemonInfo(pokemonInfo);

			const {stats, ...rest} = infoParsed;

			this.mainInfo = rest;
			this.stats = stats;
			mutations.showStats(true);

		}
	},
	methods: {
			parseStatName(name){
				return statsNames[name] || name;
			},
			close(){
				mutations.showStats(false);
			}
		}
}

</script>


<style lang="scss" scoped>
	.stats {
		padding: 0 24px;

		.close{
			width: auto;
			margin-top: 6px;
			border-radius: 7px;
			border: none;
			cursor:pointer;
			&:hover{
				background-color: #cacaca;
			}
		}
	}
</style>
