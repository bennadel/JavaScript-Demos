
// Import the core angular services.
import { Component } from "@angular/core";
import { Params } from "@angular/router";

// Import the application components and services.
import { RouterParams } from "./router-params";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div class="nav">
			<a routerLink="/app" class="nav__item">Home</a>
			<a routerLink="/app/primary" class="nav__item">Primary</a>

			<a [routerLink]="[ '/app', { outlets: { secondary: 'secondary' } } ]" class="nav__item">Secondary</a>
			<a [routerLink]="[ '/app', { outlets: { tertiary: 'tertiary' } } ]" class="nav__item">Tertiary</a>
		</div>

		<h1>
			Collecting Route Params Across All Router Segments In Angular 6.0.7
		</h1>

		<p class="params">
			<strong>All Params:</strong> {{ params | json }}
		</p>

		<router-outlet></router-outlet>
		<router-outlet name="secondary"></router-outlet>
		<router-outlet name="tertiary"></router-outlet>
	`
})
export class AppComponent {

	public params: Params;

	// I initialize the app-component.
	constructor( routerParams: RouterParams ) {

		this.params = {};

		// The RouteParams service aggregates the params across all segments. When the
		// router state changes, the "params" stream is updated with the new values.
		routerParams.params.subscribe(
			( params: Params ) : void => {

				this.params = params;

				console.log( "Router Params have changed:" );
				console.table( params );

			}
		);

	}

}
