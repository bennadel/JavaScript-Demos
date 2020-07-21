
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ApproachOneComponent } from "./approach-one.component";
import { ApproachThreeComponent } from "./approach-three.component";
import { ApproachThreeEditorComponent } from "./approach-three.component";
import { ApproachTwoComponent } from "./approach-two.component";
import { EditableComponent } from "./editable.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [],
	declarations: [
		AppComponent,
		ApproachOneComponent,
		ApproachThreeComponent,
		ApproachThreeEditorComponent,
 		ApproachTwoComponent,
		EditableComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
