
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Item {
	id: number;
	name: string;
	size: number;
	createdAt: number;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<ul>
			<li *ngFor="let item of items">

				<my-item [item]="item"></my-item>

			</li>
		</ul>
	`
})
export class AppComponent {
	
	public items: Item[];
	
	// I initialize the app component.
	constructor() {

		this.items = [
			{ id: 1, name: "One", size: 4, createdAt: Date.now() },
			{ id: 2, name: "Two", size: 38, createdAt: Date.now() },
			{ id: 3, name: "Three", size: 4, createdAt: Date.now() },
			{ id: 4, name: "Four", size: 128, createdAt: Date.now() },
			{ id: 5, name: "Five", size: 79, createdAt: Date.now() }
		];

	}

}
