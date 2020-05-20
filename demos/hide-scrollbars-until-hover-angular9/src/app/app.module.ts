
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ScrollOnMouseenterComponent } from "./scroll-on-mouseenter.component";
import { ScrollOnMouseenter2Component } from "./scroll-on-mouseenter2.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [],
	declarations: [
		AppComponent,
		ScrollOnMouseenterComponent,
		ScrollOnMouseenter2Component
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
