
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";

// Import the application components and services.
import { Friend } from "./friend.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-friend-card",
	inputs: [ "name", "email" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./friend-card.component.less" ],
	template:
	`
		<div class="initials">
			{{ name.charAt( 0 ).toUpperCase() }}
		</div>
		<div class="details">
			<span class="name">
				{{ name }}
			</span>
			<span class="email">
				{{ email }}
			</span>
		</div>
	`
})
export class FriendCardComponent {

	public email!: string;
	public name!: string;

}
