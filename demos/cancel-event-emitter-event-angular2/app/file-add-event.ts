
export class FileAddEvent {

	// I hold the file that was added to the uploader.
	public file: File;

	// I determine if the default behavior has been prevented.
	private _isDefaultPrevented: boolean;


	// I initialize the event object.
	constructor( file: File ) {

		this.file = file;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I determine if the default behavior has been prevented.
	public isDefaultPrevented() : boolean {

		return( this._isDefaultPrevented );

	}


	// I prevent the default behavior for this event.
	public preventDefault() : void {

		this._isDefaultPrevented = true;

	}

}
