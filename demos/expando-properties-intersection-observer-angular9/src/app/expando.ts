
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class Expando {
	
	private id: number;
	private attributeName: string;

	// I initialize the expando service.
	constructor() {

		this.id = 0;
		this.attributeName = ( "data-expando" + Date.now() );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add an expando property to the given element, returning the unique ID.
	public add( element: Element ) : number {

		var nextID = ++this.id;
		var value = String( nextID );

		element.setAttribute( this.attributeName, value );

		return( nextID );

	}


	// I return the unique ID of the expando property on the given element. Or, if there
	// is no expando property, I return zero.
	public get( element: Element ) : number {

		return( Number( element.getAttribute( this.attributeName ) ) );

	}


	// I remove the expando from the given element, returning the unique ID.
	public remove( element: Element ) : number {

		var value = this.get( element );

		element.removeAttribute( this.attributeName );

		return( value );

	}

}
