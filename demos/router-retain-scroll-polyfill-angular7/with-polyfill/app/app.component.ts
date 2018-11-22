
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div class="nav">
			<a routerLink="/app" class="nav__item">Home</a>
			<a routerLink="/app/main/section-a" class="nav__item">Section A</a>
			<a routerLink="/app/main/section-b" class="nav__item">Section B</a>
			<a routerLink="/app/main/section-c" class="nav__item">Section C</a>
			<a routerLink="/app/main/section-d" class="nav__item">Section D</a>
			
			<a [routerLink]="[ '/app', { outlets: { secondary: 'secondary' } } ]" class="nav__item nav__item--secondary">Secondary</a>
			<a [routerLink]="[ '/app', { outlets: { tertiary: 'tertiary' } } ]" class="nav__item">Tertiary</a>
		</div>

		<h1>
			Restoring And Resetting The Scroll Position Using The NavigationStart Event In Angular 7.0.4
		</h1>

		<router-outlet></router-outlet>
		<router-outlet name="secondary"></router-outlet>
		<router-outlet name="tertiary"></router-outlet>
	`
})
export class AppComponent {
	
	// I get called whenever Angular dirty-checks a component.
	// --
	// NOTE: I am including this to demonstrate that change-detection digests are not
	// getting triggered by the timers and the scroll handlers in the polyfill.
	public ngDoCheck() : void {

		console.info( "Angular is performing a dirty-check of its components at", Date.now() );

	}

}
