
// Import the core angular services.
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

// Import the application components and services.
import { Message } from "./message.gateway";
import { MessageGateway } from "./message.gateway";

interface MessageDTO {
	id: string;
	text: string;
	createdAt: number;
}

export class LocalStorageMessageGateway extends MessageGateway {

	private storageKey: string;
	private subject: BehaviorSubject<Message[]>;


	// I initialize the localStorage message gateway implementation.
	constructor() {

		super();

		this.storageKey = "ng4-demo-firebase-encapsulation";
		// In this implementation, we're going to use a BehaviorSubject rather than
		// a normal Subject so that we can replay the last value when the user first
		// subscribes to the observable stream. This way, the subscription itself will
		// act as the first read / load of data.
		this.subject = new BehaviorSubject( [] );

		// When the localStorage object is updated from ANOTHER WINDOW, pertaining to
        // this origin, a "storage" event is triggered. This event, however, is NOT
        // TRIGGERED if the current window updates the localStorage object. As such,
        // we can use this event to update our in-memory cache of the localStorage
        // messages content.
		window.addEventListener(
			"storage",
			( event: StorageEvent ) : void => {

				// Since this event fires for all localStorage events, we want to ignore
				// any event that may be triggered by a different application. Make sure
				// it pertains to our localStorage key.
				if ( event.key === this.storageKey ) {

					this.emitMessages();
					
				}

			}
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a new message to the collection. Returns a Promise with the new ID.
	public createMessage( message: Message ) : Promise<string> {

		var promise = new Promise<string>(
			( resolve, reject ) : void => {

				var dto = {
					id: this.newID(),
					text: message.text,
					createdAt: message.createdAt.getTime()
				};

				var messages = this.getMessagesFromLocalStorage();
				messages.push( dto );
				this.setMessagesToLocalStorage( messages );

				this.emitMessages();

				resolve( dto.id );

			}
		);

		return( promise );

	}


	// I delete the message with the given ID. Returns a Promise.
	public deleteMessage( id: string ) : Promise<void> {

		var promise = new Promise<void>(
			( resolve, reject ) : void => {

				var messages = this.getMessagesFromLocalStorage().filter(
					( message: MessageDTO ) : boolean => {

						return( message.id !== id );

					}
				);
				this.setMessagesToLocalStorage( messages );

				this.emitMessages();

				resolve();

			}
		);

		return( promise );
		
	}


	// I read the messages collection. Returns a Promise.
	public readMessages() : Promise<Message[]> {

		var promise = new Promise<Message[]>(
			( resolve, reject ) : void => {

				var messages = this.getMessagesFromLocalStorage().map(
					( message: MessageDTO ) : Message => {

						return({
							id: message.id,
							text: message.text,
							createdAt: new Date( message.createdAt )
						});

					}
				);

				resolve( messages );

			}
		);

		return( promise );

	}


	// I read the messages collection as a stream. Returns an Observable stream.
	public readMessagesAsStream() : Observable<Message[]> {

		// Push messages into the BehaviorSubject. This will ensure that the Subject has
		// been primed with data by the time the calling context goes to subscribe to the
		// stream. Which will, in turn, ensure that the messages collection is pushed to
		// the observer upon subscription.
		this.emitMessages();

		return( this.subject.asObservable() );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I read and emit the latest messages collection on the read-stream.
	private emitMessages() : void {

		this.readMessages().then(
			( messages: Message[] ) : void => {

				this.subject.next( messages );

			}
			// CAUTION: To keep this demo simply, I'm not caring about any errors that
			// could be thrown from this Promise.
		);

	}


	// I read the messages out of localStorage.
	private getMessagesFromLocalStorage() : MessageDTO[] {

		var data = localStorage.getItem( this.storageKey );

		if ( ! data ) {

			return( [] );

		}

		return( JSON.parse( data ) );

	}


	// I generate a new ID for a new Message object.
	private newID() : string {

		// Since the localStorage is shared by all tabs on the same domain, we have to 
		// be more careful about how we generate the ID. Let's use a bunch of random
		// character to help prevent conflicts.
		var validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var chars = [];

		for ( var i = 0 ; i < 30 ; i++ ) {

			chars.push(
				validChars.charAt(
					( Math.floor( Math.random() * Date.now() ) % validChars.length )
				)
			);

		}

		return( "m" + chars.join( "" ) );

	}


	// I store the given messages in localStorage.
	private setMessagesToLocalStorage( messages: MessageDTO[] ) : void {

		localStorage.setItem( this.storageKey, JSON.stringify( messages ) );

	}

}
