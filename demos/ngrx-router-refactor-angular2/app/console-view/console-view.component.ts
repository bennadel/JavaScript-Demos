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
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/switchMap";

// Import the application components and services.
import { IProject } from "~/shared/services/index";
import { IScreen } from "~/shared/services/index";
import { ProjectService } from "~/shared/services/index";
import { ScreenService } from "~/shared/services/index";
import { ScreenBrowserComponent } from "./screen-browser/screen-browser.component";

@Component({
	moduleId: __moduleName,
	selector: "bn-console-view",
	directives: [ ScreenBrowserComponent ],
	templateUrl: "./console-view.component.htm",
	styleUrls: [ "./console-view.component.css" ]
})
export class ConsoleViewComponent implements OnInit, OnDestroy {
	
	public isLoading: boolean;
	public isShowingScreenBrowser: boolean;
	public project: IProject;
	public screen: IScreen;
	public screens: IScreen[];

	private projectId: number;
	private projectService: ProjectService;
	private routeParams: RouteParams;
	private projectSubscription: Subscription;
	private router: Router;
	private screenId: number;
	private screenService: ScreenService;
	private screensSubscription: Subscription;


	// I initialize the component.
	constructor(
		projectService: ProjectService,
		routeParams: RouteParams,
		router: Router,
		screenService: ScreenService
		) {

		this.isLoading = true;
		this.isShowingScreenBrowser = false;
		this.project = null;
		this.screen = null;
		this.screens = [];

		this.projectId = 0;
		this.projectService = projectService;
		this.routeParams = routeParams;
		this.router = router;
		this.projectSubscription = null;
		this.screenId = 0;
		this.screenService = screenService;		
		this.screensSubscription = null;
		
	}


	// ---
	// PUBLIC METHODS.
	// ---


	public cycleScreen( direction: number ) : void {

		var currentIndex = this.screens.indexOf( this.screen );
		var nextIndex = ( currentIndex += direction );

		if ( nextIndex === -1 ) {

			nextIndex = ( this.screens.length - 1 );

		} else if ( nextIndex === this.screens.length ) {

			nextIndex = 0;

		}

		this.gotoScreen( this.screens[ nextIndex ].id );

	}


	public gotoScreen( targetScreenId: number ) : void {

		this.isShowingScreenBrowser = false;

		var currentSection = this.router.path().split( /\//g ).pop();

		this.router.go( `/console/project/${ this.projectId }/screen/${ targetScreenId }/${ currentSection }` );

	}


	// I get called once, when the component is being destroyed.
	public ngOnDestroy() : void {
		
		( this.projectSubscription ) && this.projectSubscription.unsubscribe();
		( this.screensSubscription ) && this.screensSubscription.unsubscribe();

	}


	// I get called once when the component has been instantiated, after the inputs have
	// been bound for the first time.
	public ngOnInit() : void {

		this.projectSubscription = this.routeParams
			.pluck<string>( "projectId" )
			.distinctUntilChanged()
			.switchMap(
				( projectId: string ) : Observable<{}> => {

					this.isLoading = true;
					this.projectId = +projectId;

					return(
						Observable.forkJoin(
							this.projectService.getProjectById( this.projectId ),
							this.screenService.getScreensByProjectId( this.projectId )
						)
					);
					
				}
			)
			.subscribe(
				( results: [ IProject, IScreen[] ] ) : void => {

					this.isLoading = false;
					this.project = results[ 0 ];
					this.screens = results[ 1 ];
					this.selectContextScreen();

				},
				( error: any ) : void => {

					this.router.go( "/" );

				}
			)
		;

		this.screensSubscription = this.routeParams
			.pluck<string>( "screenId" )
			.distinctUntilChanged()
			.subscribe(
				( screenId: string ) : void => {

					this.screenId = +screenId;
					this.selectContextScreen();

				}
			)
		;

	}


	public toggleScreenBrowser() : void {

		this.isShowingScreenBrowser = ! this.isShowingScreenBrowser;

	}


	// ---
	// PRIVATE METHODS.
	// ---


	private selectContextScreen() : void {

		if ( this.isLoading ) {

			return;

		}

		this.screen = this.screens.find(
			( value: IScreen ) : boolean => {

				return( value.id === this.screenId );

			}
		);

	}

}
