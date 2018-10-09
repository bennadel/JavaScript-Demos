
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

// Import the application components and services.

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "conversation-view",
	styleUrls: [ "./conversation-view.component.less" ],
	templateUrl: "./conversation-view.component.htm"
})
export class ConversationViewComponent implements OnInit, OnDestroy {

	public type: string;

	private activatedRoute: ActivatedRoute;
	private parentParamMapSubscription: Subscription;

	// I initialize the conversation-view component.
	constructor( activatedRoute: ActivatedRoute ) {
		
		this.activatedRoute = activatedRoute;

		this.type = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public ngOnDestroy() : void {

		( this.parentParamMapSubscription ) && this.parentParamMapSubscription.unsubscribe();

	}

	public ngOnInit() : void {

		this.parentParamMapSubscription = this.activatedRoute.parent.paramMap.subscribe(
			( paramMap: ParamMap ) : void => {

				this.type = paramMap.get( "type" );

			}
		);

	}

}
