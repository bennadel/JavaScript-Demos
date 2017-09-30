
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
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { KeyboardShortcuts } from "~/app/shared/services/keyboard-shortcuts";
import { PartialService } from "./services/partial.service";
import { Unlisten } from "~/app/shared/services/keyboard-shortcuts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	id: number;
	name: string;
	initials: string;
	avatarUrl: string;
}

interface Prototype {
	id: number;
	name: string;
}

interface Board {
	id: number;
	name: string;
}

interface SelectedPrototypes {
	[ key: string ]: boolean;
}

interface SelectedBoards {
	[ key: string ]: boolean;
}

@Component({
	selector: "user-projects-view",
	host: {
		"(directclick)": "closeModal()"
	},
	styleUrls: [ "./user-projects-view.component.less" ],
	templateUrl: "./user-projects-view.component.htm"
})
export class UserProjectsViewComponent implements OnInit, OnDestroy {

	public boards: Board[];
	public isLoading: boolean;
	public prototypes: Prototype[];
	public selectedBoards: SelectedBoards;
	public selectedPrototypes: SelectedPrototypes;
	public user: User;

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private keyboardShortcuts: KeyboardShortcuts;
	private paramMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;
	private unlisten: Unlisten;

	// I initialize the user-projects-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		errorLogger: ErrorLogger,
		keyboardShortcuts: KeyboardShortcuts,
		partialService: PartialService,
		router: Router
		) {
		
		this.activatedRoute = activatedRoute;
		this.errorLogger = errorLogger;
		this.keyboardShortcuts = keyboardShortcuts;
		this.partialService = partialService;
		this.router = router;

		this.isLoading = true;
		this.selectedBoards = {}; 
		this.selectedPrototypes = {}; 
		this.unlisten = null;
		this.user = null;

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
			.delay( 10 )
			.subscribe(
				( paramMap : ParamMap ) : void => {

					this.loadData( +paramMap.get( "id" ) );
					
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
				inputs: true
			}
		);

	}


	public toggleBoard( board: Board ) : void {

		this.selectedBoards[ board.id ] = ! this.selectedBoards[ board.id ];

	}


	public togglePrototype( prototype: Prototype ) : void {

		this.selectedPrototypes[ prototype.id ] = ! this.selectedPrototypes[ prototype.id ];

	}


	public updateProjects() : void {

		this.closeModal();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private loadData( userID: number ) : void {

		this.isLoading = true;
		this.partialService
			.get( userID )
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.boards = _.sortByCaseInsensitive( partial.boards, "name" );
					this.prototypes = _.sortByCaseInsensitive( partial.prototypes, "name" );
					this.user = partial.user;

					for ( var board of partial.boards ) {

						this.selectedBoards[ board.id ] = board.isMember;

					}

					for ( var prototype of partial.prototypes ) {

						this.selectedPrototypes[ prototype.id ] = prototype.isMember;

					}

				},
				( error: any ) : void => {

					this.errorLogger.log( error );
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									modal: "modal/error/could-not-load-person"
								}
							}
						]
					);

				}
			)
		;

	}

}
