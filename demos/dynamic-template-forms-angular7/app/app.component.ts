
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Pet {
	id: number;
	type: string;
	name: string;
	age: string; // NOTE: This is a String because it is an open-ended form value.
	isPastOn: boolean;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.htm"
})
export class AppComponent {
	
	public form: {
		pets: Pet[];
	};

	// I initialize the app component.
	constructor() {

		this.form = {
			pets: []
		};

		// Add an initial pet form-entry.
		this.addPet();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a new pet record to the form-model.
	public addPet() : void {

		// CAUTION: When we output the form controls, we need to provide a unique name
		// for each input (so that it can be registered with the parent NgForm). For the
		// sake of this demo, we're going to use the current TIMPESTAMP (Date.now()) as a
		// hook into something unique about this model.
		this.form.pets.push({
			id: Date.now(), // <--- uniqueness hook.
			type: "Dog",
			name: "",
			age: "",
			isPastOn: false
		});

	}


	// I process the form-model.
	public processForm( form: any ) : void {

		console.warn( "Handling form submission!" );

		console.group( "Form Data" );
		console.log( this.form.pets );
		console.groupEnd();

		console.group( "Form Model" );
		console.log( form );
		console.groupEnd();

	}


	// I remove the pet at the given index.
	public removePet( index: number ) : void {

		this.form.pets.splice( index, 1 );

	}

}
