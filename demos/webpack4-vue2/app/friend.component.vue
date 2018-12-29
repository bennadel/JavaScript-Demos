
<style scoped src="./friend.component.less" />
	
<template>

	<div class="friend">
		<div class="name">
			{{ friend.name }}
		</div>

		<div class="actions">
			<a @click="handleDelete()" class="action">( delete )</a>
		</div>
	</div>

</template>

<script>
	
	// Import core classes.
	import Vue from "vue";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	export default Vue.extend({
		props: [
			"friend"
		],
		methods: {
			handleDelete() {

				this.$emit( "delete", this.friend );

			}
		}
	});

</script>
