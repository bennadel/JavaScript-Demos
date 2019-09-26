
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
		<p>
			Use New Hawtness: [{{ userConfigService.isUsingNewHawtness }}] -

			<a (click)="setHawtness( true )">Yes</a> ,
			<a (click)="setHawtness( false )">No</a>
		</p>

		<p>
			<a routerLink="/app">Home</a> ,
			<a routerLink="/app/projects">Projects</a>
		</p>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {

	public userConfigService: UserConfigService;
	
	constructor( userConfigService: UserConfigService ) {

		this.userConfigService = userConfigService;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public setHawtness( value: boolean ) : void {

		this.userConfigService.isUsingNewHawtness = value;

	}

}
