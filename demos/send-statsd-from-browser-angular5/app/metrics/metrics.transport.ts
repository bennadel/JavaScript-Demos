
// Import the core angular services.
import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { InjectionToken } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface DataInput {
	[key: string]: any;
}

// I provide the interface and dependency-injection token for the metrics transport. If
// you want to provide a custom implementation, just implement this interface.
export abstract class MetricsTransport {
	abstract send( dataInputs: DataInput[] ) : Promise<void>;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var HTTP_TRANSPORT_URL = new InjectionToken<string>( "Full URL for HTTP transport." );

@Injectable()
export class HttpTransport implements MetricsTransport {

	private httpClient: HttpClient;
	private url: string;

	// I initialize the http transport behavior.
	constructor(
		httpClient: HttpClient,
		@Inject( HTTP_TRANSPORT_URL ) url: string
		) {

		this.httpClient = httpClient;
		this.url = url;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I send the given data-inputs to the persistence layer.
	public async send( dataInputs: DataInput[] ) : Promise<void> {

		var response = await this.httpClient
			.post(
				this.url,
				{
					dataInputs: dataInputs
				},
				{
					headers: {
						"Content-Type": "application/json; charset=UTF-8"
					}
				}
			)
			.toPromise()
		;

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export class ConsoleTransport implements MetricsTransport {

	// I send the given data-inputs to the persistence layer.
	public async send( dataInputs: DataInput[] ) : Promise<void> {

		console.group( "Metrics - ConsoleTransport" );
		for ( var dataInput of dataInputs ) {

			console.log( dataInput );

		}
		console.groupEnd();

	}

}
