
// Import the core angular services.
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppReadyEvent } from "./services/app-ready-event";
import { DirectClickPlugin } from "./plugins/direct-click.plugin";
import { DomUtils } from "./services/dom-utils";
import { ErrorLogger } from "./services/error-logger";
import { FragmentPolyfillModule } from "./modules/fragment-polyfill/fragment-polyfill.module";
import { KeyboardShortcuts } from "./services/keyboard-shortcuts";
import { MousedownOutsidePlugin } from "./plugins/mousedown-outside.plugin";
import { RetainScrollPolyfillModule } from "./modules/retain-scroll-polyfill/retain-scroll-polyfill.module";
import { Session } from "./services/session";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// The goal of the CoreModule is to organize providers for the root of the application.
// This module should NOT contain any declarations (those are in the SharedModule).
@NgModule({
	imports: [
		FragmentPolyfillModule.forRoot({
			smooth: true
		}),
		RetainScrollPolyfillModule.forRoot({
			// Tell the polyfill how long to poll the document after a route change in
			// order to look for elements that need to be restored to a previous offset.
			pollDuration: 3000,
			pollCadence: 50
		})
	],
	providers: [
		AppReadyEvent,
		DomUtils,
		ErrorLogger,
		{
			provide: EVENT_MANAGER_PLUGINS,
			useClass: DirectClickPlugin,
			multi: true
		},
		{
			provide: EVENT_MANAGER_PLUGINS,
			useClass: MousedownOutsidePlugin,
			multi: true
		},
		KeyboardShortcuts,
		Session
	]
})
export class CoreModule {
	
	// I initialize the shared module, essentially creating a "run block" for the module.
	constructor( keyboardShortcuts: KeyboardShortcuts ) {

		keyboardShortcuts
			.setPriority( "board-item", 100 )
			.setPriority( "console", 100 )
			.setPriority( "inbox", 200 )
			.setPriority( "modal", 300 )
		;

	}

}
