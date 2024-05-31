
function demo() {

	var boxStyles = [
		// Top row.
		{
			label: "Top-left",
			styles: {
				top: "10px",
				left: "10px"
			}
		},
		{
			label: "Top-mid-left",
			styles: {
				top: "10px",
				left: "10px",
				right: "50%",
				marginInline: "auto"
			}
		},
		{
			label: "Top-center",
			styles: {
				top: "10px",
				left: "10px",
				right: "10px",
				marginInline: "auto"
			}
		},
		{
			label: "Top-mid-right",
			styles: {
				top: "10px",
				left: "50%",
				right: "10px",
				marginInline: "auto"
			}
		},
		{
			label: "Top-right",
			styles: {
				top: "10px",
				right: "10px"
			}
		},
		// Mid-top row.
		{
			label: "Mid-top-left",
			styles: {
				top: "10px",
				left: "10px",
				bottom: "50%",
				marginBlock: "auto"
			}
		},
		{
			label: "Mid-top-mid-left",
			styles: {
				top: "10px",
				left: "10px",
				right: "50%",
				bottom: "50%",
				margin: "auto"
			}
		},
		{
			label: "Mid-top-center",
			styles: {
				top: "10px",
				left: "10px",
				right: "10px",
				bottom: "50%",
				margin: "auto"
			}
		},
		{
			label: "Mid-top-mid-right",
			styles: {
				top: "10px",
				left: "50%",
				right: "10px",
				bottom: "50%",
				margin: "auto"
			}
		},
		{
			label: "Mid-top-right",
			styles: {
				top: "10px",
				right: "10px",
				bottom: "50%",
				marginBlock: "auto"
			}
		},
		// Center row.
		{
			label: "Center-left",
			styles: {
				top: "10px",
				left: "10px",
				bottom: "10px",
				marginBlock: "auto"
			}
		},
		{
			label: "Center-mid-left",
			styles: {
				top: "10px",
				left: "10px",
				right: "50%",
				bottom: "10px",
				margin: "auto"
			}
		},
		{
			label: "Center-center",
			styles: {
				top: "10px",
				left: "10px",
				right: "10px",
				bottom: "10px",
				margin: "auto"
			}
		},
		{
			label: "Center-mid-right",
			styles: {
				top: "10px",
				left: "50%",
				right: "10px",
				bottom: "10px",
				margin: "auto"
			}
		},
		{
			label: "Center-right",
			styles: {
				top: "10px",
				right: "10px",
				bottom: "10px",
				marginBlock: "auto"
			}
		},
		// Mid-bottom row.
		{
			label: "Mid-bottom-left",
			styles: {
				top: "50%",
				left: "10px",
				bottom: "10px",
				marginBlock: "auto"
			}
		},
		{
			label: "Mid-bottom-mid-left",
			styles: {
				top: "50%",
				left: "10px",
				right: "50%",
				bottom: "10px",
				margin: "auto"
			}
		},
		{
			label: "Mid-bottom-center",
			styles: {
				top: "50%",
				left: "10px",
				right: "10px",
				bottom: "10px",
				margin: "auto"
			}
		},
		{
			label: "Mid-bottom-mid-right",
			styles: {
				top: "50%",
				left: "50%",
				right: "10px",
				bottom: "10px",
				margin: "auto"
			}
		},
		{
			label: "Mid-bottom-right",
			styles: {
				top: "50%",
				right: "10px",
				bottom: "10px",
				marginBlock: "auto"
			}
		},
		// Bottom row.
		{
			label: "Bottom-left",
			styles: {
				left: "10px",
				bottom: "10px"
			}
		},
		{
			label: "Bottom-mid-left",
			styles: {
				left: "10px",
				right: "50%",
				bottom: "10px",
				marginInline: "auto"
			}
		},
		{
			label: "Bottom-center",
			styles: {
				left: "10px",
				right: "10px",
				bottom: "10px",
				marginInline: "auto"
			}
		},
		{
			label: "Bottom-mid-right",
			styles: {
				left: "50%",
				right: "10px",
				bottom: "10px",
				marginInline: "auto"
			}
		},
		{
			label: "Bottom-right",
			styles: {
				right: "10px",
				bottom: "10px"
			}
		}
	];

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	return {
		boxStyles: boxStyles,
		selectedIndex: 0,
		/**
		* I initialize the component.
		*/
		init() {

			this.$refs.container.focus();

		},
		/**
		* I select the previous styles option.
		*/
		prevOption() {

			if ( ! this.boxStyles[ --this.selectedIndex ] ) {

				this.selectedIndex = ( this.boxStyles.length - 1 );

			}

		},
		/**
		* I select the next styles option.
		*/
		nextOption() {

			if ( ! this.boxStyles[ ++this.selectedIndex ] ) {

				this.selectedIndex = 0;

			}

		},
		/**
		* I move the box around by mapping the style options onto a two-dimensional grid
		* and then calculating row/column changes.
		*/
		moveBox( event ) {

			var optionCount = this.boxStyles.length;
			var columnCount = 5;
			var rowCount = ( optionCount / columnCount );

			// Calculate the row/column based on the selected index.
			var columnIndex = ( this.selectedIndex % columnCount );
			var rowIndex = Math.floor( this.selectedIndex / columnCount );

			// Move to the next row or column based on keyboard event.
			switch ( event.key ) {
				case "ArrowUp":
					if ( --rowIndex < 0 ) {

						rowIndex = ( rowCount - 1 );

					}
				break;
				case "ArrowDown":
					if ( ++rowIndex === rowCount ) {

						rowIndex = 0;

					}
				break;
				case "ArrowLeft":
					if ( --columnIndex < 0 ) {

						columnIndex = ( columnCount - 1 );

					}
				break;
				case "ArrowRight":
					if ( ++columnIndex === columnCount ) {

						columnIndex = 0;

					}
				break;
				default:
					return;
				break;
			}

			// Map the new row and column onto the selected style index.
			this.selectedIndex = ( ( rowIndex * columnCount ) + columnIndex );

		}
	};

}
