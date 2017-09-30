
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

// Import these modules for their side-effects.
import "rxjs/add/operator/delay";

// Import the application components and services.
import { _ } from "~/app/shared/services/lodash-extended";
import { DetailViewComponent } from "../detail-view.component";
import { DomUtils } from "~/app/shared/services/dom-utils";
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { KeyboardShortcuts } from "~/app/shared/services/keyboard-shortcuts";
import { PartialService } from "./services/partial.service";
import { Unlisten } from "~/app/shared/services/keyboard-shortcuts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Item {
	id: number;
	name: string;
	type: string;
}

interface Comment {
	id: number;
	content: string;
	user: {
		id: number;
		name: string;
		initials: string;
		avatarUrl: string;
	};	
}

interface Board {
	id: number;
	name: string;
}

@Component({
	selector: "item-view",
	styleUrls: [ "./item-view.component.less" ],
	templateUrl: "./item-view.component.htm"
})
export class ItemViewComponent implements OnInit, OnDestroy {

	public board: Board;
	public comments: Comment[];
	public isLoading: boolean;
	public item: Item;

	private activatedRoute: ActivatedRoute;
	private detailViewComponent: DetailViewComponent;
	private domUtils: DomUtils;
	private errorLogger: ErrorLogger;
	private keyboardShortcuts: KeyboardShortcuts;
	private paramMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;
	private unlisten: Unlisten;

	// I initialize the detail-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		domUtils: DomUtils,
		detailViewComponent: DetailViewComponent,
		errorLogger: ErrorLogger,
		keyboardShortcuts: KeyboardShortcuts,
		partialService: PartialService,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.detailViewComponent = detailViewComponent;
		this.domUtils = domUtils;
		this.errorLogger = errorLogger;
		this.keyboardShortcuts = keyboardShortcuts;
		this.partialService = partialService;
		this.router = router;

		this.board = null;
		this.comments = null;
		this.isLoading = true;
		this.item = null;
		this.paramMapSubscription = null;
		this.unlisten = null;

	}

	// ---
	// PUBLIE METHODS.
	// ---

	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();
		( this.unlisten ) && this.unlisten();

		// When we close the item-view (pseudo modal window), we can allow any overflow
		// of the HTML page to show; this will re-enable the natural scrollbars on the 
		// main page.
		this.domUtils.showHtmlOverflow();

	}


	// I get called once when the component is being mounted.
	public ngOnInit() : void {

		// Since the item-view is acting like a pseudo modal window, we want to hide the
		// scrollbars of the main document. This way, scrolling in the detail view won't
		// cause accidental scrolling in the main document.
		this.domUtils.hideHtmlOverflow();

		this.paramMapSubscription = this.activatedRoute.paramMap
			// TIMING HACK: We need to add a tick-delay between the root ParamMap emit
			// and the callback in order to fix several Angular bugs.
			.delay( 10 )
			.subscribe(
				( paramMap: ParamMap ) : void => {

					this.loadData( +paramMap.get( "id" ) );

				}
			)
		;

		this.unlisten = this.keyboardShortcuts.listen(
			{
				"Escape": ( event: KeyboardEvent ) : void => {

					this.router.navigate(
						[ "../../" ],
						{
							relativeTo: this.activatedRoute
						}
					);

				},
				"ArrowLeft": ( event: KeyboardEvent ) : void => {

					this.detailViewComponent.gotoRelativeItem( "previous", +this.activatedRoute.snapshot.params.id );

				},
				"ArrowRight": ( event: KeyboardEvent ) : void => {

					this.detailViewComponent.gotoRelativeItem( "next", +this.activatedRoute.snapshot.params.id );

				}
			},
			{
				priority: this.keyboardShortcuts.getPriority( "board-item" )
			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private loadData( itemID: number ) : void {

		this.item = _.find( this.detailViewComponent.items, { id: itemID } );

		// This loading pertains only to the sidebar.
		this.isLoading = true;
		this.partialService
			.get( itemID )
			.then(
				( partial ) : void => {

					// If the view has already moved onto another ID, then don't consume 
					// the response.
					if ( itemID !== +this.activatedRoute.snapshot.params.id ) {

						return;

					}

					this.isLoading = false;
					this.board = partial.board;
					this.comments = partial.comments;

				},
				( error: any ) : void => {

					this.errorLogger.log( error );
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									primary: [ "boards", this.activatedRoute.snapshot.parent.parent.params.id ],
									modal: "modal/error/could-not-load-board-item"
								}
							}
						]
					);

				}
			)
		;

	}

}
