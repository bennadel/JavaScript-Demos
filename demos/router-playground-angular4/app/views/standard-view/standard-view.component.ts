
// Import the core angular services.
import { Component } from "@angular/core";
import { Event as NavigationEvent } from "@angular/router";
import { NavigationStart } from "@angular/router";
import { OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

// Import the application components and services.
import { Session } from "~/app/shared/services/session";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	id: number;
	name: string;
	email: string;
}

@Component({
	selector: "standard-view",
	styleUrls: [ "./standard-view.component.less" ],
	templateUrl: "./standard-view.component.htm"
})
export class StandardViewComponent implements OnInit, OnDestroy {

	public isShowingUserDropdown: boolean;
	public user: User;

	private navigationSubscription: Subscription;
	private router: Router;
	private session: Session;

	// I initialize the standard view component.
	constructor(
		router: Router,
		session: Session
		) {

		this.router = router;
		this.session = session;
		
		this.isShowingUserDropdown = false;
		this.navigationSubscription = null;
		this.user = session.user;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public hideUserDropdown() : void {

		this.isShowingUserDropdown = false;

	}


	public ngOnDestroy() : void {

		( this.navigationSubscription ) && this.navigationSubscription.unsubscribe();

	}


	public ngOnInit() : void {

		this.navigationSubscription = this.router.events.subscribe(
			( event: NavigationEvent ) : void => {

				if ( event instanceof NavigationStart ) {

					this.hideUserDropdown();

				}

			}
		);

	}


	// I open the "Help" widget.
	public openHelp() : void {

		alert( "Open help window!" );

	}
	

	public toggleUserDropdown() : void {

		this.isShowingUserDropdown = ! this.isShowingUserDropdown;

	}

}
