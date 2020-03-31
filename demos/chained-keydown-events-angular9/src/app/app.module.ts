
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { KeyboardEventsChainedKeydownPlugin } from "./keyboard-events-chained-keydown-plugin";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [
		{
			provide: EVENT_MANAGER_PLUGINS,
			useClass: KeyboardEventsChainedKeydownPlugin,
			multi: true
		}
	],
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
