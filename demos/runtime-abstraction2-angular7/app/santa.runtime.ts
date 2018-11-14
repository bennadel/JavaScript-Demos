
// Import the core angular services.
import { combineLatest } from "rxjs";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

// Import the application components and services.
import { AppStorageService } from "./app-storage.service";
import { SimpleStore } from "./simple.store";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface StoreState {
	v: number;
	selectedListType: ListType;
	nicePeople: Person[];
	naughtyPeople: Person[];
}

export interface Person {
	id: number;
	name: string;
}

export type ListType = "nice" | "naughty";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class SantaRuntime {

	private appStorage: AppStorageService;
	private appStorageKey: string;
	private store: SimpleStore<StoreState>;

	// I initialize the Santa runtime.
	constructor( appStorage: AppStorageService ) {

		this.appStorage = appStorage;

		// Setup internal store.

		// NOTE: Because we are using a string-literal as a "type", we have to help
		// TypeScript by using a type annotation on our initial state. Otherwise, it
		// won't be able to infer that our string is compatible with the type.
		var initialStoreState: StoreState = {
			v: 3,
			selectedListType: "nice",
			nicePeople: [],
			naughtyPeople: []
		};

		// NOTE: For the store instance we are NOT USING DEPENDENCY-INJECTION. That's
		// because the store isn't really a "behavior" that we would ever want to swap -
		// it's just a slightly more complex data structure. In reality, it's just a
		// fancy hash/object that can also emit values.
		this.store = new SimpleStore( initialStoreState );

		// Setup app-storage interactions.

		this.appStorageKey = "santa_runtime_storage";
		this.storageLoadData();
		// Because this runtime wants to persist data across page reloads, let's register
		// an unload callback so that we have a chance to save the data as the app is
		// being unloaded.
		this.appStorage.registerUnloadCallback( this.storageSaveData );

	}

	// ---
	// COMMAND METHODS.
	// ---

	// I add the given person to the currently-selected list.
	public async addPerson( name: string ) : Promise<number> {

		var person = {
			id: Date.now(),
			name: name
		};

		var state = this.store.getSnapshot();

		if ( state.selectedListType === "nice" ) {

			this.store.setState({
				nicePeople: state.nicePeople.concat( person )
			});

		} else {

			this.store.setState({
				naughtyPeople: state.naughtyPeople.concat( person )
			});

		}

		return( person.id );

	}


	// I remove the person with given ID from the naughty and nice lists.
	public async removePerson( id: number ) : Promise<void> {

		var state = this.store.getSnapshot();
		var nicePeople = state.nicePeople;
		var naughtyPeople = state.naughtyPeople;

		// Keep the people that don't have a matching ID.
		var filterInWithoutId = ( person: Person ) : boolean => {

			return( person.id !== id );

		};

		this.store.setState({
			nicePeople: nicePeople.filter( filterInWithoutId ),
			naughtyPeople: naughtyPeople.filter( filterInWithoutId )
		});

	}


	// I select the given list.
	public async selectList( listType: ListType ) : Promise<void> {

		this.store.setState({
			selectedListType: listType
		});

	}

	// ---
	// QUERY METHODS.
	// ---

	// I return a stream that contains the number of people on the naughty list.
	public getNaughtyCount() : Observable<number> {

		var stream = this.store.select( "naughtyPeople" );

		var reducedStream = stream.pipe(
			map(
				( naughtyPeople ) => {

					return( naughtyPeople.length );

				}
			)
		);

		return( reducedStream );

	}


	// I return a stream that contains the number of people on the nice list.
	public getNiceCount() : Observable<number> {

		var stream = this.store.select( "nicePeople" );

		var reducedStream = stream.pipe(
			map(
				( nicePeople ) => {

					return( nicePeople.length );

				}
			)
		);

		return( reducedStream );

	}


	// I return a stream that contains the people in the currently-selected list.
	public getPeople() : Observable<Person[]> {

		var stream = combineLatest(
			this.store.select( "selectedListType" ),
			this.store.select( "nicePeople" ),
			this.store.select( "naughtyPeople" )
		);

		var reducedStream = stream.pipe(
			map(
				([ selectedListType, nicePeople, naughtyPeople ]) => {

					if ( selectedListType === "nice" ) {

						return( nicePeople );

					} else {

						return( naughtyPeople );

					}

				}
			)
		);

		return( reducedStream );

	}


	// I return a stream that contains the currently selected list type.
	public getSelectedListType() : Observable<ListType> {

		return( this.store.select( "selectedListType" ) );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I attempt to load the persisted data into the runtime store.
	private storageLoadData() : void {

		var state = this.store.getSnapshot();

		// See if we have any persisted store (returns NULL if not available).
		var savedState = this.appStorage.loadData<StoreState>( this.appStorageKey );

		// If we have saved data AND the data structure is the same VERSION as the one
		// we expect, then return it as the initial state.
		if ( savedState && savedState.v && ( savedState.v === state.v ) ) {

			this.store.setState( savedState );

		}

	}


	// I save the current state to given store object.
	// --
	// CAUTION: Using a fat-arrow function to bind callback to instance.
	private storageSaveData = () : void => {

		this.appStorage.saveData( this.appStorageKey, this.store.getSnapshot() );

	}

}
