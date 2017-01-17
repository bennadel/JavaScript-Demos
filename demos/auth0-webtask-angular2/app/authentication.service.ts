
// Import the core angular services.
import { Injectable } from "@angular/core";
import * as Auth0 from "auth0";

export interface IAuthorization {
	accessToken: string;
	idToken: string; // JWT token.
	idTokenPayload: { // Parsed JWT content.
		aud: string; // The audience. Either a single case-sensitive string or URI or an array of such values that uniquely identify the intended recipients of this JWT. For an Auth0 issued id_token, this will be the Client ID of your Auth0 Client.
		exp: number; // Expires at (UTC seconds).
		iat: number; // Issued at (UTC seconds).
		iss: string; // The issuer. A case-sensitive string or URI that uniquely identifies the party that issued the JWT. For an Auth0 issued id_token, this will be the URL of your Auth0 tenant.
		sub: string; // The unique identifier of the user. This is guaranteed to be unique per user and will be in the format (identity provider)|(unique id in the provider), e.g. github|1234567890.

		// These are here because I added "scope: email" to the authentication request.
		email: string;
		email_verified: boolean;
	};
	refreshToken?: string; // Optional, if the offline_access scope has been requested.
	state?: any; // Echoed value for cross-site request forgery protection.
}

export class AuthenticationService {

	private auth0: any;


	// I initialize the Authentication service.
	constructor() {

		this.auth0 = new Auth0({
			domain: "bennadel.auth0.com",
			clientID: "RuBk9q1wDso7Agh4TNIu2xv2hAmmTOdA", // JavaScript Demos Client.
			responseType: "token"
		});

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I send a one-time use password to the given email address.
	public requestEmailCode( email: string ) : Promise<void> {

		var promise = new Promise<void>(
			( resolve, reject ) : void => {

				this.auth0.requestEmailCode(
					{
						email: email
					},
					( error: any ) : void => {

						error
							? reject( error )
							: resolve()
						;

					}
				);

			}
		);

		return( promise );

	}


	// I log the user into the application by verifying that the given one-time use 
	// password was provisioned for the given email address.
	public verifyEmailCode( email: string, code: string ) : Promise<IAuthorization> {

		var promise = new Promise<IAuthorization>(
			( resolve, reject ) : void => {

				this.auth0.verifyEmailCode(
					{
						email: email,
						code: code,

						// When authenticating, the default scope is "openid". But, if
						// we add "email", then we'll get the "email" as part of the 
						// actual JWT (JSON Web Token) payload. This way, when we pass
						// the JWT to WebTask.io, we'll be able to validate BOTH the
						// JWT and the email address of the authenticated user.
						scope: "openid email"
					},
					( error: any, result: IAuthorization ) : void => {

						error
							? reject( error )
							: resolve( result )
						;

					}
				);

			}
		);

		return( promise );

	}

}
