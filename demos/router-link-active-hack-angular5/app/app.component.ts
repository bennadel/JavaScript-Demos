
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<nav>
			<a routerLink="/" class="item">Root</a>
			<a routerLink="go/1" class="item" routerLinkActive="on">Item 1</a>
			<a routerLink="go/2" class="item" routerLinkActive="on">Item 2</a>
			<a routerLink="go/3" class="item" routerLinkActive="on">Item 3</a>
		</nav>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}
