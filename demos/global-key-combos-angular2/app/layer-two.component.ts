
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractLayerComponent } from "./abstract-layer.component";
import { LayerThreeComponent } from "./layer-three.component";

@Component({
	selector: "layer-two",
	outputs: [ "closeEvent: close" ],
	directives: [ LayerThreeComponent ],

	// Notice that our key-bindings are using the special "@" syntax for priority. Also,
	// we are using the "T" token for "terminal" (in some of the cases). This means that
	// those particular key bindings won't be passed-off to any lower-priority bindings.
	// --
	// NOTE: The "Space" binding is NOT using the Terminal token.
	host: {
		"(document: keydown.Enter @ 200 T)": "openSubLayer()",
		"(document: keydown.Escape @ 200 T)": "emitCloseEvent()",
		"(document: keydown.Space @ 200)": "printLayerName()"
	},
	template:
	`
		Welcome to layer Two.

		<layer-three 
			*ngIf="isSubLayerOpen" 
			(close)="closeSubLayer()">
		</layer-three>		
	`
})
export class LayerTwoComponent extends AbstractLayerComponent {

	// I print the name of the current layer.
	public printLayerName() : void {

		console.log( "Layer Two @ priority 200." );

	}

}