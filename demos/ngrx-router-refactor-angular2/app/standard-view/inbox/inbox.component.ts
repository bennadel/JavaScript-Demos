// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { QueryParams } from "@ngrx/router";

// Execute side-effects for RxJS observable operators.
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/pluck";
// import "rxjs/add/operator/pluck";

// Import the application components and services.
import { ConversationViewComponent } from "./conversation-view/conversation-view.component";
import { InboxesViewComponent } from "./inboxes-view/inboxes-view.component";
import { NotificationsViewComponent } from "./notifications-view/notifications-view.component";
import { RouterUtils } from "~/shared/services/index";

@Component({
	moduleId: __moduleName,
	selector: "bn-inbox",
	directives: [
		ConversationViewComponent,
		InboxesViewComponent,
		NotificationsViewComponent
	],
	templateUrl: "./inbox.component.htm",
	styleUrls: [ "./inbox.component.css" ]
})
export class InboxComponent implements OnInit {

	public conversationId: number;
	public projectId: number;
	public isShowingInbox: boolean;

	private queryParams: QueryParams;
	private routerUtils: RouterUtils;

	
	// I initialize the component.
	constructor( queryParams: QueryParams, routerUtils: RouterUtils ) {
		
		this.conversationId = 0;
		this.projectId = 0;
		this.isShowingInbox = false;

		this.queryParams = queryParams;
		this.routerUtils = routerUtils;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I close the inbox using query-param navigation.
	public closeInbox() : void {

		this.routerUtils.gotoQueryParams({
			inbox: null,
			inboxProjectId: null,
			inboxConversationId: null
		});

	}


	// I get called once after the component has been instantiated and the inputs have
	// been bound for the first time.
	public ngOnInit() : void {

		this.queryParams.subscribe(
			( params ) : void => {

				this.isShowingInbox = ( params[ "inbox" ] === "true" );
				this.projectId = ( +params[ "inboxProjectId" ] || 0 );
				this.conversationId = ( +params[ "inboxConversationId" ] || 0 );

			}
		);

	}

}
