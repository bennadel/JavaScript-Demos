
// Import the core angular services.
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Genre {
	id: string;
	name: string;
	adultsOnly: boolean;
}

interface Movie {
	id: string;
	name: string;
	releasedAt: string;
}

interface Snack {
	id: string;
	name: string;
}

interface WatchOption {
	id: string;
	label: string;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.htm"
})
export class AppComponent {

	public form: {
		favoriteGenres: {
			action: boolean;
			commedy: boolean;
			documentary: boolean;
			drama: boolean;
			horror: boolean;
			scifi: boolean;
		},
		favoriteMovie: Movie | null,
		favoriteSnacks: Snack[],
		user: {
			name: string;
			bio: string;
		},
		watchOption: WatchOption | null
	};
	public genres: Genre[];
	public movies: Movie[];
	public snacks: Snack[];
	public watchOptions: WatchOption[];

	// I initialize the app component.
	constructor() {

		this.genres = [
			{ id: "action", name: "Action / Adventure", adultsOnly: false },
			{ id: "commedy", name: "Commedy", adultsOnly: false },
			{ id: "documentary", name: "Documentary", adultsOnly: true },
			{ id: "drama", name: "Drama", adultsOnly: false },
			{ id: "horror", name: "Horror", adultsOnly: true },
			{ id: "scifi", name: "Sci-Fi / Fantasy", adultsOnly: false }
		];

		this.movies = [
			{ id: "tt0092890", name: "Dirty Dancing", releasedAt: "1987" },
			{ id: "tt0103064", name: "Terminator 2", releasedAt: "1991" },
			{ id: "tt0093779", name: "The Princess Bride", releasedAt: "1987" },
			{ id: "tt0098635", name: "When Harry Met Sally", releasedAt: "1989" }
		];

		this.snacks = [
			{ id: "jrmints", name: "Junior Mints" },
			{ id: "pmm", name: "Peanut M&Ms" },
			{ id: "popcorn", name: "Popcorn" },
			{ id: "twizzlers", name: "Twizzlers" }
		];

		this.watchOptions = [
			{ id: "none", label: "I don't watch movies." },
			{ id: "one", label: "Maybe one a week" },
			{ id: "twoish", label: "One to two movies a week" },
			{ id: "lots", label: "At least one movie a day" },
			{ id: "fulltime", label: "I had to quite my job!" }
		];

		this.form = {
			favoriteGenres: {
				action: false,
				commedy: false,
				documentary: false,
				drama: false,
				horror: false,
				scifi: false
			},
			favoriteMovie: null,
			favoriteSnacks: [],
			user: {
				name: "",
				bio: ""
			},
			watchOption: null
		};

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I output the current state of the form view-model.
	public processForm( ngForm: NgForm ) : void {

		console.group( "Form Submission" );
		console.log( JSON.stringify( this.form, null, 4 ) );
		console.log( ngForm );
		console.groupEnd();

	}

}
