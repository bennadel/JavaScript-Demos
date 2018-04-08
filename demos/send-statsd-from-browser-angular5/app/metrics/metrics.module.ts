
// Import the core angular services.
import { HttpClientModule } from "@angular/common/http";
import { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { Provider } from "@angular/core";

// Import the module services.
import { BUFFERED_GATEWAY_DURATION } from "./metrics.gateway";
import { BufferedGateway } from "./metrics.gateway";
import { MetricsGateway } from "./metrics.gateway";
import { RealtimeGateway } from "./metrics.gateway";

import { METRICS_PREFIX } from "./metrics.service";
import { METRICS_TAGS } from "./metrics.service";
import { MetricsService } from "./metrics.service";

import { ConsoleTransport } from "./metrics.transport";
import { HTTP_TRANSPORT_URL } from "./metrics.transport";
import { HttpTransport } from "./metrics.transport";
import { MetricsTransport } from "./metrics.transport";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Export the services that the parent application may need for dependency-injection,
// including the ability to implement custom services based on our abstractions.
export { ConsoleTransport };
export { HttpTransport };
export { MetricsGateway };
export { MetricsService };
export { MetricsTransport };
export { RealtimeGateway };

interface ModuleOptions {
	bufferDuration?: number;
	prefix?: string;
	tags?: string[];
	url?: string;
}

@NgModule({
	imports: [
		HttpClientModule
	]
})
export class MetricsModule {

	static forRoot( options?: ModuleOptions ) : ModuleWithProviders {

		return({
			ngModule: MetricsModule,
			providers: [
				MetricsService,
				{
					// The default gateway will use buffering.
					provide: MetricsGateway,
					useClass: BufferedGateway
				},
				{
					// The default transport will use HTTP.
					provide: MetricsTransport,
					useClass: HttpTransport
				},
				{
					provide: METRICS_PREFIX,
					useValue: ( ( options && options.prefix ) || "" )
				},
				{
					provide: METRICS_TAGS,
					useValue: ( ( options && options.tags ) || [] )
				},
				{
					provide: HTTP_TRANSPORT_URL,
					useValue: ( ( options && options.url ) || "/" )
				},
				{
					provide: BUFFERED_GATEWAY_DURATION,
					useValue: ( ( options && options.bufferDuration ) || 5000 )
				},
			]
		});		

	}

}
