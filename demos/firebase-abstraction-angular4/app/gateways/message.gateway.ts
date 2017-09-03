
// Import the core angular services.
import { Observable } from "rxjs/Observable";

export interface Message {
	id?: string;
	text: string;
	createdAt: Date;
}

// All implementations of the MessageGateway must extend this class.
// --
// NOTE: By making this a Class instead of an Interface, we can also use it as the 
// dependency-injection token since it represents a "Type".
export abstract class MessageGateway {
	abstract createMessage( message: Message ) : Promise<string>;
	abstract deleteMessage( id: string ) : Promise<void>;
	abstract readMessages() : Promise<Message[]>;
	abstract readMessagesAsStream() : Observable<Message[]>;
}
