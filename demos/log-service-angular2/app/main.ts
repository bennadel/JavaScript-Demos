
// Import the core angular services.
import { bootstrap } from "@angular/platform-browser-dynamic";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ConsoleLogService } from "./log.service";
import { Logger } from "./default-log.service";

bootstrap(
	AppComponent,

	// In the browser platform, we're going to use the ConsoleLogService as the
	// implementation of the Logger service. This way, when application components
	// inject "Logger" DI token, they'll actually receive "ConsoleLogService".
	[
		{
			provide: Logger,
			useClass: ConsoleLogService
		}
	]
);
