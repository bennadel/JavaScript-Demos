
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ContactComponent } from "./contact.component";
import { DSOptionComponent } from "./ds-select.component";
import { DSOptionsGroupComponent } from "./ds-select.component";
import { DSSelectComponent } from "./ds-select.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [],
	declarations: [
		AppComponent,
		ContactComponent,
		DSOptionComponent,
		DSOptionsGroupComponent,
		DSSelectComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
