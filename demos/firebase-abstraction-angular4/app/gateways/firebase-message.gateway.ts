
// Import the core angular services.
import firebase = require( "firebase/app" );
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

// Import these libraries for their side-effects.
import "firebase/database";

// Import the application components and services.
import { Message } from "./message.gateway";
import { MessageGateway } from "./message.gateway";

interface MessageDTO {
	id: string;
	text: string;
	createdAt: number;
}

export class FirebaseMessageGateway extends MessageGateway {

	private firebaseApp: firebase.app.App;
	private firebaseDB: firebase.database.Database;


	// I initialize the firebase message gateway implementation.
	constructor() {

		super();

		this.firebaseApp = firebase.initializeApp({
			apiKey: "AIzaSyBL208rmWno59jE2k5xSFkRH7D3NIDH6C0",
			authDomain: "popping-torch-33.firebaseapp.com",
			databaseURL: "https://popping-torch-33.firebaseio.com",
			projectId: "popping-torch-33",
			storageBucket: "popping-torch-33.appspot.com",
			messagingSenderId: "254167194432"
		});
		this.firebaseDB = this.firebaseApp.database();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a new message to the collection. Returns a Promise with the new ID.
	public createMessage( message: Message ) : Promise<string> {

		var ref = this.firebaseDB.ref( "/2017-09-03/" ).push();

		var data = {
			id: ref.key,
			text: message.text,
			createdAt: message.createdAt.getTime()
		};

		// NOTE: This will write locally and attempt to save the data to the remote 
		// Firebase server. It returns a Promise that will resolve when the data is 
		// persisted remotely. For now, we're only going to care about the local 
		// operation (hence returning a promise with the key).
		ref
			.set( data )
			.catch(
				( error: any ) : void => {

					console.log( "Create Message Failed" );
					console.error( error );
					console.log( "Transfer Object:" );
					console.dir( data );

				}
			)
		;

		// NOTE: We don't have to "emit" any event. Firebase ref nodes will already
		// emit data as the underlying data is mutated.

		return( Promise.resolve( ref.key ) );

	}


	// I delete the message with the given ID. Returns a Promise.
	public deleteMessage( id: string ) : Promise<void> {

		// NOTE: This will delete locally and attempt to remove the data to the remote
		// Firebase server. It returns a Promise that will resolve when the data is 
		// deleted remotely. For now, we're only going to care about the local operation.
		this.firebaseDB.ref( "/2017-09-03/" + id )
			.remove()
			.catch(
				( error: any ) : void => {

					console.log( "Delete Message Failed" );
					console.error( error );
					console.log( "ID:", id );

				}
			)
		;

		// NOTE: We don't have to "emit" any event. Firebase ref nodes will already
		// emit data as the underlying data is mutated.

		return( Promise.resolve() );
		
	}


	// I read the messages collection. Returns a Promise.
	public readMessages() : Promise<Message[]> {

		var promise = this.firebaseDB
			.ref( "/2017-09-03/" )
			.once( "value" )
			.then(
				( snapshot: firebase.database.DataSnapshot ) : Message[] => {

					var messages: Message[] = [];

					// If there are no messages, just return an empty collection.
					if ( ! snapshot.exists() ) {

						return( messages );

					}

					// Convert the data transfer objects into actual Messages.
					snapshot.forEach(
						( messageSnapshot: firebase.database.DataSnapshot ) : boolean => {

							var message = messageSnapshot.val();
							messages.push({
								id: message.id,
								text: message.text,
								createdAt: new Date( message.createdAt )
							});

							// CAUTION: This boolean is here to tell Firebase to keep 
							// iterating over the collection (true cancels iteration). It
							// should be omitted, but TypeScript will complain if it's 
							// not here.
							return( false );

						}
					);

					return( messages );

				}
			)
		;

		// NOTE: We have to cast to the correct type of Promise otherwise we get a 
		// mismatch due to the use of Promise<any> in the Firebase type definitions.
		return( <Promise<Message[]>>promise );

	}


	// I read the messages collection as a stream. Returns an Observable stream.
	public readMessagesAsStream() : Observable<Message[]> {

		// NOTE: In other implementations of this Gateway, we used a BehaviorSubject.
		// In this version, we don't have to do that because we are creating on-demand
		// subscriptions to Firebase references that, by default, state emitting data
		// when you bind to them. As such, when the calling context goes to subscribe to
		// this stream, we'll immediately emit the current state of the database as the
		// first stream event.
		var stream = new Observable<Message[]>(
			( observer: Observer<Message[]> ) : Function => {
				
				var ref = this.firebaseDB.ref( "/2017-09-03/" );

				// Bind to the value events on the messages collection. This will fire
				// every time anything in the given ref tree is changed (ie, a message
				// is added or removed).
				var eventHandler = ref.on(
					"value",
					( snapshot: firebase.database.DataSnapshot ) : void => {

						var messages: Message[] = [];

						// If there are no messages, just emit an empty collection.
						if ( ! snapshot.exists() ) {

							observer.next( messages );
							return;

						}

						// Convert the data transfer objects into actual Messages.
						// --
						// The .forEach() method will iterate over the child nodes in the
						// correct createdAt order (based on the structure of the keys).
						snapshot.forEach(
							( messageSnapshot: firebase.database.DataSnapshot ) : boolean => {

								var message = messageSnapshot.val();
								messages.push({
									id: message.id,
									text: message.text,
									createdAt: new Date( message.createdAt )
								});

								// CAUTION: This boolean is here to tell Firebase to 
								// keep iterating over the collection (true cancels 
								// iteration). It should be omitted, but TypeScript will
								// complain if it's not here.
								return( false );

							}
						);

						observer.next( messages );

					}
				);

				// Provide tear down logic so we can stop listening to the ref when the
				// calling context unsubscribes from the returned stream.
				function teardown() : void {

					ref.off( "value", eventHandler );
					ref = eventHandler = null;

				}

				return( teardown );

			}
		);

		return( stream );

	}

}
