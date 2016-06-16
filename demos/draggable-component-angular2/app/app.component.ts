
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ChipComponent } from "./chip.component";
import { DraggableDirective } from "./draggable.directive";
import { IPosition } from "./draggable.directive";

@Component({
	selector: "my-app",
	directives: [ ChipComponent, DraggableDirective ],
	template:
	`
		<chip
			[chipX]="chipPosition.left"
			[chipY]="chipPosition.top"			
			[style.left.px]="chipPosition.left"
			[style.top.px]="chipPosition.top"
			
			dragEnabled
			(positionChange)="handlePositionChange( $event )">
		</chip>
	`
})
export class AppComponent {

	// I hold the position coordinates for the chip.
	public chipPosition: IPosition;


	// I initialize the component.
	constructor() {

		this.chipPosition = {
			left: 400,
			top: 200
		};

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I handle position changes emitted by the dragEnabled directive.
	public handlePositionChange( newPosition: IPosition ) : void {

		// Box the chip into a fixed horizontal and vertical area.
		this.chipPosition.left = AppComponent.getBoundedValue( 100, 600, newPosition.left );
		this.chipPosition.top = AppComponent.getBoundedValue( 100, 400, newPosition.top );
		
	}


	// ---
	// STATIC METHODS.
	// ---


	// I return the given input that is bound within the given min / max range.
	static getBoundedValue( min: number, max: number, input: number ) : number {

		if ( input < min ) return( min );
		if ( input > max ) return( max );

		return( input );

	}

}