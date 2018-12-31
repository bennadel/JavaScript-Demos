
<style scoped src="./app.component.less" />

<template>

	<div class="app">

		<p>
			<strong>Computed Service Value:</strong> {{ computedValue }}
		</p>

		<p>
			<strong>Direct Service Value:</strong> {{ service.value }}
		</p>

		<p>
			<strong>Shim Value:</strong> {{ shim }}
		</p>

	</div>

</template>

<script>
	
	// Import core classes.
	import Vue from "vue";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	export default Vue.extend({
		inject: [
			"service"
		],
		data() {

			return({
				shim: 0
			});

		},
		computed: {
			computedValue() {

				// TEST: Do non-reactive services cause computed values to recompute.
				return( this.service.value );

			}
		},
		watch: {
			"service.value": function( newValue, oldValue ) {

				// TEST: Do non-reactive services cause watchers to fire.
				console.log( "Watcher:", newValue );

			}
		},
		// I get called once after the component has been created and the props and
		// dependencies have been wired together.
		created() {

			setInterval(
				() => {

					// TEST: Do non-reactive service updates get rendered.
					console.log( "Interval:",  ( this.service.value = Math.random() ) );

				},
				1000
			);

			setInterval(
				() => {

					// TEST: Does updating a REACTIVE value cause NON-REACTIVE values in
					// the same template to re-render.
					console.log( "Shim-Interval:", this.shim++ );

				},
				4000
			);

		}
	});

</script>
