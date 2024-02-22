<script>

	// Import vendor modules.
	import { onMount } from "svelte";

	// Import app modules.
	import JsonError from "./ui/JsonError.svelte";
	import JsonExplorer from "./ui/JsonExplorer.svelte";
	import JsonInput from "./ui/JsonInput.svelte";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	var parsingError = null;
	var parsingResult = null;
	var jsonPayload = "";

	// When the app is mounted, check to see if there is an initial payload encoded in the
	// URL. The base64-encoded hash makes it simple to share JSON explorations with other
	// people.
	onMount(
		() => {

			if ( jsonPayload = urlGet() ) {

				handleExplore();

			} else {

				// Setup a default value for funzies.
				jsonPayload = JSON.stringify({
					id: 4,
					name: "Esty Smith",
					activities: [ "movies", "tv", { which: "dinner", preference: "Good Stuff Diner" } ],
					relationship: {
						style: "platonic",
						isBFF: true,
						metadata: JSON.stringify({
							created: "2024-01-01 00:00:00",
							offset: "+04"
						})
					},
					referringFriend: null
				});

			}

		}
	);


	/**
	* I attempt to parse the current JSON payload and render it as an object tree.
	*/
	function handleExplore( event ) {

		parsingError = null;

		try {

			parsingResult = JSON.parse( jsonPayload );
			// Pretty-print the payload back into the input for easier editing.
			jsonPayload = JSON.stringify( parsingResult, null, 4 );
			// Persist the original value into the URL for sharing. I'm re-stringifying it
			// in order to always remove the extra whitespace that the pretty-printing
			// just added to the input (will matter the next time the Input is submitted).
			urlSet( JSON.stringify( parsingResult ) );


		} catch ( error ) {

			parsingError = error.message;

		}

	}


	/**
	* I try get the data persisted in the URL (otherwise returns empty string).
	*/
	function urlGet() {

		try {

			return( atob( window.location.hash.slice( 1 ) ) );

		} catch ( error ) {

			console.error( error );
			return( "" );

		}

	}


	/**
	* I try to persist the given data to the URL (fails silently).
	*/
	function urlSet( data ) {

		try {

			window.location.hash = btoa( data );

		} catch ( error ) {

			console.error( error );

		}

	}

</script>

<style>

	/**
	* It seems that there's no easy / intuitive way to apply to a CSS class to a custom
	* component. As such, we're going to wrap the custom elements with a DIV so that we
	* can apply some custom styling.
	*/
	.error-wrapper {
		margin-bottom: 20px ;
	}
	.input-wrapper {
		margin-bottom: 30px ;
	}
	.explorer-wrapper {
		margin-bottom: 30px ;
	}

</style>

<main>

	<h1>
		JSON Explorer In Svelte 4.2.10
	</h1>

	{#if parsingError}
		<div class="error-wrapper">
			<JsonError>
				{ parsingError }
			</JsonError>
		</div>
	{/if}

	<div class="input-wrapper">
		<JsonInput
			bind:value="{ jsonPayload }"
			on:explore="{ handleExplore }"
		/>
	</div>

	{#if parsingResult}
		<div class="explorer-wrapper">
			<JsonExplorer value="{ parsingResult }" />
		</div>
	{/if}

</main>
