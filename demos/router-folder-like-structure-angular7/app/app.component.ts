
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a routerLink="/go">Go to Demo</a>
		</p>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}
