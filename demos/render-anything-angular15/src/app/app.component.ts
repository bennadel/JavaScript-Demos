
// Import core Angular modules.
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Import application modules.
import { MessengerComponent } from "./messenger.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		MessengerComponent
	],
	templateUrl: "./app.component.html",
	styleUrls: [ "./app.component.less" ]
})
export class AppComponent {

	public name: string = "Kimmie";

}
