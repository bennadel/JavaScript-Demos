
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractLayerComponent } from "./abstract-layer.component";

@Component({
	selector: "layer-three",
	outputs: [ "closeEvent: close" ],

	// Notice that our key-bindings are using the special "@" syntax for priority. Also,
	// we are using the "T" token for "terminal" (in some of the cases). This means that
	// those particular key bindings won't be passed-off to any lower-priority bindings.
	// --
	// NOTE: The "Space" binding is NOT using the Terminal token.
	host: {
		"(document: keydown.Escape @ 300 T)": "emitCloseEvent()",
		"(document: keydown.Space @ 300)": "printLayerName()"
	},
	template:
	`
		Welcome to layer Three.
	`
})
export class LayerThreeComponent extends AbstractLayerComponent {

	// I print the name of the current layer.
	public printLayerName() : void {

		console.log( "Layer Three @ priority 300." );

	}

}