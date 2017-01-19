
// Import the core angular services.
import { Component } from "@angular/core";
import { Headers } from "@angular/http";
import { Http } from "@angular/http";
import { Response } from "@angular/http";

// Import the application components and services.
import { AuthenticationService } from "./authentication.service";
import { IAuthorization } from "./authentication.service";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<p>
			<strong>Email:</strong>
			<input type="text" [(ngModel)]="email" />
			<input type="button" value="Send Email" (click)="sendEmail()" />
		</p>
		
		<p>
			<strong>Code:</strong>
			<input type="text" [(ngModel)]="code" />
			<input type="button" value="Verify Code" (click)="verifyCode()" />
		</p>

		<!-- Only show the JWT once the user has logged-in. -->
		<template [ngIf]="jwt">

			<p>
				<strong>JWT:</strong> {{ jwt }}
			</p>

			<p>
				<a (click)="logout()">Logout</a>.
			</p>

		</template>

		<hr />

		<p>
			<strong><a (click)="generateNumber()">Generate random number</a></strong>: 
			{{ randomNumber }}
		</p>

	`
})
export class AppComponent {

	public code: string;
	public email: string;
	public jwt: string;
	public randomNumber: string;

	private authenticationService: AuthenticationService;
	private http: Http;


	// I initialize the component.
	constructor( 
		authenticationService: AuthenticationService,
		http: Http
		) {
		
		this.authenticationService = authenticationService;
		this.http = http;

		this.code = "";
		this.email = "";
		this.jwt = "";
		this.randomNumber = "";

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I consume the WebTask.io for generating cryptographically secure random numbers.
	public generateNumber() : void {

		this.http
			.get( 
				"https://webtask.it.auth0.com/api/run/wt-ben-bennadel-com-0/secure-rand",
				{
					// Because the WebTask.io resource is protected by Auth0, we have 
					// to include our Auth0 JWT (JSON Web Token) in the Authorization
					// header. WebTask will validate the token to ensure that it is 
					// still valid.
					// --
					// NOTE: We could have also included it in the query-string parameter
					// "access_token"; but, the header is recommended to prevent it from
					// being logged (or logged less easily).
					headers: new Headers({
						"Authorization": `Bearer ${ this.jwt }`
					})
				}
			)
			.subscribe(
				( response: Response ) : void => {

					this.randomNumber = response.json().toString();

				},
				( response: Response ) : void => {

					console.warn( "Error while generating random number." );
					console.error( response );

					this.randomNumber = response.json
						? response.json()
						: "Something went wrong."
					;

				}
			)
		;

	}


	// I log out, clearing the JWT (JSON Web Token) that is used when invoking the 
	// WebTask.io secured resources.
	public logout() : void {

		this.code = "";
		this.jwt = "";
		this.randomNumber = "";

	}


	// I send the one-time use password to the currently-entered email address. The
	// one-time password is valid for about an hour.
	public sendEmail() : void {

		// Since we're sending a new authentication code, log out of the current 
		// session so that we can reset to a pristine state.
		this.logout();

		this.authenticationService
			.requestEmailCode( this.email )
			.then(
				() => {
					
					console.log( "Email sent (with one-time use code)." );

				}
			)
			.catch(
				( error: any ) : void => {

					console.error( error );

				}
			)
		;

	}


	// I log the current user into the application using the currently-entered email 
	// address and the one-time use token. 
	public verifyCode() : void {

		this.authenticationService
			.verifyEmailCode( this.email, this.code )
			.then(
				( authorization: IAuthorization ) : void => {

					console.group( "Verify Email Code / Authorization Result" );
					console.log( authorization );
					console.groupEnd();

					// The user's session is essentially defined by the existence of a
					// valid and unexpired JWT (JSON Web Token). This is the value that 
					// we will need in order to consume Auth0-secured WebTask.io resources.
					this.jwt = authorization.idToken;

				}
			)
			.catch(
				( error: any ) : void => {

					console.warn( "Something went wrong!" );
					console.error( error );

				}
			)
		;

	}

}
