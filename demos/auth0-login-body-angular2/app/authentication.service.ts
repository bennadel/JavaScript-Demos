
// Import the core angular services.
import * as Auth0 from "auth0";

// Import the application components and services.
import { IAppMetadata } from "./authentication.interfaces";
import { IAuthorization } from "./authentication.interfaces";
import { IIdentity } from "./authentication.interfaces";
import { IProfile } from "./authentication.interfaces";
import { IUserMetadata } from "./authentication.interfaces";

export interface IParams {
	[ key: string ]: any;
}

export class AuthenticationService {

	private auth0: any;


	// I initialize the Authentication service.
	constructor() {

		this.auth0 = new Auth0({
			domain: "bennadel.auth0.com",
			clientID: "K3zOzhAsrok9mx6yrrwDcbMggFC9QxjZ",
			responseType: "token"
		});

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I get the user info / profile for the given, authenticated access token.
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
	// password was provisioned for the given email address. Additionally, an optional
	// params object can be used to make additional data available in the Rules engine
	// (as the request.body.params object).
	public verifyEmailCode( 
		email: string,
		code: string,
		params?: IParams
		) : Promise<IAuthorization> {

		var promise = new Promise<IAuthorization>(
			( resolve, reject ) : void => {

				this.auth0.verifyEmailCode(
					{
						email: email,
						code: code,
						params: params
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
