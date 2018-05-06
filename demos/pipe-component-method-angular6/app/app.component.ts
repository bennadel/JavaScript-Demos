
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { FnPipeContext } from "./fn.pipe";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	// Here, we can provide special services that are available in the component 
	// injector. In this case, we're telling the FnPipe to use the AppComponent instance
	// as the context when executing the "fn" function reference.
	viewProviders: [
		{
			provide: FnPipeContext,
			useClass: AppComponent
		}
	],
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="message = 'hello world';">Use message one</a>.
			<br />
			<a (click)="message = 'what it be like';">Use message two</a>.
		</p>

		<p>
			Pipe output: <strong>{{ message | fn:formatMessage }}</strong>
		</p>
	`
})
export class AppComponent {

	public message: string;

	// I initialize the app-component.
	constructor() {

		this.message = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I am the function being invoked by the FnPipe.
	public formatMessage( value: string ) : string {

		// We can use the "this" reference here because we are providing the AppComponent
		// as the FnPipeContext token to the local Injector. Its existence will get the
		// FnPipe to execute the function reference in the current component context.
		// --
		// NOTE: As always, we could have used the Fat-Arrow notation (=>) to bind this
		// function to the AppComponent instance, which would obviate the need for the
		// FnPipeContext token.
		return( `Context[ ${ this.constructor.name } ] => ${ value }` );

	}

}
