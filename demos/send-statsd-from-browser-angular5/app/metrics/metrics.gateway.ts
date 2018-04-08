
// Import the core angular services.
import { ErrorHandler } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { InjectionToken } from "@angular/core";

// Import the module services.
import { MetricsTransport } from "./metrics.transport";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface DataInput {
	[key: string]: any;
}

// I provide the interface and dependency-injection token for the metrics gateway. If
// you want to provide a custom implementation, just implement this interface.
export abstract class MetricsGateway {
	abstract send( dataInput: DataInput ) : void;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// CAUTION: Because this gateway implementation buffers metrics (to reduce the number of
// HTTP requests), it is sort of acting as both a StatsD client and a StatsD server.
// However, it is not "aggregating" stats the way a normal StatsD server would. As such,
// these metrics will be somewhat "oddly chunked" in your Time-Series Database when they
// are eventually recorded by the sever-side API.

export var BUFFERED_GATEWAY_DURATION = new InjectionToken<number>( "Time (ms) that metrics will be buffered before getting flushed." );

@Injectable()
export class BufferedGateway implements MetricsGateway {

	private buffer: any[];
	private bufferDuration: number;
	private bufferTimer: number;
	private errorHandler: ErrorHandler;
	private isSendingDataInputs: boolean;
	private transport: MetricsTransport;

	// I initialize the metrics gateway.
	constructor(
		@Inject( BUFFERED_GATEWAY_DURATION ) bufferDuration: number,
		errorHandler: ErrorHandler,
		transport: MetricsTransport
		) {

		this.errorHandler = errorHandler;
		this.transport = transport;

		this.buffer = [];
		this.bufferDuration = bufferDuration;
		this.bufferTimer = null;
		this.isSendingDataInputs = false;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I send the given data-input to the back-end persistence.
	public send( dataInput: DataInput ) : void {

		this.buffer.push( dataInput );
		this.prepareToSendDataInputs();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private prepareToSendDataInputs() : void {

		if (
			// If there's no data buffered, there's nothing to send to the server.
			! this.buffer.length ||
			// If a timer has been created, the buffered data inputs are already
			// scheduled for departure.
			this.bufferTimer ||
			// If we are currently sending data inputs to the server, let the buffered
			// data remain in the buffer until the current request has completed.
			this.isSendingDataInputs
			) {

			return;

		}

		// Start the metrics buffering window.
		this.bufferTimer = setTimeout(
			() => {

				var dataInputs = this.buffer;
				this.buffer = [];
				this.bufferTimer = null;
				this.isSendingDataInputs = true;

				this.sendDataInputs( dataInputs ).then(
					() => {

						// Since we want to serialize metrics requests (so as not to
						// saturate the browser's HTTP connection pool), let's check to
						// see if we need to re-initiate the buffer-timer to flush any
						// metrics that have been buffered during this request.
						this.isSendingDataInputs = false;
						this.prepareToSendDataInputs();

					}
				);

			},
			this.bufferDuration
		);

	}


	// I perform the actual request using the underlying transport. This is a safe method
	// to call -- all errors will be swallowed.
	private async sendDataInputs( dataInputs: DataInput[] ) : Promise<void> {

		try {

			await this.transport.send( dataInputs );

		} catch ( error ) {

			this.errorHandler.handleError( error );
			
		}

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable()
export class RealtimeGateway implements MetricsGateway {

	private errorHandler: ErrorHandler;
	private transport: MetricsTransport;

	// I initialize the metrics gateway.
	constructor(
		errorHandler: ErrorHandler,
		transport: MetricsTransport
		) {

		this.errorHandler = errorHandler;
		this.transport = transport;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I send the given data-input to the back-end persistence.
	public send( dataInput: DataInput ) : void {

		this.transport
			.send( [ dataInput ] )
			.catch(
				( error ) => {

					this.errorHandler.handleError( error );

				}
			)
		;

	}

}
