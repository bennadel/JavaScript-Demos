
// Import vendor modules.
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { inject } from "@angular/core";

// Import app modules.
import { ViewHelper } from "./view-helper.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Item {
	id: number;
	name: string;
};

interface ItemForm {
	newItem: string;
};

@Component({
	selector: "app-demo",
	standalone: true,
	// By providing the ViewHelper in the component-level providers, it will uniquely
	// instantiate the service for each instance of this component. This is important
	// because it means that the ViewHelper service will also be DESTROYED when this
	// component is destroyed, which gives the ViewHelper full-access to the component's
	// life-cycle (construction and destruction).
	providers:[
		ViewHelper
	],
	imports: [
		FormsModule
	],
	styleUrl: "./demo.component.less",
	templateUrl: "./demo.component.html"
})
export class DemoComponent {

	private viewHelper = inject( ViewHelper );

	public items: Item[] = [
		{ id: 1, name: "One" },
		{ id: 2, name: "Two" },
		{ id: 3, name: "Three" },
		{ id: 4, name: "Four" },
		{ id: 5, name: "Five" },
		{ id: 6, name: "Six" }
	];
	public latestItemID: number = 0;
	public toast: string = "";
	public form: ItemForm = {
		newItem: ""
	};

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I process the new item form and add a new item to the collection.
	*/
	public addItem() {

		if ( ! this.form.newItem ) {

			return;

		}

		var newItem = {
			id: Date.now(),
			name: this.form.newItem
		};

		this.form.newItem = "";
		this.items.push( newItem );
		this.latestItemID = newItem.id;
		this.toast = `Your item (${ newItem.name }) has been added!`;

		// After we add the new item, we need to give Angular a chance to reconcile the
		// view and the view-model. If we try to scroll to the new item too early, it
		// won't yet exist in the DOM. We have to wait until Angular has finished the next
		// render before we know that our <LI> will be accessible.
		this.viewHelper.tick(
			() => {

				document.querySelector( `#item-${ newItem.id }` )
					?.scrollIntoView({
						behavior: "smooth",
						block: "center"
					})
				;

				console.log(
					`%cScrolling to new item (${ newItem.name }).`,
					"color: #999999; font-style: italic"
				);

			}
		);

		// After the new item is added, we're showing a toast message. In a few seconds,
		// we need to hide the toast message. However, if the user adds several items in
		// quick succession, we want to CLEAR and RESET the timer so that we don't close
		// the latest toast message too quickly.
		this.viewHelper.resetTimeout(
			"clear-toast",
			() => {

				this.toast = "";

				console.log(
					"%cClearing toast message.",
					"color: #999999; font-style: italic"
				);

			},
			3000
		);

	}

}
