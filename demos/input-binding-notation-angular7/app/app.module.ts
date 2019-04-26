
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { CustomPropDirective } from "./app.component";
import { CustomProp2Directive } from "./app.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		AppComponent,
		CustomPropDirective,
		CustomProp2Directive
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
