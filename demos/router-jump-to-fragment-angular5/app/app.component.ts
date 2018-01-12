
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
			<a routerLink="/">Home View</a><br />
			<br />

			<a routerLink="/app/a">A View</a> &mdash;
			<a routerLink="/app/a" fragment="top">A View #top</a> &mdash;
			<a routerLink="/app/a" fragment="bottom">A View #bottom</a><br />

			<a routerLink="/app/b">B View</a> &mdash;
			<a routerLink="/app/b" fragment="top">B View #top</a> &mdash;
			<a routerLink="/app/b" fragment="bottom">B View #bottom</a><br />
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
