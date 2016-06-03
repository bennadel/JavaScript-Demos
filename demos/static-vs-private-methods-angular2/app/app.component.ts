
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	template:
	`
		<input [(ngModel)]="input" (ngModelChange)="handleModelChange()" />

		<strong>Reversed:</strong>
		<span class="reversed">{{ reversedInput }}</span>
	`
})
export class AppComponent {

	// I hold the input value (for the ngModel).
	public input: string;

	// I hold the value that is a reversed version of the input.
	public reversedInput: string;


	// I initialize the component.
	constructor() {

		this.input = "";
		this.reversedInput = "";

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I handle changes in the input, calculating the reversed value.
	public handleModelChange() : void {

		// Here, we are using a PRIVATE method to determine some of the businessy logic;
		// but, we're using a STATIC method to implement some of the more generic logic.
		// This makes the static functionality available to any class that might want 
		// to sub-class the AppComponent (since private methods really shouldn't be 
		// referenced from a sub-class if it can be avoided, as it increases coupling
		// between the sub-class and the super-class).
		// --
		// NOTE: The STATIC methods could be moved into various utility classes if we
		// wanted to split them out.
		this.reversedInput = this.isReversible( this.input )
			? AppComponent.reverseString( this.input )
			: this.input
		;

	}

	
	// ---
	// PRIVATE METHODS.
	// ---


	// I determine if the given string is long enough to be meaningful in reverse.
	private isReversible( value: string ) : boolean {

		return( value.length > 1 );

	}
	

	// ---
	// STATIC METHODS.
	// NOTE: Static methods are available off the Class, not the Instance.
	// ---


	// I reverse the given string value.
	static reverseString( value: string ) : string {

		return( value.split( "" ).reverse().join( "" ) );

	}

}