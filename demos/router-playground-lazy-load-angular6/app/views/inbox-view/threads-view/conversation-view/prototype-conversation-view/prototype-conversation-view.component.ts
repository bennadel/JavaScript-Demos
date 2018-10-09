
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { delay } from "rxjs/operators";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

// Import the application components and services.
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { PartialService } from "./services/partial.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Prototype {
	id: number;
	name: string;
}

interface Screen {
	id: number;
	name: string;
	filename: string;
}

interface Conversation {
	id: number;
	label: string;
}

interface Comment {
	id: number;
	content: string;
	user: {
		id: number;
		name: string;
		initials: string;
		avatarUrl: string;
	};	
}

@Component({
	selector: "prototype-conversation-view",
	styleUrls: [ "./prototype-conversation-view.component.less" ],
	templateUrl: "./prototype-conversation-view.component.htm"
})
export class PrototypeConversationViewComponent {

	public comments: Comment[];
	public conversation: Conversation;
	public isLoading: boolean;
	public prototype: Prototype;
	public screen: Screen;

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private paramMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;

	// I initialize the prototype-conversation-view component.
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

		this.comments = null;
		this.conversation = null;
		this.isLoading = true;
		this.prototype = null;
		this.screen = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public ngOnDestroy() : void {

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();

	}


	public ngOnInit() : void {

		this.paramMapSubscription = this.activatedRoute.paramMap
			// TIMING HACK: We need to add a tick-delay between the root ParamMap emit
			// and the callback in order to fix several Angular bugs.
			.pipe( delay( 10 ) )
			.subscribe(
				( paramMap: ParamMap ) : void => {

					this.loadData( +paramMap.get( "id" ) );

				}
			)
		;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private loadData( id: number ) : void {

		this.isLoading = true;
		this.partialService
			.get( id )
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.prototype = partial.prototype;
					this.screen = partial.screen;
					this.conversation = partial.conversation;
					this.comments = partial.comments;

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
									modal: "modal/error/could-not-load-inbox-conversation",
									inbox: "inbox"
								}
							}
						]
					);

				}
			)
		;

	}

}
