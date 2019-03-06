
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { SpyDirective } from "./spy.directive";
import { TrackByPropertyPipe } from "./track-by-property.pipe";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent,
		SpyDirective,
		TrackByPropertyPipe
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
