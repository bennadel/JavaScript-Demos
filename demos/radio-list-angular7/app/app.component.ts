
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Plan {
	id: number;
	name: string;
	description: string;
	price: number;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<bn-toggle-list [(value)]="selectedPlan" class="list-one">
			<bn-toggle-list-item *ngFor="let plan of plans" [value]="plan">

				{{ plan.name }}

			</bn-toggle-list-item>
		</bn-toggle-list>
	`
})
export class AppComponent {

	public plans: Plan[];
	public selectedPlan: Plan | null;

	constructor() {

		this.selectedPlan = null;
		this.plans = [
			{
				id: 1,
				name: "Free",
				description: "For developers",
				price: 0
			},
			{
				id: 2,
				name: "Starter",
				description: "For small companies",
				price: 7
			},
			{
				id: 3,
				name: "Pro",
				description: "For agenecies.",
				price: 25
			},
			{
				id: 4,
				name: "Enterprise",
				description: "For global companies",
				price: 150
			}
		];

	}


	public logChange( plan: Plan ) : void {

		console.log( "selected plan:", plan );

	}

}
