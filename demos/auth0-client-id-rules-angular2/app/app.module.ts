
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { AuthenticationService } from "./authentication.service";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule, FormsModule ],
	providers: [
		// In previous demos, we've had Angular instantiate the AuthenticationService
		// class (since we only had one of them in the application); but, in this demo,
		// we're going to defer instantiation of the AuthenicationService to the root 
		// component. As such, we're going to use the "useValue" directive to tell 
		// Angular we want to inject the Class Definition itself, not an instance of 
		// the class, into the root component.
		{
			provide: AuthenticationService,
			useValue: AuthenticationService // <-- Inject Class, not instance.
		}
	],
	declarations: [ AppComponent ]
})
export class AppModule {
	// ...
}
