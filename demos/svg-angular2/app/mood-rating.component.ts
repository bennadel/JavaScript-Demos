
// Import the core angular services.
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
	selector: "mood-rating",
	inputs: [ "value", "size" ],
	outputs: [ "valueChange" ],
	styles: [
		`
			:host {
				display: table ;
			}

			.items {
				list-style-type: none ;
				margin: 0px 0px 0px 0px ;
				padding: 0px 0px 0px 0px ;
			}

			.items:after {
				clear: both ;
				content: "" ;
				display: table ;
				height: 0px ;
			}

			.item {
				color: #CCCCCC ;
				cursor: pointer ;
				float: left ;
				margin: 0px 15px 0px 0px ;
				padding: 0px 0px 0px 0px ;
			}

			.item:hover {
				color: #333333 ;
			}

			.item--on,
			.item--on:hover {
				color: inherit ; /* Pull in color from parent, for stroke + fill. */
			}

			.item-icon {
				height: 100% ;
				width: 100% ;
			}
		`
	],
	template:
	`
		<ul class="items">
			<li 
				(click)="selectRating( 1 )"
				class="item"
				[class.item--on]="( value === 1 )"
				[style.width.px]="size"
				[style.height.px]="size">

				<svg viewBox="0 0 80 80" preserveAspectRatio="xMidYMid meet" class="item-icon">
					<title>Rating 1</title>
					<path id="Ellipse" d="M 3 40 C 3 19.5652 19.5652 3 40 3 C 60.4348 3 77 19.5652 77 40 C 77 60.4348 60.4348 77 40 77 C 19.5652 77 3 60.4348 3 40 Z" stroke="currentColor" stroke-width="5" fill="none"/>
					<path id="Ellipse2" d="M 16 30.5 C 16 27.4624 18.4624 25 21.5 25 C 24.5376 25 27 27.4624 27 30.5 C 27 33.5376 24.5376 36 21.5 36 C 18.4624 36 16 33.5376 16 30.5 Z" fill="currentColor"/>
					<path id="Ellipse3" d="M 50 30.5 C 50 27.4624 52.4624 25 55.5 25 C 58.5376 25 61 27.4624 61 30.5 C 61 33.5376 58.5376 36 55.5 36 C 52.4624 36 50 33.5376 50 30.5 Z" fill="currentColor"/>
					<path d="M 23.5373 61.4204 C 13.4968 34.4894 66.6081 37.7737 55 61.2328 C 36.966 65.2732 37.1067 58.8905 23.5373 61.4204 Z" fill="currentColor"/>
				</svg>

			</li>
			<li 
				(click)="selectRating( 2 )"
				class="item"
				[class.item--on]="( value === 2 )"
				[style.width.px]="size"
				[style.height.px]="size">

				<svg viewBox="0 0 80 80" preserveAspectRatio="xMidYMid meet" class="item-icon">
					<title>Rating 2</title>
					<path id="Ellipse4" d="M 3 40 C 3 19.5652 19.5652 3 40 3 C 60.4348 3 77 19.5652 77 40 C 77 60.4348 60.4348 77 40 77 C 19.5652 77 3 60.4348 3 40 Z" stroke="currentColor" stroke-width="5" fill="none"/>
					<path id="Ellipse5" d="M 16 30.5 C 16 27.4624 18.4624 25 21.5 25 C 24.5376 25 27 27.4624 27 30.5 C 27 33.5376 24.5376 36 21.5 36 C 18.4624 36 16 33.5376 16 30.5 Z" fill="currentColor"/>
					<path id="Ellipse6" d="M 50 30.5 C 50 27.4624 52.4624 25 55.5 25 C 58.5376 25 61 27.4624 61 30.5 C 61 33.5376 58.5376 36 55.5 36 C 52.4624 36 50 33.5376 50 30.5 Z" fill="currentColor"/>
					<path d="M 22.0009 57.5198 C 34.0064 42.2024 46.012 44.6863 57.3965 57.5198 C 43.942 53.38 35.5704 54.9899 22.0009 57.5198 Z" fill="currentColor"/>
				</svg>

			</li>
			<li 
				(click)="selectRating( 3 )"
				class="item"
				[class.item--on]="( value === 3 )"
				[style.width.px]="size"
				[style.height.px]="size">

				<svg viewBox="0 0 80 80" preserveAspectRatio="xMidYMid meet" class="item-icon">
					<title>Rating 3</title>
					<path id="Ellipse7" d="M 3 40 C 3 19.5652 19.5652 3 40 3 C 60.4348 3 77 19.5652 77 40 C 77 60.4348 60.4348 77 40 77 C 19.5652 77 3 60.4348 3 40 Z" stroke="currentColor" stroke-width="5" fill="none"/>
					<path id="Ellipse8" d="M 16 30.5 C 16 27.4624 18.4624 25 21.5 25 C 24.5376 25 27 27.4624 27 30.5 C 27 33.5376 24.5376 36 21.5 36 C 18.4624 36 16 33.5376 16 30.5 Z" fill="currentColor"/>
					<path id="Ellipse9" d="M 50 30.5 C 50 27.4624 52.4624 25 55.5 25 C 58.5376 25 61 27.4624 61 30.5 C 61 33.5376 58.5376 36 55.5 36 C 52.4624 36 50 33.5376 50 30.5 Z" fill="currentColor"/>
					<path d="M 16.8629 53.8169 C 36.6421 46.6872 47.632 54.287 59.5915 52 C 54.7617 61.8767 30.4324 51.287 16.8629 53.8169 Z" fill="currentColor"/>
				</svg>

			</li>
			<li 
				(click)="selectRating( 4 )"
				class="item"
				[class.item--on]="( value === 4 )"
				[style.width.px]="size"
				[style.height.px]="size">

				<svg viewBox="0 0 80 80" preserveAspectRatio="xMidYMid meet" class="item-icon">
					<title>Rating 4</title>
					<path id="Ellipse10" d="M 3 40 C 3 19.5652 19.5652 3 40 3 C 60.4348 3 77 19.5652 77 40 C 77 60.4348 60.4348 77 40 77 C 19.5652 77 3 60.4348 3 40 Z" stroke="currentColor" stroke-width="5" fill="none"/>
					<path id="Ellipse11" d="M 16 30.5 C 16 27.4624 18.4624 25 21.5 25 C 24.5376 25 27 27.4624 27 30.5 C 27 33.5376 24.5376 36 21.5 36 C 18.4624 36 16 33.5376 16 30.5 Z" fill="currentColor"/>
					<path id="Ellipse12" d="M 50 30.5 C 50 27.4624 52.4624 25 55.5 25 C 58.5376 25 61 27.4624 61 30.5 C 61 33.5376 58.5376 36 55.5 36 C 52.4624 36 50 33.5376 50 30.5 Z" fill="currentColor"/>
					<path d="M 18 47 C 24.1407 53.1407 52.4296 54.5704 60 47 C 50.4149 64.1178 34.805 79.8822 18 47 Z" fill="currentColor"/>
				</svg>

			</li>
			<li 
				(click)="selectRating( 5 )"
				class="item"
				[class.item--on]="( value === 5 )"
				[style.width.px]="size"
				[style.height.px]="size">

				<svg viewBox="0 0 80 80" preserveAspectRatio="xMidYMid meet" class="item-icon">
					<title>Rating 5</title>
					<path id="Ellipse13" d="M 3 40 C 3 19.5652 19.5652 3 40 3 C 60.4348 3 77 19.5652 77 40 C 77 60.4348 60.4348 77 40 77 C 19.5652 77 3 60.4348 3 40 Z" stroke="currentColor" stroke-width="5" fill="none"/>
					<path id="Ellipse14" d="M 16 30.5 C 16 27.4624 18.4624 25 21.5 25 C 24.5376 25 27 27.4624 27 30.5 C 27 33.5376 24.5376 36 21.5 36 C 18.4624 36 16 33.5376 16 30.5 Z" fill="currentColor"/>
					<path id="Ellipse15" d="M 50 30.5 C 50 27.4624 52.4624 25 55.5 25 C 58.5376 25 61 27.4624 61 30.5 C 61 33.5376 58.5376 36 55.5 36 C 52.4624 36 50 33.5376 50 30.5 Z" fill="currentColor"/>
					<path d="M 20 48 C 26.1407 54.1407 42.0368 34.4738 59.2953 51 C 49.7102 68.1178 36.805 80.8822 20 48 Z" fill="currentColor"/>
				</svg>

			</li>
		</ul>
	`
})
export class MoodRatingComponent {

	// I hold the dimensions of the emoticons. This value gets applied to both the height
	// and width of each emoticon.
	public size: number ;

	// I hold the current rating.
	public value: number ;

	// I emit a rating selection.
	public valueChange: EventEmitter<number> ;


	// I initialize the component.
	constructor() {

		this.size = 40;
		this.value = 0;
		this.valueChange = new EventEmitter();

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I emit the selected rating (upholding a one-way data flow).
	public selectRating( newRating: number ) : void {

		( newRating === this.value )
			? this.valueChange.emit( 0 )
			: this.valueChange.emit( newRating )
		;

	}

}
