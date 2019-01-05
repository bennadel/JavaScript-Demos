
<style scoped src="./app.component.less" />
<style scoped lang="less">
	
	.movie {
		// Needed to get the z-index to change the stack-order during animation.
		position: relative ;

		// CSS animation class added by Vue.js during animation duration (based on the 
		// 'name' property of the transition-group element).
		&-move {
			transition-duration: 750ms ;
			transition-timing-function: ease-in-out ;
			z-index: 2 ;
		}

		// To place the targeted movie above all other animating movies. Since all moving
		// elements have z-index of 2, the stack-order will follow the natural order of
		// elements in the HTML. However, we want the "target" movie to always be above
		// all other elements, regardless of which direction its moving. As such, we'll
		// bump the selected movie up one more level.
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
					<a :href="movie | getMovieUrl" target="_blank" class="link">
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
		filters: {
			getMovieUrl( movie ) {

				return( `https://www.imdb.com/title/${ movie.id }/` );

			}
		},
		methods: {
			move( movie, to ) {

				// Most of the animation can be handled directly in the HTML / CSS.
				// However, in order for the movie-in-question to be visually above all
				// the other movies during the animation, we have to explicitly track the
				// movie that is being ordered.
				// --
				// NOTE: This selection will persist beyond the end of the animation.
				// But, this has no down-side, so don't sweat it.
				this.selectedMovie = movie;

				var index = this.movies.indexOf( movie );

				// Splice the selected movie out of the collection and then insert it
				// back into the collection at the target location.
				switch ( to ) {
					case "up":
						var nextIndex = Math.max( 0, ( index - 1 ) );
						this.movies.splice( index, 1 );
						this.movies.splice( nextIndex, 0, movie );
					break;
					case "top":
						this.movies.splice( index, 1 );
						this.movies.splice( 0, 0, movie );
					break;
					case "down":
						var nextIndex = Math.min( this.movies.length, ( index + 1 ) );
						this.movies.splice( index, 1 );
						this.movies.splice( nextIndex, 0, movie );
					break;
					case "bottom":
						this.movies.splice( index, 1 );
						this.movies.splice( this.movies.length, 0, movie );
					break;
				}

			}
		}
	});

</script>
