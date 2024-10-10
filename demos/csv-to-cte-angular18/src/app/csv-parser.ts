
// Import vendor modules.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export type CsvRows = CsvRow[];
export type CsvRow = string[];

// This is the native match that exec() will return.
type ExecMatch = RegExpExecArray | null;
// This is the translated match that we use internally.
type ParserMatch = FieldMatch | null;
// This is the translated match interface.
interface FieldMatch {
	value: string;
	isQuotedValue: boolean;
	isNakedvalue: boolean;
	delimiter: string;
	isFieldDelimiter: boolean;
	isRowDelimiter: boolean;
	isEndOfInput: boolean;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class CsvParser {

	/**
	* I parse the given input into a CSV rows result.
	*/
	public parse( input: string ) : CsvRows {

		// Note: This is a judgement call, but stripping off any trailing newlines at the
		// end of the input seems to result in a more meaningful match. Otherwise you can
		// end up with some empty row at the end depending on the algorithm.
		input = input.replace( /[\r\n]+$/, "" );

		if ( ! input ) {

			return [];

		}

		var pattern = this.createPattern();
		var match: ParserMatch;
		var row: CsvRow = [];
		var rows: CsvRows = [row];

		while ( match = this.transformMatch( pattern.exec( input ) ) ) {

			row.push( match.value );

			// Because our pattern can match an empty field followed by the end-of-input,
			// there's a zero-length match at the end of the input sequence that never
			// moves the lastIndex of the exec() function forward. As such, we have to
			// explicitly break out of the loop once we've reached the end.
			if ( match.isEndOfInput ) {

				break;

			}

			if ( match.isRowDelimiter ) {

				row = [];
				rows.push( row );

			}

		}

		return rows;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I create the RegExp instance for matching fields and delimiters.
	*/
	private createPattern() : RegExp {

		// Note: The String.raw tag will return the embedded escape sequences (\r\n) as
		// string literals instead of interpreting them as escape sequences.
		var source = String.raw`
			(?:
				"([^"]*(?:""[^"]*)*)"    # Quoted field value.
				|
				([^",\r\n]*)             # Naked field value.
			)
			(,|\r\n?|\n|$)               # Field delimiter.
		`;

		// The native RegExp doesn't support the "verbose" flag. As such, let's strip out
		// any comments and whitespace in the current source.
		source = source
			.replace( /# [^\r\n]*/g, " " )
			.replace( /\s+/g, "" )
		;

		return new RegExp( source, "gy" );

	}


	/**
	* I transform the native exec() match into a local parser match.
	*/
	private transformMatch( match: ExecMatch ) : ParserMatch {

		if ( ! match ) {

			return null;

		}

		var value = ( match[ 1 ] || match[ 2 ] || "" );
		var isQuotedValue = ( match[ 1 ] !== undefined );
		var isNakedvalue = ! isQuotedValue;
		var delimiter = match[ 3 ];
		var isFieldDelimiter = ( delimiter === "," );
		var isRowDelimiter = ! isFieldDelimiter;
		var isEndOfInput = ! delimiter;

		// If the field value is quoted, canonicalize any embedded quotes.
		if ( isQuotedValue ) {

			value = value.replace( /""/g, '"' );

		}

		return {
			value,
			isQuotedValue,
			isNakedvalue,
			delimiter,
			isFieldDelimiter,
			isRowDelimiter,
			isEndOfInput
		};

	}

}
