<template>
	<div class="panel bg--red-04">
		<div class="container bg--red-01">
			<TopPanelButton>

			</TopPanelButton>
		</div>
	</div>
</template>

<script>
import TopPanelButton from './TopPanelButton.vue'

export default {
  name: 'TopPanel',
	components: TopPanelButton

};
</script>

<style lang="scss" scoped>
	.panel{
		position: absolute;
		width: 100%;
		clip-path: polygon(0 0, 100% 0, 100% 41px, 270px 41px, 200px 100%, 0 100% );
		z-index: 1;

		@media (min-width: $viewport-medium) {
			width: calc(50% + 20px);
		}

		.container{
			display: flex;
			padding: 10px;
			align-items: flex-start;
			height: 75px;
			clip-path: polygon(0 0, 100% 0, 100% 38px, 270px 38px, 200px 72px, 0 72px);
			box-shadow: inset -10px 0 0 0 color('red-03');
		}
	}
</style>
