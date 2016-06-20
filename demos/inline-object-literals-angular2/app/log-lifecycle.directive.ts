
// Import the core angular services.
import { Directive } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";

@Directive({
	selector: "[logLifecycle]"
})
export class LogLifecycleDirective implements OnDestroy, OnInit {

	// I get called once when the directive is being destroyed.
	public ngOnDestroy() {

		console.log( "Directive destroyed." );

	}


	// I get called once when the directive has been initialized and the inputs have 
	// been bound for the first time.
	public ngOnInit() {

		console.log( "Directive initialized." );

	}

}
