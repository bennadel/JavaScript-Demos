
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractLayerComponent } from "./abstract-layer.component";
import { LayerOneComponent } from "./layer-one.component";

@Component({
	selector: "my-app",
	directives: [ LayerOneComponent ],

	// Notice that our key-bindings are using the special "@" syntax for priority.
	host: {
		"(document: keydown.Enter @ 0)": "openSubLayer()",
		"(document: keydown.Space @ 0)": "printLayerName()"
	},
	template:
	`
		Welcome to layer Zero.

		<layer-one 
			*ngIf="isSubLayerOpen"
			(close)="closeSubLayer()">
		</layer-one>

		<ul>
			<li>
				<strong>Enter</strong> - Open Layer.
			</li>
			<li>
				<strong>Esc</strong> - Close Layer.
			</li>
			<li>
				<strong>Space</strong> - Print Layer Name.
			</li>
		</ul>
	`
})
export class AppComponent extends AbstractLayerComponent {

	// I print the name of the current layer.
	public printLayerName() : void {

		console.log( "Layer Zero @ priority 0" );

	}

}