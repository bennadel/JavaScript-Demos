
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<ul>
			<li><a routerLink="go/boards">GO: Boards</a></li>
			<li><a routerLink="go/favorites">GO: Favorites</a></li>
			<li><a routerLink="go/most-recent">GO: Most-Recent</a></li>
			<li><a routerLink="go/profile">GO: Profile</a></li>
			<li><a routerLink="go/prototypes">GO: Prototypes</a></li>
			<li><a routerLink="go/comment/111/222">GO: Comment/111/222</a></li>
			<li><a routerLink="go/foobar">GO: FooBar</a> (not valid)</li>
		</ul>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}
