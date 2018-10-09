
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
import { _ } from "~/app/shared/services/lodash-extended";
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { PartialService } from "./services/partial.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Board {
	id: number;
	name: string;
}

interface BoardItem {
	id: number;
	name: string;
	type: string;
}

interface Member {
	id: number;
	name: string;
	initials: string;
	avatarUrl: string;
}

@Component({
	selector: "board-view",
	styleUrls: [ "./detail-view.component.less" ],
	templateUrl: "./detail-view.component.htm"
})
export class DetailViewComponent implements OnInit, OnDestroy {

	public isLoading: boolean;
	public board: Board;
	public items: BoardItem[];
	public members: Member[];

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private paramMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;

	// I initialize the detail-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		errorLogger: ErrorLogger,
		partialService: PartialService,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.errorLogger = errorLogger;
		this.partialService = partialService;
		this.router = router;

		this.isLoading = true;
		this.board = null;
		this.items = null;
		this.members = null;

	}

	// ---
	// PUBLIE METHODS.
	// ---

	public gotoRelativeItem( direction: "previous" | "next", itemID: number ) : void {

		var currentItem = _.find( this.items, { id: itemID } );
		var index = _.indexOf( this.items, currentItem );

		switch ( direction ) {
			case "previous":

				if ( --index < 0 ) {

					index = ( this.items.length - 1 );

				}

			break;
			case "next":

				if ( ++index >= this.items.length ) {

					index = 0;

				}

			break;
		}

		this.router.navigate(
			[ "./items", this.items[ index ].id ],
			{
				relativeTo: this.activatedRoute
			}
		);

	}


	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();

	}


	// I get called once when the component is being mounted.
	public ngOnInit() : void {

		this.paramMapSubscription = this.activatedRoute.paramMap
			// TIMING HACK: We need to add a tick-delay between the root ParamMap emit
			// and the callback in order to fix several Angular bugs.
			.pipe( delay( 10 ) )
			.subscribe(
				( paramMap: ParamMap ) : void => {

					this.loadData( +paramMap.get( "id" ) );

				}
			)
		;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private loadData( boardID: number ) : void {

		this.isLoading = true;
		this.partialService
			.get( boardID )
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.board = partial.board;
					this.items = partial.items;
					this.members = partial.members;

				},
				( error: any ) : void => {

					this.errorLogger.log( error );
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									primary: [ "projects", "list", { filterType: "board" } ],
									modal: "modal/error/could-not-load-board"
								}
							}
						]
					);

				}
			)
		;

	}

}
