
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Component } from "@angular/core";
import { delay } from "rxjs/operators";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { ParamMap } from "@angular/router";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

// Import the application components and services.
import { _ } from "~/app/shared/services/lodash-extended";
import { ErrorLogger } from "~/app/shared/services/error-logger";
import { KeyboardShortcuts } from "~/app/shared/services/keyboard-shortcuts";
import { PartialService } from "./services/partial.service";
import { Unlisten } from "~/app/shared/services/keyboard-shortcuts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Prototype {
	id: number;
	name: string;
}

interface Screen {
	id: number;
	name: string;
	filename: string;
}

@Component({
	selector: "console-view",
	styleUrls: [ "./console-view.component.less" ],
	templateUrl: "./console-view.component.htm"
})
export class ConsoleViewComponent {

	public isLoading: boolean;
	public isShowingScreenBrowser: boolean;
	public isShowingStatusMenu: boolean;
	public isShowingToolbar: boolean;
	public prototype: Prototype;
	public screen: Screen;
	public screens: Screen[];
	public selectedMode: string;
	public state: BehaviorSubject<ConsoleViewComponent>;

	private activatedRoute: ActivatedRoute;
	private errorLogger: ErrorLogger;
	private keyboardShortcuts: KeyboardShortcuts;
	private paramMapSubscription: Subscription;
	private partialService: PartialService;
	private router: Router;
	private selectedPrototypeID: number;
	private selectedScreenID: number;
	private unlisten: Unlisten;

	// I initialize the console-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		errorLogger: ErrorLogger,
		keyboardShortcuts: KeyboardShortcuts,
		partialService: PartialService,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.errorLogger = errorLogger;
		this.keyboardShortcuts = keyboardShortcuts;
		this.partialService = partialService;
		this.router = router;

