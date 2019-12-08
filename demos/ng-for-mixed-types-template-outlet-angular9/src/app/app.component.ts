
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Prototype {
	type: "prototype";
	id: string;
	name: string; // This property is unique to this type.
}

interface Board {
	type: "board";
	id: string;
	title: string; // This property is unique to this type.
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public projects: ( Prototype | Board )[];

	// I initialize the app component.
	constructor() {

		this.projects = [
			{ type: "prototype", id: "p1", name: "P1" },
			{ type: "prototype", id: "p2", name: "P2" },
			{ type: "board", id: "b1", title: "B1" },
			{ type: "prototype", id: "p3", name: "P3" },
			{ type: "board", id: "b2", title: "B2" }
		];

	}

}
