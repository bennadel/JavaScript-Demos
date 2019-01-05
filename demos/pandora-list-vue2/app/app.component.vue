
<style scoped src="./app.component.less" />
<style scoped lang="less">
	
	.movie {
		// Needed to get the z-index to change the stack-order during animation.
		position: relative ;

		// This is the CSS animation class added by Vue.js during animation life-cycle
		// (based on the 'name' property of the transition-group element).
		&-move {
			transition-duration: 400ms ;
			transition-timing-function: ease-in-out ;
			z-index: 2 ;
		}

		// Since all moving elements have z-index of 2, the stack-order will follow the
		// natural order of elements in the HTML. However, we want the "target" movie to
		// always be above all other elements, regardless of which direction its moving.
		// As such, we'll bump the selected movie up one more level.
		&--selected {
			z-index: 3 ;
		}
	}

</style>

<template>

	<div class="app">

		<!-- NOTE: Transition-Group will render our UL element. -->
		<transition-group name="movie" tag="ul" class="movies">
			<li
				v-for="movie in movies"
				:key="movie.id"
				class="movie"
				:class="{ 'movie--selected': ( movie === selectedMovie ) }">
				
				<div class="title">
					<a :href="movie.imdbUrl" target="_blank" class="link">
						{{ movie.title }}
					</a>
					<span class="release-date">
						( {{ movie.releasedAt }} )
					</span>
				</div>

				<div class="tools">
					<div class="tools__group">
						<a @click="move( movie, 'up' )" class="move-up">up</a>
						<a @click="move( movie, 'top' )" class="move-top">top</a>
					</div>
					<div class="tools__group">
						<a @click="move( movie, 'down' )" class="move-down">down</a>
						<a @click="move( movie, 'bottom' )" class="move-bottom">bottom</a>
					</div>
				</div>

			</li>
		</transition-group>

	</div>

</template>

<script>
	
	// Import core classes.
	import Vue from "vue";

	// Import application classes.
	import movies from "./data";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	export default Vue.extend({
		data() {

			return({
				movies: movies,
				selectedMovie: null
			});

		},
		methods: {
			// I move the given movie to the given destination in the list.
			move( movie, destination ) {

				var index = this.movies.indexOf( movie );

				// Calculate the next index based on the target location.
				switch ( destination ) {
					case "up":
						var nextIndex = Math.max( 0, ( index - 1 ) );
					break;
					case "top":
						var nextIndex = 0;
					break;
					case "down":
						var nextIndex = Math.min( this.movies.length, ( index + 1 ) );
					break;
					case "bottom":
						var nextIndex = this.movies.length;
					break;
				}

				// Splice the selected movie out of the collection and then insert it
				// back into the collection at the target location.
				this.movies.splice( index, 1 );
				this.movies.splice( nextIndex, 0, movie );

				// Most of the animation can be handled directly in the HTML / CSS.
				// However, in order for the movie-in-question to be visually above all
				// the other movies (in the stack-order) during the animation, we have to
				// explicitly track the movie that is being ordered.
				// --
				// NOTE: This selection will persist beyond the end of the animation.
				// But, this has no down-side, so don't sweat it.
				this.selectedMovie = movie;

			}
		}
	});

</script>
