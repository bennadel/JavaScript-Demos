
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface ColorPalette {
	name: string;
	url: string;
	swatches: string[];
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public colorPalettes: ColorPalette[];
	public selectedColorPalette: ColorPalette | null;

	// I initialize the app component.
	constructor() {

		this.colorPalettes = [
			{
				name: "Spring Lemon",
				url: "https://coolors.co/129490-4ecdc4-6bffb8-fff275-f55536",
				swatches: [ "#129490", "#4ecdc4", "#6bffb8", "#fff275", "#f55536" ]
			},
			{
				name: "IainUKP1",
				url: "https://coolors.co/195daf-022b3a-bfdbf7-e1e5f2-ffffff",
				swatches: [ "#195daf", "#022b3a", "#bfdbf7", "#e1e5f2", "#ffffff" ]
			},
			{
				name: "Cups",
				url: "https://coolors.co/ffc0cb-fff8e8-fcd581-d52941-990d35",
				swatches: [ "#ffc0cb", "#fff8e8", "#fcd581", "#d52941", "#990d35" ]
			},
			{
				name: "FLL2",
				url: "https://coolors.co/7e8d85-454851-dbd56e-6c0e23-a1a1a1",
				swatches: [ "#7e8d85", "#454851", "#dbd56e", "#6c0e23", "#a1a1a1" ]
			},
			{
				name: "Palette1",
				url: "https://coolors.co/546a76-88a0a8-b4ceb3-dbd3c9-a0878a",
				swatches: [ "#546a76", "#88a0a8", "#b4ceb3", "#dbd3c9", "#a0878a" ]
			},
			{
				name: "Sampada Logo New Age Muted",
				url: "https://coolors.co/fcf9ea-444054-58595f-8aadb1-d3c0cd",
				swatches: [ "#fcf9ea", "#444054", "#58595f", "#8aadb1", "#d3c0cd" ]
			},
			{
				name: "Nummer 4",
				url: "https://coolors.co/9eb1b5-b1d1d3-eff6ff-c10001-700001",
				swatches: [ "#9eb1b5", "#b1d1d3", "#eff6ff", "#c10001", "#700001" ]
			},
			{
				name: "Pop 3",
				url: "https://coolors.co/ffffff-bc4f74-a22489-a553ae-c9f1e9",
				swatches: [ "#ffffff", "#bc4f74", "#a22489", "#a553ae", "#c9f1e9" ]
			}
		];
		this.selectedColorPalette = null;

	}

}
