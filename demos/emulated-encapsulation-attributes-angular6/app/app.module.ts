
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ThingAComponent } from "./thing-a.component";
import { ThingBComponent } from "./thing-b.component";
import { ThingCComponent } from "./thing-c.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent,
		ThingAComponent,
		ThingBComponent,
		ThingCComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
