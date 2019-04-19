
// Import the core angular services.
import { Component } from "@angular/core";
import { FormArray } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Unlike the Template-Driven forms, which just use a simple View-Model, there is no way
// to define a "Type" / "Interface" for Reactive-Forms. At least, none that I could find.
// --
// Potential workaround by Daniele Morosinotto:
// https://github.com/angular/angular/issues/13721#issuecomment-468745950
// --
// interface Pet {
// 	id: number;
// 	type: string;
// 	name: string;
// 	age: string;
// 	isPastOn: boolean;
// 	nicknames: Nickname[];
// }
// 
// interface Nickname {
// 	id: number;
// 	value: string;
// }

@Component({
	selector: "my-reactive-form",
	styleUrls: [ "./form.component.less" ],
	templateUrl: "./reactive-form.component.htm"
})
export class ReactiveFormComponent {
	
	public form: FormGroup;

	private formBuilder: FormBuilder;

	// I initialize the reactive-form component.
	constructor( formBuilder: FormBuilder ) {

		this.formBuilder = formBuilder;

		this.form = this.formBuilder.group({
			pets: this.formBuilder.array( [] )
		});

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a new nickname record to the given pet form-model.
	public addNickname( pet: FormControl ) : void {

		var nicknames = this.getNicknames( pet ); // Critical: casts as FormArray.

		nicknames.push(
			this.formBuilder.group({
				// NOTE: In order to facilitate the unique LABEL-For creation for each
				// control, we have to hack-in a pseudo-control for "id", and then just
				// consume it as a static value.
				id: [ Date.now() ],
				value: [ "" ]
			})
		);

	}


	// I add a new pet record to the form-model.
	public addPet() : void {

		var pets = this.getPets(); // Critical: casts as FormArray.

		pets.push(
			this.formBuilder.group({
				// NOTE: In order to facilitate the unique LABEL-For creation for each
				// control, we have to hack-in a pseudo-control for "id", and then just
				// consume it as a static value.
				id: [ Date.now() ],
				type: [ "Dog" ],
				name: [ "" ],
				age: [ "" ],
				isPastOn: [ false ],
				nicknames: this.formBuilder.array( [] )
			})
		);

	}


	// I return the nicknames for the given pet in a format that can be consumed by the
	// ngFor loop in the template.
	public getNicknames( pet: FormControl ) : FormArray {

		// NOTE: The "as FormArray" is the critical part since AbstractControl doesn't
		// have a property, "controls", which is used by the NgFor loop.
		return( pet.get( "nicknames" ) as FormArray );

	}


	// I return the pets in a format that can be consumed by the ngFor loop in the
	// template.
	public getPets() : FormArray {

		// NOTE: The "as FormArray" is the critical part since AbstractControl doesn't
		// have a property, "controls", which is used by the NgFor loop.
		return( this.form.get( "pets" ) as FormArray );

	}


	// I process the form-model.
	public processForm( form: FormGroup ) : void {

		console.warn( "Handling form submission!" );

		console.group( "Form Data" );
		console.log( JSON.stringify( this.form.value, null, 4 ) );
		console.groupEnd();

		console.group( "Form Model" );
		console.log( form );
		console.groupEnd();

	}


	// I remove the given nickname from the given pet.
	public removeNickname( pet: FormControl, nickname: FormControl ) : void {

		// Critical: casts as FormArray.
		this.removeFromCollection( this.getNicknames( pet ), nickname );

	}


	// I remove the given pet from the form-data.
	public removePet( pet: FormControl ) : void {

		// Critical: casts as FormArray.
		this.removeFromCollection( this.getPets(), pet );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I remove the given control from the given array. Mutates the array.
	private removeFromCollection( collection: FormArray, item: FormControl ) : void {

		collection.removeAt( collection.controls.indexOf( item ) );

	}

}
