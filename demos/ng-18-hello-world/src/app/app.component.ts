
// Import vendor modules.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Event as AngularRouterEvent } from "@angular/router";
import { inject } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { Router } from "@angular/router";
import { RouterLink } from "@angular/router";
import { RouterLinkActive } from "@angular/router";
import { RouterOutlet } from "@angular/router";

// Import app modules.
import { WindowTitle } from "~/app/services/window-title";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		RouterLink,
		RouterLinkActive,
		RouterOutlet
	],
	styleUrl: "./app.component.less",
	templateUrl: "./app.component.html"
})
export class AppComponent {

	private activatedRoute = inject( ActivatedRoute );
	private router = inject( Router );
	private windowTitle = inject( WindowTitle );

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I get called once after all the inputs have been bound for the first time.
	*/
	public ngOnInit() {

		this.router.events.subscribe( ( event ) => this.handleRouterEvent( event ) );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I handle the router events.
	*/
	private handleRouterEvent( event: AngularRouterEvent ) {

		if (
			( event instanceof NavigationEnd ) &&
			! this.activatedRoute.firstChild 
			) {

			this.setTitle();

		}

	}

	/**
	* I set the title based on the current view-model.
	*/
	private setTitle() {

		this.windowTitle.set( "Hello, Angular 18!" );

	}

}
