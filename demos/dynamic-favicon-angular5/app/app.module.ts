
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { BROWSER_FAVICONS_CONFIG } from "./favicons";
import { BrowserFavicons } from "./favicons";
import { Favicons } from "./favicons";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent
	],
	providers: [
		// The Favicons is an abstract class that represents the dependency-injection
		// token and the API contract. THe BrowserFavicon is the browser-oriented
		// implementation of the service.
		{
			provide: Favicons,
			useClass: BrowserFavicons
		},
		// The BROWSER_FAVICONS_CONFIG sets up the favicon definitions for the browser-
		// based implementation. This way, the rest of the application only needs to know
		// the identifiers (ie, "happy", "default") - it doesn't need to know the paths 
		// or the types. This allows the favicons to be modified independently without 
		// coupling too tightly to the rest of the code.
		{
			provide: BROWSER_FAVICONS_CONFIG,
			useValue: {
				icons: {
					"square": {
						type: "image/png",
						href: "./icons/default.png",
						isDefault: true
					},
					"happy": {
						type: "image/jpeg",
						href: "./icons/happy.jpg"
					},
					"indifferent": {
						type: "image/png",
						href: "./icons/indifferent.png"
					},
					"sad": {
						type: "image/jpeg",
						href: "./icons/sad.jpg"
					}
				},

				// I determine whether or not a random token is auto-appended to the HREF
				// values whenever an icon is injected into the document.
				cacheBusting: true
			}
		}
	]
})
export class AppModule {
	// ...
}
