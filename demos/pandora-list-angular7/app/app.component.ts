
// Import the core angular services.
import { animate } from "@angular/animations";
import { Component } from "@angular/core";
import { state } from "@angular/animations";
import { style } from "@angular/animations";
import { transition } from "@angular/animations";
import { trigger } from "@angular/animations";

// Import the application components and services.
import data from "./data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Movie {
	id: string;
	title: string;
	releasedAt: number;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	animations: [
		trigger(
			"movieIndex",
			[
				transition(
					"* <=> *",
					[
						style({
							transform: "translateY( 1000px )"
						}),
						animate(
							1000,
							style({
								transform: "translateY( 0px )"
							})
						)
					]
				)
			]
		)
	],
	template:
	`
		<ul class="movies">

			<ng-template ngFor let-movie let-index="index" [ngForOf]="movies" [ngForTrackBy]="movieIdentity">

				<li [@movieIndex]="index" class="movie">
					
					<div class="title">
						<a href="https://www.imdb.com/title/{{ movie.id }}/" target="_blank" class="link">
							{{ movie.title }}
						</a>
						<span class="release-date">
							( {{ movie.releasedAt }} )
						</span>
					</div>

					<div class="tools">
						<a (click)="move( movie, 'up' )" class="move-up">▲</a>
						<a (click)="move( movie, 'down' )" class="move-down">▼</a>
					</div>

				</li>

			</ng-template>

		</ul>
	`
})
export class AppComponent {

	public movies: Movie[];

	// I initialize the app component.
	constructor() {

		this.movies = data;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I move the given movie to the given destination in the list.
	public move( movie: Movie, to: string ) : void {

		var index = this.movies.indexOf( movie );

		switch ( to ) {
			case "up":
				var nextIndex = Math.max( 0, ( index - 1 ) );
				this.movies.splice( index, 1 );
				this.movies.splice( nextIndex, 0, movie );
			break;
			case "down":
				var nextIndex = Math.min( this.movies.length, ( index + 1 ) );
				this.movies.splice( index, 1 );
				this.movies.splice( nextIndex, 0, movie );
			break;
		}

	}


	// I provide an identity mapper for the ngFor loop (so that Angular doesn't destroy
	// DOM nodes unnecessarily).
	public movieIdentity( index: number, movie: Movie ) : string {

		return( movie.id );

	}

}
