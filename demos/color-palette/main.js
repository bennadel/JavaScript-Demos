
function App() {

	var host = this.$el;
	var swatchID = 0;
	var persistanceTimer = null;
	var urlSetAt = 0;

	// For both generating (download) and parsing (drag-drop) swatches.
	var swatchWidth = 300;
	var swatchHeight = 300;

	return {
		// Public properties.
		palette: [ /* Collection of swatches. */ ],
		activeSwatchIndex: 0,
		isNarrowPanels: false,

		// Public methods.
		init: $init,
		addSwatch: addSwatch,
		cyclePalette: cyclePalette,
		cycleSwatch: cycleSwatch,
		downloadPaletteAsPNG: downloadPaletteAsPNG,
		downloadPaletteAsSVG: downloadPaletteAsSVG,
		duplicateSwatch: duplicateSwatch,
		handleFocusin: handleFocusin,
		handleGlobalDropEvents: handleGlobalDropEvents,
		handleGlobalHashchange: handleGlobalHashchange,
		handleGlobalKeydown: handleGlobalKeydown,
		handlePaste: handlePaste,
		handleRangeInput: handleRangeInput,
		handleRangeKeydown: handleRangeKeydown,
		handleResize: handleResize,
		moveActiveIndexLeft: moveActiveIndexLeft,
		moveActiveIndexRight: moveActiveIndexRight,
		moveSwatchLeft: moveSwatchLeft,
		moveSwatchRight: moveSwatchRight,
		removeSwatch: removeSwatch,
		toggleLock: toggleLock,

		// Private methods.
		// --
		// Note: Alpine.js doesn't really allow for private method because the "this"
		// context isn't the return value of the constructor. Instead, it's the Proxy that
		// Alpine builds around your return value. As such, all private methods need to
		// actually exist on the return value in order for the "this" bindings to wire-up
		// correctly. For that reason, I'm prefixing them with an underscore to remove the
		// temptation of calling these methods from the HTML template.
		_checkPanelWidth: checkPanelWidth,
		_checkPanelWidthAsync: checkPanelWidthAsync,
		_createRandomSwatch: createRandomSwatch,
		_createSwatch: createSwatch,
		_focusHue: focusHue,
		_focusHueAsync: focusHueAsync,
		_focusLightness: focusLightness,
		_focusSaturation: focusSaturation,
		_generateDownloadFilename: generateDownloadFilename,
		_loadState: loadState,
		_persistState: persistState,
		_persistStateSync: persistStateSync,
		_readColorsFromDropEvent: readColorsFromDropEvent,
		_readColorsFromPngFile: readColorsFromPngFile,
		_readColorsFromSvgFile: readColorsFromSvgFile,
		_serializePalette: serializePalette,
		_setDocumentTitle: setDocumentTitle,
		_setFavicon: setFavicon,
		_setUrlHash: setUrlHash
	};

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I initialize the app component.
	*/
	function $init() {

		if ( ! this._loadState() ) {

			this.palette.push( this._createRandomSwatch() );
			this.palette.push( this._createRandomSwatch() );
			this.palette.push( this._createRandomSwatch() );
			this.palette.push( this._createRandomSwatch() );
			this.palette.push( this._createRandomSwatch() );
			this._persistState();

		}

		this._focusHueAsync();
		this._checkPanelWidthAsync();

	}

	/**
	* I add a new (random) swatch to the current palette.
	*/
	function addSwatch() {

		this.palette.push( this._createRandomSwatch() );
		this.activeSwatchIndex = ( this.palette.length - 1 );
		this._persistState();
		this._focusHueAsync();
		this._checkPanelWidthAsync();

	}

	/**
	* I cycle all of the (unlocked) swatches in the palette.
	*/
	function cyclePalette() {

		this.palette = this.palette.map(
			( swatch ) => {

				if ( swatch.isLocked ) {

					return swatch;

				}

				return this._createRandomSwatch();

			}
		);
		this._persistState();

	}

	/**
	* I replace the swatch at the given index with a new, random swatch.
	*/
	function cycleSwatch( swatchIndex ) {

		if ( this.palette[ swatchIndex ].isLocked ) {

			return;

		}

		this.palette[ swatchIndex ] = this._createRandomSwatch();
		this._persistState();
		this._focusHueAsync();

	}

	/**
	* I render the current palette to a canvas and then generate a data URI in the given
	* anchor link.
	*/
	function downloadPaletteAsPNG( anchor ) {

		if ( ! this.palette.length ) {

			return;

		}

		var hexHeight = 70;
		var canvasHeight = ( swatchHeight + hexHeight );
		var canvasWidth = ( swatchWidth * this.palette.length );

		var canvas = document.createElement( "canvas" );
		var context = canvas.getContext( "2d" );
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		// Provide a white background.
		context.fillStyle = "#ffffff";
		context.fillRect( 0, 0, canvasWidth, canvasHeight );

		// Add each swatch to the canvas.
		this.palette.forEach(
			( swatch, i ) => {

				// Add the colored square.
				context.fillStyle = swatch.hex;
				context.fillRect(
					( i * swatchWidth ),
					0,
					swatchWidth,
					swatchHeight
				);

				// Add the hex value.
				context.font = "36px monospace";
				context.fillStyle = "#121212";
				context.fillText(
					swatch.hex,
					( ( i * swatchWidth ) + 20 ),
					( swatchHeight + hexHeight - 20 )
				);

			}
		);

		// Override the anchor properties to force the download.
		anchor.href = canvas.toDataURL( "image/png" );
		anchor.download = this._generateDownloadFilename( "png" )

	}

	/**
	* I render the current palette to an SVG document and then generate a data URI in the
	* given anchor link.
	*/
	function downloadPaletteAsSVG( anchor ) {

		if ( ! this.palette.length ) {

			return;

		}

		var hexHeight = 70;
		var svgHeight = ( swatchHeight + hexHeight );
		var svgWidth = ( swatchWidth * this.palette.length );

		// All SVG elements need to be created with the SVG namespace.
		var ns = "http://www.w3.org/2000/svg";
		var svg = document.createElementNS( ns, "svg" );
		svg.setAttribute( "width", svgWidth );
		svg.setAttribute( "height", svgHeight );
		svg.setAttribute( "viewbox", `0 0 ${ svgWidth } ${ svgHeight }` );

		// Provide a white background.
		var rectNode = document.createElementNS( ns, "rect" );
		rectNode.setAttribute( "width", svgWidth );
		rectNode.setAttribute( "height", svgHeight );
		rectNode.setAttribute( "x", 0 );
		rectNode.setAttribute( "y", 0 );
		rectNode.setAttribute( "fill", "#ffffff" );
		svg.appendChild( rectNode );

		// Set the title.
		var titleNode = document.createElementNS( ns, "title" );
		titleNode.textContent = "Color Palette generated with Alpine.js";
		svg.appendChild( titleNode );

		// In the description, include the URL that was used to generate the palette. This
		// way, the user can open the SVG, grab the URL, and start editing it.
		var descNode = document.createElementNS( ns, "desc" );
		descNode.textContent = window.location.href;
		svg.appendChild( descNode );

		// Add each swatch to the SVG document.
		this.palette.forEach(
			( swatch, i ) => {

				// Add the colored square.
				var rectNode = document.createElementNS( ns, "rect" );
				rectNode.setAttribute( "width", swatchWidth );
				rectNode.setAttribute( "height", swatchHeight );
				rectNode.setAttribute( "x", ( i * swatchWidth ) );
				rectNode.setAttribute( "y", 0 );
				rectNode.setAttribute( "fill", swatch.hex );
				rectNode.setAttribute( "class", "swatch" );
				rectNode.setAttribute( "data-hue", swatch.hue );
				rectNode.setAttribute( "data-saturation", swatch.saturation );
				rectNode.setAttribute( "data-lightness", swatch.lightness );
				svg.appendChild( rectNode );

				// Add the hex value.
				var textNode = document.createElementNS( ns, "text" );
				textNode.textContent = swatch.hex;
				textNode.setAttribute( "x", ( ( i * swatchWidth ) + 20 ) );
				textNode.setAttribute( "y", ( swatchHeight + hexHeight - 20 ) );
				textNode.setAttribute( "fill", "#333333" );
				textNode.setAttribute( "font-family", "monospace" );
				textNode.setAttribute( "font-size", "36" );
				svg.appendChild( textNode );

			}
		);

		var svgMarkup = new XMLSerializer()
			.serializeToString( svg )
		;

		// Override the anchor properties to force the download.
		anchor.href = `data:image/svg+xml;base64,${ btoa( svgMarkup ) }`;
		anchor.download = this._generateDownloadFilename( "svg" )

	}

	/**
	* I duplicate the swatch at the given index.
	*/
	function duplicateSwatch( swatchIndex ) {

		var swatch = this.palette[ swatchIndex ];
		var newSwatch = this._createSwatch(
			swatch.hue,
			swatch.saturation,
			swatch.lightness
		);

		this.palette.splice( swatchIndex, 0, newSwatch );
		this.activeSwatchIndex += 1;
		this._persistState();
		this._focusHueAsync();
		this._checkPanelWidthAsync();

	}

	/**
	* I handle the user tabbing into a given swatch panel.
	*/
	function handleFocusin( swatchIndex ) {

		this.activeSwatchIndex = swatchIndex;

	}

	/**
	* I handle the user dragging-and-dropping an SVG / PNG swatch onto the window. Doing
	* so will load the given swatches into the palette.
	*/
	function handleGlobalDropEvents( event ) {

		// If we don't cancel the "dragover" and "drop" events, the browser will always
		// try to open the dropped file, regardless of what our event-handler does.
		event.preventDefault();

		if ( event.type === "dragover" ) {

			return;

		}

		// When the user drops the file, the use of the "shift" key will determine how the
		// colors are consumed within the UI. Without the "shift" key depressed, the
		// entire palette will be replaced. With the "shift" key depressed, the dropped
		// palette will be appended to the existing palette.
		// --
		// Note: We have to read this property before we enter the asynchronous control
		// flow since it seems to get reset (or maybe I'm just doing something wrong).
		var isResettingPalette = ! event.shiftKey;

		this._readColorsFromDropEvent( event ).then(
			( colors ) => {

				if ( isResettingPalette ) {

					this.palette.length = 0;
					this.activeSwatchIndex = 0;

				}

				for ( var color of colors ) {

					this.palette.push(
						this._createSwatch( color.hue, color.saturation, color.lightness )
					);

				}

				this._persistState();
				this._focusHueAsync();
				this._checkPanelWidthAsync();

			},
			( error ) => {

				console.error( error );

			}
		);

	}

	/**
	* I handle the location hashchange event, syncing the URL state back into the palette.
	*/
	function handleGlobalHashchange( event ) {

		var currentState = this._serializePalette();
		var urlState = window.location.hash.slice( 1 );

		if ( urlState && ( urlState !== currentState ) ) {

			this.palette = [];
			this.activeSwatchIndex = 0;
			this._loadState();
			this._focusHueAsync();
			this._checkPanelWidthAsync();

		}

	}

	/**
	* I handle the global keyboard binding (for short-cuts).
	*/
	function handleGlobalKeydown( event ) {

		// If the event has already been intercepted and consumed and overridden, then we
		// don't want to consume it again at the global level.
		if ( event.defaultPrevented ) {

			return;

		}

		// If the event contains the META key, we want to let the browser perform its
		// native behaviors.
		if ( event.metaKey || event.ctrlKey ) {

			return;

		}

		// The following events depend on having a targeted swatch.
		if ( this.palette[ this.activeSwatchIndex ] ) {

			switch ( event.key ) {
				case "-":
				case "_":

					event.preventDefault();
					this.removeSwatch( this.activeSwatchIndex );

				break;
				case "[":
				case ",": // Left-angle bracket (<) (without shift).

					event.preventDefault();
					this.moveActiveIndexLeft();

				break;
				case "]":
				case ".": // Right-angle bracket (>) (without shift).

					event.preventDefault();
					this.moveActiveIndexRight();

				break;
				case "{":
				case "<":

					event.preventDefault();
					this.moveSwatchLeft( this.activeSwatchIndex );

				break;
				case "}":
				case ">":

					event.preventDefault();
					this.moveSwatchRight( this.activeSwatchIndex );

				break;
				case "h":

					event.preventDefault();
					this._focusHue();

				break;
				case "s":

					event.preventDefault();
					this._focusSaturation();

				break;
				case "l":

					event.preventDefault();
					this._focusLightness();

				break;
				case "t":

					event.preventDefault();
					this.toggleLock( this.activeSwatchIndex );

				break;
				case "d":

					event.preventDefault();
					this.duplicateSwatch( this.activeSwatchIndex );

				break;
				case "c":

					event.preventDefault();
					this.cycleSwatch( this.activeSwatchIndex );

				break;
			}

		}

		// The following events are global and don't required a color to exist.
		switch ( event.key ) {
			case " ":
			case "Spacebar":

				event.preventDefault();
				this.cyclePalette();

			break;
			case "+":
			case "=":

				event.preventDefault();
				this.addSwatch();

			break;
		}

	}

	/**
	* I handle paste events - users can paste 6-digit HEX colors into the browser and they
	* will be added to the palette.
	*/
	function handlePaste( event ) {

		event.preventDefault();

		var data = event.clipboardData
			?.getData( "text/plain" )
		;

		if ( ! data ) {

			return;

		}

		// Hex characters must be 6-digits.
		var matches = data.toLowerCase().match( /[0-9a-f]{6}/g );

		if ( ! matches ) {

			return;

		}

		for ( var match of matches ) {

			var red = parseInt( match.slice( 0, 2 ), 16 );
			var green = parseInt( match.slice( 2, 4 ), 16 );
			var blue = parseInt( match.slice( 4, 6 ), 16 );
			var color = rgbToHsl( red, green, blue );

			this.palette.push(
				this._createSwatch( color.hue, color.saturation, color.lightness )
			);

		}

		this.activeSwatchIndex = ( this.palette.length - 1 );
		this._persistState();
		this._focusHueAsync();
		this._checkPanelWidthAsync();

	}

	/**
	* I handle input[type=range] updates for one of the HSL channels in the given swatch.
	*/
	function handleRangeInput( event, swatch ) {

		// Since the ranges are bound to directly to the swatch properties via x-model,
		// all we need to do is recalculate the hex.
		swatch.hex = hslToHex( swatch.hue, swatch.saturation, swatch.lightness );
		// Whenever a swatch is manually edited, let's assume that the user want to lock
		// it so that it won't be overwritten accidentally on a future cycling.
		swatch.isLocked = true;

		this._persistState();

	}

	/**
	* I handle the keydown event on the HSL range input for more dynamic control.
	*/
	function handleRangeKeydown( event ) {

		var target = event.currentTarget;
		var currentValue = +target.value;
		var nextValue = currentValue;
		var min = +target.min;
		var max = +target.max;
		var step = +target.step;

		var smallJump = 5;
		var mediumJump = 10;
		var largeJump = 20;

		switch ( event.key ) {
			// Left / Right is for fine-tuning.
			// --
			// Note: Using the Left / Right arrows WITHOUT shift key will naturally
			// increment the value by the predefined step (combined with the x-model
			// binding). As such, we don't have to do anything special for those subset
			// of actions.
			case "ArrowLeft":

				if ( event.shiftKey ) {

					nextValue -= ( step * smallJump );

				}

			break;
			case "ArrowRight":

				if ( event.shiftKey ) {

					nextValue += ( step * smallJump );

				}

			break;
			// Up / Down is for course-tuning.
			case "ArrowUp":

				nextValue -= ( event.shiftKey )
					? ( step * largeJump )
					: ( step * mediumJump )
				;

			break;
			case "ArrowDown":

				nextValue += ( event.shiftKey )
					? ( step * largeJump )
					: ( step * mediumJump )
				;

			break;
			// Number keys are for arbitrary %-based jumps.
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":

				nextValue = Math.round( ( max - min ) * ( +event.key / 10 ) );

			break;
		}

		// We only need to override the default behavior of the range input if the "next"
		// value that we calculated internally has been changed.
		// --
		// Note: In the following workflow, the $dispatch() magic (I believe) applies to
		// the current $el magic, which is set to the event's currentTarget (the input on
		// which the event handler was bound). When we dispatch the custom "input" event,
		// the x-model directive will catch it and adjust the model value as well as
		// reflect the change back into the range input control.
		if ( nextValue !== currentValue ) {

			event.preventDefault();
			this.$dispatch( "input", clamp( nextValue, min, max ) );

		}

	}

	/**
	* I handle the window resize event and check to see if the panels are getting too
	* narrow to display the tool buttons.
	*/
	function handleResize() {

		this._checkPanelWidth();

	}

	/**
	* I move the active index left by 1 place.
	*/
	function moveActiveIndexLeft() {

		this.activeSwatchIndex = arrayGetPrevIndex( this.palette, this.activeSwatchIndex );
		this._focusHueAsync();

	}

	/**
	* I move the active index right by 1 place.
	*/
	function moveActiveIndexRight() {

		this.activeSwatchIndex = arrayGetNextIndex( this.palette, this.activeSwatchIndex );
		this._focusHueAsync();

	}

	/**
	* I move the swatch at the given index left by 1 place.
	*/
	function moveSwatchLeft( swatchIndex ) {

		var futureIndex = arrayGetPrevIndex( this.palette, swatchIndex );

		arraySwap( this.palette, swatchIndex, futureIndex );
		this.activeSwatchIndex = futureIndex;
		this._persistState();
		this._focusHueAsync();

	}

	/**
	* I move the swatch at the given index right by 1 place.
	*/
	function moveSwatchRight( swatchIndex ) {

		var futureIndex = arrayGetNextIndex( this.palette, swatchIndex );

		arraySwap( this.palette, swatchIndex, futureIndex );
		this.activeSwatchIndex = futureIndex;
		this._persistState();
		this._focusHueAsync();

	}

	/**
	* I remove the swatch with the given index.
	*/
	function removeSwatch( swatchIndex ) {

		this.palette.splice( swatchIndex, 1 );
		this._persistState();
		this._checkPanelWidthAsync();

		if ( this.palette.length ) {

			this.activeSwatchIndex = clamp( swatchIndex, 0, ( this.palette.length - 1 ) );
			this._focusHueAsync();

		}

	}

	/**
	* I toggle the lock flag for the swatch with the given index. A locked swatch will not
	* be affected when cycling colors (either the entire palette or a single swatch).
	*/
	function toggleLock( swatchIndex ) {

		this.palette[ swatchIndex ].isLocked = ! this.palette[ swatchIndex ].isLocked;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I check the panel width and decide if the panels are "narrow" (relative to the tools
	* that have to fit within them).
	*
	* Note: I originally tried to do this with a CSS container query; but, container
	* queries don't appear to play nicely with CSS Flexbox layouts. I'm sure there's a way
	* to get it to work; but, it wasn't a tangent I needed to run down.
	*/
	function checkPanelWidth() {

		this.isNarrowPanels = ( this.palette.length )
			? ( host.querySelector( ".panel" ).getBoundingClientRect().width < 250 )
			: false
		;

	}

	/**
	* I check the panel width in the NEXT TICK. This gives Alpine a chance to update the
	* DOM to reflect the current view-model.
	*/
	function checkPanelWidthAsync() {

		Alpine.nextTick( () => this._checkPanelWidth() );

	}

	/**
	* I create a swatch with random Hue, Saturation, and Lightness values.
	*/
	function createRandomSwatch() {

		var hue = randRange( 0, 360 );
		var saturation = randRange( 0, 100 );
		var lightness = randRange( 0, 100 );

		return this._createSwatch( hue, saturation, lightness );

	}

	/**
	* I create a swatch with the given Hue, Saturation, and Lightness values.
	*/
	function createSwatch( hue, saturation, lightness, isLocked ) {

		var hex = hslToHex( hue, saturation, lightness );

		return {
			id: ++swatchID,
			hue: hue,
			saturation: saturation,
			lightness: lightness,
			hex: hex,
			isLocked: ( isLocked || false )
		};

	}

	/**
	* I focus the hue input in the active panel.
	*/
	function focusHue() {

		host.querySelector( ".panel--active input.hue" )
			?.focus()
		;

	}

	/**
	* I focus the hue input in the active panel in the NEXT TICK. This gives Alpine a
	* chance to update the DOM to reflect the current view-model.
	*/
	function focusHueAsync() {

		Alpine.nextTick( () => this._focusHue() );

	}

	/**
	* I focus the lightness input in the active panel.
	*/
	function focusLightness() {

		host.querySelector( ".panel--active input.lightness" )
			?.focus()
		;

	}

	/**
	* I focus the saturation input in the active panel.
	*/
	function focusSaturation() {

		host.querySelector( ".panel--active input.saturation" )
			?.focus()
		;

	}

	/**
	* I generate the filename for the palette download.
	*/
	function generateDownloadFilename( fileExtension ) {

		// TODO: I think some systems run into an issue with long filenames. As such, it
		// might make sense to have a max-length check and then use a slightly different
		// approach for really large palettes?? But, not a problem I have to worry about
		// at this point.

		var stub = this.palette
			.map(
				( swatch ) => {

					return swatch.hex.slice( -6 );

				}
			)
			.join( "-" )
		;

		return `palette-${ stub }.${ fileExtension }`;

	}

	/**
	* I load state that has been persisted in the URL fragment.
	*/
	function loadState() {

		// This pattern is a bit complicated. It will match either an integer or an
		// integer followed by a decimal place.
		var matches = window.location.hash
			.slice( 1 )
			.match( /\d+(\.\d+)?,\d+(\.\d+)?,\d+(\.\d+)?/g )
		;

		if ( ! matches ) {

			return 0;

		}

		for ( var match of matches ) {

			var channels = match.split( "," );
			var hue = clamp( +channels[ 0 ], 0, 360 );
			var saturation = clamp( +channels[ 1 ], 0, 100 );
			var lightness = clamp( +channels[ 2 ], 0, 100 );

			this.palette.push( this._createSwatch( hue, saturation, lightness ) );

		}

		this._setDocumentTitle();
		this._setFavicon();

		return this.palette.length;

	}

	/**
	* I (eventually) persist the current palette to the URL fragment.
	*
	* Note: Because we might potentially be triggering a large number of URL changes based
	* on input-range sliders, we want to debounce the persistence throughput so that the
	* browser doesn't complain about the volume of URL updates.
	*/
	function persistState() {

		clearTimeout( persistanceTimer );

		persistanceTimer = setTimeout(
			() => {
				this._persistStateSync();
			},
			500
		);

	}

	/**
	* I implement the synchronous persistence operation to the URL.
	*/
	function persistStateSync() {

		this._setUrlHash();
		this._setDocumentTitle();
		this._setFavicon();

	}

	/**
	* I read the swatch colors (HSL) from the file dropped in the given event.
	*/
	async function readColorsFromDropEvent( event ) {

		if ( ! event.dataTransfer?.items?.length ) {

			throw( new Error( "No items dropped." ) );

		}

		var item = event.dataTransfer.items[ 0 ];

		if ( item?.kind !== "file" ) {

			throw( new Error( "Dropped item is not a file." ) );

		}

		var file = item.getAsFile();

		if ( file.type === "image/svg+xml" ) {

			return this._readColorsFromSvgFile( file );

		} else if ( file.type === "image/png" ) {

			return this._readColorsFromPngFile( file );

		}

		throw( new Error( "Dropped file must be SVG or PNG palette." ) );

	}

	/**
	* I parse the given PNG file (generated by the color utility) and extract the HSL
	* values embedded within the pixel data.
	*/
	async function readColorsFromPngFile( file ) {

		var canvas = document.createElement( "canvas" );
		var context = canvas.getContext(
			"2d",
			// Chrome dev tools tells me that setting this value is important (for
			// performance) when I am going to call .getImageData() multiple times, which
			// I do, once per pixel.
			{ willReadFrequently: true }
		);
		var tempImageUrl = URL.createObjectURL( file );

		try {

			var image = new Image();

			await new Promise(
				( resolve, reject ) => {

					image.onload = resolve;
					image.onerror = reject;
					image.src = tempImageUrl;

				}
			);

			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage( image, 0, 0 );

		} finally {

			// Now that we've written the image to the canvas, we can free up the memory
			// being used by the blob.
			URL.revokeObjectURL( tempImageUrl );

		}

		// We want to grab from the center of the swatch.
		var x = Math.floor( swatchWidth / 2 );
		var y = Math.floor( swatchHeight / 2 );
		var colors = [];

		for ( ; x < canvas.width ; x += swatchWidth ) {

			var imageData = context.getImageData( x, y, 1, 1 );
			// Pixel data is stored as a single contiguous array in which the RGBA data is
			// stored in subsequent indices. Therefore, when we get a 1x1 slice of the
			// canvas image data, it returns an array of length 4 in which the 4 indices
			// represent Red, Green, Blue, and Alpha, respectively.
			colors.push(
				rgbToHsl(
					imageData.data[ 0 ],
					imageData.data[ 1 ],
					imageData.data[ 2 ]
				)
			);

		}

		return colors;

	}

	/**
	* I parse the given SVG file (generated by the color utility) and extract the HSL
	* values embedded within the markup.
	*/
	async function readColorsFromSvgFile( file ) {

		var xmlContent = await file.text();
		var xml = new DOMParser()
			.parseFromString( xmlContent, "image/svg+xml" )
		;

		var colors = [];

		for ( var node of xml.querySelectorAll( ".swatch" ) ) {

			colors.push({
				hue: ( +node.dataset.hue || 0 ),
				saturation: ( +node.dataset.saturation || 0 ),
				lightness: ( +node.dataset.lightness || 0 )
			});

		}

		return colors;

	}

	/**
	* I serialize the palette into a URL-safe string.
	*/
	function serializePalette() {

		var serialized = this.palette
			.map(
				( swatch ) => {

					return `(${ swatch.hue },${ swatch.saturation },${ swatch.lightness })`;

				}
			)
			.join( "," )
		;

		return serialized;

	}

	/**
	* I set the document title using the current swatch hex codes.
	*/
	function setDocumentTitle() {

		document.title = this.palette
			.map(
				( swatch ) => {

					return swatch.hex;

				}
			)
			.join( ", " )
		;

	}

	/**
	* I render a dynamic favicon using the current swatch hex codes.
	*/
	function setFavicon() {

		document.querySelector( "link.icon" )
			?.remove()
		;

		if ( ! this.palette.length ) {

			return;

		}

		var canvas = document.createElement( "canvas" );
		canvas.width = 64;
		canvas.height = 64;

		var colorWidth = Math.ceil( canvas.width / this.palette.length );
		var context = canvas.getContext( "2d" );

		this.palette.forEach(
			( swatch, i ) => {

				context.fillStyle = swatch.hex;
				context.fillRect(
					( i * colorWidth ),
					0,
					colorWidth,
					canvas.height
				);

			}
		);

		var link = document.createElement( "link" );
		link.classList.add( "icon" );
		link.type = "image/x-icon";
		link.rel = "shortcut icon";
		link.href = canvas.toDataURL( "image/x-icon" );

		document.head.appendChild( link );

	}

	/**
	* I set the URL fragment using the serialized palette.
	*/
	function setUrlHash() {

		// Since the URL stores the current color selections, it means that tweaking the
		// colors will lead to many new URLs. To help reduce the many intermediary URLs on
		// the way to a desired outcome, we're going to "debounce" some URL changes by
		// using replaceState() if when the URL is set with high frequency.
		var now = Date.now();
		var cuttoff = ( 10 * 1000 ); // 10 seconds.

		var isReplace = (
			// When setting the hash for the first time, always replace.
			! window.location.hash ||
			// When the hash already exists, only replace when the URL has already been
			// explicitly set (and is before the debouncing cutoff). This way, if a page
			// with an existing hash is refreshed, the initial state is always kept in the
			// history even when the colors are tweaked immediately after load.
			( urlSetAt && ( ( now - urlSetAt ) < cuttoff ) )
		);

		urlSetAt = now;

		if ( isReplace ) {

			window.history.replaceState( null, null, ( "#" + this._serializePalette() ) );

		} else {

			window.location.hash = this._serializePalette();

		}

	}

}

// ----------------------------------------------------------------------------------- //
// Utility Function - these aren't tied to any component state.
// ----------------------------------------------------------------------------------- //

/**
* I get the next available index, cycling back to the head of the array as needed.
*/
function arrayGetNextIndex( array, i ) {

	if ( i === ( array.length - 1 ) ) {

		return 0;

	}

	return ( i + 1 );

}

/**
* I get the previous available index, cycling back to the tail of the array as needed.
*/
function arrayGetPrevIndex( array, i ) {

	if ( i === 0 ) {

		return ( array.length - 1 );

	}

	return ( i - 1 );

}

/**
* I swap the elements at the given indices.
*/
function arraySwap( array, m, n ) {

	var temp = array[ m ];
	array[ m ] = array[ n ];
	array[ n ] = temp;

	return array;

}

/**
* I return the given value, constrained to the given min/max inclusive.
*/
function clamp( value, min, max ) {

	if ( value < min ) {

		return min;

	}

	if ( value > max ) {

		return max;

	}

	return value;

}

/**
* I convert the given HSL values to a HEX color string.
*/
function hslToHex( hue, saturation, lightness ) {

	var channels = hslToRgb( hue, saturation, lightness );

	return (
		"#" +
		padHex( channels.red.toString( 16 ) ) +
		padHex( channels.green.toString( 16 ) ) +
		padHex( channels.blue.toString( 16 ) )
	);

}

/**
* I convert the given HSL values to RGB channels.
*
* CAUTION: I have no idea how this method works. It's all math that I don't know about. I
* grabbed it from Stack Overflow (and then modified it to make it a bit more readable):
*
* https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
*/
function hslToRgb( hue, saturation, lightness ) {

	saturation /= 100;
	lightness /= 100;

	var a = ( saturation * Math.min( lightness, 1 - lightness ) );

	return {
		red: Math.round( getChannel( 0 ) * 255 ),
		green: Math.round( getChannel( 8 ) * 255 ),
		blue: Math.round( getChannel( 4 ) * 255 )
	};

	function getChannel( n ) {

		var k = ( ( n + hue / 30 ) % 12 );

		return ( lightness - ( a * Math.max( Math.min( ( k - 3 ), ( 9 - k ), 1 ), -1 ) ) );

	}

}

/**
* I ensure that the given hex value is two digits.
*/
function padHex( value ) {

	return ( "0" + value ).slice( -2 );

}

/**
* I produce a random value between 0 (inclusive) and 1 (exclusive).
*/
function randFloat() {

	// First, we'll try the Web Crypto API, which hopefully produces values with better
	// randomness. Then, if that fails, we'll fallback to the traditional Math.random()
	// method.
	try {

		var maxValue = 65535;
		var values = window.crypto.getRandomValues( new Uint16Array( 1 ) );

		return ( values[ 0 ] / ( maxValue + 1 ) );

	} catch ( error ) {

		console.error( error );
		return Math.random();

	}

}

/**
* I return a random number between the min and max, inclusive.
*/
function randRange( min, max ) {

	return ( min + Math.floor( randFloat() * ( max - min + 1 ) ) );

}

/**
* I convert the given RGB channels to HSL values.
*
* CAUTION: I have no idea how this method works. It's all math that I don't know about. I
* grabbed it from CSS Tricks (and then modified it to make it a bit more readable):
*
* https://css-tricks.com/converting-color-spaces-in-javascript/#aa-rgb-to-hsl
*/
function rgbToHsl( red, green, blue ) {

	red /= 255;
	green /= 255;
	blue /= 255;

	var hue = 0;
	var saturation = 0;
	var lightness = 0;
	var cmin = Math.min( red, green, blue );
	var cmax = Math.max( red, green, blue );
	var delta = ( cmax - cmin );

	if ( ! delta ) {

		hue = 0;

	} else if ( cmax === red ) {

		hue = ( ( ( green - blue ) / delta ) % 6 );

	} else if ( cmax === green ) {

		hue = ( ( ( blue - red ) / delta ) + 2 );

	} else {

		hue = ( ( ( red - green ) / delta ) + 4 );

	}

	hue = Math.round( hue * 60 );

	if ( hue < 0 ) {

		hue += 360;

	}

	lightness = ( ( cmax + cmin ) / 2 );

	saturation = ( delta )
		? ( delta / ( 1 - Math.abs( ( 2 * lightness ) - 1 ) ) )
		: 0
	;

	saturation = +( saturation * 100 ).toFixed( 1 );
	lightness = +( lightness * 100 ).toFixed( 1 );

	return {
		hue: hue,
		saturation: saturation,
		lightness: lightness
	};

}
