
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component"
import { DemoContentComponent } from "./demo-content.component"
import { OverlayComponent } from "./overlay.component"

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [],
	declarations: [
		AppComponent,
		DemoContentComponent,
		OverlayComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
