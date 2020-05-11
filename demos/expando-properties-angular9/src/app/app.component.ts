
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Expando } from "./expando";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p (click)="toggle( $event.target )"> Roses are red. </p>
		<p (click)="toggle( $event.target )"> Violets are blue. </p>
		<p (click)="toggle( $event.target )"> Expando properties are cool. </p>
		<p (click)="toggle( $event.target )"> And so is Angular. </p>
	`
})
export class AppComponent {

	private expando: Expando;

	// I initialize the app component.
	constructor( expando: Expando ) {

		this.expando = expando;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I toggle the expando property on the given element.
	public toggle( element: HTMLElement ) : void {

		if ( this.expando.get( element ) ) {

			var value = this.expando.remove( element );

			console.group( "%cRemoving Expando Property", "color: red ;" );
			console.log( "Value:", value );
			console.log( element );
			console.log( element.dataset );
			console.groupEnd();

		} else {

			var value = this.expando.add( element );

			console.group( "%cInjecting Expando Property", "color: green ;" );
			console.log( "Value:", value );
			console.log( element );
			console.log( element.dataset );
			console.groupEnd();

		}

	}

}
