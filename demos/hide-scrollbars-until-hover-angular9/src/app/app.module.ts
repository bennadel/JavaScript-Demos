
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ScrollOnMouseenterComponent } from "./scroll-on-mouseenter.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [],
	declarations: [
		AppComponent,
		ScrollOnMouseenterComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
