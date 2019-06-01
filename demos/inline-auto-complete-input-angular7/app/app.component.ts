
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<input
			name="value"
			type="text"
			[(ngModel)]="form.value"
			
			[ngModelSuggestions]="suggestions"
			
			autocomplete="off"
			autofocus
			class="input"
		/>

		<p>
			<strong>NgModel Value:</strong> {{ form.value }}
		</p>

		<h2>
			Suggestions:
		</h2>

		<ul>
			<li *ngFor="let suggestion of suggestions">
				{{ suggestion }}
			</li>
		</ul>
	`
})
export class AppComponent {

	public form: {
		value: string;
	};
	public suggestions: string[];

	// I initialize the app component.
	constructor() {

		this.form = {
			value: ""
		};
		this.suggestions = [
			"I like to move it move it",
			"I like big butts and I cannot lie",
			"I like it like that",
			"I like turtles",
			"I like the way you move",
			"I love lamp",
			"I love the way you make me feel",
			"I love that thing you do"
		];

	}

}
