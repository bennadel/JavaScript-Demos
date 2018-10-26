
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

export interface SantaState {
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
	private store: SimpleStore<SantaState>;

	// I initialize the Santa runtime.
	constructor( appStorage: AppStorageService ) {

		this.appStorage = appStorage;
		this.appStorageKey = "santa_runtime_storage";

		// NOTE: For the store instance we are NOT USING DEPENDENCY-INJECTION. That's
		// because the store isn't really a "behavior" that we would ever want to swap -
		// it's just a slightly more complex data structure. In reality, it's just a
		// fancy hash/object that can also emit values.
		this.store = new SimpleStore( this.getInitialState() );

		// Because this runtime wants to persist data across page reloads, let's register
		// an unload callback so that we have a chance to save the data as the app is
		// being unloaded.
		this.appStorage.registerUnloadCallback( this.saveToStorage );

	}

	// ---
	// PUBLIC METHODS.
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


	// I return a stream that contains the number of people on the naughty list.
	public getNaughtyCount() : Observable<number> {

		return( this.getListCount( "naughtyPeople" ) );

	}


	// I return a stream that contains the number of people on the nice list.
	public getNiceCount() : Observable<number> {

		return( this.getListCount( "nicePeople" ) );

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
	// PRIVATE METHODS.
	// ---

	// I return the initial state for the underlying store.
	private getInitialState() : SantaState {

		// NOTE: Because we are using a string-literal as a "type", we have to help
		// TypeScript by using a type annotation on our initial state. Otherwise, it
		// won't be able to infer that our string is compatible with the type.
		var initialState: SantaState = {
			v: 3,
			selectedListType: "nice",
			nicePeople: [
				{
					id: 1,
					name: "Jon"
				}
			],
			naughtyPeople: [
				{
					id: 2,
					name: "Seema"
				}
			]
		};

		// See if we have any persisted store (returns NULL if not available).
		// --
		// CAUTION: The parent function is being called in a way that is expecting the 
		// execution to by SYNCHRONOUS, which localStorage is. If the AppStorageService
		// were to return a Promise<data>, it would be less "blocking"; but, it would
		// also require us to rework the way we are initialing the store.
		var savedState = this.appStorage.loadData<SantaState>( this.appStorageKey );

		// If we have saved data AND the data structure is the same VERSION as the one
		// we expect, then return it as the initial state.
		if ( savedState && ( savedState.v === initialState.v ) ) {

			return( savedState );

		} else {

			return( initialState );

		}

	}


	// I return a stream that contains the count for the given Person collection.
	private getListCount( list: "nicePeople" | "naughtyPeople" ) : Observable<number> {

		var stream = this.store.select( list );

		var reducedStream = stream.pipe(
			map(
				( people ) => {

					return( people.length );

				}
			)
		);

		return( reducedStream );

	}


	// I save the current state to given store object.
	// --
	// CAUTION: Using a fat-arrow function to bind callback to instance.
	private saveToStorage = () : void => {

		this.appStorage.saveData( this.appStorageKey, this.store.getSnapshot() );

	}

}
