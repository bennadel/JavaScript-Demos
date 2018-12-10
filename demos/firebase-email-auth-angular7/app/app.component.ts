
// Import the core angular services.
import { Component } from "@angular/core";
import firebase = require( "firebase/app" );
import { OnInit } from "@angular/core";

// Import these libraries for their side-effects.
// --
// NOTE: These libraries augment the firebase module. If you don't include the following
// module, for example, then the "firebase.auth()" method won't be available.
import "firebase/auth";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	id: string;
	email: string;
}

type View = "loading" | "login" | "sent" | "authenticate" | "home";

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.htm"
})
export class AppComponent implements OnInit {

	public errorMessage: string | null;
	public user: User | null;
	public view: View;
	
	// I initialize the app component.
	constructor() {

		this.errorMessage = null;
		this.user = null;
		this.view = "loading";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I complete the magic email link authentication workflow, signing the user with the
	// given email into a Firebase user session.
	public authenticate( email: string ) : void {

		firebase.auth()
			// NOTE: Firebase web sessions are long-lived by default (and required an
			// explicit sign-out). If you want to control the persistence approach for
			// the session, you have to explicitly tell Firebase what to do.
			// --
			// READ MORE: https://firebase.google.com/docs/auth/web/auth-state-persistence
			.signInWithEmailLink( email, window.location.href )
			.then(
				( result: firebase.auth.UserCredential ) => {

					// NOTE: Since the user is Typed as being optional, we have to check
					// for it or TypeScript will complain.
					if ( result.user && result.user.uid && result.user.email ) {

						this.view = "home";
						this.errorMessage = null;
						this.user = {
							id: result.user.uid,
							email: result.user.email
						};

						// At this point, the user has fully authenticated; but, the
						// magic email link is still represented in the browser URL.
						// As such, if the user were to refresh the browser, it would
						// take them back to this page (with an invalid token). To help
						// prevent this edge-case, let's redirect the user back to the
						// root of the application such that a refresh would be safe.
						// --
						// NOTE: We can't use the Location service for this because it
						// can only handle in-app URLs and the Firebase URI components
						// may extend outside of our app context (depending on our
						// Angular location strategy).
						if ( window.history.replaceState ) {

							window.history.replaceState( null, "", this.getAppRootUrl() );

						} else {

							window.location.href = this.getAppRootUrl();

						}

					} else {

						this.errorMessage = "Something unexpected happened";

					}

				},
				( error: any ) => {

					console.warn( "Authentication failed" );
					console.error( error );

					switch ( error.code || "" ) {
						case "auth/expired-action-code":
						case "auth/invalid-action-code":
						case "auth/invalid-email":
						case "auth/user-disabled":
							this.errorMessage = error.message;
						break;
						default:
							this.errorMessage = "Something unexpected happened";
						break;
					}

				}
			)
		;

	}


	// I get called once after the input bindings have been checked for the first time.
	public ngOnInit() : void {

		// Configure our Firebase instance.
		firebase.initializeApp({
			apiKey: "AIzaSyBvifzQI6GNzQIVf-2IOTeDYS3oj6i5p1Y",
			authDomain: "fir-auth-demo-eb4d9.firebaseapp.com",
			databaseURL: "https://fir-auth-demo-eb4d9.firebaseio.com",
			projectId: "fir-auth-demo-eb4d9",
			storageBucket: "fir-auth-demo-eb4d9.appspot.com",
			messagingSenderId: "426562040801"
		});

		// After we initialize Firebase, we want to leave the app in a loading state
		// until we know whether the current user is logged-in or logged-out. The user
		// state is managed internally by Firebase and is not available right away.
		var stopListening = firebase.auth().onAuthStateChanged(
			( user: firebase.User ) => {

				// For the sake of this demo, we only care about the authentication state
				// change on the initial load. For all other actions, we will be able to
				// determine user status based on the contextual promises.
				stopListening();

				// NOTE: The uid and email fields are both marked as optional; as such,
				// we have to check for their existence or TypeScript will complain.
				if ( user && user.uid && user.email ) {

					this.user = {
						id: user.uid,
						email: user.email
					}
					
				}

				// If the current request denotes an authentication URL, then that will
				// take precedence over other rendering options.
				// --
				// NOTE: If we had stored the email in a persistent storage like
				// localStorage, then we could handle this workflow automatically.
				// However, in order to keep the demo as simple as possible (and to make
				// it easier to test different error conditions), I'm going to have the
				// user explicitly confirm their email address.
				if ( firebase.auth().isSignInWithEmailLink( window.location.href ) ) {

					this.view = "authenticate";

				} else {

					this.view = ( this.user )
						? "home"
						: "login"
					;

				}

			}
		);

	}


	// I send the magic email link that allows the user to log into the application using
	// just an email address (ie, passwordless login).
	public sendMagicLink( email: string ) : void {

		// When we send out the magic email link, we have to provide a fully-qualified
		// public URL that Firebase can redirect the user back to at the end of the link
		// consumption. For the purposes of this demo, this URL will just be the root of
		// the demo application.
		// --
		// NOTE: If you wanted to include "state" in the email workflow, you can could
		// provide a URL that contains route-parameters or query-string values.
		firebase.auth()
			.sendSignInLinkToEmail(
				email,
				{
					url: this.getAppRootUrl(),
					handleCodeInApp: true
				}
			)
			.then(
				( response ) => {

					this.view = "sent";
					this.errorMessage = null;

				},
				( error: any ) => {

					console.warn( "ERROR:" );
					console.error( error );

					switch ( error.code || "" ) {
						case "auth/argument-error":
						case "auth/invalid-email":
						case "auth/missing-android-pkg-name":
						case "auth/missing-continue-uri":
						case "auth/missing-ios-bundle-id":
						case "auth/invalid-continue-uri":
						case "auth/unauthorized-continue-uri":
						case "auth/invalid-dynamic-link-domain":
							this.errorMessage = error.message;
						break;
						default:
							this.errorMessage = "Something unexpected happened";
						break;
					}

				}
			)
		;

	}


	// I switch to the given view.
	public setView( view: View ) : void {

		this.view = view;
		this.errorMessage = null;

	}


	// I sign the user out of the current Firebase user session.
	public signout() : void {

		// NOTE: Firebase web-based user session are long-lived by default. If you want
		// to sign-out, you have to do so explicitly with an API call.
		firebase.auth().signOut().then(
			() => {

				this.view = "login";
				this.errorMessage = null;

			},
			( error: any ) => {

				console.warn( "Sign-out failure." );
				console.error( error );

				this.errorMessage = "Something unexpected happened.";

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I return the URL context for the ingress into the application. This will act as
	// the prefix for external URLs as well as the root of the application that we can
	// redirect to once authentication has been completed.
	private getAppRootUrl() : string {

		// Since the demo may be running locally or on GitHub; and, using the Hash or
		// Path location strategy; we need to calculate the the ingress using the the
		// name of the demo folder that we know we're in.
		var folder = "/firebase-email-auth-angular7/";

		// Find the index of this folder in the browser URL.
		var folderIndex = window.location.href.indexOf( folder );

		// Return the URL prefix up-to and including the demo folder. This will be the
		// base off of which we append all internal app-URLs.
		return( window.location.href.slice( 0, ( folderIndex + folder.length ) ) );

	}

}
