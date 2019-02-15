
<style scoped src="./app.component.less" />

<template>

	<div class="app">
		<p>
			I am the AppComponent.
			And, this is my <strong class="label">Projected Content</strong>:
		</p>

		<div class="projected">
			<slot></slot>
		</div>

		<p>
			Fascinating, right?
		</p>
	</div>

</template>

<script>
	
	export default {
		// ...
	};

</script>
