
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	template:
	`
		Before components.

		<info-box
			avatarUrl="./sarah.png"
			name="Sarah Connor"
			title="Freedom Fighter">
		</info-box>

		<info-box
			avatarUrl="./sarah.png"
			name="Sarah Connor"
			title="Freedom Fighter"
			class="mini">
		</info-box>

		After components.
	`
})
export class AppComponent {
	// ...
}
