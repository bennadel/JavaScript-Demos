
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";

// Import the application components and services.
import { DomUtils } from "~/app/shared/services/dom-utils";
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { KeyboardShortcuts } from "~/app/shared/services/keyboard-shortcuts";
import { PartialService } from "./services/partial.service";
import { Unlisten } from "~/app/shared/services/keyboard-shortcuts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Inbox {
	name: string;
	resource: string;
}

@Component({
	selector: "inbox-view",
	styleUrls: [ "./inbox-view.component.less" ],
	templateUrl: "./inbox-view.component.htm"
})
export class InboxViewComponent implements OnInit, OnDestroy {

	public inboxes: Inbox[];
	public isLoading: boolean;

	private activatedRoute: ActivatedRoute;
	private domUtils: DomUtils;
	private errorLogger: ErrorLogger;
	private keyboardShortcuts: KeyboardShortcuts;
	private partialService: PartialService;
	private router: Router;
	private unlisten: Unlisten;

	// I initialize the list-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		domUtils: DomUtils,
		errorLogger: ErrorLogger,
		keyboardShortcuts: KeyboardShortcuts,
		partialService: PartialService,
		router: Router
		) {
		
		this.activatedRoute = activatedRoute;
		this.domUtils = domUtils;
		this.errorLogger = errorLogger;
		this.keyboardShortcuts = keyboardShortcuts;
		this.partialService = partialService;
		this.router = router;

		this.inboxes = [];
		this.isLoading = true;
		this.unlisten = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public closeInbox() : void {

		this.router.navigate(
			[
				"/app",
				{
					outlets: {
						inbox: null
					}
				}
			]
		);

	}


	public ngOnDestroy() : void {

		// When we close the inbox outlet, we can allow any overflow of the HTML page to
		// show; this will re-enable the natural scrollbars on the main page.
		this.domUtils.showHtmlOverflow();

		( this.unlisten ) && this.unlisten();

	}


	public ngOnInit() : void {

		// When we open a inbox outlet, it will have it's own scrollbar. In order to not
		// show two scrollbars doubled-up on the side of the screen, we have to make sure
		// that the HTML page doesn't show a scrollbar for the main body.
		this.domUtils.hideHtmlOverflow();

		this.unlisten = this.keyboardShortcuts.listen(
			{
				"Escape": ( event: KeyboardEvent ) : void => {

					this.closeInbox();

				}
			},
			{
				priority: this.keyboardShortcuts.getPriority( "inbox" )
			}
		);

		this.loadData();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private loadData() : void {

		this.isLoading = true;
		this.partialService
			.get()
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.inboxes = [];

					partial.prototypes.forEach(
						( prototype ) : void => {

							this.inboxes.push({
								name: prototype.name,
								resource: `./prototypes/${ prototype.id }`
							});

						}
					);

					partial.boards.forEach(
						( board ) : void => {

							this.inboxes.push({
								name: board.name,
								resource: `./boards/${ board.id }`
							});

						}
					);

				}
			)
			.catch(
				( error: any ) : void => {

					this.errorLogger.log( error );
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									modal: "modal/error/could-not-load-inbox",
									inbox: null
								}
							}
						]
					);

				}
			)
		;

	}

}
