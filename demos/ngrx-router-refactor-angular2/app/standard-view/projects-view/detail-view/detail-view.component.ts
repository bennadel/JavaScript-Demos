// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { RouteParams } from "@ngrx/router";
import { Router } from "@ngrx/router";
import { Subscription } from "rxjs/Subscription";

// Execute side-effects for RxJS observable operators.
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/switchMap";

// Import the application components and services.
import { IProject } from "~/shared/services/index";
import { ProjectService } from "~/shared/services/index";

@Component({
	moduleId: __moduleName,
	selector: "bn-detail-view",
	templateUrl: "./detail-view.component.htm",
	styleUrls: [ "./detail-view.component.css" ]
})
export class DetailViewComponent implements OnInit, OnDestroy {
	
	public isLoading: boolean;
	public project: IProject;

	private projectService: ProjectService;
	private routeParams: RouteParams;
	private routeParamsSubscription: Subscription;
	private router: Router;


	// I initialize the component.
	constructor( 
		projectService: ProjectService,
		routeParams: RouteParams,
		router: Router
		) {

		this.isLoading = true;
		this.project = null;

		this.projectService = projectService;
		this.routeParams = routeParams;
		this.routeParamsSubscription = null;
		this.router = router;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I get called once, when the component is being destroyed.
	public ngOnDestroy() : void {
		
		( this.routeParamsSubscription ) && this.routeParamsSubscription.unsubscribe();

	}


	// I get called once when the component has been instantiated, after the inputs have
	// been bound for the first time.
	public ngOnInit() : void {

		this.routeParamsSubscription = this.routeParams
			.pluck<string>( "projectId" )
			.distinctUntilChanged()
			.switchMap(
				( value: string ) : Observable<IProject> => {

					this.isLoading = true;

					return( this.projectService.getProjectById( +value ) );

				}
			)
			.subscribe(
				( project: IProject ) : void => {

					this.isLoading = false;
					this.project = project;

				},
				( error: any ) : void => {

					this.router.go( "/projects", { notFound: true } );

				}
			)
		;

	}

}
