
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Message } from "./message.service";
import { MessageService } from "./message.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Since all of the AJAX fetching is asynchronous and parallel and beholden to random
// latency issues, there's a good chance that AJAX responses will return in an
// unpredictable order. To simplify the data handling, I'm tracking the index of the
// outbound request and then ignoring ones that show up out-of-order.
// --
// NOTE: There's probably some clever RxJS way to "switch map" this. But, I am not smart
// when it comes to reactive programming.
var remoteDateLoadID = 0;

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public form: {
		isProcessing: boolean;
		newMessage: string;
	};
	public isLoading: boolean;
	public messages: Message[];

	private messageService: MessageService;

	// I initialize the app component.
	constructor( messageService: MessageService ) {

		this.messageService = messageService;

		this.isLoading = true;
		this.messages = [];
		this.form = {
			isProcessing: false,
			newMessage: ""
		};

		this.init();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I process the new message form.
	public async addNewMessage() : Promise<void> {

		if ( ! this.form.newMessage || this.form.isProcessing ) {

			return;

		}

		this.form.isProcessing = true;

		try {

			await this.messageService.addMessage( this.form.newMessage );
			this.form.newMessage = "";
			this.form.isProcessing = false;

		} catch ( error ) {

			console.warn( "Could not add new message." );
			console.error( error );

			this.form.isProcessing = false;
			return;

		}

		// Once the message has been persisted to the server, let's reload the list of
		// messages in the background. This way, we don't have to show the "loading"
		// state AND we don't have to optimistically render the new message into the
		// current view. This makes the UI _slightly less_ responsive; but, keeps the
		// code relatively simple.
		this.loadRemoteDataInBackground();

	}


	// I delete the given message.
	public async deleteMessage( message: Message ) : Promise<void> {

		// Optimistically remove the message from the local view-model.
		// --
		// NOTE: While I am not doing anything optimistic with the "adding" of new
		// messages, removing a message is relatively easy to do, so why not.
		this.messages = this.messages.filter(
			( activeMessage ) => {

				return( activeMessage !== message );

			}
		);

		try {

			// CAUTION: Since we are AWAITING the delete before triggering the background
			// data fetch (below), there's a chance that a parallel background refresh
			// pull may "flash" the data that we optimistically removed above. I don't
			// believe there is any way around this (at least not easily).
			await this.messageService.deleteMessage( message.id );

		} catch ( error ) {

			console.warn( "Could not delete message." );
			console.error( error );
			return;

		}

		// In this demo, we don't have any additional data that may have changed due to
		// the removal of the message (such as aggregates); but, to showcase the concept,
		// we MIGHT WANT to reload the data after the delete in order to get a more true
		// view-model. This would, of course, depend on your situation.
		this.loadRemoteDataInBackground();

	}


	// I am used by the ngForOf directive to track the given object identity by the "id"
	// property so that the DOM nodes are kept in-tact during data fetching.
	public trackByID( value: any ) : any {

		return( value.id );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I get called once to initialize the component state.
	private init() : void {

		this.loadRemoteData();

		// When we detect that the underlying messages store has changed, we want to
		// re-fetch the data in the background in order to synchronous across tabs.
		this.messageService.subscribe(
			() => {

				this.loadRemoteDataInBackground();

			}
		);

	}


	// I put the view-model into a non-ready state and load the remote data.
	private async loadRemoteData() : Promise<void> {

		// Because of network latency, requests may return out-of-order. To protect our
		// view-model, we're going to track the index of this request and then ignore any
		// response that returns in an unexpected order.
		var dataLoadID = ++remoteDateLoadID;

		this.isLoading = true;
		this.messages = [];

		try {

			console.log( "Fetching data in foreground.", dataLoadID );
			var response = await this.messageService.getMessages();

			// If this request has returned out-of-order, ignore it - defer to the newer
			// request to update the view-model. This way, we don't get "flashes" of
			// incorrect data in the UI as the AJAX responses are processed.
			if ( dataLoadID !== remoteDateLoadID ) {

				console.warn( "Ignoring request that returned out of order.", dataLoadID, "vs", remoteDateLoadID );
				return;

			}

			this.messages = response;
			this.isLoading = false;

		} catch ( error ) {

			console.warn( "Could load load message" );
			console.error( error );

		}

	}


	// I load the remote data quietly in the background without changing the ready-state.
	private async loadRemoteDataInBackground() : Promise<void> {

		// Because of network latency, requests may return out-of-order. To protect our
		// view-model, we're going to track the index of this request and then ignore any
		// response that returns in an unexpected order. Since the two "load methods" are
		// loading and populating the same view-model, we're going to track them using
		// the same incrementing ID.
		var dataLoadID = ++remoteDateLoadID;

		try {

			console.log( "Fetching data in background.", dataLoadID );
			var response = await this.messageService.getMessages();

			// If this request has returned out-of-order, ignore it - defer to the newer
			// request to update the view-model.
			if ( dataLoadID !== remoteDateLoadID ) {

				console.warn( "Ignoring request that returned out of order.", dataLoadID, "vs", remoteDateLoadID );
				return;

			}

			this.messages = response;

		} catch ( error ) {

			console.warn( "Error loading data in the background." );
			console.error( error );

		}

	}

}
