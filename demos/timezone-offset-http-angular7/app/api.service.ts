
// Import the core angular services.
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// Import the application components and services.
import { ApiHttpClient } from "./api.http-client";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Account {
	id: number;
	name: string;
	email: string;
}

@Injectable({
	providedIn: "root"
})
export class ApiService {

	private apiClient: ApiHttpClient;

	// I initialize the api service.
	constructor( apiClient: ApiHttpClient ) {

		this.apiClient = apiClient;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get the account for the currently-authenticated user.
	public getAccount() : Observable<Account> {

		var stream = this.apiClient.makeRequest<Account>({
			method: "GET",
			url: "./api/account.json"
		});

		return( stream );

	}

}
