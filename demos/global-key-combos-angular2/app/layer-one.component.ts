
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractLayerComponent } from "./abstract-layer.component";
import { LayerTwoComponent } from "./layer-two.component";

@Component({
	selector: "layer-one",
	outputs: [ "closeEvent: close" ],
	directives: [ LayerTwoComponent ],

	// Notice that our key-bindings are using the special "@" syntax for priority. Also,
	// we are using the "T" token for "terminal" (in some of the cases). This means that
	// those particular key bindings won't be passed-off to any lower-priority bindings.
	// --
	// NOTE: The "Space" binding is NOT using the Terminal token.
	host: {
		"(document: keydown.Enter @ 100 T)": "openSubLayer()",
		"(document: keydown.Escape @ 100 T)": "emitCloseEvent()",
		"(document: keydown.Space @ 100)": "printLayerName()"
	},
	template:
	`
		Welcome to layer One.

		<layer-two 
			*ngIf="isSubLayerOpen"
			(close)="closeSubLayer()">
		</layer-two>
	`
})
export class LayerOneComponent extends AbstractLayerComponent {

	// I print the name of the current layer.
	public printLayerName() : void {

		console.log( "Layer One @ priority 100" );

	}

}