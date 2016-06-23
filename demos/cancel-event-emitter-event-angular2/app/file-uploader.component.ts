
// Import the core angular services.
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";

// Import the application components and services.
import { FileAddEvent } from "./file-add-event";

@Component({
	selector: "file-uploader",
	outputs: [ "fileAdd" ],
	host: {
		"(dragover)": "handleDragover( $event )",
		"(dragleave)": "handleDragleave( $event )",
		"(drop)": "handleDrop( $event )",
		"[class.for-hover]": "isActivated"
	},
	template:
	`
		<div class="instructions">
			Drop Files
		</div>
	`
})
export class FileUploaderComponent {

	// I am the output event stream for fileAdd events.
	public fileAdd: EventEmitter<FileAddEvent>;

	// I determine if the dropzone is visibly activated.
	public isActivated: boolean;


	// I hold the timer that helps normalize the drag leave and over events. 
	private dragleaveTimer: number;


	// I initialize the component.
	constructor() {

		// When setting up the fileAdd output event, we are setting this to be a 
		// SYNCHRONOUS EventEmitter. We have to do this because the event object that
		// we're emitting can be mutated by the calling context (ie, default behavior 
		// canceled) and our internal event mechanism needs to be able to synchronously
		// check for those mutations.
		// --
		// NOTE: Async used to be the default; in Angular 2 RC 3, however, the default
		// is to be synchronous. That said, I'm leaving this in here to drive home the
		// point that it is a critical aspect of this interaction.
		this.fileAdd = new EventEmitter( /* isAsync = */ false );

		this.isActivated = false;
		this.dragleaveTimer = 0;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I handle the dragleave event on the host.
	public handleDragleave( event: DragEvent ) : void {

		console.debug( "dragleave" );

		// Since the drag events in the browser are a special kind of nightmare, the 
		// dragleave event fires in places where we would not expect it to. As such,
		// we need to use a timer to see if the dragover event will fire shortly after
		// this event has fired.
		this.dragleaveTimer = setTimeout(
			() => {
				
				this.isActivated = false;

			},
			50
		);

	}


	// I handle the dragover event on the host.
	public handleDragover( event: DragEvent ) : void {

		console.debug( "dragover" );

		// We need to prevent the default behavior so that the drop event doesn't 
		// break the page.
		event.preventDefault();

		clearTimeout( this.dragleaveTimer );
		this.isActivated = true;

	}


	// I handle the drop event on the host. Each file contained in the drop event will
	// be emitted to the calling context as a FileAddEvent where the calling context 
	// has an opportunity to cancel the file operation.
	public handleDrop( event: DragEvent ) : void {

		console.debug( "drop" );

		// We need to prevent the default behavior so that the drop event doesn't 
		// break the page.
		event.preventDefault();

		// Each of the dropped files can be added to the upload queue; however, we want
		// to give the calling context an opportunity to prevent that from happening. As
		// such, we're going to emit an output event for each file and given the calling
		// context an opportunity to cancel the file operation.
		for ( var file of event.dataTransfer.files ) {

			var fileAddEvent = new FileAddEvent( file );

			// Emit the output event. Since this EventEmitter is SYNCHRONOUS, we will be
			// able to check the event state to see if it was changed by the event 
			// handler in the calling context.
			this.fileAdd.emit( fileAddEvent );

			// If the calling context has prevent the file operation, don't add it to the
			// internal queue (not part of the demo, obviously).
			if ( fileAddEvent.isDefaultPrevented() ) {

				console.warn( "FileAdd [", file.name, "] being prevented." );

			} else {

				console.info( "FileAdd [", file.name, "] being permitted to continue." );

				// NOTE: Obviously, the upload queue is not part of the demo ....

			}

		}

		this.isActivated = false;

	}

}
