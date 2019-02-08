
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { PopupComponent } from "./popup.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent,
		PopupComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
