
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-slider",
	inputs: [
		"value",
		"min",
		"max"
	],
	outputs: [
		"valueChangeEvents: valueChange"
	],
	host: {
		"[title]": "value"
	},
	queries: {
		"trackRef": new ViewChild( "trackRef" )
	},
	styleUrls: [ "./slider.component.less" ],
	template:
	`
		<div #trackRef class="track">
			<div class="value" [style.left.%]="( value / max * 100 )">
				<div (mousedown)="startDrag( $event )" class="thumb">
					<br />
				</div>
			</div>
		</div>
	`
})
export class SliderComponent {

	public max!: number;
	public min!: number;
	public trackRef!: ElementRef;
	public value!: number;
	public valueChangeEvents: EventEmitter<number>;

	// I initialize the slider component.
	constructor() {

		this.valueChangeEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I start tracking the mouse movements on the slider in order to calculate the
	// desired change in value.
	public startDrag( event: MouseEvent ) : void {

		event.preventDefault();

		// In order to map the drag-event to changes in value, we need to look at the
		// physical size of the slider. This way, we know where, within the bounds of the
		// slider, the mouse is moving.
		var trackRect = this.trackRef.nativeElement.getBoundingClientRect();
		var minClientX = Math.floor( trackRect.left );
		var maxClientX = Math.floor( trackRect.right );
		var clientX = event.clientX;

		// On mouse-move, calculate and emit the next value.
		var handleMousemove = ( event: MouseEvent ) => {

			// Calculate the next horizontal position, constrained within the track.
			var nextClientX = Math.floor( event.clientX );
			nextClientX = Math.max( nextClientX, minClientX );
			nextClientX = Math.min( nextClientX, maxClientX );

			// Figure out how that mouse position translates into value.
			var percentClientX = (
				( nextClientX - minClientX ) /
				( maxClientX - minClientX )
			);
			// NOTE: For the purposes of this demo, I am assuming that all values are
			// integers. Allowing for floats would make this more challenging.
			var nextValue = Math.round( ( this.max - this.min ) * percentClientX );
			nextValue = Math.max( nextValue, this.min );
			nextValue = Math.min( nextValue, this.max );

			this.valueChangeEvents.emit( nextValue );

		};

		// On mouse-up, tear-down drag events.
		var handleMouseup = () => {

			window.removeEventListener( "mousemove", handleMousemove );
			window.removeEventListener( "mouseup", handleMouseup );

		};

		window.addEventListener( "mousemove", handleMousemove );
		window.addEventListener( "mouseup", handleMouseup );

	}

}
