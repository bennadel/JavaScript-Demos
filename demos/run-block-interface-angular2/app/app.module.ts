
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { IRunnable } from "./runner.module";
import { RUNNABLE } from "./runner.module";
import { RunnerModule } from "./runner.module";
import { AppComponent } from "./app.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// In this demo, rather than providing a "run block", we're going to provide a Runnable
// implementation that will be exercised at the end of the bootstrapping process.
@Injectable()
export class MyRunner implements IRunnable {

	private errorHandler: ErrorHandler;

	// I initialize the runner service.
	constructor( errorHandler: ErrorHandler ) {
		
		this.errorHandler = errorHandler;

	}

	// ---	
	// PUBLIC METHODS.	
	// ---

	// I am invoked (by the RunnerModule) at the end of the bootstrapping process.
	public run() : void {

		console.group( "Runnable Implementation" );
		console.log( "Runnable implementation exposing public run() method." );
		console.log( this.errorHandler );
		console.groupEnd();
			
	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule, RunnerModule ],
	providers: [
		// Here, instead of using a Factory to generate a "run block", we're 
		// providing a Runner implementation that will be invoked by a "run block" in
		// the RunnerModule. The outcome is exactly the same; but, this allows the app 
		// initializer to be implemented as a Service rather than as a Factory.
		{
			provide: RUNNABLE,
			multi: true,
			useClass: MyRunner
		}
	],
	declarations: [ AppComponent ]
})
export class AppModule {
	// ... nothing to do here.
}
