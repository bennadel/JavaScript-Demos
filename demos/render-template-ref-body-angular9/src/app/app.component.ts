
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="toggleContent()">Toggle Content</a>
		</p>

		<!--
			The content below this component will be projected into the Body.
			--
			NOTE: I'm using the term "projected" loosely here. The content is still
			technically projected into the BodyContent component; but, it is, in turn,
			moved into the document.body node.
		-->
		<app-body-content *ngIf="isShowingContent">

			The time is: {{ time.toTimeString() }}.

			<p [ngSwitch]="( time.getSeconds() % 2 )">
				<ng-template [ngSwitchCase]="0">
					The seconds are: even.
				</ng-template>
				<ng-template [ngSwitchCase]="1">
					The seconds are: odd.
				</ng-template>
			</p>

			<div *ngFor="let recording of recordings">
				{{ recording }}
			</div>

		</app-body-content>
	`
})
export class AppComponent {

	public isShowingContent: boolean;
	public recordings: any[];
	public time: Date;

	// I initialize the app component.
	constructor() {

		this.isShowingContent = false;
		this.recordings = [];
		this.time = new Date();

		setInterval(
			() => {
				this.time = new Date();
				this.recordings.unshift( this.time );
			},
			1000
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I toggle the rendering of the body-content component.
	public toggleContent() : void {

		this.isShowingContent = ! this.isShowingContent;

	}

}
