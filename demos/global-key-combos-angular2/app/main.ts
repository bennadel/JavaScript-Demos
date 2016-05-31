
// Import the core angular services.
import { bootstrap } from "@angular/platform-browser-dynamic";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { GlobalKeyEventsPlugin } from "./global-key-events.plugin";

// When we bootstrap the application, we're providing a custom DOM-event plugin for 
// our global key handlers. This will take precedence over (but will not replace) the 
// built-in DOM-event plugins that Angular ships with.
bootstrap( 
	AppComponent,
	[
		{
			provide: EVENT_MANAGER_PLUGINS,
			useClass: GlobalKeyEventsPlugin,
			multi: true
		}
	]
);