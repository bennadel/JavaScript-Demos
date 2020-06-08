
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Contact } from "./data";
import { contacts as sampleContacts } from "./data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public contacts: Contact[];
	public selectedContacts: Contact[];
	public selectedFavoriteContacts: Contact[];
	public selectedNormalContacts: Contact[];
	public unselectedContacts: Contact[];

	// I initialize the app component.
	constructor() {

		this.contacts = sampleContacts;
		// To start with, all of the contacts will be unselected. Then, the user will be
		// able to move any of the contacts over to the selected collection.
		this.unselectedContacts = this.contacts.slice().sort( this.sortContactOperator );
		this.selectedContacts = [];

		// On the "selected side", we're going to break the selections down into Favorite
		// contacts and Normal contacts. This is just to demonstrate the flexibility of
		// the markup in the Dual-Select component.
		this.selectedFavoriteContacts = [];
		this.selectedNormalContacts = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I move the given contacts from the unselected list to the selected list.
	public addToSelectedContacts( changeContacts: Contact[] ) : void {

		// Remove the contacts from the Unselected.
		this.unselectedContacts = this.unselectedContacts.filter(
			( contact ) => {

				return( ! changeContacts.includes( contact ) );

			}
		);

		// ... and move them over to the Selected list(s).
		this.selectedContacts = changeContacts.concat( this.selectedContacts );
		this.selectedFavoriteContacts = this.selectedContacts.filter( this.filterInFavoriteOperator );
		this.selectedNormalContacts = this.selectedContacts.filter( this.filterOutFavoriteOperator );

	}


	// I move the given contacts from the selected list to the unselected list.
	public removeFromSelectedContacts( changeContacts: Contact[] ) : void {

		// Remove the contacts from the Selected list.
		this.selectedContacts = this.selectedContacts.filter(
			( contact ) => {

				return( ! changeContacts.includes( contact ) );

			}
		);
		this.selectedFavoriteContacts = this.selectedContacts.filter( this.filterInFavoriteOperator );
		this.selectedNormalContacts = this.selectedContacts.filter( this.filterOutFavoriteOperator );

		// ... and move them over to the Unselected list.
		this.unselectedContacts = this.unselectedContacts
			.concat( changeContacts )
			.sort( this.sortContactOperator )
		;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I provide the filter operator for favorite contacts.
	private filterInFavoriteOperator( contact: Contact ) : boolean {

		return( contact.isFavorite );

	}


	// I provide the filter operator for normal contacts.
	private filterOutFavoriteOperator( contact: Contact ) : boolean {

		return( ! contact.isFavorite );

	}


	// I provide the sort operator for the contacts collection.
	private sortContactOperator( a: Contact, b: Contact ) : number {

		return( a.name.localeCompare( b.name ) );

	}

}
