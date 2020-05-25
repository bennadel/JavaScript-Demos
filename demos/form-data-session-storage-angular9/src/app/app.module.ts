
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { FormValueChangesDirective } from "./form-value-changes.directive";

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
		FormValueChangesDirective
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
