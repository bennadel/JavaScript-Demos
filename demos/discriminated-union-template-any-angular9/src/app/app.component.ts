
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Person {
	id: string;
	name: string;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="setRandomSelection()">
				Set random selection
			</a>
		</p>

		<ng-container [ngSwitch]="selection">
			<ng-template [ngSwitchCase]="null">
				Null
			</ng-template>
			<ng-template [ngSwitchCase]="( 'bff' )">
				BFF
			</ng-template>
			<ng-template [ngSwitchCase]="( 'random' )">
				Random
			</ng-template>
			<ng-template ngSwitchDefault>

				<!--
					The Angular Ahead-of-Time (AoT) compiler cannot figure out that
					"selection" must be a Person at this point. As such, we are going to
					temporarily disable type-checking using the $any() pseudo-function.
				-->
				{{ $any( selection ).name }}

			</ng-template>
		</ng-container>
	`
})
export class AppComponent {

	public selection: Person | "bff" | "random" | null;

	// I initialize the app component.
	constructor() {

		this.selection = this.getRandomSelection();

		switch ( this.selection ) {
			case null:
				console.log( "Selection is null" );
			break;
			case "random":
				console.log( "Selection is Random" );
			break;
			case "bff":
				console.log( "Selection is BFF" );
			break;
			// NOTE: In the code, the TypeScript compiler is smart enough to know that
			// the Default case must be a Person since the other potential types have
			// already been ruled-out using the above Case values.
			default:
				console.log( "Selection person:", this.selection.name );
			break;
		}

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return a random selection.
	public getRandomSelection() : Person | "bff" | "random" | null {

		switch ( Math.floor( Math.random() * 4 ) ) {
			case 0:
				return( null );
			break;
			case 1:
				return( "random" );
			break;
			case 2:
				return( "bff" );
			break;
			default:
				return({
					id: "1",
					name: "Kim"
				});
			break;
		}

	}


	// I update the selection randomly.
	public setRandomSelection() : void {

		this.selection = this.getRandomSelection();

	}

}
