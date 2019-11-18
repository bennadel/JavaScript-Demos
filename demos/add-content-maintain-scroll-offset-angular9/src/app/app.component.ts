
// Import the core angular services.
import { ChangeDetectorRef } from "@angular/core";
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface NewsItem {
	hook: string;
	content: string;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p class="controls">
			<strong>Use</strong>:
			<a (click)="use( 'window' )">Window</a> or
			<a (click)="use( 'container' )">Overflow Container</a>
		</p>

		<div
			#viewportRef
			class="viewport"
			[class.is-constrained]="( demoType === 'container' )">

			<ng-template ngFor let-item [ngForOf]="newsItems">

				<div class="news-item" [style.padding-bottom.px]="item.hook.length">
					<strong class="news-item__hook">
						{{ item.hook }}
					</strong>
					<span class="news-item__content">
						{{ item.content }}
					</span>
				</div>

			</ng-template>

		</div>
	`
})
export class AppComponent {

	public demoType: "window" | "container";
	public newsItems: NewsItem[];

	@ViewChild( "viewportRef" )
	public viewportRef!: ElementRef;

	private changeDetectionRef: ChangeDetectorRef;

	// I initialize the app component.
	constructor( changeDetectionRef: ChangeDetectorRef ) {

		this.changeDetectionRef = changeDetectionRef;
		this.demoType = "window";
		this.newsItems = [];	

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once, after all of the component inputs have been bound.
	public ngOnInit() : void {

		window.setInterval(
			() => {

				this.addNewsItem();

			},
			500
		);	

	}


	// I determine which container will be used to constrain the demo.
	public use( newDemoType: "window" | "container" ) : void {

		this.demoType = newDemoType;
		// Reset the news feed when the demo type changes.
		this.newsItems = [];

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I add a new news item, using the abstracted DOM manipulation methods.
	private addNewsItem() : void {

		// NOTE: Depending on the type of demo, the constrained container is different.
		// And, the different containers use slightly different DOM methods for getting
		// and setting the current scroll heights and offsets. As such, the getters and
		// setters have been abstracted into other private methods. That said, the
		// algorithm is the same in both cases:
		// --
		// STEP 1: Get current scroll conditions.
		// STEP 2: Add new content and force DOM reconciliation.
		// STEP 3: Check new scroll conditions.
		// STEP 4: Update scroll settings to account for new content.
		// --

		// STEP ONE: Get the current scroll conditions for the container.
		var preScrollHeight = this.getContainerScrollHeight();
		var preScrollOffset = this.getContainerScrollTop();

		// STEP TWO: Add the content that will change the scroll-height of the container.
		this.newsItems.unshift({
			hook: this.getRandomHook(),
			content: "Something something something something..."
		});

		// Force Angular to reconcile the DOM with the View Model. This call tells
		// Angular to trigger a change-detection so that our new news item will be
		// rendered to the browser, allowing us to inspect the scroll changes.
		this.changeDetectionRef.detectChanges();

		// STEP THREE: Now that Angular has rendered the changes in the browser, we have
		// to examine the state of the browser to see how the changes were handled.
		var postScrollOffset = this.getContainerScrollTop();

		// In modern Chrome and Firefox, the scroll-offset will be HANDLED AUTOMATICALLY.
		// Meaning, Chrome and Firefox will UPDATE THE SCROLL OFFSET in order to maintain
		// the "current" experience for the user (how great is that?!?!). However, Safari
		// does not do this. As such, if the pre/post scroll offsets are the same, we
		// have to step-in and manually SCROLL THE USER DOWN to compensate for the change
		// in document height.
		if (
			preScrollOffset &&
			postScrollOffset &&
			( preScrollOffset === postScrollOffset ) // The browser did NOT help us.
			) {

			// STEP FOUR: The browser didn't adjust the scroll offset automatically. As
			// such, we have to step in and scroll the user down imperatively.
			var postScrollHeight = this.getContainerScrollHeight();
			var deltaHeight = ( postScrollHeight - preScrollHeight );

			this.setScrollTop( postScrollOffset, deltaHeight );

			console.warn( "Scrolling by", deltaHeight, "px" );

		}

	}


	// I get the current scroll height of the container.
	private getContainerScrollHeight() : number {

		if ( this.demoType === "container" ) {

			return( this.viewportRef.nativeElement.scrollHeight );

		}

		// For the window, the scroll height is a bit more complicated. In order to get
		// cross-browser compatibility, we need to check a few different elements.
		// --
		// NOTE: I am not entirely sure how necessary this is. I am getting this
		// information from: https://javascript.info/size-and-scroll-window . It's
		// possible that this is only needed for older browser; and, that modern browsers
		// have more consistent support???
		return(
			Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.body.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight,
				document.documentElement.clientHeight
			)
		);

	}


	// I get the current scroll offset of the container.
	private getContainerScrollTop() : number {

		if ( this.demoType === "container" ) {

			return( this.viewportRef.nativeElement.scrollTop );

		}

		return( window.pageYOffset );

	}


	// I get a random hook for a news item.
	private getRandomHook() : string {

		var hooks = [
			"Breaking News!",
			"Extra Extra!",
			"New Study Turns Industry On Its Head!",
			"You Won't Believe This!",
			"News At 11!",
			"Scandalous Behavior!",
			"Florida Man likes to garden in the nude!"
		];

		var index = Math.floor( Math.random() * hooks.length );

		return( hooks[ index ] );

	}


	// I update the container to use the new scroll offset.
	private setScrollTop(
		currentScrollTop: number,
		delta: number
		) : void {

		if ( this.demoType === "container" ) {

			this.viewportRef.nativeElement.scrollTop = ( currentScrollTop + delta );

		}

		window.scrollBy( 0, delta );

	}

}
