
// Import the core angular services.
import { Injectable } from "@angular/core";
import { parse } from "query-string";
import { Router } from "@ngrx/router";

@Injectable()
export class RouterUtils {

	// I hold the root router.
	private router: Router;


	// I initialize the service.
	constructor( router: Router ) {

		this.router = router;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I navigate to the current URL with the give name-value query-string pair. This 
	// method is designed to leave all the other query-string parameters in place.
	public gotoQueryParam( name: string, value: any ) : void {

		this.gotoQueryParams({
			[name]: value
		});

	}


	// I navigate to the current URL with the given name-value pairs in the query-string.
	// This method is designed to leave all other query-string parameters in place.
	public gotoQueryParams( delta: { [key: string]: any } ) : void {

		var parts = this.router.path().split( "?" );
		var pathString = parts.shift();
		var queryString = parts.shift();
		var updatedQueryParams = parse( queryString );

		for ( var key in delta ) {

			if ( delta[ key ] === null ) {

				delete( updatedQueryParams[ key ] );

			} else {

				updatedQueryParams[ key ] = delta[ key ];

			}

		}


		this.router.go( pathString, updatedQueryParams );

	}

}
