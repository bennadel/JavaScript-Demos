
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

// Import these modules for their side-effects.
import "rxjs/add/operator/delay";

// Import the application components and services.
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { PartialService } from "./services/partial.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Thread {
	id: number;
	name: string;
	teaser: string;
	user: {
		id: number;
		name: string;
		initials: string;
		avatarUrl: string;
	};
}

@Component({
	selector: "threads-view",
	styleUrls: [ "./threads-view.component.less" ],
	templateUrl: "./threads-view.component.htm"
})
export class ThreadsViewComponent {

	public isLoading: boolean;
	public type: string;
	public threads: Thread[];

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private paramMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;

	// I initialize the threads-view component.
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
		this.type = "";
		this.threads = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public ngOnDestroy() : void {

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();

	}


	public ngOnInit() : void {

		this.paramMapSubscription = this.activatedRoute.paramMap
			// TIMING HACK: We need to add a tick-delay between the root ParamMap emit
			// and the callback in order to fix several Angular bugs.
			.delay( 10 )
			.subscribe(
				( paramMap: ParamMap ) : void => {

					this.loadData( paramMap.get( "type" ), +paramMap.get( "id" ) );

				}
			)
		;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private loadData( type: string, id: number ) : void {

		this.type = ( type === "prototypes" )
			? "Prototype"
			: "Board"
		;

		this.isLoading = true;
		var promise = ( type === "prototypes" )
			? this.partialService.getForPrototype( id )
			: this.partialService.getForBoard( id )
		;

		promise
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.threads = partial.threads;

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
									modal: "modal/error/could-not-load-inbox-thread",
									inbox: "inbox"
								}
							}
						]
					);

				}
			)
		;

	}

}
