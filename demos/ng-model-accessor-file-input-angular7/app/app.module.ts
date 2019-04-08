
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { FileInputValueAccessor } from "./file-input.accessor";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		AppComponent,
		FileInputValueAccessor
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