		this.isLoading = true;
		this.isShowingScreenBrowser = true;
		this.isShowingStatusMenu = false;
		this.isShowingToolbar = true;
		this.prototype = null;
		this.screen = null;
		this.selectedMode = "preview";
		this.selectedPrototypeID = null;
		this.selectedScreenID = null;
		this.unlisten = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		( this.paramMapSubscription ) && this.paramMapSubscription.unsubscribe();
		( this.unlisten ) && this.unlisten();

	}


	// I get called once when the component is being mounted.
	public ngOnInit() : void {

		this.paramMapSubscription = this.activatedRoute.paramMap
			// TIMING HACK: We need to add a tick-delay between the root ParamMap emit
			// and the callback in order to fix several Angular bugs.
			.pipe( delay( 10 ) )
			.subscribe(
				( paramMap: ParamMap ) : void => {

					var prototypeID = +paramMap.get( "prototypeID" );
					var screenID = +paramMap.get( "screenID" );

					if ( this.selectedPrototypeID !== prototypeID ) {

						this.loadPrototype( prototypeID );

					} else if ( this.selectedScreenID !== screenID ) {

						this.loadScreen( screenID );

					}

					// Anytime the route changes, let's hide the widgetry.
					this.isShowingStatusMenu = false;
					this.isShowingScreenBrowser = false;

				}
			)
		;

		this.unlisten = this.keyboardShortcuts.listen(
			{
				"P": ( event: KeyboardEvent ) : void => {

					this.gotoMode( "preview" );

				},
				"B": ( event: KeyboardEvent ) : void => {

					this.gotoMode( "build" );

				},
				"C": ( event: KeyboardEvent ) : void => {

					this.gotoMode( "comment" );

				},
				"I": ( event: KeyboardEvent ) : void => {

					this.gotoMode( "inspect" );

				},
				"H": ( event: KeyboardEvent ) : void => {

					this.gotoMode( "history" );

				},
				"ArrowLeft": ( event: KeyboardEvent ) : void => {

					this.gotoRelativeScreen( "previous" );

				},
				"ArrowRight": ( event: KeyboardEvent ) : void => {

					this.gotoRelativeScreen( "next" );

				},
				"Meta.F": ( event: KeyboardEvent ) : void => {

					// If the toolbar isn't showing, then ignore screen browser request.
					// It wasn't designed to render without the toolbar.
					if ( ! this.isShowingToolbar ) {

						return;

					}

					this.toggleScreenBrowser();

					// Since this is the browser's native "Find" command, we want to 
					// prevent the default behavior so we can override it.
					event.preventDefault();

				}
			},
			{
				priority: this.keyboardShortcuts.getPriority( "console" )
			}
		);

	}


	public gotoMode( mode: string ) : void {

		// This operation depends on the loaded data. As such, if we are still loading 
		// the console data, ignore the request.
		if ( this.isLoading ) {
			
			return;

		}

		this.selectedMode = mode;

		// Even though we close this when the navigation happens, we should close it here
		// as well in case the current mode is the given mode. In such a case, there will 
		// be no navigation and therefore no navigation event.
		this.isShowingScreenBrowser = false;

		// The toolbar can only be hidden in Preview mode. As such, bring it back for all
		// other modes.
		if ( this.selectedMode !== "preview" ) {

			this.isShowingToolbar = true;

		}

		this.router.navigateByUrl( `/app/console/prototypes/${ this.prototype.id }/screens/${ this.screen.id }/${ this.selectedMode }` );

	}


	public gotoRelativeScreen( direction: "previous" | "next" ) : void {

		// This operation depends on the loaded data. As such, if we are still loading 
		// the console data, ignore the request.
		if ( this.isLoading ) {
			
			return;

		}

		var index = _.indexOf( this.screens, this.screen );

		switch ( direction ) {
			case "previous":

				if ( --index < 0 ) {

					index = ( this.screens.length - 1 );

				}

			break;
			case "next":

				if ( ++index >= this.screens.length ) {

					index = 0;

				}

			break;
		}

		var mode = this.getSelectedMode();

		this.router.navigateByUrl( `/app/console/prototypes/${ this.prototype.id }/screens/${ this.screens[ index ].id }/${ mode }` );

	}


	public gotoScreen( screen: Screen ) : void {

		// Even though we close this when the navigation happens, we should close it here
		// as well in case the current screen is the selected screen. In such a case, 
		// there will be no navigation and therefore no navigation event.
		this.isShowingScreenBrowser = false;

		this.selectedMode = this.getSelectedMode();

		this.router.navigateByUrl( `/app/console/prototypes/${ this.prototype.id }/screens/${ screen.id }/${ this.selectedMode }` );

	}


	public hideStatusMenu() : void {

		this.isShowingStatusMenu = false;

	}


	public showStatusMenu() : void {

		this.isShowingStatusMenu = true;

	}


	public toggleScreenBrowser() : void {

		this.isShowingScreenBrowser = ! this.isShowingScreenBrowser;
		this.isShowingStatusMenu = false;

	}


	public toggleStatusMenu() : void {

		this.isShowingStatusMenu = ! this.isShowingStatusMenu;

	}


	public toggleToolbar() : void {

		this.isShowingToolbar = ! this.isShowingToolbar;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	public getSelectedMode() : string {

		var firstChild = this.activatedRoute.snapshot.firstChild;

		if ( firstChild ) {

			return( firstChild.url[ 0 ].path );

		} else {

			console.warn( "No mode detected, returning default [preview]." );
			return( "preview" );

		}

	}


	private loadPrototype( prototypeID: number ) : void {

		this.selectedPrototypeID = prototypeID;
		this.isLoading = true;
		this.partialService
			.get( prototypeID )
			.then(
				( partial ) : void => {

					this.isLoading = false;
					this.prototype = partial.prototype;
					this.screens = partial.screens;

					this.loadScreen( +this.activatedRoute.snapshot.params.screenID );

				},
				( error: any ) : void => {

					this.errorLogger.log( error );

					var primary = `prototypes/${ this.selectedPrototypeID }`;
					var secondary = ( error.message === "EmptyPrototype" )
						? "modal/error/cannot-build-empty-prototype"
						: "modal/error/could-not-load-prototype"
					;
					this.router.navigate(
						[
							"/app",
							{
								outlets: {
									primary: primary,
									modal: secondary
								}
							}
						]
					);

				}
			)
		;

	}


	private loadScreen( screenID: number ) : void {

		// If we're currently loading the prototype, then skip the screen - we'll get
		// the screen after the prototype finishes loading.
		if ( this.isLoading ) {

			return;

		}

		this.selectedScreenID = screenID;
		this.selectedMode = this.getSelectedMode();
		this.screen = _.find(
			this.screens, 
			{
				id: this.selectedScreenID
			}
		);

		if ( ! this.screen ) {

			// NOTE: We're putting the view back into a loading state since the "screen"
			// object will be undefined at this point - we don't want the UI trying to
			// reference it while the navigation is taking place.
			this.isLoading = true;

			// NOTE: We are redirecting back to the prototype detail rather than trying
			// to fall back to a more meaningful screen selection since there is a bug in 
			// Angular that doesn't allow a redirect to the same route-path if not all of
			// the router-outlets have been rendered (which is likely).
			this.router.navigate(
				[
					"/app",
					{
						outlets: {
							primary: `prototypes/${ this.selectedPrototypeID }`,
							modal: "modal/error/could-not-load-screen"
						}
					}
				]
			);

		}
		
	}

	// ---
	// STATIC METHODS.
	// ---

	static reducers = {

		hideScreenBrowser: function( state: ConsoleViewComponent ) : ConsoleViewComponent {

			return( state );

		}

	}

}
