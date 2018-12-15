
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ToggleListComponent } from "./toggle-list.component";
import { ToggleListItemComponent } from "./toggle-list.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent,
		ToggleListComponent,
		ToggleListItemComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
