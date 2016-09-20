
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AccountService } from "./account.service";
import { AppComponent } from "./app.component";
import { DOMEvents } from "./dom-events";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule ],
	declarations: [ AppComponent ],
	providers: [ 
		AccountService,
		DOMEvents
	]
})
export class AppModule {
	// ... nothing to do here.
}
