
// Import the core angular services.
import { Observable } from "rxjs/Observable";

// Execute side-effects for RxJS observable operators.
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/delay";

// Import the application components and services.
import { sampleData } from "./sample-data";

export interface IBoard {
	id: number;
	name: string;
}

export class BoardService {

	private boards: IBoard[];


	// I initialize the service.
	constructor() {
		
		// Pull the board-specific sample-data out and cache it internally.
		this.boards = sampleData.boards.map(
			( board: any ) : IBoard => {

				return({
					id: board.id,
					name: board.name
				});

			}
		);

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I return the given board as an observable stream.
	public getBoardById( id: number ) : Observable<IBoard> {

		var board = this.boards.find(
			( value: IBoard ) : boolean => {

				return( value.id === id );

			}
		);

		if ( board ) {

			return( Observable.of( board ).delay( 750 ) );

		} else {
			
			return( Observable.throw( new Error( "NotFound" ) ) );

		}

	}


	// I return all of the boards as an observable stream.
	public getBoards() : Observable<IBoard[]> {

		return( Observable.of( this.boards ).delay( 750 ) );

	}

}
