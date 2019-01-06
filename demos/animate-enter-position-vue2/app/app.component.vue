
<style scoped src="./app.component.less" />
<style scoped lang="less">
	
	.item {
		&-enter {
			opacity: 0.0 ;
			// NOTE: Since the initial value of the "transform" property is data-driven
			// based on the Vue-state, we need to calculate the transform in the .enter()
			// hook of the Vue class.
		}

		&-enter-active {
			// NOTE: The first duration listed below is the one that will be consumed by
			// Vue.js when defining the overall animation time. As such, we have to list
			// the opacity properties second as they are going to be shorter.
			transition-duration: 300ms, 200ms ;
			transition-property: transform, opacity ;
			transition-timing-function: ease ;
		}

		&-enter-to {
			opacity: 1.0 ;
			transform: translateX( 0px ) translateY( 0px ) ;
		}
	}

</style>

<template>

	<div class="app">

		<!-- NOTE: Transition-Group will render our UL element. -->
		<transition-group
			name="item"
			tag="ul"
			@enter="enter"
			class="items">
			<li
				v-for="item in items"
				:key="item.id"
				class="item">
				<br />
			</li>
		</transition-group>

		<div @click="addFromEvent( $event )" class="click-capture">
			<!--
				I provide a full-viewport overlay to handle click-events so that we don't
				have to much around with binding event-handlers on the WINDOW object.
			-->
		</div>

	</div>

</template>

<script>
	
	export default {
		data() {

			return({
				items: [],
				mostRecentClickCoordinates: null
			});

		},
		methods: {
			// I add a new item based on the given mouse-click event.
			addFromEvent( event ) {

				this.items.push({
					id: Date.now()
				});

				// When Vue applies the "enter" animation for the above item, we want to
				// animate it in from the current event's click-location. As such, we
				// have store the coordinates for use in the subsequent animation hooks.
				this.mostRecentClickCoordinates = {
					x: event.clientX,
					y: event.clientY
				};

			},

			// I work IN CONJUNCTION with the CSS-based animation to manage the enter
			// phase of the new item rendering. In particular, I calculate the initial
			// location of the item.
			// --
			// NOTE: We don't need the done() argument since we are defining the 
			// transition timing in the CSS.
			enter( element ) {

				// Calculate the initial transform to position the item under the user's
				// cursor (based on the stored mouse-click event).
				var clickX = this.mostRecentClickCoordinates.x;
				var clickY = this.mostRecentClickCoordinates.y;
				var rect = element.getBoundingClientRect();
				var deltaX = ( clickX - rect.left - ( rect.width / 2 ) );
				var deltaY = ( clickY - rect.top - ( rect.height / 2 ) );

				// Style the item position.
				element.style.transform = `translateX( ${ deltaX }px ) translateY( ${ deltaY }px )`;
				// When we define the initial position of the item, we have to LOCALLY
				// DEACTIVATE the transition property otherwise the item will never make
				// it from the static position out to the transformed position.
				element.style.transition = "none";

				// By default, the browser attempts to optimize updates by "chunking" CSS
				// changes. As such, we have to force the browser to repaint in order to
				// apply the above styles before we nullify them below.
				this.__force_paint__ = document.body.offsetHeight;

				// At this point, the browser has rendered the new item at the
				// transformed location without any transition timing. And, now that we
				// have configured the initial position, we can nullify the LOCAL STYLE
				// of the item so that the browser will transition the CSS based on the
				// "item-enter-to" class.
				element.style = null;

			}
		}
	};

</script>
