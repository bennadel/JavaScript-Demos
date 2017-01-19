
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<my-layout>

			<ng-container role="header">
				This is my header content.
			</ng-container>

			<p>
				This is some body content.
			</p>

			<p>
				And some more content, which is so good.
			</p>

			<ng-container role="footer">
				This is my footer content.
			</ng-container>

		</my-layout>
	`
})
export class AppComponent {
	// ...
}
