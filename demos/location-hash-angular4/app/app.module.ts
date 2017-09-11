
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { HashLocationStrategy } from "@angular/common";
import { Location } from "@angular/common";
import { LocationStrategy } from "@angular/common";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent
	],
	providers: [
		Location,
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		}
	]
})
export class AppModule {
	// ...
}
