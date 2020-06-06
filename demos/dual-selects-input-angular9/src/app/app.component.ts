
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Contact } from "./data";
import { contacts as sampleContacts } from "./data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface PendingSelection {
	[ key: number ]: boolean;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public contacts: Contact[];
	public pendingSelection: PendingSelection;
	public selectedContacts: Contact[];
	public unselectedContacts: Contact[];

	// I initialize the app component.
	constructor() {

		this.contacts = sampleContacts;
		// To start with, all of the contacts will be unselected. Then, the user will be
		// able to move any of the contacts over to the selected collection.
		this.unselectedContacts = this.contacts.slice().sort( this.sortContactOperator );
		this.selectedContacts = [];

		// I am an ID-based look-up index that keeps track of which contacts have been
		// selected for pending changes (either adding or removing from the selected
		// contacts collection).
		this.pendingSelection = Object.create( null );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add the selected contact or contacts to the selected contacts collection.
	public addToSelectedContacts( contact?: Contact ) : void {

		var changeContacts = ( contact )
			// If a given contact has been provided (via double-click), that's the single
			// contact that we want to move.
			? [ contact ]
			// Otherwise, default to using the pending-selection index as the source of
			// contacts to move.
			: this.getPendingSelectionFromCollection( this.unselectedContacts )
		;

		// Now that we know which contacts we want to move, reset the pending-selection.
		this.pendingSelection = Object.create( null );

		// Remove each pending contact from the unselected list.
		this.unselectedContacts = this.removeContactsFromCollection( this.unselectedContacts, changeContacts );

		// We always want to move the pending contacts onto the front / top of the
		// selected list so that the change is VISUALLY OBVIOUS to the user.
		this.selectedContacts = changeContacts.concat( this.selectedContacts );

	}


	// I remove the selected contact or contacts from the selected contacts collection.
	public removeFromSelectedContacts( contact?: Contact ) : void {

		var changeContacts = ( contact )
			// If a given contact has been provided (via double-click), that's the single
			// contact that we want to move.
			? [ contact ]
			// Otherwise, default to using the pending-selection index as the source of
			// contacts to move.
			: this.getPendingSelectionFromCollection( this.selectedContacts )
		;

		// Now that we know which contacts we want to move, reset the pending-selection.
		this.pendingSelection = Object.create( null );

		// Remove each pending contact from the selected contacts collection.
		this.selectedContacts = this.removeContactsFromCollection( this.selectedContacts, changeContacts );

		// When moving contacts back to the unselected contacts list, we want to add
		// them back in SORT ORDER since this will make it easier for the user to
		// navigate the resulting list.
		this.unselectedContacts = changeContacts
			.concat( this.unselectedContacts )
			.sort( this.sortContactOperator )
		;

	}


	// I toggle the pending selection for the given contact.
	public togglePendingSelection( contact: Contact ) : void {

		this.pendingSelection[ contact.id ] = ! this.pendingSelection[ contact.id ];

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I gather the contacts in the given collection that are part of the current pending
	// selection.
	private getPendingSelectionFromCollection( collection: Contact[] ) : Contact[] {

		var selectionFromCollection = collection.filter(
			( contact ) => {

				return( contact.id in this.pendingSelection );

			}
		);

		return( selectionFromCollection );

	}


	// I remove the given contacts from the given collection. Returns a new collection.
	private removeContactsFromCollection(
		collection: Contact[],
		contactsToRemove: Contact[]
		) : Contact[] {

		var collectionWithoutContacts = collection.filter(
			( contact ) => {

				return( ! contactsToRemove.includes( contact ) );

			}
		);

		return( collectionWithoutContacts );

	}


	// I provide the sort operator for the contacts collection.
	private sortContactOperator( a: Contact, b: Contact ) : number {

		return( a.name.localeCompare( b.name ) );

	}

}
