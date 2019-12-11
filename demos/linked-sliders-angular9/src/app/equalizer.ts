
export class Equalizer {

	private lastIncrementedIndex: number;
	private lastTargetIndex: number;
	private minValue: number;
	private maxValue: number;
	private values: number[];

	// I initialize the equalizer.
	constructor(
		minValue: number,
		maxValue: number,
		initialValues: number[]
		) {

		// Validate the possible range of values.
		if ( minValue >= maxValue ) {

			throw( new Error( "Min value must be less than Max value." ) );

		}

		// Validate the number of values.
		if ( initialValues.length === 1 ) {

			throw( new Error( "Initial values must have a length greater than 1." ) );

		}

		// Validate the initial state of the values. Since the point of the equalizer is
		// to maintain a total across the distribution, the values must start out as the
		// summation of the max value.
		if ( this.sum( initialValues ) !== maxValue ) {

			throw( new Error( "Initial values don't sum to max value." ) );

		}

		this.minValue = minValue;
		this.maxValue = maxValue;
		this.values = initialValues;

		this.lastIncrementedIndex = -1;
		this.lastTargetIndex = -1;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I set the given index to the given value and return the resultant state of the
	// equalizer values.
	public setValue( targetIndex: number, newValue: number ) : number[] {

		// If the target index has changed, let's reset our distribution references.
		if ( targetIndex !== this.lastTargetIndex ) {

			this.lastTargetIndex = targetIndex;
			this.lastIncrementedIndex = targetIndex;

		}

		var currentValue = this.values[ targetIndex ];
		// Constrain the application of the new value to the target index.
		var nextValue = this.constrain( newValue );

		// Get the portion of the new value that was actually consumed.
		var delta = ( nextValue - currentValue );

		// If no portion of the new value was actually consumed, there's nothing left to
		// do.
		if ( ! delta ) {

			// NOTE: This probably shouldn't happen. Smells like developer-error.
			return( this.values.slice() );

		}

		// At this point, we've validated the new value against the target value, we can
		// apply the new value back to the collection.
		this.values[ targetIndex ] = nextValue;

		// Now, we have to distribute the INVERSE of the delta to the rest of the values
		// in the equalizer. We want to distribute the delta equally across all of the
		// other facets, so let's keep looping and handing out a single step.
		var deltaToDistribute = Math.abs( delta );
		var step = ( delta > 0 )
			? -1
			: 1
		;

		// Since we know that the equalizer values will always maintain a fixed sum, we
		// know that it is safe to keep looping until the delta has been fully consumed.
		while ( deltaToDistribute ) {

			// Increment and constrain the next index.
			if ( ++this.lastIncrementedIndex >= this.values.length ) {

				this.lastIncrementedIndex = 0;

			}

			// As we distribute the inverse delta, always skip the target index as this
			// index received the whole of the new value above.
			if ( this.lastIncrementedIndex === this.lastTargetIndex ) {

				continue;

			}

			var currentValue = this.values[ this.lastIncrementedIndex ];
			// Constrain the application of the STEP to the current index. It's possible
			// that this index has already reached a local maximum and cannot be updated.
			var nextValue = this.constrain( currentValue + step );

			if ( nextValue !== currentValue ) {

				this.values[ this.lastIncrementedIndex ] = nextValue;
				deltaToDistribute--;

			}

		}

		return( this.values.slice() );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I constrain the given value to be within the min-max range.
	private constrain( value: number ) : number {

		value = Math.max( value, this.minValue );
		value = Math.min( value, this.maxValue );

		return( value );

	}


	// I sum the given collection of numbers.
	private sum( values: number[] ) : number {

		var total = values.reduce(
			( total, value ) => {

				return( total + value );

			}
		);

		return( total );

	}

}
