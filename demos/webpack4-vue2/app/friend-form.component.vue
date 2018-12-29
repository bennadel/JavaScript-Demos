
<style scoped src="./friend-form.component.less" />

<template>

	<form @submit.prevent="processForm()" class="form">
		<input
			type="text"
			v-model.trim="name"
			:placeholder="placeholder"
			class="input"
		/>

		<button type="submit" class="submit">
			Add Friend
		</button>
	</form>

</template>

<script>
	
	// Import core classes.
	import Vue from "vue";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	export default Vue.extend({
		props: [
			"placeholder"
		],
		data() {

			return({
				name: ""
			});

		},
		methods: {
			// I emit the "add" event and clear the form.
			processForm() {

				if ( this.name ) {

					this.$emit( "add", this.name );
					this.name = "";

				}

			}
		}
	});

</script>
