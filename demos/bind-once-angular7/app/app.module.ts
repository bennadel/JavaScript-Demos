
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { BindOnceDirective } from "./bind-once.directive";
import { LogDoCheckDirective } from "./log-do-check.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		AppComponent,
		BindOnceDirective,
		LogDoCheckDirective
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
