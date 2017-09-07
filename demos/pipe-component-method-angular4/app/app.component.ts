
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template: 
	`
		<p>
			<strong>ThingOne</strong>: {{ message | fn:thingOne:"Sweeet!" }}
		</p>
		
		<p>
			<strong>ThingTwo</strong>: {{ thingTwo( message, "Sweeet!" ) }}
		</p>
		
		<p>
			<a (click)="setMessage( 'This is message One.' )">Use message one</a>
			&nbsp;|&nbsp;
			<a (click)="setMessage( 'This is message Two.' )">Use message Two</a>
		</p>
	`
})
export class AppComponent {

	public message: string;

	// I initialize the app component.
	constructor() {

		this.message = "Please select a message.";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I set the message for rendering.
	public setMessage( newMessage: string ) : void {

		this.message = newMessage;

	}


	// I transform the message using the FN PIPE. 
	// --
	// CAUTION: Notice that this method is being defined using an ARROW FUNCTION. This
	// is because the FN PIPE cannot apply the proper context (uses null) when invoking
	// the function. As such, we need to pre-bind it to the component so that we can use 
	// the proper "this" reference when invoked via the FN PIPE.
	public thingOne = ( value: string, suffix: string ) : string => {

		console.info( "Calling thingOne()." );

		// NOTE: Using this.join() just to demonstrate that the "this" reference works.
		return( this.join( value.toUpperCase(), suffix ) );

	}


	// I transform the message using a standard method invocation.
	public thingTwo( value: string, suffix: string ) : string {

		console.warn( "Calling thingTwo()." );

		// NOTE: Using this.join() just to demonstrate that the "this" reference works.
		return( this.join( value.toUpperCase(), suffix ) );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I join the list of string values using a space.
	private join( ...values: string[] ) : string {

		return( values.join( " " ) );

	}

}
