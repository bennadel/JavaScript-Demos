
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template: 
	`
		<p class="actions">
			<strong>Values:</strong>

			<ng-template ngFor let-i [ngForOf]="[ 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ]">

				<a (click)="setValue( i )" [class.selected]="( i === value )">
					{{ i }}
				</a>

			</ng-template>
		</p>

		<p class="bar" [style.width.%]="value">
			{{ value }} % <span>percentage relative to parent container</span>
		</p>

		<p class="bar" [style.width.px]="value">
			{{ value }} px <span>absolute pixel</span>
		</p>

		<p class="bar" [style.width.em]="value">
			{{ value }} em <span>the calculated font-size of the element</span>
		</p>

		<p class="bar" [style.width.ex]="value">
			{{ value }} ex <span>the x-height of the elements font</span>
		</p>

		<p class="bar" [style.width.vh]="value">
			{{ value }} vh <span>1% of the height of viewports initial containing block</span>
		</p>

		<p class="bar" [style.width.vw]="value">
			{{ value }} vw <span>1% of the width of viewports initial containing block</span>
		</p>

		<p class="bar" [style.width.vmin]="value">
			{{ value }} vmin <span>the smaller of vw or vh</span>
		</p>

		<p class="bar" [style.width.vmax]="value">
			{{ value }} vmax <span>the larger of vw or vh</span>
		</p>

		<p class="bar" [style.width.mm]="value">
			{{ value }} mm <span>millimeter</span>
		</p>

		<p class="bar" [style.width.cm]="value">
			{{ value }} cm <span>centimeter</span>
		</p>

		<p class="bar" [style.width.in]="value">
			{{ value }} in <span>inch</span>
		</p>

		<p class="bar" [style.width.pt]="value">
			{{ value }} pt
		</p>

		<p class="bar" [style.width.pc]="value">
			{{ value }} pc
		</p>

		<p class="bar" [style.width.ch]="value">
			{{ value }} ch
		</p>

		<p class="bar" [style.width.rem]="value">
			{{ value }} rem
		</p>		

		<h2>
			These dont seem to work in Chrome.
		</h2>

		<p class="bar" [style.width.cap]="value">
			{{ value }} cap <span>the "cap height" (nominal height of capital letters) of the elements font</span>
		</p>

		<p class="bar" [style.width.ic]="value">
			{{ value }} ic
		</p>

		<p class="bar" [style.width.lh]="value">
			{{ value }} lh <span>the computed value of the line-height property of the element on which it is used</span>
		</p>

		<p class="bar" [style.width.rlh]="value">
			{{ value }} rlh
		</p>

		<p class="bar" [style.width.vi]="value">
			{{ value }} vi
		</p>

		<p class="bar" [style.width.vb]="value">
			{{ value }} vb
		</p>

		<p class="bar" [style.width.q]="value">
			{{ value }} q <span>quarter of a millimeter</span>
		</p>
	`
})
export class AppComponent {

	public value: number;


	// I initialize the app component.
	constructor() {

		this.value = 50;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I set the value used to display the various dimensional units.
	public setValue( value: number ) : void {

		this.value = value;

	}

}
