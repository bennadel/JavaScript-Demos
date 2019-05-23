
// Import the core angular services.
import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export class SimpleStore<StateType = any> {

	private stateSubject: BehaviorSubject<StateType>;

	// I initialize the simple store with the given initial state value.
	constructor( initialState: StateType ) {

		this.stateSubject = new BehaviorSubject( initialState );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get the current state snapshot.
	public getSnapshot() : StateType {

		return( this.stateSubject.getValue() );

	}


	// I get the current state as a stream (will always emit the current state value as
	// the first item in the stream).
	public getState(): Observable<StateType> {

		return( this.stateSubject.asObservable() );

	}


	// I return the given top-level state key as a stream (will always emit the current
	// key value as the first item in the stream).
	public select<K extends keyof StateType>( key: K ) : Observable<StateType[K]> {

		var selectStream = this.stateSubject.pipe(
			map(
				( state: StateType ) => {

					return( state[ key ] );

				}
			),
			distinctUntilChanged()
		);

		return( selectStream );

	}


	// I move the store to a new state by merging the given partial state into the
	// existing state (creating a new state object).
	// --
	// CAUTION: Partial<T> does not currently project against "undefined" values. This is
	// a known type safety issue in TypeScript.
	public setState( partialState: Partial<StateType> ) : void {

		var currentState = this.getSnapshot();
		var nextState = Object.assign( {}, currentState, partialState );

		this.stateSubject.next( nextState );

	}

}
