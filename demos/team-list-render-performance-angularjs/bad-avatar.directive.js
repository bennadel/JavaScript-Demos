(function( ng, app ) {
	"use strict";

	app.directive( "bnBadAvatar", BadAvatarDirective );

	function BadAvatarDirective( $compile ) {

		return({
			link: linkFunction,
			restrict: "E"
		});

		function linkFunction( $scope, element, attributes ) {

			var $element = $(element),
				expression = attributes.bnPerson,
				width = parseInt(attributes.bnWidth, 10) || 36
			;

			$element
				.addClass("avatar")
				.css({
					height: width,
					width: width
				});

			var unbindWatch = $scope.$watch(
				expression,
				function(newVal) {

					addData(newVal);

				},
				true
			);

			// --

			function addData(person) {

				$scope.avatarPerson = person;
				$scope.width = width;

				pushTemplate(person);

				var $initials = $element.find(".initials");

				// Show initials upfront in case image fails
				$initials.css({
					display: "block",
					lineHeight: width + "px",
					fontSize: Math.abs( width / 3 ) + "px"
				});
				
				var $image = $element.find("img");

				// When the image loads, remove the
				// background - this is just a nicety
				// to remove the jagged color outline
				$image.on("load.bnAvatar", function() {

					$initials.remove();

					$(this).show();

					$element.css({
						backgroundColor: "none",
						background: "none"
					});

					$image.off("load.bnAvatar");

				});

				// Prevent broken images by removing it
				// from the DOM if an error is detected
				$image.on("error.bnAvatar", function() {

					$image.remove();

					$image.off("error.bnAvatar");

				});

			}


			// I escape unsafe characters for use in the HTML construction.
			function htmlEditFormat( value ) {

				value = ( value || "" )
					.replace( /&/gi, "&amp;" )
					.replace( /"/gi, "&quot;" )
					.replace( /</gi, "&lt;" )
					.replace( />/gi, "&gt;" )
				;

				return( value );

			}


			function pushTemplate(person) {

				var src = person.avatarUrl;

				var img = '<img src="' + src + '" ' +
					' height="' + width + '" ' +
					' width="' + width + '" ' +
					' loading="lazy" ' +
					' alt="' + htmlEditFormat( person.name ) + '" ' +
					' style="display:block;width:' + width + 'px;height:' + width + 'px" />';

				var initials = ! person.initials ? '' :
					'<span class="initials">' + person.initials + '</span>';

				var template = initials + img ;

				$element.html(template);

			}

		};

	}

})( angular, app );
