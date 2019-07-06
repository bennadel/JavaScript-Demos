
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { FriendCardComponent } from "./friend-card.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [],
	declarations: [
		AppComponent,
		FriendCardComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
