
// Import the core angular services.
import { AfterViewInit } from "@angular/core";
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-popup",
	styleUrls: [ "./popup.component.less" ],
	template:
	`
		<svg class="svg" style="display: none ;">
			<defs>
				<filter id="shadow">
					<feDropShadow
						dx="0"
						dy="2"
						stdDeviation="1"
						flood-color="#000000"
						flood-opacity="0.4"
					/>
				</filter>
			</defs>

			<path
				fill="#fafafa"
				stroke="#666666"
				stroke-width="1"
				vector-effect="non-scaling-stroke"
				style="filter: url( #shadow ) ;"
			/>
		</svg>

		<div class="content">
			<ng-content></ng-content>
		</div>
	`
})
export class PopupComponent implements AfterViewInit {

	private elementRef: ElementRef;

	// I initialize the pop-up component.
	constructor( elementRef: ElementRef ) {

		this.elementRef = elementRef;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called after the view and content have been initialized.
	public ngAfterViewInit() : void {

		// NOTE: Since we are updating the VIEW settings based on the DIMENSIONS OF THE
		// RENDERED VIEW, we are going to set the element attributes explicitly (not
		// declaratively using template bindings). If we try to use template bindings,
		// we'll get errors about values being changed after they were already checked.
		// As such, we'll just skip the bindings and just DO IT LIVE!

		var element = this.elementRef.nativeElement;
		var svg = element.querySelector( "svg" );
		var path = svg.querySelector( "path" );

		// We are going to scale the SVG based on the dimensions of the host element.
		// This way, we can have the SVG scale relative to the projected content.
		var rect = element.getBoundingClientRect();

		// We can't just fit the SVG PATH to the bounds of the host element. If we do
		// this, we'll end up clipping the drop-shadow and parts of the border. As such,
		// we have to make the dimensions of the path SMALLER than the viewBox.
		// --
		// CAUTION: These numbers were just trial-and-error until stuff stopped getting
		// clipped. I am not sure why the viewBox needs more room on the right???
		var width = ( rect.width - 8 );
		var height = ( rect.height - 8 );
		var halfWidth = ( width / 2 );

		// Again, we need to offset the viewBox so that we don't clip the path and its
		// drop shadow.
		var svgViewBox = `-3 -3 ${ width + 5 } ${ height + 5 }`;

		// In order to size the SVG using 9-slice scaling, we have to calculate the path
		// points based on the available space. As such, we're going to use template
		// strings with interpolated maths.
		// --
		// NOTE: In order to make things a little easier, the CURVE segments (c) have
		// been converted to use "relative" values. This makes them independent of the
		// size of the overall path.
		var svgPath = [
			`M 0,7`,
			// Top-left corner.
			`c 0,-3.8634033203125 3.1365966796875,-7 7,-7`,
			`L ${ width - 7 },0`,
			// Top-right corner.
			`c 3.1365966796875,0 7,3.1365966796875 7,7`,
			`L ${ width },${ height - 7 - 12 }`,
			// Bottom-right corner.
			`c 0,3.8634033203125 -3.1365966796875,7 -7,7`,
			// Carrot-start.
			`L ${ halfWidth + 7 },${ height - 12 }`,
			`L ${ halfWidth },${ height }`,
			`L ${ halfWidth - 7 },${ height - 12 }`,
			// Carrot-end.
			`L 7,${ height - 12 }`,
			// Bottom-left corner.
			`c -3.8634033203125,0 -7,-3.1365966796875 -7,-7`,
			`L 0,7`,
			`Z`
		];

		// Update the SVG properties and render the element in the view.
		svg.setAttribute( "viewBox", svgViewBox );
		path.setAttribute( "d", svgPath.join( "\n" ) );
		svg.style.display = "block";

	}

}
