
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

interface Board {
	id: number;
	name: string;
}

interface BoardItem {
	id: number;
	type: string;
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
	selector: "board-conversation-view",
	styleUrls: [ "./board-conversation-view.component.less" ],
	templateUrl: "./board-conversation-view.component.htm"
})
export class BoardConversationViewComponent {

	public board: Board;
	public boardItem: BoardItem;
	public comments: Comment[];
	public isLoading: boolean;

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private paramMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;

	// I initialize the board-conversation-view component.
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

		this.isLoading = true;
		this.board = null;
		this.boardItem = null;
		this.comments = null;

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
					this.board = partial.board;
					this.boardItem = partial.boardItem;
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
