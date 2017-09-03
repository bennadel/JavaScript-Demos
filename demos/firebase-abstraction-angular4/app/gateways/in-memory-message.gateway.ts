
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

export class InMemoryMessageGateway extends MessageGateway {

	private messages: MessageDTO[];
	private subject: BehaviorSubject<Message[]>;
	private uid: number;


	// I initialize the in-memory message gateway implementation.
	constructor() {

		super();

		this.messages = [];
		// In this implementation, we're going to use a BehaviorSubject rather than
		// a normal Subject so that we can replay the last value when the user first
		// subscribes to the observable stream. This way, the subscription itself will
		// act as the first read / load of data.
		this.subject = new BehaviorSubject( [] );
		this.uid = 0;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a new message to the collection. Returns a Promise with the new ID.
	public createMessage( message: Message ) : Promise<string> {

		var dto = {
			id: this.newID(),
			text: message.text,
			createdAt: message.createdAt.getTime()
		};

		this.messages.push( dto );

		this.emitMessages();

		return( Promise.resolve( dto.id ) );

	}


	// I delete the message with the given ID. Returns a Promise.
	public deleteMessage( id: string ) : Promise<void> {

		this.messages = this.messages.filter(
			( message: MessageDTO ) : boolean => {

				return( message.id !== id );

			}
		);

		this.emitMessages();

		return( Promise.resolve() );
		
	}


	// I read the messages collection. Returns a Promise.
	public readMessages() : Promise<Message[]> {

		var messages = this.messages.map(
			( message: MessageDTO ) : Message => {

				return({
					id: message.id,
					text: message.text,
					createdAt: new Date( message.createdAt )
				});

			}
		);

		return( Promise.resolve( messages ) );

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
		);

	}


	// I generate a new ID for a new Message object.
	private newID() : string {

		var id = ++this.uid;

		return( "id-" + id );

	}

}
