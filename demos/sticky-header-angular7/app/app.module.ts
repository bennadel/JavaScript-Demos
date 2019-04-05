
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { StickyHeaderComponent } from "./sticky-header.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent,
		StickyHeaderComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
