
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
			<a [routerLink]="[ '/app', { outlets: { primary: 'main' } } ]">
				Open Main View
			</a>
			&mdash;
			<a [routerLink]="[ '/app', { outlets: { primary: null } } ]">
				Close Main View
			</a>
		</p>

		<p>
			<a [routerLink]="[ '/app', { outlets: { secondary: 'secondary' } } ]">
				Open Secondary View
			</a>
			&mdash;
			<a [routerLink]="[ '/app', { outlets: { secondary: null } } ]">
				Close Secondary View
			</a>
		</p>

		<router-outlet></router-outlet>
		<router-outlet name="secondary"></router-outlet>
	`
})
export class AppComponent {
	// ...
}
