
// Import the core angular services.
import { Injectable } from "@angular/core";
import * as Auth0 from "auth0";

// CAUTION: I cobbled together the following interfaces in an attempt to self-document
// what the API calls were doing. These are NOT OFFICIAL interfaces provided by Auth0.
// I tried to find a "Definitely Typed" set of interfaces; but, they didn't appear to
// be up-to-date.
// --
// Definitely Types for JS - https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/auth0-js/index.d.ts

export interface IAuthorization {
	accessToken: string;
	idToken: string; // JWT token.
	idTokenPayload: { // Parsed JWT content.
		aud: string; // The audience. Either a single case-sensitive string or URI or an array of such values that uniquely identify the intended recipients of this JWT. For an Auth0 issued id_token, this will be the Client ID of your Auth0 Client.
		exp: number; // Expires at (UTC seconds).
		iat: number; // Issued at (UTC seconds).
		iss: string; // The issuer. A case-sensitive string or URI that uniquely identifies the party that issued the JWT. For an Auth0 issued id_token, this will be the URL of your Auth0 tenant.
		sub: string; // The unique identifier of the user. This is guaranteed to be unique per user and will be in the format (identity provider)|(unique id in the provider), e.g. github|1234567890.
	};
	refreshToken?: string; // Optional, if the offline_access scope has been requested.
	state?: any;
}

export interface IIdentity {
	connection: string;
	isSocial: boolean;
	provider: string;
	user_id: string;
}

export interface IMetadata {
	[ key: string ]: any;
}

export interface IProfile {
	// Fields that are always generated - https://auth0.com/docs/user-profile/normalized
	identities: IIdentity[];
	name: string;
	nickname: string;
	picture: string; // The profile picture of the user which is returned from the Identity Provider.
	user_id: string; // The unique identifier of the user. This is guaranteed to be unique per user and will be in the format (identity provider)|(unique id in the provider), e.g. github|1234567890.

	// Optional fields, but still "core" ?? !! The documentation is confusing !!
	app_metadata?: IMetadata;
	clientID: string; // The unique ID of the Auth0 client.
	created_at: string; // TZ formatted date string.
	sub: string; // The unique identifier of the user. This is guaranteed to be unique per user and will be in the format (identity provider)|(unique id in the provider), e.g. github|1234567890.
	updated_at: string; // TZ formatted date string.
	user_metadata?: IMetadata;

	// Fields that are generated when the details are available:
	email: string; // The email address of the user which is returned from the Identity Provider.
	email_verified: boolean;
}

export class AuthenticationService {

	private auth0: any;


	// I initialize the Authentication service.
	constructor() {

		this.auth0 = new Auth0({
			domain: "bennadel.auth0.com",
			clientID: "erNlgZHZ4MyDFrfwFOc0JCAJ1Znzg6Fm", // JavaScript Demos Client.
			responseType: "token"

			// Since I am using an email-based token workflow, I don't need to define 
			// a callback URL - this would only be necessary if I was passing the user
			// control over to Auth0's website.
			// --
			// callbackURL: "{YOUR APP URL}"
		});

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I get the user info / profile for the given access token (which should have been
	// returned as part of the authorization workflow).
	// --
	// NOTE: Internally, I am using the .getUserInfo() method, which takes the 
	// accessToken. In the Auth0 documentation, however, they discuss the .getProfile()
	// method that takes the idToken. But, if you try to use that method, you get the 
	// following deprecation warning:
	// --
	// DEPRECATION NOTICE: This method will be soon deprecated, use `getUserInfo` instead.
	// --
	// Apparently Auth0 is trying to migrate to a slightly different workflow for 
	// accessing the API based on accessTokens. But, it is not yet fully rolled-out.
	public getUserInfo( accessToken: string ) : Promise<IProfile> {

		var promise = new Promise<IProfile>(
			( resolve, reject ) : void => {
				
				this.auth0.getUserInfo(
					accessToken,
					( error: any, result: IProfile ) : void => {

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
						code: code
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
