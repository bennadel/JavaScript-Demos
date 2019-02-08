
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<my-popup>
			Hello world!
		</my-popup>

		<my-popup>
			Hello world! What a wonderful day to be alive!
		</my-popup>

		<my-popup>
			 Peace has cost you your strength.<br />
			 Victory has defeated you.<br />

			<div class="author">
				— <strong>Bane</strong>
			</div>
		</my-popup>

		<my-popup style="width: 600px ;">
			We are all meant to shine, As children do. We were born to make manifest
			The glory of God that is within us. It's not just in some of us; It's in
			everyone. And as we let our own light shine, We unconsciously give other
			people permission to do the same. As we're liberated from our own fear,
			Our presence automatically liberates others.

			<div class="author">
				— <strong>Marianne Williamson</strong>
			</div>
		</my-popup>
	`
})
export class AppComponent {
	// ...
}
