
// Import the core angular services.
import { Component } from "@angular/core";

// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition,
//   // ...
// } from '@angular/animations';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface PhotoGridItem {
	id: string;
	source: string;
	rowStart: number;
	rowEnd: number;
	columnStart: number;
	columnEnd: number;
}

interface PhotoRowItem {
	id: number;
	size: "single" | "double";
	sources: string[];
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	//animations: [
	//	trigger(
	//		"gridLocation",
	//		[
	//			transition(
	//				"* => *",
	//				[
	//					animate( "1s" )
	//				]
	//			)
	//		]
	//	)
	//],
	template:
	`
		<div (click)="cyclePhotos()" class="photo-grid">
			<ng-template ngFor let-photo [ngForOf]="photos" [ngForTrackBy]="photoIdentity">

				<div
					class="photo-grid__item"
					[style.grid-row-start]="photo.rowStart"
					[style.grid-row-end]="photo.rowEnd"
					[style.grid-column-start]="photo.columnStart"
					[style.grid-column-end]="photo.columnEnd"
					>

					<div
						class="photo-grid__image"
						[style.background-image]="( 'url( assets/' + photo.source + ' )' )">

					</div>

				</div>

			</ng-template>
		</div>

		<div class="time">
			{{ timestamp | date:'h:mm aa' }}
		</div>
	`
})
export class AppComponent {

	public photos: PhotoGridItem[];
	public timestamp: Date;

	private topRow: PhotoRowItem[];
	private bottomRow: PhotoRowItem[];

	// I initialize the app component.
	constructor() {

		this.topRow = [
			{
				id: 1,
				size: "single",
				sources: [ this.getRandomPhoto() ]
			},
			{
				id: 2,
				size: "double",
				sources: [ this.getRandomPhoto(), this.getRandomPhoto() ]
			},
			{
				id: 3,
				size: "single",
				sources: [ this.getRandomPhoto() ]
			}
		];
		this.bottomRow = [
			{
				id: 4,
				size: "single",
				sources: [ this.getRandomPhoto() ]
			},
			{
				id: 5,
				size: "single",
				sources: [ this.getRandomPhoto() ]
			},
			{
				id: 6,
				size: "double",
				sources: [ this.getRandomPhoto(), this.getRandomPhoto() ]
			}
		];
		this.photos = this.rowsToGrid();

		this.timestamp = new Date();

		window.setInterval(
			() => {

				this.timestamp = new Date();

			},
			( 20 * 1000 )
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public cyclePhotos() : void {

		var row = this.randValue( [ this.topRow, this.bottomRow ] );
		var rowItem = this.randValue( row );

		// Remove the item from the row.
		row.splice( row.indexOf( rowItem ), 1 );

		// Replace the sources in the filtered-out row item.
		rowItem.sources = rowItem.sources.map(
			( source ) => {

				// CAUTION: This could cause an infinite loop if there are not enough
				// sources to create uniqueness.
				do {

					var newSource = this.getRandomPhoto();

				} while ( newSource === source );

				return( newSource );

			}
		);

		// Move item to end of row.
		if ( this.randBoolean() ) {

			var direction = "leftToRight";
			row.unshift( rowItem );

		} else {

			var direction = "rightToLeft";
			row.push( rowItem );

		}

		this.photos = this.rowsToGrid();

	}


	public photoIdentity( index: number, gridItem: PhotoGridItem ) : string {

		return( gridItem.id );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private getRandomPhoto() : string {

		var sources = [
			"lucy-looking-up.jpg",
			"lucy-on-beach-sunset.jpg",
			"lucy-sunset-magical.jpg",
			"lucy-sunset-smiling.jpg",
			"lucy-waves-backdrop.jpg"
		];

		var randomIndex = Math.floor( Math.random() * sources.length );

		return( sources[ randomIndex ] );

	}


	private randBoolean() : boolean {

		return( Math.random() > 0.5 );

	}


	private randRange( from: number, toExclusive: number ) : number {

		var delta = ( toExclusive - from );
		var mid = Math.floor( Math.random() * delta );

		return( from + mid );

	}


	private randValue<T>( values: T[] ) : T {

		var randIndex = this.randRange( 0, values.length );

		return( values[ randIndex ] );

	}


	private rowsToGrid() : PhotoGridItem[] {

		var gridItems: PhotoGridItem[] = [];

		var columnIndex = 1;

		for ( var rowItem of this.topRow ) {

			if ( rowItem.size === "single" ) {

				gridItems.push({
					id: `${ rowItem.id }-a`,
					source: rowItem.sources[ 0 ],
					rowStart: 1,
					rowEnd: 3,
					columnStart: columnIndex,
					columnEnd: ( columnIndex + 2 )
				});

				columnIndex += 2;

			} else {

				gridItems.push({
					id: `${ rowItem.id }-a`,
					source: rowItem.sources[ 0 ],
					rowStart: 1,
					rowEnd: 2,
					columnStart: columnIndex,
					columnEnd: ( columnIndex + 1 )
				});

				gridItems.push({
					id: `${ rowItem.id }-b`,
					source: rowItem.sources[ 1 ],
					rowStart: 2,
					rowEnd: 3,
					columnStart: columnIndex,
					columnEnd: ( columnIndex + 1 )
				});

				columnIndex += 1;

			}

		}

		var columnIndex = 1;

		for ( var rowItem of this.bottomRow ) {

			if ( rowItem.size === "single" ) {

				gridItems.push({
					id: `${ rowItem.id }-a`,
					source: rowItem.sources[ 0 ],
					rowStart: 3,
					rowEnd: 5,
					columnStart: columnIndex,
					columnEnd: ( columnIndex + 2 )
				});

				columnIndex += 2;

			} else {

				gridItems.push({
					id: `${ rowItem.id }-a`,
					source: rowItem.sources[ 0 ],
					rowStart: 3,
					rowEnd: 4,
					columnStart: columnIndex,
					columnEnd: ( columnIndex + 1 )
				});

				gridItems.push({
					id: `${ rowItem.id }-b`,
					source: rowItem.sources[ 1 ],
					rowStart: 4,
					rowEnd: 5,
					columnStart: columnIndex,
					columnEnd: ( columnIndex + 1 )
				});

				columnIndex += 1;

			}

		}

		return( gridItems );

	}

}
