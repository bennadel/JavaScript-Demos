
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public movies: string[] = [
		"Predator: Hunting Grounds", "Terminator: Dark Fate", "Killing Gunther",
		"Aftermath", "Terminator Genisys", "The Expendables 3", "Sabotage",
		"Escape Plan", "The Last Stand", "The Expendables 2", "The Expendables",
		"Terminator 3: Rise of the Machines", "The Rundown", "Collateral Damage",
		"The 6th Day", "End of Days", "Batman & Robin", "Jingle All the Way",
		"Eraser", "Junior", "True Lies", "Last Action Hero", "Dave", "Lincoln",
		"Christmas in Connecticut", "Terminator 2: Judgment Day",
		"Kindergarten Cop", "Total Recall", "Twins", "Red Heat", "The Running Man",
		"Predator", "Raw Deal", "Commando", "Red Sonja", "The Terminator",
		"Conan the Destroyer", "Conan the Barbarian", "Stay Hungry",
		"Hercules in New York"
	];

}
