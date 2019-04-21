
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ReactiveBridgeDirective } from "./form-event-bridge.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		AppComponent,
		ReactiveBridgeDirective
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
