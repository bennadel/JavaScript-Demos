
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { IncrementingInputDirective } from "./incrementing-input.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [],
	declarations: [
		AppComponent,
		IncrementingInputDirective
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
