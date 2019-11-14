
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component"
import { RepeatStringPipe } from "./repeat-string.pipe"

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [],
	declarations: [
		AppComponent,
		RepeatStringPipe
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
