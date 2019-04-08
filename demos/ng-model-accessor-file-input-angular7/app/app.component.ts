
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<form (submit)="processForm()">
			<div class="field">
				<label>Name:</label>
				<input type="text" name="name" [(ngModel)]="form.name" />
			</div>
			<div class="field">
				<label>Email:</label>
				<input type="text" name="email" [(ngModel)]="form.email" />
			</div>
			<div class="field">
				<label>Resume:</label>
				<input type="file" name="resume" [(ngModel)]="form.resume" observeFiles />
			</div>
			<div class="actions">
				<button type="submit">
					Process Form
				</button>
			</div>
		</form>
	`
})
export class AppComponent {

	public form: {
		name: string;
		email: string;
		resume: File | null;
	};

	// I initialize the app component.
	constructor() {

		this.form = {
			name: "",
			email: "",
			resume: null
		};

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the form processing.
	public processForm() : void {

		console.group( "Form View-Model" );
		console.log( "Name:", this.form.name );
		console.log( "Email:", this.form.email );
		console.log( "Resume:", this.form.resume );
		console.groupEnd();

	}

}
