
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { delay } from "rxjs/operators";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

// Import the application components and services.
import { KeyboardShortcuts } from "~/app/shared/services/keyboard-shortcuts";
import { Unlisten } from "~/app/shared/services/keyboard-shortcuts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "error-view",
	host: {
		"(directclick)": "closeModal()"
	},
	styleUrls: [ "./error-view.component.less" ],
	templateUrl: "./error-view.component.htm"
})
export class ErrorViewComponent implements OnInit, OnDestroy {

	public message: string;
	public title: string;
	public type: string;

	private activatedRoute: ActivatedRoute;
	private keyboardShortcuts: KeyboardShortcuts;
	private paramMapSubscription: Subscription;
	private router: Router;
	private unlisten: Unlisten;

	// I initialize the create-project-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		keyboardShortcuts: KeyboardShortcuts,
		router: Router
		) {
		
		this.activatedRoute = activatedRoute;
		this.keyboardShortcuts = keyboardShortcuts;
		this.router = router;

		this.setType();
		this.unlisten = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I close the modal window.
	public closeModal() : void {

		this.router.navigate(
			[
				"/app",
				{
					outlets: {
						modal: null
					}
				}
			]
		);
		
	}


	public ngOnDestroy() : void {

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();
		( this.unlisten ) && this.unlisten();

	}


	public ngOnInit() : void {

		this.paramMapSubscription = this.activatedRoute.paramMap
			// TIMING HACK: We need to add a tick-delay between the root ParamMap emit
			// and the callback in order to fix several Angular bugs.
			.pipe( delay( 10 ) )
			.subscribe(
				( paramMap : ParamMap ) : void => {

					this.setType( paramMap.get( "type" ) );
					
				}
			)
		;

		this.unlisten = this.keyboardShortcuts.listen(
			{
				"Escape": ( event: KeyboardEvent ) : void => {

					this.closeModal();

				}
			},
			{
				priority: this.keyboardShortcuts.getPriority( "modal" ),
				// Enable the inputs option so that an input focused somewhere in the 
				// background won't prevent the Esc-key from closing the modal.
				inputs: true
			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private setType( type: string = "generic" ) : void {

		switch ( this.type = type ) {
			case "cannot-build-empty-prototype":
				this.title = "Your Prototype Is Empty";
				this.message = "Sorry, you must upload at least one screen before you can start building out the prototype in the Console.";
			break;
			case "could-not-load-board":
				this.title = "Not Found";
				this.message = "Sorry, we were unable to locate the selected board.";
			break;
			case "could-not-load-board-item":
				this.title = "Not Found";
				this.message = "Sorry, we were unable to load the selected item. It's possible that it was deleted since you last accessed it. Try refreshing your browser to make sure you have the most up-to-date list of items.";
			break;
			case "could-not-load-freehand":
				this.title = "Not Found";
				this.message = "Sorry, we were unable to locate the selected freehand.";
			break;
			case "could-not-load-inbox":
				this.title = "Something Went Wrong";
				this.message = "Sorry, we were unable to load your Inbox. Please wait and try again in a few minutes.";
			break;
			case "could-not-load-inbox-conversation":
				this.title = "Something Went Wrong";
				this.message = "Sorry, we were unable to load the selected Inbox conversation. Please wait and try again in a few minutes.";
			break;
			case "could-not-load-inbox-thread":
				this.title = "Something Went Wrong";
				this.message = "Sorry, we were unable to load the selected Inbox thread. Please wait and try again in a few minutes.";
			break;
			case "could-not-load-people":
				this.title = "Something Went Wrong";
				this.message = "Sorry, we were unable to load your team members. Please wait and try again in a few minutes.";
			break;
			case "could-not-load-person":
				this.title = "Something Went Wrong";
				this.message = "Sorry, we were unable to location the selected team member.";
			break;
			case "could-not-load-product-updates":
				this.title = "Something Went Wrong";
				this.message = "Sorry, we were unable to load the recent product updates. Please wait and try again in a few minutes.";
			break;
			case "could-not-load-projects":
				this.title = "Something Went Wrong";
				this.message = "Sorry, we were unable to load your projects. Please wait and try again in a few minutes.";
			break;
			case "could-not-load-prototype":
				this.title = "Not Found";
				this.message = "Sorry, we were unable to locate the selected prototype.";
			break;
			case "could-not-load-prototype-screens":
				this.title = "Not Found";
				this.message = "Sorry, we were unable to load the selected prototype screens. Please wait and try again in a few minutes.";
			break;
			case "could-not-load-screen":
				this.title = "Not Found";
				this.message = "Sorry, we were unable to load the selected screen. It's possible that it was archived or deleted since you last accessed it. Try refreshing your browser to make sure you have the most up-to-date list of screens.";
			break;
			default:
				this.title = "Something Went Wrong";
				this.message = "Sorry, an unexpected error occurred and we are unable to process your request at this time. The error has been logged an our engineering team will be investigating.";
			break;
		}

	}

}
