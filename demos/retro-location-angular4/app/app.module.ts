
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { HashLocationStrategy } from "@angular/common";
import { LocationStrategy } from "@angular/common";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { RetroLocation } from "./retro-location";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent
	],
	providers: [
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},
		RetroLocation
	]
})
export class AppModule {
	// ...
}
