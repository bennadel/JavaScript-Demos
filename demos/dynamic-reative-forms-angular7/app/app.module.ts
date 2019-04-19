
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ReactiveFormComponent } from "./reactive-form.component";
import { TemplateFormComponent } from "./template-form.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent,
		ReactiveFormComponent,
		TemplateFormComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
