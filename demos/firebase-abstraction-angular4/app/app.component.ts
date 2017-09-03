
// Import the core angular services.
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

// Import the application components and services.
import { Message } from "./gateways/message.gateway";
import { MessageGateway } from "./gateways/message.gateway";

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template: 
	`
		<h2>
			You Have {{ messages.length }} Message(s)!
		</h2>

		<ul *ngIf="messages.length">
			<li
				*ngFor="let message of messages"
				title="Created at {{ message.createdAt.toTimeString() }}">

				{{ message.text }} &mdash; 
				<a (click)="deleteMessage( message )">Delete</a>

			</li>
		</ul>

		<form (submit)="addMessage()">
			<input type="text" name="message" [(ngModel)]="form.message" autofocus />
			<input type="submit" value="Add Message" />
		</form>

		<hr />

		<h2>
			Choose A Gateway Implementation
		</h2>

		<ul>
			<li><a href="./index.htm?default">In-Memory Gateway</a></li>
			<li><a href="./index.htm?localstorage">LocalStorage Gateway</a></li>
			<li><a href="./index.htm?firebase">Firebase Gateway</a></li>
		</ul>

		<p>
			Note that all of these implementations provide a "stream" I/O method.
		</p>
	`
})
export class AppComponent implements OnInit {

	public form: {
		message: string;
	};
	public messages: Message[];

	// NOTE: Even though the "type" here is the MessageGateway, the actual implementation
	// may be anything that extends the "MessageGateway" base class. We're simply using 
	// the MessageGateway as the dependency-injection token for our gateway choice.
	private messageGateway: MessageGateway;


	// I initialize the app component.
	constructor( messageGateway: MessageGateway ) {

		this.messageGateway = messageGateway;

		this.form = {
			message: ""
		};
		this.messages = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a new message to the messages collection.
	public addMessage() : void {

		// If no message content has been entered, just ignore request.
		if ( ! this.form.message ) {

			return;

		}

		this.messageGateway.createMessage({
			text: this.form.message,
			createdAt: new Date()
		});
		this.form.message = "";

		// NOTE: We're NOT applying the change OPTIMISTICALLY to the local model because
		// we're reading the messages collection as a STREAM. As such, we should always 
		// get very fast local changes (from the STREAM) that we can apply in a uniform 
		// manor across our CRUD (Create, Read, Update, Delete) operations.

	}


	// I delete the given message from the messages collection.
	public deleteMessage( message: Message ) : void {

		this.messageGateway.deleteMessage( message.id );

		// NOTE: We're NOT applying the change OPTIMISTICALLY to the local model because
		// we're reading the messages collection as a STREAM. As such, we should always 
		// get very fast local changes (from the STREAM) that we can apply in a uniform 
		// manor across our CRUD (Create, Read, Update, Delete) operations.

	}


	// I get called once, right after component initialization.
	public ngOnInit() : void {

		// The message gateway provides stream-based access to the messages collection.
		// This will emit a new messages collection whenever the messages collection 
		// has been altered in any way (initialized, updated, deleted, etc.).
		var subscription = this.messageGateway
			.readMessagesAsStream()
			.subscribe(
				( messages: Message[] ) : void => {

					this.messages = messages;

				},
				( error: any ) : void => {

					console.warn( "Read Message As Stream Error" );
					console.error( error );

				}
			)
		;

	}

}
