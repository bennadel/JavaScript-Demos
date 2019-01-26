
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { TagsInputModule } from "./tags-input/tags-input.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		TagsInputModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
