
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { APP_INITIALIZER_PROVIDERS } from "./app.initializer";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule
	],
	bootstrap: [
		AppComponent
	],
	declarations: [
		AppComponent
	],
	providers: [
		APP_INITIALIZER_PROVIDERS
	]
})
export class AppModule {
	// ...
}
