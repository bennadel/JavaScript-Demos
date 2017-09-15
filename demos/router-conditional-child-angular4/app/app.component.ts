
// Import the core angular services.
import { Component } from "@angular/core";
import { Event as NavigationEvent } from "@angular/router";
import { NavigationEnd } from "@angular/router";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<h2>
			App Routing Component
		</h2>

		<ul>
			<li>
				<a routerLink="/">Home</a>
				<strong *ngIf="activated.home">&laquo;&mdash;Selected</strong>
			</li>
			<li>
				<a routerLink="/parent/p1/child/p1-c1">Route: /parent/p1/child/p1-c1</a>
				<strong *ngIf="activated.p1c1">&laquo;&mdash;Selected</strong>
			</li>
			<li>
				<a routerLink="/parent/p1/child/p1-c2">Route: /parent/p1/child/p1-c2</a>
				<strong *ngIf="activated.p1c2">&laquo;&mdash;Selected</strong>
			</li>
			<li>
				<a routerLink="/parent/p2/child/p2-c1">Route: /parent/p2/child/p2-c1</a>
				<strong *ngIf="activated.p2c1">&laquo;&mdash;Selected</strong>
			</li>
			<li>
				<a routerLink="/parent/p2/child/p2-c2">Route: /parent/p2/child/p2-c2</a>
				<strong *ngIf="activated.p2c2">&laquo;&mdash;Selected</strong>
			</li>
		</ul>

		<router-outlet></router-outlet>

		<hr />

		<p>
			<strong>"Mostly" work?</strong> If you click into p1-c1 and let it load. 
			Then, you click into p2-c2 and then hit your back button (before it loads),
			you will see that it breaks with the error 
			<code>"Cannot read property 'component' of null"</code>.
			This error goes away if the router-outlet is always on the page 
			(ie, not in an ngIf template).
		</p>
	`
})
export class AppComponent {
	
	public activated: {
		home: boolean;
		p1c1: boolean;
		p1c2: boolean;
		p2c1: boolean;
		p2c2: boolean;
	};

	private router: Router;

	// I initialize the app component.
	constructor( router: Router ) {

		this.router = router;
		this.activated = {
			home: false,
			p1c1: false,
			p1c2: false,
			p2c1: false,
			p2c2: false
		};

		// Listen for routing events so we can update the activated route indicator
		// as the user navigates around the application.
		this.router.events.subscribe(
			( event: NavigationEvent ) : void => {

				if ( event instanceof NavigationEnd ) {

					this.activated.home = this.router.isActive( "/", true );
					this.activated.p1c1 = this.router.isActive( "/parent/p1/child/p1-c1", true );
					this.activated.p1c2 = this.router.isActive( "/parent/p1/child/p1-c2", true );
					this.activated.p2c1 = this.router.isActive( "/parent/p2/child/p2-c1", true );
					this.activated.p2c2 = this.router.isActive( "/parent/p2/child/p2-c2", true );

				}

			}
		);

	}

}
