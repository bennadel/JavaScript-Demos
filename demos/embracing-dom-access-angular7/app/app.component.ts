
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	id: number;
	name: string;
	email: string;
};

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<form (submit)="processForm()">

			<div class="entry">
				<label>Name:</label>
				<input type="text" name="name" [(ngModel)]="form.name" autofocus />
			</div>
			<div class="entry">
				<label>Email:</label>
				<input type="email" name="email" [(ngModel)]="form.email" />
			</div>
			<div class="actions">
				<button type="submit">
					Process Form
				</button>
			</div>

		</form>

		<h2>
			Users
		</h2>

		<ul>
			<li *ngFor="let user of users">
				{{ user.name }} ( ID: {{ user.id }} )
			</li>
		</ul>
	`
})
export class AppComponent {

	public form: {
		name: string;
		email: string;
	};
	public users: User[];

	private elementRef: ElementRef;
	
	// I initialize the app component.
	constructor( elementRef: ElementRef ) {

		this.elementRef = elementRef;

		this.form = {
			name: "",
			email: ""
		};
		this.users = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I process the new user form.
	public processForm() : void {

		// Blah blah blah, form validation...

		this.users.push({
			id: Date.now(),
			name: this.form.name,
			email: this.form.email
		});

		// Reset the form model.
		this.form.name = "";
		this.form.email = "";

		// Once the form is submitted, we want to make it easy for the administrator to
		// continue adding new users one after another. As such, we want to implicitly
		// focus the first input field so that the administrator doesn't even have to
		// touch their mouse.
		this.focusNameInput();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I bring DOM focus to the "name" input element.
	private focusNameInput() : void {

		// NOTE: I am directly accessing the DOM here and imperatively changes its state.
		// This tightly-couples the Component Class to the template AND to the browser
		// platform; but, that's OK. Such coupling can always be decoupled later if it is
		// actually necessary.
		this.elementRef.nativeElement
			.querySelector( "input[ name = 'name' ]" )
			.focus()
		;

	}

}
