
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

interface Prototype {
	id: number;
	name: string;
}

interface User {
	id: number;
	name: string;
	initials: string;
	avatarUrl: string;
}

interface SelectedUsers {
	[ key: string ]: boolean;
}

interface RenderedUsers {
	[ key: string ]: boolean;
}

@Component({
	selector: "prototype-members-view",
	host: {
		"(directclick)": "closeModal()"
	},
	styleUrls: [ "./prototype-members-view.component.less" ],
	templateUrl: "./prototype-members-view.component.htm"
})
export class PrototypeMembersViewComponent implements OnInit, OnDestroy {

	public prototype: Prototype;
	public filterText: string;
	public isLoading: boolean;
	public members: User[];
	public renderedUsers: RenderedUsers;
	public selectedUsers: SelectedUsers;
	public users: User[];

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private keyboardShortcuts: KeyboardShortcuts;
	private paramMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;
	private unlisten: Unlisten;

	// I initialize the create-project-view component.
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

		this.prototype = null;
		this.filterText = "";
		this.isLoading = true;
		this.members = null;
		this.renderedUsers = {};
		this.selectedUsers = {};
		this.users = null;

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


	public handleFilter() : void {

		var value = this.filterText.toLowerCase();

		for ( var user of this.users ) {

			if ( value ) {

				this.renderedUsers[ user.id ] = user.name.toLowerCase().includes( value );

			} else {

				this.renderedUsers[ user.id ] = true;

			}

		}

	}


	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();
		( this.unlisten ) && this.unlisten();

	}


	// I get called once when the component is being mounted.
	public ngOnInit() : void {

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

					this.closeModal();

				}
			},
			{
				priority: this.keyboardShortcuts.getPriority( "modal" ),
				inputs: true
			}
		);

	}


	public toggleUser( user: User ) : void {

		this.selectedUsers[ user.id ] = ! this.selectedUsers[ user.id ];

	}


	public update() : void {

		this.closeModal();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private loadData( prototypeID: number ) : void {

		this.isLoading = true;
		this.partialService
			.get( prototypeID )
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.members = partial.members;
					this.prototype = partial.prototype;
					this.users = partial.users;

					// Setup the collection of user IDs.
					for ( var user of this.users ) {

						this.renderedUsers[ user.id ] = true;
						this.selectedUsers[ user.id ] = !! _.find( this.members, { id: user.id } );

					}

				},
				( error: any ) : void => {

					this.errorLogger.log( error );
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									modal: "modal/error/could-not-load-prototype"
								}
							}
						]
					);

				}
			)
		;

	}

}
