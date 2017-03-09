
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<p>
			<button 
				[clipboard]="value1.innerHTML.trim()" 
				(clipboardCopy)="logSuccess( $event )"
				(clipboardError)="logError( $event )">
				Copy Text
			</button>

			<span #value1>
				Hello World!
			</span>
		</p>

		<p>
			<button 
				[clipboard]="value2.innerHTML.trim()" 
				(clipboardCopy)="logSuccess( $event )"
				(clipboardError)="logError( $event )">
				Copy Text
			</button>

			<span #value2>
				Rock on With Yer Bad Self!
			</span>
		</p>

		<p>
			<button 
				[clipboard]="value3.innerHTML.trim()" 
				(clipboardCopy)="logSuccess( $event )"
				(clipboardError)="logError( $event )">
				Copy Text
			</button>

			<span #value3>
				Weeezing The Ju-uice!
			</span>
		</p>

		<textarea 
			#tester
			(click)="tester.select()"
			placeholder="Test your Copy operation here..."
		></textarea>
	`
})
export class AppComponent {

	// I initialize the app component.
	constructor() {
		// ...
	}


	// ---
	// PUBLIC METODS.
	// ---


	// I log Clipboard "copy" errors.
	public logError( error: Error ) : void {

		console.group( "Clipboard Error" );
		console.error( error );
		console.groupEnd();

	}


	// I log Clipboard "copy" successes.
	public logSuccess( value: string ) : void {

		console.group( "Clipboard Success" );
		console.log( value );
		console.groupEnd();

	}

}
