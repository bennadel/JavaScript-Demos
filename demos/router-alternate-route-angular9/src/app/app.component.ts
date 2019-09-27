
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { UserConfigService } from "./user-config.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p class="flag-controls">
			<strong>Set Feature Flag</strong>:
			<a (click)="setFeatureFlag( true )">Yes</a> ,
			<a (click)="setFeatureFlag( false )">No</a>
			&mdash;
			( Current: <strong>{{ userConfigService.isUsingNewHawtness }}</strong> )
		</p>

		<nav>
			<a routerLink="/app">Home</a> ,
			<a routerLink="/app/projects">Projects</a>
		</nav>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {

	public userConfigService: UserConfigService;
	
	// I initialize the app component.
	constructor( userConfigService: UserConfigService ) {

		this.userConfigService = userConfigService;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I set the feature flag that determines which version of the Projects list is
	// rendered on the "projects" route.
	// --
	// NOTE: This is just for the demo. Normally, a feature flag would be configured by
	// the Product Team based on targeting rules.
	public setFeatureFlag( value: boolean ) : void {

		this.userConfigService.isUsingNewHawtness = value;

	}

}
