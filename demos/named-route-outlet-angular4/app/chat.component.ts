
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "chat",
	styleUrls: [ "./chat.component.css" ],
	template: 
	`
		<h3>
			Chat Widget
		</h3>

		<p>
			<em>How can I help you?</em>
		</p>
	`
})
export class ChatComponent {
	// ...
}
