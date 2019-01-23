
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { MyServiceModule } from "./my-service/my-service.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		// When importing the MyServiceModule, we can provide optional configuration
		// data. This will be used, under the hood, to instantiate the MyServiceOptions
		// and MySerivce classes.
		MyServiceModule.forRoot({
			retryInterval: 5000,
			retryCount: 3
		})
	],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
