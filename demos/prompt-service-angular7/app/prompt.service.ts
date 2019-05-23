
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export type PromptResult = string | null;

@Injectable({
	providedIn: "root"
})
export class PromptService {

	public message: string;
	public defaultValue: string;

	private promiseResolve: Function | null;
	private promiseReject: Function | null;

	// I initialize the prompt service.
	constructor() {

		this.message = "";
		this.defaultValue = "";
		this.promiseReject = null;
		this.promiseResolve = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I open the prompt with the given message.
	public prompt(
		message: string,
		defaultValue: string = ""
		) : Promise<PromptResult> {

		if ( this.isPending() ) {

			throw( new Error( `There is already an active prompt: ${ this.message }` ) );

		}

		var promise = new Promise<PromptResult>(
			( resolve, reject ) => {

				this.message = message;
				this.defaultValue = defaultValue;
				this.promiseResolve = resolve;
				this.promiseReject = reject;

			}
		);

		return( promise );

	}


	// I determine if there is a pending prompt.
	public isPending() : boolean {

		return( !! this.promiseResolve );

	}


	// I resolve the prompt with the given value.
	public resolve( value: PromptResult ) : void {

		if ( ! this.isPending() ) {

			throw( new Error( "There is no active prompt." ) );

		}

		this.promiseResolve( value );

		this.message = "";
		this.defaultValue = "";
		this.promiseResolve = null;
		this.promiseReject = null;

	}


	// I resolve the prompt with a default value. This is for cases in which the prompt
	// has to be resolved without an explicit user-provided value.
	public resolveWithDefault() : void {

		this.resolve( null );

	}

}
