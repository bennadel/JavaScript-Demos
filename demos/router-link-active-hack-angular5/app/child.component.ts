
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "child-view",
	styleUrls: [ "./child.component.less" ],
	template: 
	`
		<nav>
			<a routerLink="/go/{{ id }}/view" class="item" routerLinkActive="on">View</a>
			<a routerLink="/go/{{ id }}/edit" class="item" routerLinkActive="on">Edit</a>
		</nav>

		<nav>
			<a
				routerLink="/go/{{ id }}/view"
				class="item"
				routerLinkActive="on" 
				[routerLinkActiveOptions]="{ __change_detection_hack__: [ id, mode ] }">
				View
			</a>
			<a
				routerLink="/go/{{ id }}/edit"
				class="item"
				routerLinkActive="on" 
				[routerLinkActiveOptions]="{ __change_detection_hack__: [ id, mode ] }">
				Edit
			</a>
		</nav>

		<p>
			You are in mode <strong>{{ mode }}</strong> for child <strong>{{ id }}</strong>.
		</p>
	`
})
export class ChildComponent implements OnInit, OnDestroy {

	public id: number;
	public mode: string;

	private activatedRoute: ActivatedRoute;
	private paramMapSubscription: Subscription;
	
	// I initialize the child-view component.
	constructor( activatedRoute: ActivatedRoute ) {

		this.activatedRoute = activatedRoute;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.paramMapSubscription = this.activatedRoute.paramMap.subscribe(
			( paramMap: ParamMap ) : void => {

				this.id = +paramMap.get( "id" );
				this.mode = paramMap.get( "mode" );

			}
		);

	}

}
