
// Import the core angular services.
import { Component } from "@angular/core";
import { Event as NavigationEvent } from "@angular/router";
import { NavigationStart } from "@angular/router";
import { Router } from "@angular/router";

// Import these modules for their side-effects.
import "rxjs/add/operator/delay";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<h2>
			Without <code>.delay(10)</code> In ActivatedRoute
		</h2>

		<ul>
			<li>
				<strong>Step 0</strong> &mdash; 
				<a routerLink="/">Show Root</a>
			</li>
			<li>
				<strong>Step 1</strong> &mdash; 
				<a [routerLink]="[ 'bad-child', 1 ]">Show Child 1</a>
			</li>
			<li>
				<strong>Step 2</strong> &mdash;
				<a [routerLink]="[ 'bad-child', 2 ]">Show Child 2</a>
			</li>
			<li>
				<strong>Step 3</strong> &mdash;
				<a href="#/bad-child/3">Show Child 3</a>
			</li>
		</ul>

		<h2>
			With <code>.delay(10)</code> In ActivatedRoute
		</h2>

		<ul>
			<li>
				<strong>Step 0</strong> &mdash; 
				<a routerLink="/">Show Root</a>
			</li>
			<li>
				<strong>Step 1</strong> &mdash; 
				<a [routerLink]="[ 'good-child', 1 ]">Show Child 1</a>
			</li>
			<li>
				<strong>Step 2</strong> &mdash;
				<a [routerLink]="[ 'good-child', 2 ]">Show Child 2</a>
			</li>
			<li>
				<strong>Step 3</strong> &mdash;
				<a href="#/good-child/3">Show Child 3</a>
			</li>
		</ul>

		<ng-template [ngIf]="isLoading">

			<p>
				<em>No child being rendered yet.</em>
			</p>

		</ng-template>

		<ng-template [ngIf]="! isLoading">

			<router-outlet></router-outlet>

		</ng-template>
	`
})
export class AppComponent {
	
	public isLoading: boolean;

	constructor( router: Router ) {

		var timer: number = null;
		this.isLoading = true;

		// NOTE: I am adding the delay here to give the template time to reconcile with
		// the changes in the view-model. To be honest, I don't exactly understand the 
		// timing issues; but, I suspect that multiple things are taking place in series
		// and the change detector is unhappy with it.
		router.events.delay( 0 ).subscribe(
			( event: NavigationEvent ) : void => {

				if ( ! ( event instanceof NavigationStart ) ) {

					return;

				}

				console.info( "Navigating to:", event.url );
				clearTimeout( timer );

				// We want to indicate a loading for all navigations EXCEPT for 2 ==> 3.
				// This demonstrates another edge-case in which we navigate away from a
				// component inside the ParamMap callback.
				this.isLoading = ! /-child\/3/i.test( event.url );

				// If we're navigating to one of the Child routes, let's pull the router-
				// outlet out of the page briefly so that the Router will destroy the 
				// current Child component (if any is rendered). This will help simulate
				// the kind of network latency we would see in production if we were 
				// loading data of a parent view.
				if ( /-child\/[12]/i.test( event.url ) ) {
					
					timer = setTimeout(
						() : void => {
							
							this.isLoading = false;

						},
						500
					);

				}

			}
		);

	}

}
