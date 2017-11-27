
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			In the following examples, I am explicitly calling DOM-methods that trigger
			events; however, you will see that <code>form.submit()</code> does not work
			like the other methods (focus, blur, click).
		</p>

		<p>
			<input #ref1 (focus)="logEvent( 'Focus event handled.' )" /> &mdash;
			<a (click)="ref1.focus()">Focus input</a>
		</p>

		<p>
			<input #ref2 (blur)="logEvent( 'Blur event handled.' )" (focus)="ref2.blur()" />
		</p>

		<p>
			<span #ref3 (click)="logEvent( 'Click event handled.' )">X</span> &mdash;
			<a (click)="ref3.click()">Click span</a>
		</p>

		<form #ref4 (reset)="logEvent( 'Reset event handled' )">
			<a (click)="ref4.reset()">Reset form</a>
		</form>

		<form #ref5 action="#hashy" (submit)="logEvent( 'Submit event handled' )">
			<a (click)="ref5.submit()">Submit form</a> &mdash;
			Compare with the <input type="submit" value="Submit Button" />
		</form>
	`
})
export class AppComponent {

	// I log the given message to the console.
	public logEvent( message: string ) : void {

		console.log( message );

	}

}
