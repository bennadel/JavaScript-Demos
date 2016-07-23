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
import { IBoard } from "~/shared/services/index";
import { BoardService } from "~/shared/services/index";
import { RouterUtils } from "~/shared/services/index";

interface IFilteredBoard {
	board: IBoard;
	tags: string[];
	column: number;
	visible: boolean;
}

@Component({
	moduleId: __moduleName,
	selector: "bn-boards-view",
	templateUrl: "./boards-view.component.htm",
	styleUrls: [ "./boards-view.component.css" ]
})
export class BoardsViewComponent implements OnInit {

	public filter: string;
	public filteredBoards: IFilteredBoard[];
	public filterHasFocus: boolean;
	public isLoading: boolean;

	private boards: IBoard[];
	private boardService: BoardService;
	private boardSubscription: Subscription;
	private queryParams: QueryParams;
	private queryParamSubscription: Subscription;
	private router: Router;
	private routerUtils: RouterUtils;
	

	// I initialize the component.
	constructor( 
		boardService: BoardService, 
		queryParams: QueryParams,
		router: Router,
		routerUtils: RouterUtils
		) {

		this.filter = "";
		this.filteredBoards = [];
		this.filterHasFocus = false;
		this.isLoading = false;

		this.boards = [];
		this.boardService = boardService;
		this.boardSubscription = null;
		this.queryParams = queryParams;
		this.queryParamSubscription = null;
		this.router = router;
		this.routerUtils = routerUtils;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I handle the enter key on the filter - this will navigate to the first visible
	// board in the list.
	public handleEnter() : void {

		if ( ! this.filter ) {

			return;

		}

		var firstVisible = this.filteredBoards.find(
			( filteredBoard: IFilteredBoard ) : boolean => {

				return( filteredBoard.visible );

			}
		);

		if ( firstVisible ) {

			this.router.go( `/boards/${ firstVisible.board.id }` );

		}

	}


	// I handle updates to the filter input. 
	public handleFilter() : void {

		this.persistFilter();
		this.applyFilter();

	}


	// I get called once when the component is being destroyed.
	public ngOnDestroy() : void {

		this.boardSubscription.unsubscribe();
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

		this.boardSubscription = this.boardService
			.getBoards()
			.subscribe(
				( boards: IBoard[] ) : void => {

					this.isLoading = false;
					this.boards = boards;
					this.filteredBoards = this.boards.map(
						( board: IBoard ) : IFilteredBoard => {

							return({
								board: board,
								tags: [ board.name.toLowerCase() ],
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


	// I apply the current filter to the collection of filtered boards.
	private applyFilter() : void {

		var normalizedFilter = this.filter.toLowerCase();
		var visibleIndex = 0;

		this.filteredBoards.forEach(
			( filteredBoard: IFilteredBoard, i: number ) : void => {

				filteredBoard.visible = false;

				if ( this.containsSubstring( filteredBoard.tags, normalizedFilter ) ) {

					filteredBoard.column = ( ( visibleIndex++ % 3 ) + 1 );
					filteredBoard.visible = true;

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
