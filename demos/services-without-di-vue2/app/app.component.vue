
<style scoped src="./app.component.less" />

<template>

	<div class="app">
		
		<h2>
			Friends
		</h2>

		<ul v-if="friends">
			<li v-for="friend of friends" :key="friend.id">
				{{ friend.name }}
			</li>
		</ul>

		<div v-if="errorMessage" class="error">
			<strong>Sorry:</strong> {{ errorMessage }}
		</div>

	</div>

</template>

<script>

	// Import application classes.
	// --
	// NOTE: The "services" barrel is our de facto dependency-injection (DI) container.
	// This way, this component / module isn't tied to a specific implementation of any
	// of these services, only to the ones that were created during the bootstrapping
	// process of our Vue.js application.
	import { friendService } from "./services";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //
	
	export default {
		data() {

			return({
				errorMessage: null,
				friends: null
			});

		},
		mounted() {

			friendService.getFriends().then(
				( friends ) => {
					
					this.friends = friends;

				},
				( error ) => {

					this.errorMessage = "There was a problem loading your data :("
					this.friends = null;

				}
			);

		}
	};

</script>
