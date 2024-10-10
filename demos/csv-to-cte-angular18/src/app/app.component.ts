
// Import vendor modules.
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { inject } from "@angular/core";

// Import app modules.
import { CsvParser } from "./csv-parser";
import { CsvRow } from "./csv-parser";
import { CsvRows } from "./csv-parser";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

type FieldSettings = FieldSetting[];

interface FieldSetting {
	fieldIndex: number;
	columnName: string;
	exampleValue: string;
	includeInCte: boolean;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		FormsModule
	],
	styleUrl: "./app.component.less",
	templateUrl: "./app.component.html"
})
export class AppComponent {

	private csvParser = inject( CsvParser );

	public csvInput = "";
	public csvRows: CsvRows = [];
	public ignoreFirstRow = false;
	public fieldSettings: FieldSettings = [];
	public cteOutput = "";

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I apply and process the given sample data template reference.
	*/
	public applySampleTemplate( sampleTemplate: HTMLTemplateElement ) {

		this.csvInput = sampleTemplate.content.textContent!.trim();
		this.ignoreFirstRow = true;
		this.processInput();

	}


	/**
	* I process the CSV input and generate the CTE output.
	*/
	public processInput() {

		this.csvRows = this.csvParser.parse( this.csvInput );
		this.fieldSettings = [];
		this.cteOutput = "";

		// If we have no rows, there's nothing else to process.
		if ( ! this.csvRows.length ) {
			
			return;

		}

		// If we only have one row and we want to ignore it, there's nothing else to
		// process.
		if ( this.ignoreFirstRow && ( this.csvRows.length === 1 ) ) {

			return;

		}

		// If we ignore the first row, it means that the first row is the field headers.
		// We can therefore use the result of the splice() operation to default the names
		// of the fields in the SQL statement.
		var splicedRow: CsvRow = [];

		if ( this.ignoreFirstRow ) {

			splicedRow = this.csvRows.splice( 0, 1 )
				.at( 0 )!
				.map( ( value ) => value.replace( /\s+/g, "" ) )
			;

		}

		// We're going to assume that the row structures are uniform and use the first row
		// as a representation of the overall row structure. This will be used to define
		// the default field names (giving precedence to the spliced row above).
		this.fieldSettings = this.csvRows[ 0 ].map(
			( fieldValue, i ) => {

				return {
					fieldIndex: i,
					columnName: ( splicedRow[ i ] || `f${ i + 1 }` ),
					exampleValue: fieldValue,
					includeInCte: true
				};

			}
		);

		this.renderCte();

	}


	/**
	* I render the CTE output based on the current view-model.
	*/
	public renderCte() {

		// Filter down to the fields we want to include in the CTE rendering.
		var settings = this.fieldSettings.filter(
			( fieldSetting ) => {

				return fieldSetting.includeInCte;

			}
		);

		// If none of the field are to be included, there's nothing left to process.
		if ( ! settings.length ) {

			this.cteOutput = "";
			return;

		}

		this.cteOutput = `
			WITH
				derived (
					${ derivedColumns( settings ) }
				) AS (
					VALUES
						${ derivedRows( settings, this.csvRows ) }
				)
			SELECT
				${ selectColumns( settings ) }
			FROM
				derived d
			;
		`;

		// Our string template approach added a bunch of extra indentation on each line.
		// Let's remove that indentation to create a properly formatted SQL statement.
		this.cteOutput = this.cteOutput
			.trim()
			.replace( /^\t{3}/gm, "" )
		;

		// Function-local helper methods.

		function derivedColumns( settings: FieldSettings ) {

			return settings
				.map(
					( setting ) => {

						return `\`${ setting.columnName }\``;

					}
				)
				.join( ",\n					" )
			;

		}

		function derivedRows( settings: FieldSettings, rows: CsvRows ) {

			return rows
				.map(
					( row ) => {

						return `ROW ( ${ derivedRow( settings, row ) } )`;

					}
				)
				.join( ",\n						" )
			;

		}

		function derivedRow( settings: FieldSettings, row: CsvRow ) {

			return settings
				.map(
					( setting ) => {

						return `'${ row[ setting.fieldIndex ].replace( /'/g, "''" ) }'`;

					}
				)
				.join( ", " )
			;

		}

		function selectColumns( settings: FieldSettings ) {

			return settings
				.map(
					( setting ) => {

						return `d.\`${ setting.columnName }\``;

					}
				)
				.join( ",\n				" )
			;

		}

	}

}
