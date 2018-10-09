
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Import the application components and services.
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { PartialService } from "./services/partial.service";
import { Session } from "~/app/shared/services/session";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	id: number;
	name: string;
	initials: string;
	email: string;
	avatarUrl: string;
	isOwner: boolean;
}

@Component({
	selector: "list-view",
	styleUrls: [
		"../../styles/standard-header.less",
		"./list-view.component.less"
	],
	templateUrl: "./list-view.component.htm"
})
export class ListViewComponent implements OnInit {

	public isLoading: boolean;
	public users: User[];

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private partialService: PartialService;
	private router: Router;
	private session: Session;

	// I initialize the list-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		errorLogger: ErrorLogger,
		partialSerivce: PartialService,
		router: Router,
		session: Session
		) {

		this.activatedRoute = activatedRoute;
		this.errorLogger = errorLogger;
		this.partialService = partialSerivce;
		this.router = router;
		this.session = session;

		this.isLoading = true;
		this.users = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public ngOnInit() : void {

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
					this.users = partial.users.map(
						( user ) => {

							return({
								id: user.id,
								name: user.name,
								initials: user.initials,
								email: user.email,
								avatarUrl: user.avatarUrl,
								isOwner: this.session.isForUser( user )
							});

						}
					);

					this.users.sort(
						( a, b ) => {

							if ( a.isOwner ) {

								return( -1 );

							} else if ( b.isOwner ) {

								return( 1 );

							}

							var aName = a.name.toLowerCase();
							var bName = b.name.toLowerCase();

							if ( aName <= bName ) {

								return( -1 );

							} else {

								return( 1 );

							}

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
									modal: "modal/error/could-not-load-people"
								}
							}
						]
					);

				}
			)
		;

	}

}
