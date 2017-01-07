
// Import the core angular services.
import { Component } from "@angular/core";
import { Inject } from "@angular/core";

// Import the application components and services.
import { AuthenticationService } from "./authentication.service";
import { IAuthorization } from "./authentication.service";
import { IProfile } from "./authentication.service";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<label>
			<input type="radio" [(ngModel)]="selectedClient" [value]="clientOne" />
			<strong>Client One</strong> &mdash; v07m1dBLNy5yecCg1B7QDiDDYhhRlduW
		</label>
		<label>
			<input type="radio" [(ngModel)]="selectedClient" [value]="clientTwo" />
			<strong>Client Two</strong> &mdash; 1rGDpEiO80x8os6sJpsTnHImxwLzzx0P
		</label>

		<br />

		<strong>Email:</strong>
		<input type="text" [(ngModel)]="email" />
		<input type="button" value="Send Email" (click)="sendEmail()" />
		
		<br /><br />

		<strong>Code:</strong>
		<input type="text" [(ngModel)]="code" />
		<input type="button" value="Verify Code" (click)="verifyCode()" />
		
		<br /><br />

		<p *ngIf="message">
			<strong>Message:</strong> {{ message }}
		</p>
	`
})
export class AppComponent {

	public code: string;
	public email: string;
	public message: string;

	private clientOne: AuthenticationService;
	private clientTwo: AuthenticationService;
	private selectedClient: AuthenticationService;


	// I initialize the component.
	constructor( @Inject( AuthenticationService ) AuthService: any ) {
		
		this.code = "";
		this.email = "";
		this.message = "";

		// Each of these AuthenticationService instances is going to create its own 
		// Auth0 client instance internally, using the giving Client ID. While all of the 
		// same Rules will be invoked for each Client request, the different Client IDs 
		// will be made available on the context of each Rule execution, allowing us to 
		// differentiate requests made from each Client.
		this.clientOne = new AuthService( "v07m1dBLNy5yecCg1B7QDiDDYhhRlduW" );
		this.clientTwo = new AuthService( "1rGDpEiO80x8os6sJpsTnHImxwLzzx0P" );

		// This is the current client being used to run the passwordless authentication
		// workflow (with its unique Client ID).
		this.selectedClient = this.clientOne;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I send the one-time use password to the currently-entered email address. The
	// one-time password is valid for about 5-minutes.
	public sendEmail() : void {

		this.code = "";
		this.message = "";

		this.selectedClient.requestEmailCode( this.email )
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

		// In the following workflow, first, we're going to log the user into the app;
		// then, once the user is authenticated, we'll go back to the Auth0 API to get
		// the user's full profile which includes the "Message" property which is being
		// injected by each of the Auth0 Rules in this demo.
		this.selectedClient.verifyEmailCode( this.email, this.code )
			.then(
				( authorization: IAuthorization ) : Promise<IProfile> => {

					console.group( "Verify Email Code / Authorization Result" );
					console.log( authorization );
					console.groupEnd();

					// Now that the user is logged-in, go back and get the Profile.
					return( this.selectedClient.getUserInfo( authorization.accessToken ) );

				}
			)
			.then(
				( profile: IProfile ) : void => {

					console.group( "Profile Result" );
					console.log( profile );
					console.groupEnd();

					// NOTE: This is the property that is being injected by each Rule.
					this.message = profile.message;

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
