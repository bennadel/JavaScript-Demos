
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule
	],
	declarations: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
