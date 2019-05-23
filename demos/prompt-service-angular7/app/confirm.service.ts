
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export type ConfirmResult = boolean;

@Injectable({
	providedIn: "root"
})
export class ConfirmService {

	public message: string;

	private promiseResolve: Function | null;
	private promiseReject: Function | null;

	// I initialize the confirm service.
	constructor() {

		this.message = "";
		this.promiseReject = null;
		this.promiseResolve = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I open the confirm with the given message.
	public confirm( message: string ) : Promise<ConfirmResult> {

		if ( this.isPending() ) {

			throw( new Error( `There is already an active confirmation: ${ this.message }` ) );

		}

		var promise = new Promise<ConfirmResult>(
			( resolve, reject ) => {

				this.message = message;
				this.promiseResolve = resolve;
				this.promiseReject = reject;

			}
		);

		return( promise );

	}


	// I determine if there is a pending confirmation.
	public isPending() : boolean {

		return( !! this.promiseResolve );

	}


	// I resolve the confirm with the given value.
	public resolve( value: ConfirmResult ) : void {

		if ( ! this.isPending() ) {

			throw( new Error( "There is no active confirmation." ) );

		}

		this.promiseResolve( value );

		this.message = "";
		this.promiseResolve = null;
		this.promiseReject = null;

	}


	// I resolve the confirm with a default value. This is for cases in which the confirm
	// has to be resolved without an explicit user-provided value.
	public resolveWithDefault() : void {

		this.resolve( false );

	}

}
