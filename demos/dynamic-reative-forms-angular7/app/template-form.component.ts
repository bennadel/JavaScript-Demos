
// Import the core angular services.
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// NOTE: I am giving the form view-model entries an "id" property because it makes the
// values easier to consume in an NgModel context. These are not intended to be database
// identifiers - just unique identifiers within the form's view-model.

interface Pet {
	id: number;
	type: string;
	name: string;
	age: string;
	isPastOn: boolean;
	nicknames: Nickname[];
}

interface Nickname {
	id: number;
	value: string;
}

@Component({
	selector: "my-template-form",
	styleUrls: [ "./form.component.less" ],
	templateUrl: "./template-form.component.htm"
})
export class TemplateFormComponent {
	
	public form: {
		pets: Pet[];
	};

	// I initialize the template-form component.
	constructor() {

		this.form = {
			pets: []
		};

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a new nickname record to the given pet form-model.
	public addNickname( pet: Pet ) : void {

		pet.nicknames.push({
			id: Date.now(),
			value: ""
		});

	}


	// I add a new pet record to the form-model.
	public addPet() : void {

		this.form.pets.push({
			id: Date.now(),
			type: "Dog",
			name: "",
			age: "",
			isPastOn: false,
			nicknames: []
		});

	}


	// I process the form-model.
	public processForm( form: NgForm ) : void {

		console.warn( "Handling form submission!" );

		console.group( "Form Data" );
		console.log( JSON.stringify( this.form.pets, null, 4 ) );
		console.groupEnd();

		console.group( "Form Model" );
		console.log( form );
		console.groupEnd();

	}


	// I remove the given nickname from the given pet.
	public removeNickname( pet: Pet, nickname: Nickname ) : void {

		this.removeFromCollection( pet.nicknames, nickname );

	}


	// I remove the given pet from the form-data.
	public removePet( pet: Pet ) : void {

		this.removeFromCollection( this.form.pets, pet );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I remove the given item from the given collection. Mutates the collection.
	private removeFromCollection<T>( collection: T[], item: T ) : void {

		collection.splice( collection.indexOf( item ), 1 );

	}

}
