<script>

	// Import vendor modules.
	import { createEventDispatcher } from "svelte";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	export var value = "";
	var dispatch = createEventDispatcher();


	/**
	* I auto-submit the form if the user pressed CMD+Enter.
	*/
	function handleKeydown( event ) {

		if (
			( event.key === "Enter" ) &&
			( event.metaKey || event.ctrlKey )
			) {

			event.preventDefault();
			event.target.form.requestSubmit();

		}

	}


	/**
	* I emit the "explore" event for the given JSON value.
	*/
	function handleSubmit( event ) {

		if ( value.trim () ) {

			dispatch( "explore", value.trim() );

		}

	}

</script>

<style>

	form {
		display: flex ;
		font-size: 1.2rem ;
		gap: 10px ;
	}

	textarea {
		border: 1px solid #cccccc ;
		border-radius: 7px 7px 7px 7px ;
		display: block ;
		flex: 1 1 auto ;
		font-family: monospace ;
		font-size: inherit ;
		height: 150px ;
		padding: 10px 10px 10px 10px ;
		white-space: nowrap ;
		width: 100% ;
	}

	button {
		background-color: #e0e0e0 ;
		border: 1px solid #cccccc ;
		border-radius: 7px 7px 7px 7px ;
		cursor: pointer ;
		flex: 0 0 auto ;
		font-family: monospace ;
		font-size: inherit ;
		padding: 20px 30px 20px 30px ;
	}

</style>

<form on:submit|preventDefault="{ handleSubmit }">
	<textarea
		bind:value="{ value }"
		on:keydown="{ handleKeydown }"
	></textarea>
	<button type="submit">
		Explore
	</button>
</form>
