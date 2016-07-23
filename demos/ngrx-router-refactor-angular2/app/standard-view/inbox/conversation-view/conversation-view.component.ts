// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { QueryParams } from "@ngrx/router";
import { Subscription } from "rxjs/Subscription";

// Import the application components and services.
import { RouterUtils } from "~/shared/services/index";

@Component({
	moduleId: __moduleName,
	selector: "bn-conversation-view",
	templateUrl: "./conversation-view.component.htm",
	styleUrls: [ "./conversation-view.component.css" ]
})
export class ConversationViewComponent implements OnInit, OnDestroy {
	
	public projectId: number;
	public conversationId: number;

	private queryParams: QueryParams;
	private queryParamsSubscription: Subscription;
	private routerUtils: RouterUtils;


	// I initialize the component.
	constructor( queryParams: QueryParams, routerUtils: RouterUtils ) {

		this.projectId = 0;
		this.conversationId = 0;
		
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

		this.queryParamsSubscription = this.queryParams.subscribe(
			( params: any ) : void => {

				this.projectId = ( +params[ "inboxProjectId" ] || 0 );
				this.conversationId = ( +params[ "inboxConversationId" ] || 0 );

			}
		);

	}

}
