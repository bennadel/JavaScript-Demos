
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { NgPureForDirective } from "./ng-pure-for.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent,
		NgPureForDirective
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
