
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
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { PartialService } from "./services/partial.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Prototype {
	id: number;
	name: string;
}

interface Member {
	id: number;
	name: string;
	initials: string;
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
	public prototype: Prototype;
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
		this.prototype = null;

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

	private loadData( prototypeID: number ) : void {

		this.isLoading = true;
		this.partialService
			.get( prototypeID )
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.prototype = partial.prototype;
					this.members = partial.members;

				},
				( error: any ) : void => {

					this.errorLogger.log( error );
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									primary: [ "projects", "list", { filterType: "prototype" } ],
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
