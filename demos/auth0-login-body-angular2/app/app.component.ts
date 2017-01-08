
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AuthenticationService } from "./authentication.service";
import { IAuthorization } from "./authentication.interfaces";
import { IProfile } from "./authentication.interfaces";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<strong>Email:</strong>
		<input type="text" [(ngModel)]="email" />
		<input type="button" value="Send Email" (click)="sendEmail()" />
		
		<br /><br />

		<strong>Code:</strong>
		<input type="text" [(ngModel)]="code" />
		<input type="button" value="Verify Code" (click)="verifyCode()" />

		<br /><br />

		<label>
			<input type="checkbox" [(ngModel)]="reconnect" [value]="true" />
			Reconnect database?
		</label>

		<p *ngIf="bodyAnalysis">
			<strong>Body Analysis:</strong> {{ bodyAnalysis }}
		</p>
	`
})
export class AppComponent {

	public bodyAnalysis: string;
	public code: string;
	public email: string;
	public reconnect: boolean;

	private authencationService: AuthenticationService;


	// I initialize the component.
	constructor( authencationService: AuthenticationService ) {
		
		this.authencationService = authencationService;

		this.bodyAnalysis = "";
		this.code = "";
		this.email = "";
		this.reconnect = false;
		
	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I send the one-time use password to the currently-entered email address. The
	// one-time password is valid for about 5-minutes.
	public sendEmail() : void {

		this.code = "";
		this.bodyAnalysis = "";

		this.authencationService.requestEmailCode( this.email )
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

		// Setup the additional params that we want to POST through with the 
		// authorization. This object will be made available in the Rules engine 
		// as a key on the context.request.body object.
		var params = {
			reconnectDatabase: this.reconnect
		};

		// In the following workflow, first, we're going to log the user into the app;
		// then, once the user is authenticated, we'll go back to the Auth0 API to get
		// the user's full profile which includes the "Message" property which is being
		// injected by each of the Auth0 Rules in this demo.
		this.authencationService.verifyEmailCode( this.email, this.code, params )
			.then(
				( authorization: IAuthorization ) : Promise<IProfile> => {

					console.group( "Verify Email Code / Authorization Result" );
					console.log( authorization );
					console.groupEnd();

					// Now that the user is logged-in, go back and get the Profile.
					return( this.authencationService.getUserInfo( authorization.accessToken ) );

				}
			)
			.then(
				( profile: IProfile ) : void => {

					console.group( "Profile Result" );
					console.log( profile );
					console.groupEnd();

					// Pull out the message that was injected by the Rules as part of the
					// inspection of the context.request.body POST collection.
					this.bodyAnalysis = profile.bodyAnalysis;

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
