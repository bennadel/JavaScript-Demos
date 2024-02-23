<script>

	// Import app modules.
	import { getType } from "./type-utils.js";
	import { ARRAY, BOOLEAN, NULL, NUMBER, OBJECT, STRING } from "./type-utils.js";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	// I am the value being "explored".
	export var value = null;

	// I allow parts of the data structure tree to be collapsed.
	var isCollapsed = false;
	var collapsedEntries = Object.create( null );

	// Whenever the value changes, re-evaluate the type.
	$: valueType = getType( value );

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I attempt to replace the current value with JSON.parse() of the current value. This
	* is helpful for when a string payload contains an embedded JSON representation.
	*/
	function parseStringValue( event ) {

		event.preventDefault();

		try {

			value = JSON.parse( value );

		} catch ( error ) {

			console.error( error );

		}

	}


	/**
	* I toggle the rendering of part of the data structure tree. For simple values, this
	* represents the entire node. For Objects/Arrays, this represents the entry in the
	* complex data structure.
	*/
	function toggle( event ) {

		var subIndex = event.target.dataset.toggleIndex;

		// Toggling the whole value.
		if ( subIndex === undefined ) {

			isCollapsed = ! isCollapsed;

		// Toggling a subvalue (index or key).
		} else {

			collapsedEntries[ subIndex ] = ! collapsedEntries[ subIndex ];

		}

	}

</script>

<style>

	.json-node {
		display: inline-grid ;
		grid-gap: 2px ;
	}

	.header {
		border: 1px solid #cccccc ;
		border-radius: 3px 3px 3px 3px ;
		background-color: #cccccc ;
		cursor: pointer ;
		font-family: inherit ;
		font-size: inherit ;
		font-weight: bold ;
		grid-column: 1 / span 2 ;
		line-height: inherit ;
		padding: 6px 6px 6px 6px ;
		text-align: left ;
	}
	.header__type {
		display: block ;
	}
	.header__count {
		display: block ;
		margin-top: 4px ;
	}

	.label {
		align-items: flex-start ;
		background-color: #cccccc ;
		border: 1px solid #cccccc ;
		border-radius: 3px 3px 3px 3px ;
		cursor: pointer ;
		display: flex ;
		font-family: inherit ;
		font-size: inherit ;
		grid-column: 1 / span 1 ;
		line-height: inherit ;
		padding: 6px 6px 6px 6px ;
		text-align: left ;
	}

	.value {
		background-color: #f0f0f0 ;
		border: 1px solid #cccccc ;
		border-radius: 3px 3px 3px 3px ;
		grid-column: 2 / span 1 ;
		padding: 6px 6px 6px 6px ;
	}

	.label.is-null {
		background-color: #d5d5d5 ;
		border-color: #999999 ;
		color: #000000 ;
	}
	.value.is-null {
		background-color: #fafafa ;
		border-color: #999999 ;
		color: #000000 ;
	}

	.label.is-boolean,
	.label.is-string,
	.label.is-number {
		background-color: #ffc900 ;
		border-color: #cca000 ;
		color: #000000 ;
	}
	.value.is-boolean,
	.value.is-string,
	.value.is-number {
		background-color: #fff4cc ;
		border-color: #cca000 ;
		color: #000000 ;
	}

	.header.is-array,
	.label.is-array {
		background-color: #2782dd ;
		border-color: #040f1a ;
		color: #ffffff ;
	}
	.value.is-array {
		background-color: #edf5fc ;
		border-color: #040f1a ;
	}

	.header.is-object,
	.label.is-object {
		background-color: #e81236 ;
		border-color: #130104 ;
		color: #ffffff ;
	}
	.value.is-object {
		background-color: #fde3e7 ;
		border-color: #130104 ;
	}

	.header.is-collapsed,
	.label.is-collapsed {
		background-color: #333333 ;
		border-color: #000000 ;
		color: #f0f0f0 ;
		font-style: italic ;
	}

	.header:hover,
	.label:hover {
		border-color: #ffffff ;
		outline: 1px solid #ffffff ;
		outline-offset: -3px ;
	}

</style>

<div class="json-node">

	{#if ( valueType === NULL ) }

		<button
			on:click="{ toggle }"
			class="label is-null"
			class:is-collapsed="{ isCollapsed }">
			Null
		</button>
		{#if ! isCollapsed }
			<div class="value is-null">
				null
			</div>
		{/if}

	{:else if ( valueType === STRING ) }

		<button
			on:click="{ toggle }"
			class="label is-string"
			class:is-collapsed="{ isCollapsed }">
			String
		</button>
		{#if ! isCollapsed }
			<a
				on:dblclick="{ parseStringValue }"
				class="value is-string">
				{ value }
			</a>
		{/if}

	{:else if ( valueType === BOOLEAN ) }

		<button
			on:click="{ toggle }"
			class="label is-boolean"
			class:is-collapsed="{ isCollapsed }">
			Boolean
		</button>
		{#if ! isCollapsed }
			<div class="value is-boolean">
				{ value }
			</div>
		{/if}

	{:else if ( valueType === NUMBER ) }

		<button
			on:click="{ toggle }"
			class="label is-number"
			class:is-collapsed="{ isCollapsed }">
			Number
		</button>
		{#if ! isCollapsed }
			<div class="value is-number">
				{ value }
			</div>
		{/if}

	{:else if ( valueType === ARRAY ) }

		<button
			on:click="{ toggle }"
			class="header is-array"
			class:is-collapsed="{ isCollapsed }">
			<span class="header__type">
				Array
			</span>
			<span class="header__count">
				Entries: { value.length }
			</span>
		</button>
		{#if ! isCollapsed }

			{#each value as subvalue, subvalueIndex }

				<button
					on:click="{ toggle }"
					data-toggle-index="{ subvalueIndex }"
					class="label is-array"
					class:is-collapsed="{ collapsedEntries[ subvalueIndex ] }">
					{ subvalueIndex }
				</button>
				{#if ! collapsedEntries[ subvalueIndex ] }
					<div class="value is-array">

						<!-- Recursively render array element. -->
						<svelte:self value="{ subvalue }" />

					</div>
				{/if}

			{/each}

		{/if}

	{:else if ( valueType === OBJECT ) }

		<button
			on:click="{ toggle }"
			class="header is-object"
			class:is-collapsed="{ isCollapsed }">
			<span class="header__type">
				Object
			</span>
			<span class="header__count">
				Entries: { Object.keys( value ).length }
			</span>
		</button>
		{#if ! isCollapsed }

			{#each Object.entries( value ) as [ subvalueIndex, subvalue ] }

				<button
					on:click="{ toggle }"
					data-toggle-index="{ subvalueIndex }"
					class="label is-object"
					class:is-collapsed="{ collapsedEntries[ subvalueIndex ] }">
					{ subvalueIndex }
				</button>
				{#if ! collapsedEntries[ subvalueIndex ] }
					<div class="value is-object">

						<!-- Recursively render object entry. -->
						<svelte:self value="{ subvalue }" />

					</div>
				{/if}

			{/each}

		{/if}

	{/if}

</div>
