
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { AuthenticationService } from "./authentication.service";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule, FormsModule, HttpModule ],
	providers: [ AuthenticationService ],
	declarations: [ AppComponent ]
})
export class AppModule {
	// ...
}
