
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component"
import { HtmlSelectComponent } from "./html-select.component"

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [],
	declarations: [
		AppComponent,
		HtmlSelectComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
