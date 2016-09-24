
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AccountService } from "./account.service";
import { AppComponent } from "./app.component";
import { AppReadyEvent } from "./app-ready-event";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule ],
	declarations: [ AppComponent ],
	providers: [ 
		AccountService,
		AppReadyEvent
	]
})
export class AppModule {
	// ... nothing to do here.
}
