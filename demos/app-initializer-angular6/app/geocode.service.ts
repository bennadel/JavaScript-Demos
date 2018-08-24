
// Import the core angular services.
import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { InjectionToken } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var IP_INFO_API_KEY = new InjectionToken<string>( "IPInfo.io Api Key" );

export interface IPLocation {
	ip: string;
	country: string;
	city: string;
	latitude: number;
	longitude: number;
}

interface IPInfoResponse {
	city?: string;
	country?: string;
	ip: string;
	loc?: string;
}

@Injectable({
	providedIn: "root"
})
export class GeocodeService {

	private apiToken: string;
	private httpClient: HttpClient;

	// I initialize the geocode service.
	constructor(
		@Inject( IP_INFO_API_KEY ) apiToken: string,
		httpClient: HttpClient
		) {

		this.apiToken = apiToken;
		this.httpClient = httpClient;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I try to locate the given IP address.
	public async locate( ipAddress: string ) : Promise<IPLocation> {

		var url = `https://ipinfo.io/${ ipAddress }?token=${ this.apiToken }`;

		var result = await this.httpClient
			.get<IPInfoResponse>( url )
			.toPromise()
		;

		var country = ( result.country || "Unknown" );
		var city = ( result.city || "Unknown" );
		var coordinates = ( result.loc || "" ).split( "," );

		return({
			ip: ipAddress,
			country: country,
			city: city,
			latitude: ( +coordinates.shift() || 0 ),
			longitude: ( +coordinates.shift() || 0 )
		});

	}

}

