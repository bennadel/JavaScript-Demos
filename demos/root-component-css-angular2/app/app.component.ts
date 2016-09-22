// Declare ambient module definition so TypeScript doesn't complain.
// --
// TODO: Figure out how to move this to typing files.
declare var module: { id: string };

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<h2>
			Welcome to Thunderdome! 
		</h2>

		<p>
			<a (click)="toggleChild()">Toggle child component</a>.
		</p>

		<my-child *ngIf="isShowingChild"></my-child>
	`
})
export class AppComponent {

	public isShowingChild: booldean;


	// I initialize the component.
	constructor() {
		
		this.isShowingChild = false;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I show or hide the child component based on the current state.
	public toggleChild() : void {

		this.isShowingChild = ! this.isShowingChild;

	}

}
