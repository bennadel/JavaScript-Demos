
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p class="controls">
			<strong>Position:</strong>
			<a (click)="reposition( 'center' )">Center</a>
			<a (click)="reposition( 'top-left' )">Top-Left</a>
			<a (click)="reposition( 'top-right' )">Top-Right</a>
			<a (click)="reposition( 'bottom-right' )">Bottom-Right</a>
			<a (click)="reposition( 'bottom-left' )">Bottom-Left</a>
		</p>

		<app-html-select [(value)]="bff" [class]="menuClass">

			<app-html-select-root [ngSwitch]="( bff === null )">
				<ng-template [ngSwitchCase]="true">
					Select your bestie!
				</ng-template>
				<ng-template [ngSwitchCase]="false">
					<strong>{{ bff }}</strong> is my bestie!
				</ng-template>
			</app-html-select-root>

			<app-html-select-option [value]="null">
				I have no friends....
			</app-html-select-option>

			<app-html-select-option
				*ngFor="let friend of friends"
				[value]="friend"
				[class.selected]="( friend === bff )">

				{{ friend }}

			</app-html-select-option>

		</app-html-select>
	`
})
export class AppComponent {

	public bff: string | null;
	public friends: string[];
	public menuClass: string;

	// I initialize the app component.
	constructor() {

		this.bff = null;
		this.friends = [
			"Kim", "Joe", "Kit", "Tom", "Henry", "Hanna", "Dave", "Ellen", "Tina",
			"Bobby", "Todd", "Pam", "Zena The Warrior Princess"
		];
		this.menuClass = "center";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I reposition the html-select menu so that we can see how it behaves when it gets
	// close to one of the viewport edges.
	public reposition( newMenuClass: string ) : void {

		this.menuClass = newMenuClass;

	}

}
