
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { TemporaryStorageService } from "./temporary-storage.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<ul>
			<li>
				<a href="./index.html?which=SessionStorageService">
					Use <code>SessionStorageService</code>
				</a>
			</li>
			<li>
				<a href="./index.html?which=LocalStorageService">
					Use <code>LocalStorageService</code>
				</a>
			</li>
			<li>
				<a href="./index.html?which=InMemoryStorageService">
					Use <code>InMemoryStorageService</code>
				</a>
			</li>
		</ul>
	`
})
export class AppComponent {

	// I initialize the app component.
	constructor( temporaryStorage: TemporaryStorageService ) {

		// With dependency-injection (DI), all we're doing is asking the DI container
		// for a class that implements the "TYPE" of TemporaryStorageService. The
		// implementation of said type is of little concern. Let's look at which
		// implementation was injection into this component.
		console.group( "Injected Storage Service" );
		console.log( temporaryStorage );
		console.groupEnd();

		// Let's test the implementation to make sure it handles the Set / Get workflow.
		(async function() {

			var key = "Hello";
			var value = "World";
			temporaryStorage.set( key, value );

			console.group( "Testing Set / Get" );
			console.log( "Set:", `${ key } -> ${ value }` );
			console.log( "Get:", await temporaryStorage.get( key ) );
			console.groupEnd();

		})();

	}

}
