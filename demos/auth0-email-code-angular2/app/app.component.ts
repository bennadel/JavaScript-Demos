
// Import the core angular services.
import { Component } from "@angular/core";

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
		<strong>Email:</strong>
		<input type="text" [value]="email" (input)="email = $event.target.value;" />
		<input type="button" value="Send Email" (click)="sendEmail()" />
		
		<br /><br />

		<strong>Code:</strong>
		<input type="text" [value]="code" (input)="code = $event.target.value;" />
		<input type="button" value="Verify Code" (click)="verifyCode()" />
		
		<div *ngIf="name">

			<h3>
				Welcome {{ name }}
			</h3>

			<img [src]="avatarUrl" />

		</div>
	`
})
export class AppComponent {

	public avatarUrl: string;
	public code: string;
	public email: string;
	public name: string;

	private authenticationService: AuthenticationService;


	// I initialize the component.
	constructor( authenticationService: AuthenticationService ) {
		
		this.authenticationService = authenticationService;

		this.email = "";
		this.code = "";

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I send the one-time use password to the currently-entered email address. The
	// one-time password is valid for about 5-minutes.
	public sendEmail() : void {

		this.code = "";

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

		// In the following workflow, first, we're going to log the user into the app;
		// then, once the user is authenticated, we'll go back to the Auth0 API to get
		// the user's full profile (included persisted metadata).
		this.authenticationService
			.verifyEmailCode( this.email, this.code )
			.then(
				( authorization: IAuthorization ) : Promise<IProfile> => {

					console.group( "Verify Email Code / Authorization Result" );
					console.log( authorization );
					console.groupEnd();

					// Now that the user is logged-in, let's go back to the API to get
					// the full user profile.
					// --
					// NOTE: There is an earlier API method call .getProfile() which 
					// takes the idToken. That workflow, however, is being deprecated 
					// in favor of a new workflow that emphasizes accessToken.
					return( this.authenticationService.getUserInfo( authorization.accessToken ) );

				}
			)
			.then(
				( profile: IProfile ) : void => {

					console.group( "Profile Result" );
					console.log( profile );
					console.groupEnd();

					this.name = profile.nickname;
					this.avatarUrl = profile.picture;

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
