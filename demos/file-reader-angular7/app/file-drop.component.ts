
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { NgZone } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-file-drop",
	outputs: [ "textDropEvents: textDrop" ],
	host: {
		"[class.active]": "isActive"
	},
	queries: {
		"dragShieldRef": new ViewChild( "dragShieldRef" )
	},
	styleUrls: [ "./file-drop.component.less" ],
	template:
	`
		<div #dragShieldRef class="drag-shield">
			<!--
				Drag-and-Drop events are notoriously hard to work with. So, instead of
				trying to be clever, I'm just going to side-step the whole issue by
				creating a "shield" that sits above (zIndex) the rest of the elements
				and has no children. This way the "leave" event is easy to reason about
				since it doesn't have to deal with bubbling-up events.
			-->
		</div>

		<span class="call-to-action">
			<ng-content></ng-content>
		</span>
	`
})
export class FileDropComponent {

	public isActive: boolean;
	public dragShieldRef: ElementRef;
	public textDropEvents: EventEmitter<string>;

	private zone: NgZone;

	// I initialize the file-drop component.
	constructor(
		dragShieldRef: ElementRef,
		zone: NgZone
		) {

		this.dragShieldRef = dragShieldRef;
		this.zone = zone;

		this.isActive = false;
		this.textDropEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the user dragging away from the drop zone / window.
	public handleShieldDragLeave = ( event: DragEvent ) : void => {

		// When the user leaves the drop zone, it means they have left the WINDOW as
		// well. As such, let's close the drop zone and start listening for initiating
		// drag events on the window again.
		// --
		// NOTE: We are still outside of the Angular Zone.
		this.teardownDragShieldEvents();
		this.setupWindowEvents();

		this.zone.run(
			() => {

				this.isActive = false;

			}
		);

	}


	// I handle the user dragging over the drop zone.
	public handleShieldDragOver = ( event: DragEvent ) : void => {

		// NOTE: This event-handler exists purely to call the .preventDefault() method.
		// Without this call, the browser will attempt to open any file that is dropped
		// on the target.
		event.preventDefault();

	}


	// I handle the user dropping a file on the drop zone.
	public handleShieldDrop = ( event: DragEvent ) : void => {

		// Stop the browser from attempting to open the file.
		event.preventDefault();

		// After the user drops her file, we are going to close the drop zone. As such,
		// we need to start listening for initiating drag events on the window again.
		// --
		// NOTE: We are still outside of the Angular Zone.
		this.teardownDragShieldEvents();
		this.setupWindowEvents();

		this.zone.run(
			() => {

				this.isActive = false;
				this.emitDroppedFileContent( event );

			}
		);

	}


	// I handle the user dragging a file onto the window (ie, the initiating drag event).
	public handleWindowDragOver = ( event: DragEvent ) : void => {

		// If the event doesn't contain text files, then it isn't a drag event that we
		// are concerned with. Ignore it.
		// --
		// CAUTION: I'm only doing this for the sake of the exploration. Since this isn't
		// something that works well in a CROSS BROWSER way (not all drag events have
		// access to the attached files), we should probably just always show the drop
		// zone and then validate them on drop. But, I'm just trying to learn more about
		// how files work. 
		if ( ! this.shouldRespondToDragEvent( event ) ) {

			return;

		}

		// NOTE: We don't need to cancel this default behavior because the WINDOW is not
		// the actual drop target - we will cancel this later on in the drop zone.
		// --
		// event.preventDefault();

		// When the user drags a file over the window, we will activate the drop zone.
		// This means we can stop listening for window events and start listening for
		// drop zone events.
		// --
		// NOTE: We are still outside of the Angular Zone.
		this.teardownWindowEvents();
		this.setupDragShieldEvents();

		this.zone.run(
			() => {

				this.isActive = true;

			}
		);

	}


	// I get called once when the component is being destroyed.
	public ngDestroy() : void {

		this.teardownDragShieldEvents();
		this.teardownWindowEvents();

		// CAUTION: I BELIEVE there is a possibility that a FileReader operation is still
		// running as this component is being destroyed. Handling this is a bit outside
		// the scope of this demo; but, if we stored a reference to the FileReader, we
		// could do something like this:
		// --
		// ( this.fileReader ) && this.fileReader.abort();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.setupWindowEvents();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I attempt to read the file in the given drop event and emit its content.
	private emitDroppedFileContent( event: DragEvent ) : void {

		var file = this.getFileFromDropEvent( event );

		if ( ! file ) {

			return;

		}

		// NOTE: Since Safari and IE can't access the file prior to the DROP event, we
		// have to do one final check of the mime-type before we attempt to read-in the
		// content.
		if ( ! this.isTextMimeType( file.type ) ) {

			return;

		}

		var reader = new FileReader();

		// NOTE: At this point (see "drop" event handler), we are BACK INSIDE the Angular
		// Zone. As such, the following event-handlers will automatically be invokes
		// inside the Angular Zone as well.
		reader.onload = () => {

			this.textDropEvents.emit( reader.result as string );

		};
		reader.onerror = ( error ) => {

			console.warn( "Error reading dropped file:" );
			console.error( error );

		};
		reader.onloadend = () => {

			reader = null;

		};

		reader.readAsText( file );

	}


	// I attempt to get the first File in the given drag event. Returns null if a file
	// cannot be found.
	private getFileFromDropEvent( event: DragEvent ) : File | null {

		// "Items" is the most modern interface spec.
		if ( event.dataTransfer.items && event.dataTransfer.items.length ) {

			for ( var item of Array.from( event.dataTransfer.items ) ) {

				if ( item.kind === "file" ) {

					return( item.getAsFile() );

				}

			}

			// If the "items" interface was defined, we don't want to fall-back to
			// checking the "files" interface. The "files" interface is legacy and
			// should only be consulted if "items" is unavailable.
			return( null );

		}

		// "Files" is an old interface spec.
		if ( event.dataTransfer.files && event.dataTransfer.files.length ) {

			return( event.dataTransfer.files[ 0 ] );

		}

		return( null );

	}


	// I attempt to get the mime-type of the first file in drag event. Returns null if no
	// file types can be identified.
	// --
	// CAUTION: Not all browsers can access file type meta-data during a DRAG event.
	private getFileTypeFromDragEvent( event: DragEvent ) : string | null {

		// "Items" is the most modern interface spec.
		if ( event.dataTransfer.items && event.dataTransfer.items.length ) {

			for ( var item of Array.from( event.dataTransfer.items ) ) {

				if ( item.kind === "file" ) {

					// CAUTION: DataTransferItem.getAsFile() returns "null" if this is a
					// "drag" event. I BELIEVE it only returns the file in the "drop"
					// event. As such, we have to use the "type" on the item itself.
					return( item.type );

				}

			}

			// If the "items" interface was defined, we don't want to fall-back to
			// checking the "files" interface. The "files" interface is legacy and
			// should only be consulted if "items" is unavailable.
			return( null );

		}

		// "Files" is an old interface spec.
		if ( event.dataTransfer.files && event.dataTransfer.files.length ) {

			return( event.dataTransfer.files[ 0 ].type );

		}

		return( null );

	}


	// I determine if the given mime-type represents a file that contains text content
	// that we can [likely] load into the application.
	private isTextMimeType( mimeType: string ) : boolean {

		if ( mimeType.startsWith( "text/" ) ) {

			return( true );

		}

		switch ( mimeType ) {
			case "application/json":
			case "application/x-json":
				return( true );
			break
			default:
				return( false );
			break;
		}

	}


	// I attach the handlers for the drop zone events.
	private setupDragShieldEvents() : void {

		// NOTE: We are still outside of the Angular Zone.
		this.dragShieldRef.nativeElement.addEventListener( "dragover", this.handleShieldDragOver, false );
		this.dragShieldRef.nativeElement.addEventListener( "dragleave", this.handleShieldDragLeave, false );
		this.dragShieldRef.nativeElement.addEventListener( "drop", this.handleShieldDrop, false );

	}


	// I attach the handlers for the initiating drag event on the window.
	private setupWindowEvents() : void {

		// NOTE: Since we are attaching the initiating event-handler OUTSIDE of the
		// Angular Zone, it means that any event-handlers that we bind in response to the
		// following event will ALSO be bound OUTSIDE of the Angular Zone. This is why we
		// only need to use this approach once.
		this.zone.runOutsideAngular(
			() => {

				window.addEventListener( "dragover", this.handleWindowDragOver, false );

			}
		);

	}


	// I determine if the application should respond to the given initiating drag event.
	// --
	// NOTE: In reality, this can't be done effectively in a cross-browser way since not
	// all browsers have access to the File objects, mid-drag. As such, in a real app, I
	// would always response to the drag event and then validate the file on drop.
	private shouldRespondToDragEvent( event: DragEvent ) : boolean {

		var fileType = this.getFileTypeFromDragEvent( event );

		// CAUTION: Since not all browsers (ex, Safari and Internet Explorer) can access
		// the file meta-data during the DRAG operation, we have to assume that if the
		// DRAG event doesn't contain any accessible items or files, it may still have
		// items in the subsequent DROP event.
		if ( ! fileType ) {

			return( true );

		}

		return( this.isTextMimeType( fileType ) );

	}


	// I detach the handlers for the drop zone events.
	private teardownDragShieldEvents() : void {

		this.dragShieldRef.nativeElement.removeEventListener( "dragover", this.handleShieldDragOver, false );
		this.dragShieldRef.nativeElement.removeEventListener( "dragleave", this.handleShieldDragLeave, false );
		this.dragShieldRef.nativeElement.removeEventListener( "drop", this.handleShieldDrop, false );

	}


	// I detach the handlers for the initiating window drag events.
	private teardownWindowEvents() : void {

		window.removeEventListener( "dragover", this.handleWindowDragOver, false );

	}

}
