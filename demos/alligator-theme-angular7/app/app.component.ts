
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Theme } from "./theme.service";
import { ThemeService } from "./theme.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Select Theme: 
			<a
				(click)="selectTheme( 'light' )"
				class="themer"
				[class.themer--on]="( activeTheme === 'light' )">
				Light
			</a>
			&mdash;
			<a
				(click)="selectTheme( 'dark' )"
				class="themer"
				[class.themer--on]="( activeTheme === 'dark' )">
				Dark
			</a>
		</p>

		<blockquote class="quote">
			<p class="quote__text">
				"Victorious warriors win first and then go to war, while defeated
				warriors go to war first and then seek to win."
			</p>
			<footer class="quote__attribution">
				&mdash; Sun Tzu
			</footer>
		</blockquote>
	`
})
export class AppComponent {

	public activeTheme: Theme;

	private themeService: ThemeService;

	// I initialize the app component.
	constructor( themeService: ThemeService ) {

		this.themeService = themeService;
		this.activeTheme = themeService.getTheme();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I enable the given theme.
	public selectTheme( theme: Theme ) : void {

		this.themeService.setTheme( theme );
		this.activeTheme = this.themeService.getTheme();

	}

}
