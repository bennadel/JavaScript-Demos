
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
			<a routerLink="/app/primary/1" class="nav__item">Primary</a>

			<a [routerLink]="[ '/app', { outlets: { secondary: 'secondary/2' } } ]" class="nav__item">Secondary</a>
			<a [routerLink]="[ '/app', { outlets: { tertiary: 'tertiary/3' } } ]" class="nav__item">Tertiary</a>

			<a (click)="useVersion( 'emptyOnly' )" class="nav__item nav__item--version">?emptyOnly</a>
			<a (click)="useVersion( 'always' )" class="nav__item nav__item--version">?always</a>
		</div>

		<h1>
			Accessing Parent Route Params Via paramsInheritanceStrategy In Angular 6.0.7
		</h1>

		<router-outlet></router-outlet>
		<router-outlet name="secondary"></router-outlet>
		<router-outlet name="tertiary"></router-outlet>
	`
})
export class AppComponent {

	// I initialize the app-component.
	constructor( routerParams: RouterParams ) {

		// The RouteParams service aggregates the params across all segments. When the
		// router state changes, the "params" stream is updated with the new values.
		routerParams.params.subscribe(
			( params: Params ) : void => {

				console.group( "All Router Params" );
				console.table( params );
				console.groupEnd();

			}
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I switch to a different version of the "paramsInheritanceStrategy" option in the
	// Router module.
	// --
	// * emptyOnly (the default)
	// * always
	// --
	public useVersion( version: string ) : void {

		var url = window.location;

		url.href = `${ url.pathname }?${ version }${ url.hash }`;

	}

}
