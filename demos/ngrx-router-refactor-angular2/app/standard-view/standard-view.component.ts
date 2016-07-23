// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";
import { LocationChange } from "@ngrx/router";
import { OnDestroy } from "@angular/core";
import { Router } from "@ngrx/router";
import { Subscription } from "rxjs/Subscription";

// Import the application components and services.
import { InboxComponent } from "./inbox/index";
import { RouterUtils } from "~/shared/services/index";

@Component({
	moduleId: __moduleName,
	selector: "bn-standard-view",
	directives: [ InboxComponent ],
	templateUrl: "./standard-view.component.htm",
	styleUrls: [ "./standard-view.component.css" ]
})
export class StandardViewComponent implements OnDestroy {

	// I determine whether or not the mini logo is visible - it's only visible when 
	// certain sections of the site are activated.
	public isShowingLogo: boolean;

	private router: Router;
	private routerSubscription: Subscription;
	private routerUtils: RouterUtils;


	// I initialize the component.
	constructor( router: Router, routerUtils: RouterUtils ) {

		this.isShowingLogo = false;
		this.router = router;
		this.routerUtils = routerUtils;

		this.routerSubscription = router.subscribe(
			( locationChange: LocationChange ) : void => {

				this.isShowingLogo = locationChange.path.startsWith( "/learn" );

			}
		);

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I get called once, when the component is being destroyed.
	public ngOnDestroy() : void {

		this.routerSubscription.unsubscribe();

	}


	// I open the "Help" widget.
	public openHelp() : void {

		alert( "Open help window!" );

	}


	// I open the inbox using query-string navigation.
	public openInbox() : void {

		this.routerUtils.gotoQueryParam( "inbox", true );

	}

}
