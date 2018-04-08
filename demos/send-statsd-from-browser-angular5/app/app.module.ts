
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ConsoleTransport } from "./metrics/metrics.module";
import { HttpTransport } from "./metrics/metrics.module";
import { MetricsGateway } from "./metrics/metrics.module";
import { MetricsModule } from "./metrics/metrics.module";
import { MetricsTransport } from "./metrics/metrics.module";
import { RealtimeGateway } from "./metrics/metrics.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule,
		// By default, the Metrics module uses the BufferedGateway and the HttpTransport.
		// However, I'm overriding it below (in the Providers) since I'll have a server
		// locally, but not when this demo is on GitHub.
		MetricsModule.forRoot({
			url: "http://localhost:8080/metrics-proxy",
			bufferDuration: ( 5 * 1000 ),
			prefix: "angular-app.",
			tags: [ "angular5" ]
		})
	],
	declarations: [
		AppComponent
	],
	providers: [
		{
			provide: MetricsTransport,
			// When this demo is hosted on GitHub pages, I'm going to use the 
			// ConsoleTransport, since I have no server. But, locally, I can use the
			// Node.js server in the ./api directory.
			useClass: window.location.host.includes( "github" ) 
				? ConsoleTransport
				: HttpTransport 
		},
		// {
		// 	provide: MetricsGateway,
		// 	useClass: RealtimeGateway
		// }
	]
})
export class AppModule {
	// ...
}
