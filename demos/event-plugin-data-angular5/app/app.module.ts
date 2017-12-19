
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { MousedownOutsidePlugin } from "./mousedown-outside.plugin";

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
			provide: EVENT_MANAGER_PLUGINS,
			useClass: MousedownOutsidePlugin,
			multi: true
		}
	]
})
export class AppModule {
	// ...
}
