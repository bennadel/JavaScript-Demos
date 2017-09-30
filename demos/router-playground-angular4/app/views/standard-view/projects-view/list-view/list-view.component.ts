
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

interface FilteredProject {
	type: string;
	item: Board | Freehand | Prototype;
	tags: string[];
	column: number;
	isVisible: boolean;
	resource: string;
}

interface Board {
	id: number;
	name: string;
}

interface Freehand {
	id: number;
	name: string;
}

interface Prototype {
	id: number;
	name: string;
}

@Component({
	selector: "list-view",
	styleUrls: [
		"../../styles/standard-header.less",
		"./list-view.component.less"
	],
	templateUrl: "./list-view.component.htm"
})
export class ListViewComponent implements OnInit, OnDestroy {

	public filterText: string;
	public filterType: string;
	public filteredProjects: FilteredProject[];
	public filterTextHasFocus: boolean;
	public isLoading: boolean;

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private partialService: PartialService;
	private paramMapSubscription: Subscription;
	private router: Router;

	// I initialize the list-view component.
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

		this.filterText = "";
		this.filterType = "all";
		this.filteredProjects = [];
		this.filterTextHasFocus = false; // This is updated in the HTML itself (easier).
		this.isLoading = true;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I navigate to the first item in the filtered list.
	public handleEnter() : void {

		var project = this.filteredProjects.find(
			( filteredProject: FilteredProject ) : boolean => {

				return( filteredProject.isVisible );

			}
		);

		if ( project ) {

			this.router.navigateByUrl( project.resource );

		}

	}


	public handleFilter() : void {

		// NOTE: When we persist the filter, our subscription to the ActivatedRoute will
		// automatically alert us and we can loop the change back into the filtered list.
		this.persistFilterToRoute();

	}


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

					this.filterText = ( paramMap.get( "filterText" ) || "" );
					this.filterType = ( paramMap.get( "filterType" ) || "all" );
					this.applyFilterToList();

				}
			)
		;

		this.loadData();

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

		this.filteredProjects.forEach(
			( filteredProject: FilteredProject, i: number ) : void => {

				filteredProject.isVisible = false;

				// If the list if being filtered by type (ie, not all), and the given 
				// project doesn't match the given type, skip tag evaluation - we're
				// not going to show this list item.
				if ( 
					( this.filterType !== "all" ) &&
					( this.filterType !== filteredProject.type )
					) {

					return;

				}

				if ( this.containsSubstring( filteredProject.tags, normalizedFilter ) ) {

					filteredProject.column = ( ( visibleIndex++ % 3 ) + 1 );
					filteredProject.isVisible = true;

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


	private loadData() : void {

		this.isLoading = true;
		this.partialService
			.get()
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.filteredProjects = [];

					for ( var board of partial.boards ) {

						this.filteredProjects.push({
							type: "board",
							item: board,
							tags: [ board.name.toLowerCase() ],
							column: 0,
							isVisible: false,
							resource: `/app/boards/${ board.id }`
						});

					}

					for ( var freehand of partial.freehands ) {

						this.filteredProjects.push({
							type: "freehand",
							item: freehand,
							tags: [ freehand.name.toLowerCase() ],
							column: 0,
							isVisible: false,
							resource: `/app/freehands/${ freehand.id }`
						});

					}

					for ( var prototype of partial.prototypes ) {

						this.filteredProjects.push({
							type: "prototype",
							item: prototype,
							tags: [ prototype.name.toLowerCase() ],
							column: 0,
							isVisible: false,
							resource: `/app/prototypes/${ prototype.id }`
						});

					}

					this.filteredProjects.sort(
						( a: FilteredProject, b: FilteredProject ) : number => {

							var aName = a.item.name.toLowerCase();
							var bName = b.item.name.toLowerCase();

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
									modal: "modal/error/could-not-load-projects"
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
		( ! this.filterType || ( this.filterType === "all" ) ) && delete( filterParams.filterType );

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
