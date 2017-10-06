
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
			Try going to one of these <code>/a</code> prefix routes 
			(which do not have materialized views):
		</p>

		<ul>
			<li><a routerLink="/a">/a</a></li>
			<li><a routerLink="/a/items">/a/items</a></li>
			<li><a routerLink="/a/items/4">/a/items/4</a></li>
			<li><a routerLink="/a/items/4/detail">/a/items/4/detail</a></li>
			<li><a routerLink="/a/items/4/detail" fragment="anchor">/a/items/4/detail#anchor</a></li>
			<li><a routerLink="/a/items/4/detail" [queryParams]="{ q: '1' }">/a/items/4/detail?q=1</a></li>
		</ul>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}
