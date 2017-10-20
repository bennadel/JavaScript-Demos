
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<p>
			<a [routerLink]="[ 'child' ]">Child</a>
			<br />
			<a [routerLink]="[ 'child', { redirect: true } ]">Child w/ Redirect</a>
		</p>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}
