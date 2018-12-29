
<style scoped src="./app.component.less" />

<template>

	<div class="app">

		<h2 class="title">
			You have {{ friends.length }} friend(s)!
		</h2>

		<FriendFormComponent
			placeholder="Name..."
			@add="addFriend( $event )">
		</FriendFormComponent>

		<!-- BEGIN: Friends List. -->
		<template v-if="friends.length">

			<ul class="items">
				<li
					v-for="friend in friends"
					:key="friend.id"
					class="items__item">

					<FriendComponent
						:friend="friend"
						@delete="deleteFriend( $event )"
						class="friend">
					</FriendComponent>

				</li>
			</ul>

		</template>

		<template v-else>

			<p class="no-data">
				<em>Get your ass to Mars!</em>
			</p>

		</template>
		<!-- END: Friends List. -->

	</div>

</template>

<script>
	
	// Import core classes.
	import Vue from "vue";

	// Import application classes.
	import FriendComponent from "./friend.component.vue";
	import FriendFormComponent from "./friend-form.component.vue";

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	export default Vue.extend({
		inject: [
			"friendService"
		],
		components: {
			FriendComponent,
			FriendFormComponent
		},
		data() {

			return({
				friends: []
			});

		},
		// I get called once after the component has been created and the props and
		// dependencies have been wired together.
		created() {

			this.friends = this.friendService.getFriends( "Sarah", "Kim" );

		},
		methods: {
			// I add a new friend with the given name.
			addFriend( name ) {

				this.friends.push({
					id: Date.now(),
					name: name
				});

			},

			// I delete the given friend.
			deleteFriend( friend ) {

				var index = this.friends.indexOf( friend );

				if ( index >= 0 ) {

					this.friends.splice( index, 1 );

				}

			}
		}
	});

</script>
