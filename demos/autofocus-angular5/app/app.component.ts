
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="toggleFirst()">Toggle First</a>
		</p>

		<div *ngIf="isShowingFirst">
			<input type="text" autofocus placeholder="This should autofocus..." />
		</div>

		<p>
			<a (click)="toggleSecond( 'one' )">Toggle Second ( one )</a> &mdash;
			<a (click)="toggleSecond( 'two' )">Toggle Second ( two )</a> &mdash;
			<a (click)="toggleSecond( 'three' )">Toggle Second ( three )</a>
		</p>

		<div *ngIf="isShowingSecond">
			<input type="text" [appAutofocus]="( focus === 'one' )" placeholder="Field one..." />
			<input type="text" [appAutofocus]="( focus === 'two' )" placeholder="Field two..." />
			<input type="text" [appAutofocus]="( focus === 'three' )" placeholder="Field three..." />

			Set Focus:
			<a (click)="setFocus( 'one' )">one</a>,
			<a (click)="setFocus( 'two' )">two</a>,
			<a (click)="setFocus( 'three' )">three</a>
		</div>

	`
})
export class AppComponent {
	
	public focus: string;
	public isShowingFirst: boolean;
	public isShowingSecond: boolean;

	// I initialize the app component.
	constructor() {

		this.focus = "";
		this.isShowingFirst = false;
		this.isShowingSecond = false;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I define which field in should be focused.
	public setFocus( fieldToFocus: string ) : void {

		this.focus = fieldToFocus;

	}


	// I toggle the first set of inputs.
	public toggleFirst() : void {

		this.isShowingFirst = ! this.isShowingFirst;

	}


	// I toggle the second set of inputs.
	public toggleSecond( fieldToFocus: string ) : void {

		this.isShowingSecond = ! this.isShowingSecond;
		this.setFocus( fieldToFocus );

	}

}
