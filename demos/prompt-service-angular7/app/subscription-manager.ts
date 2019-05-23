
export interface SubscriptionLike {
	unsubscribe(): void;
}

//NOTE: This class is based on Ward Bell's "SubSink" concept.
// --
// Read More: https://github.com/wardbell/subsink
export class SubscriptionManager {

	private subscriptions: SubscriptionLike[];

	// I initialize the subscription manager.
	constructor() {

		this.subscriptions = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add N-subscriptions to the manager.
	public add( ...subscriptions: SubscriptionLike[] ) : SubscriptionManager {

		this.subscriptions.push( ...subscriptions );
		return( this );

	}


	// I unsubscribe from all of the internal subscriptions.
	public unsubscribe() : void {

		while ( this.subscriptions.length ) {

			this.subscriptions.shift()!.unsubscribe();

		}

	}

}

