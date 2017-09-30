
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

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
}

@Component({
	selector: "detail-view",
	styleUrls: [
		"../../styles/standard-header.less",
		"./detail-view.component.less"
	],
	templateUrl: "./detail-view.component.htm"
})
export class DetailViewComponent implements OnInit, OnDestroy {

	public isLoading: boolean;
	public isSelf: boolean;
	public user: User;

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private paramMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;
	private session: Session;

	// I initialize the detail-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		errorLogger: ErrorLogger,
		partialService: PartialService,
		router: Router,
		session: Session
		) {

		this.activatedRoute = activatedRoute;
		this.errorLogger = errorLogger;
		this.partialService = partialService;
		this.router = router;
		this.session = session;

		this.isLoading = true;
		this.isSelf = false;
		this.paramMapSubscription = null;
		this.user = null;

	}

	// ---
	// PUBLIE METHODS.
	// ---

	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();

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
					this.user = partial.user;

					// Some actions won't be available to non-self users.
					this.isSelf = this.session.isForUser( this.user );

				},
				( error: any ) : void => {

					this.errorLogger.log( error );
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									primary: "people",
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
