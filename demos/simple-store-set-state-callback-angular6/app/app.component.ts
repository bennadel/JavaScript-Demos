
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs";

// Import the application components and services.
import { SimpleStore } from "./simple.store";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface CounterStore {
	counter: number;
};

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p class="counter">
			<strong>Counter:</strong> {{ counter | async }}
		</p>

		<p class="buttons">
			<button (click)="increment( 1 )"> Increment </button>
			<button (click)="increment( -1 )"> Decrement </button>
		</p>
	`
})
export class AppComponent {

	public counter: Observable<number>;

	private counterStore: SimpleStore<CounterStore>;

	// I initialize the app component.
	constructor() {

		this.counterStore = new SimpleStore({
			counter: 0
		});
		this.counter = this.counterStore.select( "counter" );

		// Use normal "partial" to update the simple store.
		this.counterStore.setState({
			counter: 10
		});

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I increment the counter value in the simple store.
	public increment( delta: number ) : void {

		// Use updater "function" to update the simple store.
		this.counterStore.setState(
			( state ) => {

				return({
					counter: ( state.counter + delta )
				});

			}
		);

	}

}
