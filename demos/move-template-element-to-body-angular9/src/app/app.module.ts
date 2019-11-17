
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component"
import { StopwatchComponent } from "./stopwatch.component"

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [],
	declarations: [
		AppComponent,
		StopwatchComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
