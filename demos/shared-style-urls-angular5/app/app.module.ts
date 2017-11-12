
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { WidgetOneComponent } from "./widget-one.component";
import { WidgetTwoComponent } from "./widget-two.component";

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
		WidgetOneComponent,
		WidgetTwoComponent
	]
})
export class AppModule {
	// ...
}
