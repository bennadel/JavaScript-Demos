
// CAUTION: I cobbled together the following interfaces in an attempt to self-document
// what the API calls were doing. These are NOT OFFICIAL interfaces provided by Auth0.
// I tried to find a "Definitely Typed" set of interfaces; but, they didn't appear to
// be up-to-date.
// --
// Definitely Types for JS - https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/auth0-js/index.d.ts

export interface IAppMetadata {
	[ key: string ]: any;
}

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
	state?: any; // Echoed value for cross-site request forgery protection.
}

export interface IIdentity {
	connection: string;
	isSocial: boolean;
	provider: string;
	user_id: string;
}

export interface IProfile {
	// Fields that are always generated - https://auth0.com/docs/user-profile/normalized
	identities: IIdentity[];
	name: string;
	nickname: string;
	picture: string; // The profile picture of the user which is returned from the Identity Provider.
	user_id: string; // The unique identifier of the user. This is guaranteed to be unique per user and will be in the format (identity provider)|(unique id in the provider), e.g. github|1234567890.

	// Optional fields, but still "core" ?? !! The documentation is confusing !!
	app_metadata?: IAppMetadata;
	clientID: string; // The unique ID of the Auth0 client.
	created_at: string; // TZ formatted date string.
	sub: string; // The unique identifier of the user. This is guaranteed to be unique per user and will be in the format (identity provider)|(unique id in the provider), e.g. github|1234567890.
	updated_at: string; // TZ formatted date string.
	user_metadata?: IUserMetadata;

	// This is the field we're injecting in our Rules engine.
	bodyAnalysis: string;

	// Fields that are generated when the details are available:
	email: string; // The email address of the user which is returned from the Identity Provider.
	email_verified: boolean;
}

export interface IUserMetadata {
	[ key: string ]: any;
}
