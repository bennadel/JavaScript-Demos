
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
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { PartialService } from "./services/partial.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface FilteredScreen {
	screen: Screen;
	tags: string[];
	column: number;
	isVisible: boolean;
	resource: string;
}

interface Screen {
	id: number;
	prototypeID: number;
	name: string;
	filename: string;
	isArchived: boolean;
}

@Component({
	selector: "screens-view",
	styleUrls: [ "./screens-view.component.less" ],
	templateUrl: "./screens-view.component.htm"
})
export class ScreensViewComponent implements OnInit, OnDestroy {

	public filteredScreens: FilteredScreen[];
	public filterTextHasFocus: boolean;
	public filterText: string;
	public filterType: string;
	public isLoading: boolean;

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private paramMapSubscription: Subscription;
	private parentParamMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;

	// I initialize the screens-view component.
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

		this.filteredScreens = [];
		this.filterText = "";
		this.filterTextHasFocus = false; // This is updated in the HTML itself (easier).
		this.filterType = "active";
		this.isLoading = true;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I navigate to the first item in the filtered list.
	public handleEnter() : void {

		var visibleScreen = this.filteredScreens.find(
			( filteredScreen: FilteredScreen ) : boolean => {

				return( filteredScreen.isVisible );

			}
		);

		if ( visibleScreen ) {

			this.router.navigateByUrl( visibleScreen.resource );

		}

	}


	public handleFilter() : void {

		// NOTE: When we persist the filter, our subscription to the ActivatedRoute will
		// automatically alert us and we can loop the change back into the filtered list.
		this.persistFilterToRoute();

	}


	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		( this.parentParamMapSubscription ) && this.parentParamMapSubscription.unsubscribe();
		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();

	}


	// I get called once when the component is being mounted.
	public ngOnInit() : void {

		this.parentParamMapSubscription = this.activatedRoute.parent.paramMap
			// TIMING HACK: We need to add a tick-delay between the root ParamMap emit
			// and the callback in order to fix several Angular bugs.
			.delay( 10 )
			.subscribe(
				( paramMap: ParamMap ) : void => {

					this.loadData( +paramMap.get( "id" ) );

				}
			)
		;

		this.paramMapSubscription = this.activatedRoute.paramMap
			// TIMING HACK: We need to add a tick-delay between the root ParamMap emit
			// and the callback in order to fix several Angular bugs.
			.delay( 10 )
			.subscribe(
			( paramMap: ParamMap ) : void => {

					this.filterText = ( paramMap.get( "filterText" ) || "" );
					this.filterType = ( paramMap.get( "filterType" ) || "active" );
					this.applyFilterToList();

				}
			)
		;

	}
	

	public showType( filterType: string ) : void {

		this.filterType = filterType;

		// NOTE: When we persist the filter, our subscription to the ActivatedRoute will
		// automatically alert us and we can loop the change back into the filtered list.
		this.persistFilterToRoute();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private applyFilterToList() : void {

		var normalizedFilter = this.filterText.trim().toLowerCase();
		var visibleIndex = 0;

		this.filteredScreens.forEach(
			( filteredScreen: FilteredScreen, i: number ) : void => {

				filteredScreen.isVisible = false;

				if (
					( ( this.filterType === "active" ) && filteredScreen.screen.isArchived ) ||
					( ( this.filterType === "archived" ) && ! filteredScreen.screen.isArchived )
					) {

					return;

				}

				if ( this.containsSubstring( filteredScreen.tags, normalizedFilter ) ) {

					filteredScreen.column = ( ( visibleIndex++ % 4 ) + 1 );
					filteredScreen.isVisible = true;

				}

			}
		);

	}


	// I determine if the collection of values contains the given input as a substring.
	private containsSubstring( values: string[], input: string ) : boolean {

		for ( var value of values ) {

			if ( value.includes( input ) ) {
				
				return( true );

			}

		}

		return( false );

	}


	private loadData( prototypeID: number ) : void {

		this.isLoading = true;
		this.partialService
			.get( prototypeID )
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.filteredScreens = partial.screens.map(
						( screen ) : FilteredScreen => {

							return({
								screen: screen,
								tags: [ screen.name.toLowerCase(), screen.filename.toLowerCase() ],
								column: 0,
								isVisible: false,
								resource: `/app/console/prototypes/${ screen.prototypeID }/screens/${ screen.id }`
							});

						}
					);

					this.filteredScreens.sort(
						( a: FilteredScreen, b: FilteredScreen ) : number => {

							var aName = a.screen.name.toLowerCase();
							var bName = b.screen.name.toLowerCase();

							if ( aName < bName ) {

								return( -1 );

							} else if ( aName > bName ) {

								return( 1 );

							} else {

								return( 0 );
								
							}

						}
					);

					this.applyFilterToList();

				},
				( error: any ) : void => {

					this.errorLogger.log( error );
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									modal: "modal/error/could-not-load-prototype-screens"
								}
							}
						]
					);

				}
			)
		;

	}


	private persistFilterToRoute() : void {

		var filterParams = {
			filterText: this.filterText,
			filterType: this.filterType
		};

		( ! this.filterText ) && delete( filterParams.filterText );
		( ! this.filterType || ( this.filterType === "active" ) ) && delete( filterParams.filterType );

		this.router.navigate(
			[
				filterParams
			],
			{
				relativeTo: this.activatedRoute
			}
		);

	}

}
