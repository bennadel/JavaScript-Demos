// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { QueryParams } from "@ngrx/router";
import { RouteParams } from "@ngrx/router";
import { Router } from "@ngrx/router";
import { Subscription } from "rxjs/Subscription";

// Execute side-effects for RxJS observable operators.
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/pluck";

// Import the application components and services.
import { IScreen } from "~/shared/services/index";
import { ScreenService } from "~/shared/services/index";

interface IFilteredScreen {
	screen: IScreen;
	tags: string[];
	column: number;
	visible: boolean;
}

@Component({
	moduleId: __moduleName,
	selector: "bn-screens-view",
	templateUrl: "./screens-view.component.htm",
	styleUrls: [ "./screens-view.component.css" ]
})
export class ScreensViewComponent implements OnInit, OnDestroy {

	public isLoading: boolean;
	public filter: string;
	public filteredScreens: IFilteredScreen[];
	public filterHasFocus: boolean;

	private queryParams: QueryParams;
	private queryParamsSubscription: Subscription;
	private routeParams: RouteParams;
	private routeParamsSubscription: Subscription;
	private router: Router;
	private screens: IScreen[];
	private screenService: ScreenService;


	// I initialize the component.
	constructor( 
		queryParams: QueryParams,
		routeParams: RouteParams,
		router: Router,
		screenService: ScreenService
		) {

		this.isLoading = true;
		this.filter = "";
		this.filteredScreens = [];
		this.filterHasFocus = false;

		this.queryParams = queryParams;
		this.queryParamsSubscription = null;
		this.routeParams = routeParams;
		this.routeParamsSubscription = null;
		this.router = router;
		this.screenService = screenService;
		
	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I handle the enter key on the filter - this will navigate to the first visible
	// screen in the list.
	public handleEnter() : void {

		if ( ! this.filter ) {

			return;

		}

		var firstVisible = this.filteredScreens.find(
			( filteredScreen: IFilteredScreen ) : boolean => {

				return( filteredScreen.visible );

			}
		);

		if ( firstVisible ) {

			this.router.go( `/console/project/${ firstVisible.screen.projectId }/screen/${ firstVisible.screen.id }` );

		}

	}


	// I handle updates to the filter input. 
	public handleFilter() : void {

		this.persistFilter();
		this.applyFilter();

	}


	// I get called once, when the component is being destroyed.
	public ngOnDestroy() : void {
		
		( this.queryParamsSubscription ) && this.queryParamsSubscription.unsubscribe();
		( this.routeParamsSubscription ) && this.routeParamsSubscription.unsubscribe();

	}


	// I get called once when the component has been instantiated, after the inputs have
	// been bound for the first time.
	public ngOnInit() : void {

		this.queryParamsSubscription = this.queryParams
			.pluck<string>( "filter" )
			.distinctUntilChanged()
			.filter(
				( filter: string ) : boolean => {

					return( this.filter !== ( filter || "" ) );

				}
			)
			.subscribe(
				( filter: string ) : void => {

					this.filter = ( filter || "" );
					this.applyFilter();

				}
			)
		;

		this.routeParamsSubscription = this.routeParams
			.pluck<string>( "projectId" )
			.distinctUntilChanged()
			.switchMap(
				( value: string ) : Observable<IScreen[]> => {

					this.isLoading = true;

					return( this.screenService.getScreensByProjectId( +value ) );

				}
			)
			.subscribe(
				( screens: IScreen[] ) : void => {

					this.isLoading = false;
					this.screens = screens;
					this.filteredScreens = this.screens.map(
						( screen: IScreen ) : IFilteredScreen => {

							return({
								screen: screen,
								tags: [ screen.name.toLowerCase(), screen.filename.toLowerCase() ],
								visible: false,
								column: 0
							});

						}
					);

					this.applyFilter();

				}
			)
		;

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I apply the current filter to the collection of filtered screens.
	private applyFilter() : void {

		var normalizedFilter = this.filter.toLowerCase();
		var visibleIndex = 0;

		this.filteredScreens.forEach(
			( filteredScreen: IFilteredScreen, i: number ) : void => {

				filteredScreen.visible = false;

				if ( this.containsSubstring( filteredScreen.tags, normalizedFilter ) ) {

					filteredScreen.column = ( ( visibleIndex++ % 4 ) + 1 );
					filteredScreen.visible = true;

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


	// I persist the current filter to the URL (via a param-based navigation).
	private persistFilter() : void {

		this.router.search({
			filter: this.filter
		});

	}

}
