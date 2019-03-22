
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	queries: {
		"tabsContentRef": new ViewChild( "tabsContentRef" )
	},
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div class="tabs">
			<nav class="tabs__nav">
				<a
					(click)="show( 'one' )"
					class="tabs__nav-item"
					[class.tabs__nav-item--on]="( selectedTab === 'one' )">
					Show One
				</a>
				<a
					(click)="show( 'two' )"
					class="tabs__nav-item"
					[class.tabs__nav-item--on]="( selectedTab === 'two' )">
					Show Two
				</a>
			</nav>
			<div #tabsContentRef class="tabs__content" [ngSwitch]="selectedTab">
				<div *ngSwitchCase="( 'one' )" class="tabs__tab">

					<h2>
						Tab One
					</h2>

					<p *ngFor="let i of [0,1,2,3,4,5,6,7,8,9,10]">
						This is tab one content ......
					</p>

				</div>
				<div *ngSwitchCase="( 'two' )" class="tabs__tab">

					<h2>
						Tab Two
					</h2>

					<p *ngFor="let i of [0,1,2,3,4,5,6,7,8,9,10]">
						This is tab two content ......
					</p>

				</div>
			</div>
		</div>		
	`
})
export class AppComponent {

	public selectedTab: "one" | "two";
	public tabsContentRef!: ElementRef; // Using "definite assignment" assertion (query).

	// I initialize the app component.
	constructor() {

		this.selectedTab = "one";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I show the given tab.
	public show( tab: "one" | "two" ) : void {

		this.selectedTab = tab;
		// By default - the default behavior of the browser - when we change the content
		// of an overflow-container, the overflow-container doesn't change its scroll 
		// offset unless it suddenly has less content than it did before. As such, when
		// the tab-content changes, we have to explicitly scroll the overflow-container
		// back to the top.
		this.scrollTabContentToTop();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I scroll the tab-content overflow-container back to the top.
	private scrollTabContentToTop() : void {

		this.tabsContentRef.nativeElement.scrollTo( 0, 0 );

	}

}
