
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
			<a routerLink="/app">Goto Home</a>
			&mdash;
			<a routerLink="/app/friends">Goto Friends</a>
			&mdash;
			<a [routerLink]="[ '/app', { outlets: { modal: 'modal/add-friend' } } ]">
				Add Friends From Home
			</a>
		</p>

		<!-- Primary outlet. -->
		<router-outlet></router-outlet>

		<!-- Modal outlet. -->
		<router-outlet name="modal"></router-outlet>
	`
})
export class AppComponent {
	// ...
}
