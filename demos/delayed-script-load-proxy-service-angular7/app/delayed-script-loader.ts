
export class DelayedScriptLoader {

	private delayInMilliseconds: number;
	private scriptPromise: Promise<void> | null;
	private urls: string[];

	// I initialize the delayed script loader service.
	constructor( urls: string[], delayInMilliseconds: number );
	constructor( urls: string, delayInMilliseconds: number );
	constructor( urls: any, delayInMilliseconds: number ) {

		this.delayInMilliseconds = delayInMilliseconds;
		this.scriptPromise = null;
		this.urls = Array.isArray( urls )
			? urls
			: [ urls ]
		;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I load the the underlying Script tags. Returns a Promise.
	public load() : Promise<void> {

		// If we've already configured the script request, just return it. This will
		// naturally queue-up the requests until the script is resolved.
		if ( this.scriptPromise ) {

			return( this.scriptPromise );

		}

		// By using a Promise-based workflow to manage the deferred script loading,
		// requests will naturally QUEUE-UP IN-MEMORY (not a concern) until the delay has
		// passed and the remote-scripts have been loaded. In this case, we're not even
		// going to load the remote-scripts until they are requested FOR THE FIRST TIME.
		// Then, we will use they given delay, after which the in-memory queue will get
		// flushed automatically - Promises rock!!
		this.scriptPromise = this.delay( this.delayInMilliseconds )
			.then(
				() => {

					var scriptPromises = this.urls.map(
						( url ) => {

							return( this.loadScript( url ) );

						}
					);

					return( Promise.all( scriptPromises ) );

				}
			)
			.then(
				() => {

					// No-op to generate a Promise<void> from the Promise<Any[]>.

				}
			)
		;

		return( this.scriptPromise );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I return a Promise that resolves after the given delay.
	private delay( delayInMilliseconds: number ) : Promise<any> {

		var promise = new Promise(
			( resolve ) => {

				setTimeout( resolve, delayInMilliseconds );

			}
		);

		return( promise );

	}


	// I inject a Script tag with the given URL into the head. Returns a Promise.
	private loadScript( url: string ) : Promise<any> {

		var promise = new Promise(
			( resolve, reject ) => {

				var commentNode = document.createComment( " Script injected via DelayedScriptLoader. " );

				var scriptNode = document.createElement( "script" );
				scriptNode.type = "text/javascript";
				scriptNode.onload = resolve;
				scriptNode.onerror = reject;
				scriptNode.src = url;

				document.head.appendChild( commentNode );
				document.head.appendChild( scriptNode );

			}
		);

		return( promise );

	}

}
