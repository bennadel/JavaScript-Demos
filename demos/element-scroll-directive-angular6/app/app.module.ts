
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ElementScrollPercentageDirective } from "./element-scroll-percentage.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent,
		ElementScrollPercentageDirective
	]
})
export class AppModule {
	// ...
}
