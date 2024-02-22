<script>

	// Import app modules.
	import JsonNode from "./JsonNode.svelte";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	export var value = null;

</script>

<style>

	article {
		font-size: 1rem ;
	}

	.tree-wrapper {
		margin-bottom: 30px ;
	}

</style>

<article>
	<h2>
		Parsed Data Structure
	</h2>

	<div class="tree-wrapper">
		<JsonNode value="{ value }" />
	</div>

	<p>
		<strong>Pro Tip</strong>: If a String value contains JSON, you can try to parse
		it by using <strong>double-clicking</strong> on the value.
	</p>
</article>
