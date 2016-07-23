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
import { Subscription } from "rxjs/Subscription";

// Import the application components and services.
import { IProject } from "~/shared/services/index";
import { ProjectService } from "~/shared/services/index";
import { RouterUtils } from "~/shared/services/index";

@Component({
	moduleId: __moduleName,
	selector: "bn-inboxes-view",
	templateUrl: "./inboxes-view.component.htm",
	styleUrls: [ "./inboxes-view.component.css" ]
})
export class InboxesViewComponent implements OnInit, OnDestroy {
	
	public isLoading: boolean;
	public projectId: number;
	public projects: IProject[];

	private projectService: ProjectService;
	private queryParams: QueryParams;
	private queryParamsSubscription: Subscription;
	private routerUtils: RouterUtils;


	// I initialize the component.
	constructor(
		projectService: ProjectService,
		queryParams: QueryParams,
		routerUtils: RouterUtils 
		) {

		this.isLoading = false;
		this.projectId = 0;
		this.projects = [];
		
		this.projectService = projectService;
		this.queryParams = queryParams;
		this.queryParamsSubscription = null;
		this.routerUtils = routerUtils;
		
	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		( this.queryParamsSubscription ) && this.queryParamsSubscription.unsubscribe();

	}


	// I get called once after the component has been instantiated and the inputs have
	// been bound for the first time.
	public ngOnInit() : void {

		this.isLoading = true;
		this.projectService.getProjects().subscribe(
			( projects: IProject[] ) : void => {

				this.isLoading = false;
				this.projects = projects;

			}
		);

		this.queryParamsSubscription = this.queryParams
			.pluck<string>( "inboxProjectId" )
			.distinctUntilChanged()
			.subscribe(
				( value: string ) : void => {

					this.projectId = +value;

				}
			)
		;

	}


	public viewProject( projectId: number ) : void {

		this.routerUtils.gotoQueryParams({
			inbox: true,
			inboxProjectId: projectId,
			inboxConversationId: null
		});
		
	}

}
