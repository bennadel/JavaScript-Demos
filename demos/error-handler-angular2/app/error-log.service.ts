// In order to get the TypeScript compiler to not complain about unknown variables,
// I'm declaring these various services as ambient values.
// --
// WARNING: I'm not so good at using TypeScript yet - I am sure there is a way to do
// this in some global declarations file; but, I don't know how to do that yet.
declare var newrelic: { noticeError( error: any ) : void; };
declare var Raygun: { send( error: any ) : void; }
declare var Rollbar: { error( error: any ) : void; }
declare var trackJs: { track( error: any ) : void; }

// Import the core angular services.
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

@Injectable()
export class ErrorLogService {

	private http: Http;


	// I initialize the service.
	constructor( http: Http ) {
		
		this.http = http;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I log the given error to various aggregation and tracking services.
	public logError( error: any ) : void {

		// Internal tracking.
		this.sendToConsole( error );
		this.sendToServer( error );

		// Software-as-a-Service (SaaS) tracking.
		// --
		// NOTE: These are all here as an example - you wouldn't actually be using all
		// of these in the same application.
		this.sendToNewRelic( error );
		this.sendToRaygun( error );
		this.sendToRollbar( error );
		this.sendToTrackJs( error );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I send the error the browser console (safely, if it exists).
	private sendToConsole(error: any): void {
		
		if ( console && console.group && console.error ) {
		
			console.group( "Error Log Service" );
			console.error( error );
			console.error( error.message );
			console.error( error.stack );
			console.groupEnd();
		
		}

	}
	

	// I send the error to the NewRelic error logging service.
	private sendToNewRelic( error: any ) : void {
		
		// Read more: https://docs.newrelic.com/docs/browser/new-relic-browser/browser-agent-apis/report-data-events-browser-agent-api
		newrelic.noticeError( error );

	}
	

	// I send the error to the Raygun error logging service.
	private sendToRaygun( error: any ) : void {
		
		// Read more: https://raygun.com/raygun-providers/javascript
		Raygun.send( error );

	}


	// I send the error to the Rollbar error logging service.
	private sendToRollbar( error: any ) : void {
		
		// Read more: https://rollbar.com/docs/notifier/rollbar.js/api/
		Rollbar.error( error );

	}
	

	// I send the error to the server-side error tracking end-point.
	private sendToServer( error: any ) : void {
		
		this.http
			.post(
				"./error-logging-endpoint", // Doesn't really exist in demo.
				{
					type: error.name,
					message: error.message,
					stack: error.stack,
					location: window.location.href
				}
			)
			.subscribe(
				( httpResponse: Response ) : void => {

					// ... nothing to do here.

				},
				( httpError: any ) : void => {

					// NOTE: We know this will fail in the demo since there is no
					// ability to accept POST requests on GitHub pages.
					// --
					// console.log( "Http error:", httpError );

				}
			)
		;

	}
	

	// I send the error to the Track.js error logging service.
	private sendToTrackJs( error: any ) : void {
		
		// Read more: http://docs.trackjs.com/tracker/framework-integrations#angular
		trackJs.track( error );

	}
	
}
