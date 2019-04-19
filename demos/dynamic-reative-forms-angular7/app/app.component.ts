
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p class="switcher">
			<strong class="switcher__label">Choose Form:</strong>
			
			<a (click)="showForm( 'template' )" class="switcher__option">
				Template Form
			</a>
			or
			<a (click)="showForm( 'reactive' )" class="switcher__option">
				Reactive Form
			</a>
		</p>

		<my-reactive-form *ngIf="( form === 'reactive' )"></my-reactive-form>
		<my-template-form *ngIf="( form === 'template' )"></my-template-form>
	`
})
export class AppComponent {
	
	public form: "template" | "reactive";

	// I initialize the app component.
	constructor() {

		this.form = "template";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I render the selected form demo component.
	public showForm( selectedForm: "template" | "reactive" ) : void {

		this.form = selectedForm;

	}

}
