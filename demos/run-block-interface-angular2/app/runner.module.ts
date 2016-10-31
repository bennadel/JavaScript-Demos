
// Import the core angular services.
import { APP_INITIALIZER } from "@angular/core";
import { NgModule } from "@angular/core";
import { OpaqueToken } from "@angular/core";


// The RunnerModule will collect and execute a series of IRunnable class implementations
// at the end of the bootstrapping process. Each runnable must provide a public .run() 
// method that will be invoked at the end of the bootstrapping process.
export interface IRunnable {
	run() : void;
}


// I am the dependency-injection token for the collection of IRunnable implementations.
export var RUNNABLE = new OpaqueToken( "I am the multi collection of IRunnable classes." );


@NgModule({
	providers: [
		// This module uses a Factory function to add to the APP_INITIALIZER collection; 
		// however, there's no way to provide @Optional() dependencies to a factory (at 
		// least not that I can find). As such, we need to provide a "null" Runnable that
		// will initialize the multi: true collection. This way, if the application 
		// doesn't go on to add to this DI token, we'll still have something to inject
		// into our Factory function below.
		{
			provide: RUNNABLE,
			multi: true,
			useValue: null
		},

		// I provide the "run block" that iterates over the IRunnable implementations. This
		// allows other modules in the application to provide application initializers in
		// the form of IRunnable classes, as opposed to "run blocks".
		{
			provide: APP_INITIALIZER,
			multi: true,
			deps: [ RUNNABLE ],
			useFactory: function( runnables: IRunnable[] ) : () => void {

				return( runblock );

				function runblock() : void {

					runnables.forEach(
						function iterator( runnable ) {

							// NOTE: Checking for truthy due to NULL runnable (see above).
							runnable && runnable.run();

						}
					);

				}

			}
		}
	]
})
export class RunnerModule {
	// ... nothing to do here.
}
