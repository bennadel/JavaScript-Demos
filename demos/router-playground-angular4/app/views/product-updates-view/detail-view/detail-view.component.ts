// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { SafeHtml } from "@angular/platform-browser";
import { Subscription } from "rxjs/Subscription";

// Import these modules for their side-effects.
import "rxjs/add/operator/delay";

// Import the application components and services.
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { PartialService } from "./services/partial.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface ProductUpdate {
	id: number;
	message: string;
	messageSafe: SafeHtml;
	staff: {
		name: string;
		initials: string;
	}
}

@Component({
	selector: "detail-view",
	styleUrls: [ "./detail-view.component.less" ],
	templateUrl: "./detail-view.component.htm"
})
export class DetailViewComponent implements OnInit, OnDestroy {

	public isLoading: boolean;
	public update: ProductUpdate;

	private activatedRoute: ActivatedRoute;
	private domSanitizer: DomSanitizer;
	private errorLogger: ErrorLogger;
	private paramMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;

	// I initialize the detail-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		domSanitizer: DomSanitizer,
		errorLogger: ErrorLogger,
		partialService: PartialService,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.domSanitizer = domSanitizer;
		this.errorLogger = errorLogger;
		this.partialService = partialService;
		this.router = router;

		this.isLoading = true;
		this.paramMapSubscription = null;
		this.update = null;

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

	private loadData( productUpdateID: number ) : void {

		this.isLoading = true;
		this.partialService
			.get( productUpdateID )
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.update = {
						id: partial.update.id,
						message: partial.update.message,
						staff: partial.update.staff,

						// Converting the raw text to HTML mark-up.
						messageSafe: this.domSanitizer.bypassSecurityTrustHtml( partial.update.message.replace( /\n/g, "<br />" ) )
					};

				},
				( error: any ) : void => {

					this.errorLogger.log( error );
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									modal: "modal/error/could-not-load-product-updates",
									updates: null
								}
							}
						]
					);

				}
			)
		;

	}

}
