
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Contact {
	id: number;
	name: string;
	avatarUrl: string;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="toggleContacts()">Toggle Contacts</a>
		</p>

		<ul *ngIf="isShowingContacts" class="contacts">
			<li *ngFor="let contact of contacts">

				<img [lazySrc]="contact.avatarUrl" lazySrcVisible="visible" />
				<span>{{ contact.name }} - {{ contact.id }}</span>

			</li>
		</ul>

		<p>
			<a (click)="popContact()">Pop Contact</a>
			&mdash;
			<a (click)="pushContact()">Push Contact</a>
		</p>
	`
})
export class AppComponent {

	public contacts: Contact[];
	public isShowingContacts: boolean;
	public maxID: number;

	// I initialize the app component.
	constructor() {

		this.contacts = [];
		this.isShowingContacts = false;
		this.maxID = 0;

		for ( var i = 1 ; i < 50 ; i++ ) {

			this.pushContact();

		}

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I remove a contact from the top of the collection.
	public popContact() : void {

		this.contacts.shift();

	}


	// I add a new contact to the bottom of the collection.
	public pushContact() : void {

		this.contacts.push({
			id: ++this.maxID,
			name: "Frances McDormand",
			avatarUrl: `./app/frances-mcdormand.jpg?id=${ this.maxID }`
		});

	}


	// I toggle the showing of the contact list.
	public toggleContacts() : void {

		this.isShowingContacts = ! this.isShowingContacts;

	}
	
}
