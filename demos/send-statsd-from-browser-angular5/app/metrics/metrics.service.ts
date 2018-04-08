
// Import the core angular services.
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { InjectionToken } from "@angular/core";

// Import the application components and services.
import { MetricsGateway } from "./metrics.gateway";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var METRICS_PREFIX = new InjectionToken<string>( "Prefix added to all metrics." );
export var METRICS_TAGS = new InjectionToken<string[]>( "Tags added to all metrics." );

interface BaseOptions {
	metric: string;
	tags?: string[];
}

interface GaugeOptions extends BaseOptions {
	value: number | string;
}

interface HistogramOptions extends BaseOptions {
	value: number;
}

interface IncrementOptions extends BaseOptions {
	value: number;
}

interface SetOptions extends BaseOptions {
	value: number | string;
}

interface TimingOptions extends BaseOptions {
	value: number;
}

@Injectable()
export class MetricsService {

	private metricsGateway: MetricsGateway;
	private prefix: string;
	private tags: string[];

	// I initialize the metrics service.
	constructor(
		metricsGateway: MetricsGateway,
		@Inject( METRICS_PREFIX ) prefix: string,
		@Inject( METRICS_TAGS ) tags: string[]
		) {

		this.metricsGateway = metricsGateway;
		this.prefix = prefix;
		this.tags = tags;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I record the gauge metric.
	// --
	// NOTE: The value here is a number | string because it can accept relative values
	// such as "+4" and "-2" in addition to the absolute numeric values.
	public gauge( options: GaugeOptions ) : void;
	public gauge( metric: string, value: number | string ) : void;
	public gauge( a: any, b?: any ) : void {

		if ( typeof( a ) === "string" ) {

			this.metricsGateway.send({
				type: "gauge",
				metric: this.expandMetric( a ),
				value: b,
				tags: this.tags
			});

		} else {

			this.metricsGateway.send({
				type: "gauge",
				metric: this.expandMetric( a.metric ),
				value: a.value,
				tags: this.tags.concat( a.tags || [] )
			});

		}

	}


	// I record the histogram metric.
	public histogram( options: HistogramOptions ) : void;
	public histogram( metric: string, value: number ) : void;
	public histogram( a: any, b?: any ) : void {

		if ( typeof( a ) === "string" ) {

			this.metricsGateway.send({
				type: "histogram",
				metric: this.expandMetric( a ),
				value: b,
				tags: this.tags
			});

		} else {

			this.metricsGateway.send({
				type: "histogram",
				metric: this.expandMetric( a.metric ),
				value: a.value,
				tags: this.tags.concat( a.tags || [] )
			});

		}

	}


	// I record the increment metric.
	public increment( options: IncrementOptions ) : void;
	public increment( metric: string, value: number ) : void;
	public increment( metric: string ) : void;
	public increment( a: any, b?: any ) : void {

		if ( typeof( a ) === "string" ) {

			this.metricsGateway.send({
				type: "counter",
				metric: this.expandMetric( a ),
				value: ( b || 1 ),
				tags: this.tags
			});

		} else {

			this.metricsGateway.send({
				type: "counter",
				metric: this.expandMetric( a.metric ),
				value: a.value,
				tags: this.tags.concat( a.tags || [] )
			});

		}

	}


	// I record the set metric.
	public set( options: SetOptions ) : void;
	public set( metric: string, value: number | string ) : void;
	public set( a: any, b?: any ) : void {

		if ( typeof( a ) === "string" ) {

			this.metricsGateway.send({
				type: "set",
				metric: this.expandMetric( a ),
				value: b,
				tags: this.tags
			});

		} else {

			this.metricsGateway.send({
				type: "set",
				metric: this.expandMetric( a.metric ),
				value: a.value,
				tags: this.tags.concat( a.tags || [] )
			});

		}

	}


	// I record the timing metric.
	public timing( options: TimingOptions ) : void;
	public timing( metric: string, value: number ) : void;
	public timing( a: any, b?: any ) : void {

		if ( typeof( a ) === "string" ) {

			this.metricsGateway.send({
				type: "timing",
				metric: this.expandMetric( a ),
				value: b,
				tags: this.tags
			});

		} else {

			this.metricsGateway.send({
				type: "timing",
				metric: this.expandMetric( a.metric ),
				value: a.value,
				tags: this.tags.concat( a.tags || [] )
			});

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I convert the given metric suffix to the full metric key.
	private expandMetric( metric: string ) : string {

		return( this.prefix + metric );

	}

}
