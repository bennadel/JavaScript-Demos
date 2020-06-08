
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Contact } from "./data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-contact",
	inputs: [ "contact" ],
	styleUrls: [ "./contact.component.less" ],
	template:
	`
		<div class="name">
			{{ contact.name }}
		</div>
		<div class="email">
			{{ contact.email }}
		</div>
	`
})
export class ContactComponent {

	public contact!: Contact;

}
