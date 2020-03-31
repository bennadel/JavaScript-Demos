
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	host: {
		"(window:keydown.Meta.K+Meta.U)": "handleUppercase( $event )",
		"(window:keydown.Meta.K+Meta.L)": "handleLowercase( $event )",
		"(window:keydown.ArrowUp+ArrowUp+ArrowDown+ArrowDown+ArrowLeft+ArrowRight+ArrowLeft+ArrowRight+Space)": "handleContra()"
	},
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Possible key-combinations (watch console logging):
		</p>

		<ul>
			<li><code>CMD-K + CMD-U</code> - Upper-casing</li>
			<li><code>CMD-K + CMD-L</code> - Lower-casing</li>
		</ul>
	`
})
export class AppComponent {

	// I handle the Konami Conta code ... shhhhhh!
	public handleContra() : void {

		console.group( "Key Combination Used" );
		console.log( "Contra code unlocked" );
		console.log( "30-free lives!" );
		console.groupEnd();

	}


	// I handle the lower-case key-combination.
	public handleLowercase( event: KeyboardEvent ) : void {

		console.group( "Key Combination Used" );
		console.log( "K+L" );
		console.log( "Perform lower-case command." );
		console.groupEnd();

	}


	// I handle the upper-case key-combination.
	public handleUppercase( event: KeyboardEvent ) : void {

		console.group( "Key Combination Used" );
		console.log( "K+U" );
		console.log( "Perform upper-case command." );
		console.groupEnd();

	}

}
