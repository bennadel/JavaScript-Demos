
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { DomEventsNoChangeDetectionPlugin } from "./dom-no-change-detection.plugin";
import { HesitateDirective } from "./hesitate.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent,
		HesitateDirective
	],
	providers: [
		{
			provide: EVENT_MANAGER_PLUGINS,
			useClass: DomEventsNoChangeDetectionPlugin,
			multi: true
		}
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
