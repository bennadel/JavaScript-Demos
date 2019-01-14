
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div class="counter">
			<button (click)="( counter = counter - 1 )" class="counter__left">

				<app-icon
					type="chevron-circle-left"
					title="Decrement Counter"
					class="counter__icon">
				</app-icon>

			</button>
			<div class="counter__value">

				{{ counter }}

			</div>
			<button (click)="( counter = counter + 1 )" class="counter__right">

				<app-icon
					type="chevron-circle-right"
					title="Increment Counter"
					class="counter__icon">
				</app-icon>

			</button>
		</div>


		<!-- To demonstrate what the rendered HTML looks like without [title]. -->
		<div class="small-icons">
			<app-icon type="chevron-left"></app-icon>
			<app-icon type="chevron-up"></app-icon>
			<app-icon type="chevron-right"></app-icon>
			<app-icon type="chevron-down"></app-icon>
		</div>
	`
})
export class AppComponent {

	public counter: number = 0;

}
