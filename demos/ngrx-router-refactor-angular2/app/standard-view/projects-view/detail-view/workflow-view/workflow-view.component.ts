// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { RouteParams } from "@ngrx/router";
import { Subscription } from "rxjs/Subscription";

@Component({
	moduleId: __moduleName,
	selector: "bn-workflow-view",
	templateUrl: "./workflow-view.component.htm"
})
export class WorkflowViewComponent implements OnInit, OnDestroy {

	public projectId: number;

	private routeParams: RouteParams;
	private routeParamsSubscription: Subscription;


	// I initialize the component.
	constructor( routeParams: RouteParams ) {
		
		this.projectId = 0;

		this.routeParams = routeParams;
		this.routeParamsSubscription = null;

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
			.subscribe(
				( value: string ) : void => {

					this.projectId = +value;

				}
			)
		;

	}

}
