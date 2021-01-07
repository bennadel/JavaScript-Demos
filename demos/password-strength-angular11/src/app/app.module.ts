
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { Provider } from "@angular/core";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { PasswordStrengthModule } from "./password-strength/password-strength.module";
import { PasswordStrengthService } from "./password-strength/password-strength.module";
import { Strength } from "./password-strength/password-strength.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I can override the PasswordStrengthModule's default implementation of the password
// strength calculation.
export class SillyPasswordStrengthService implements PasswordStrengthService {

	// I evaluate the strength of the given password value.
	public evaluatePassword( value: string ) : number {

		console.log( "Evaluating silly password:", value );

		if ( value.length < 20 ) {

			return( Strength.VERY_WEAK );

		} else {

			return( Strength.EXCELLENT );

		}

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var demoProviders: Provider[] = [];

// If the query-string starts with "silly" we're going to OVERRIDE the password strength
// service, using our "silly" version above. Otherwise, we'll use the default one that
// comes withe module. Notice that we don't have to override anything else!
if ( window.location.search.indexOf( "?silly" ) === 0 ) {

	console.warn( "Using silly override service!" );

	demoProviders.push({
		provide: PasswordStrengthService,
		useClass: SillyPasswordStrengthService
	});

}

@NgModule({
	imports: [
		BrowserModule,
		PasswordStrengthModule
	],
	providers: demoProviders,
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
