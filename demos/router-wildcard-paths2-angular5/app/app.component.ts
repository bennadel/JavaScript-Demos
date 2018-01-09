
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
			<a routerLink="/">Home View</a> &mdash;
			<a routerLink="/app/a">A View</a> &mdash;
			<a routerLink="/app/b">B View</a> &mdash;
			<a routerLink="/app/c">C View (not found)</a>
		</p>

		<p>
			<strong>Home View</strong>
		</p>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}
