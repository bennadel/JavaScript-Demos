
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { MyLabelComponent } from "./my-label.component";
import { MyPushLabelComponent } from "./my-label.component";


@Component({
	selector: "my-app",
	directives: [ MyLabelComponent, MyPushLabelComponent ],
	template:
	`
		<p>
			<a (click)="cycleLabel()">Cycle current label input</a>
		</p>

		<my-label [value]="labels[ 0 ]"></my-label>
		<my-push-label [value]="labels[ 0 ]"></my-push-label>
	`
})
export class AppComponent {

	// I hold the labels collection, which we will cycle when rendering.
	public labels: string[];


	// I initialize the component.
	constructor() {

		this.labels = [ "Use Caution", "All Systems Go", "Slippery When Wet" ];

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I cycle the labels, moving the current one to the end of the collection.
	public cycleLabel() : void {

		this.labels.push( this.labels.shift() );

	}

}
