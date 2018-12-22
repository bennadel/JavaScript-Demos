
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Contact {
	id: number;
	name: string;
	email: string;
	avatarUrl: string;
}

@Component({
	selector: "bn-contact",
	inputs: [ "contact" ],
	styleUrls: [ "./contact.component.less" ],
	template:
	`
		<div class="layout">
			<div class="layout__avatar">
				
				<img [src]="contact.avatarUrl" class="avatar" />

			</div>
			<div class="layout__details">

				<div class="name">
					{{ contact.name }}
				</div>

				<div class="email">
					{{ contact.email }}
				</div>

				<div class="actions">
					<a href="#" class="action">Favorite</a>
					<a href="#" class="action">Edit</a>
					<a href="#" class="action">Archive</a>
					<a href="#" class="action action--delete">Delete</a>
				</div>

			</div>
		</div>
	`
})
export class ContactComponent {

	public contact!: Contact;

}
