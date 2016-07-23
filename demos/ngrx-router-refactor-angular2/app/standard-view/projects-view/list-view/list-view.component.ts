// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { QueryParams } from "@ngrx/router";
import { Router } from "@ngrx/router";
import { Subscription } from "rxjs/Subscription";

// Execute side-effects for RxJS observable operators.
import "rxjs/add/operator/filter";
import "rxjs/add/operator/pluck";

// Import the application components and services.
import { IProject } from "~/shared/services/index";
import { ProjectService } from "~/shared/services/index";
import { RouterUtils } from "~/shared/services/index";

interface IFilteredProject {
	project: IProject;
	tags: string[];
	column: number;
	visible: boolean;
}

@Component({
	moduleId: __moduleName,
	selector: "bn-list-view",
	templateUrl: "./list-view.component.htm",
	styleUrls: [ "./list-view.component.css" ]
})
export class ListViewComponent implements OnInit {

	public filter: string;
	public filteredProjects: IFilteredProject[];
	public filterHasFocus: boolean;
	public isLoading: boolean;

	private projects: IProject[];
	private projectService: ProjectService;
	private projectSubscription: Subscription;
	private queryParams: QueryParams;
	private queryParamSubscription: Subscription;
	private router: Router;
	private routerUtils: RouterUtils;
	

	// I initialize the component.
	constructor( 
		projectService: ProjectService, 
		queryParams: QueryParams,
		router: Router,
		routerUtils: RouterUtils
		) {

		this.filter = "";
		this.filteredProjects = [];
		this.filterHasFocus = false;
		this.isLoading = false;

		this.projects = [];
		this.projectService = projectService;
		this.projectSubscription = null;
		this.queryParams = queryParams;
		this.queryParamSubscription = null;
		this.router = router;
		this.routerUtils = routerUtils;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I handle the enter key on the filter - this will navigate to the first visible
	// project in the list.
	public handleEnter() : void {

		if ( ! this.filter ) {

			return;

		}

		var firstVisible = this.filteredProjects.find(
			( filteredProject: IFilteredProject ) : boolean => {

				return( filteredProject.visible );

			}
		);

		if ( firstVisible ) {

			this.router.go( `/projects/${ firstVisible.project.id }` );

		}

	}


	// I handle updates to the filter input. 
	public handleFilter() : void {

		this.persistFilter();
		this.applyFilter();

	}


	// I get called once when the component is being destroyed.
	public ngOnDestroy() : void {

		this.projectSubscription.unsubscribe();
		this.queryParamSubscription.unsubscribe();

	}


	// I get called once when the component has been instantiated, after the inputs have
	// been bound for the first time.
	public ngOnInit() : void {

		this.queryParamSubscription = this.queryParams.pluck<string>( "filter" )
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


		this.isLoading = true;

		this.projectSubscription = this.projectService
			.getProjects()
			.subscribe(
				( projects: IProject[] ) : void => {

					this.isLoading = false;
					this.projects = projects;
					this.filteredProjects = this.projects.map(
						( project: IProject ) : IFilteredProject => {

							return({
								project: project,
								tags: [ project.name.toLowerCase() ],
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


	// I apply the current filter to the collection of filtered projects.
	private applyFilter() : void {

		var normalizedFilter = this.filter.toLowerCase();
		var visibleIndex = 0;

		this.filteredProjects.forEach(
			( filteredProject: IFilteredProject, i: number ) : void => {

				filteredProject.visible = false;

				if ( this.containsSubstring( filteredProject.tags, normalizedFilter ) ) {

					filteredProject.column = ( ( visibleIndex++ % 3 ) + 1 );
					filteredProject.visible = true;

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

		this.routerUtils.gotoQueryParam( "filter", this.filter );

	}

}
