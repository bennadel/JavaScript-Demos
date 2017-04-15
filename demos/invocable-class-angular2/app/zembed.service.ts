
// The zEmbed object for the Zendesk web widget has a dual nature. It is both an 
// invocable Function and, later on its life-cycle, an object with properties that 
// represent the API. In TypeScript, we can model this kind of duality by using 
// "Declaration Merging". This feature allows two or more separate declarations to 
// aggregate the overall definition of a particular value. One of the supported
// merge operations is a "Function" and a "Namespace" merge.

// Here, the original zEmbed() function is acting as the "Function" in our TypeScript
// declaration merge.
export function zEmbed( callback: zEmbedCallback ) : void {

	console.log( "zEmbed() provided with callback..." );

}

// ... then, we can create a Namespace that declared the Properties on our zEmbed 
// Function. The exported properties in this namespace will actual be injected into
// the zEmbed() "value declaration" above.
export namespace zEmbed {

	// Exports as zEmbed.hide().
	export function hide() {
		
		console.log( "zEmbed.hide() called..." );

	}

	// Exports as zEmbed.show().
	export function show() {
		
		console.log( "zEmbed.show() called..." );

	}

}

interface zEmbedCallback {
	(): any;
}
