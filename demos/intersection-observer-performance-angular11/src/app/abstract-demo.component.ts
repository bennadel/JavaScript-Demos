
export abstract class AbstractDemoComponent {
	
	public items: number[];

	// I initialize the demo component.
	constructor() {

		this.items = this.generateItems( 1000 );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I generate the items to render using the given size / length.
	private generateItems( size: number ) : number[] {

		var items: number[] = [];

		for ( var i = 1 ; i <= size ; i++ ) {

			items.push( i );

		}

		return( items );

	}

}
