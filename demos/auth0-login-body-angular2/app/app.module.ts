
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { AuthenticationService } from "./authentication.service";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule, FormsModule ],
	providers: [ AuthenticationService ],
	declarations: [ AppComponent ]
})
export class AppModule {
	// ...
}
