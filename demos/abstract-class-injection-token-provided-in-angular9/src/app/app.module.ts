
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Provider } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { InMemoryStorageService } from "./temporary-storage.service";
import { LocalStorageService } from "./temporary-storage.service";
import { TemporaryStorageService } from "./temporary-storage.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var providers: Provider[] = [];

console.group( "Parsing Provider From URL" );

// Parse the "which={type}" out of the search string.
switch ( getWhichParamFromUrl() ) {
	case "SessionStorageService":

		console.log( "Found:", "SessionStorageService" );
		// This is the default implementation, don't do anything.

	break;
	case "LocalStorageService":

		console.log( "Found:", "LocalStorageService" );
		// For the LocalStorage implementation, all we have to do is tell Angular
		// Injector to use the given class (LocalStorageService) when one of the other
		// classes requests the "TemporaryStorageService" injection token.
		providers.push({
			provide: TemporaryStorageService,
			useClass: LocalStorageService
		});

	break;
	case "InMemoryStorageService":

		console.log( "Found:", "InMemoryStorageService" );
		// For the In-Memory implementation, all we have to do is tell Angular Injector
		// to use the given class (InMemoryStorageService) when one of the other classes
		// requests the "TemporaryStorageService" injection token.
		providers.push({
			provide: TemporaryStorageService,
			useClass: InMemoryStorageService
		});

	break;
}

console.groupEnd();

@NgModule({
	imports: [
		BrowserModule
	],
	providers: providers,
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I parse the "which" parameter from the URL (for the demo, not super robust).
function getWhichParamFromUrl() : string {

	var matches = window.location.search.match( /((?<=\bwhich=)[^&]+)/i );

	return( ( matches && matches[ 0 ] ) || "SessionStorage" );

}
