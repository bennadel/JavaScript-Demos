
export interface Folder {
	uid: string;
	name: string;
	folders: Folder[];
	files: File[];
}

export interface File {
	uid: string;
	name: string;
}

export function generateData() : Folder {

	var idCounter = 0;

	var id = function() : string {

		return( `node-${ ++idCounter }` );

	};

	return({
		uid: id(),
		name: "My Documents",
		files: [
			{
				uid: id(),
				name: "misc-expenses.xls"
			}
		],
		folders: [
			{
				uid: id(),
				name: "Photos",
				files: [
					{
						uid: id(),
						name: "IMG-839.jpg"
					},
					{
						uid: id(),
						name: "IMG-937A.jpg"
					}
				],
				folders: [
					{
						uid: id(),
						name: "Summer Vacation 2018",
						files: [
							{
								uid: id(),
								name: "ben + lucy.jpg"
							},
							{
								uid: id(),
								name: "something-natural (sandwiches).mp4"
							},
							{
								uid: id(),
								name: "sunset.mp4"
							},
						],
						folders: []
					},
					{
						uid: id(),
						name: "ngConf 2017",
						files: [],
						folders: []
					}
				]
			},
			{
				uid: id(),
				name: "Videos",
				files: [],
				folders: [
					{
						uid: id(),
						name: "Lucy",
						files: [
							{
								uid: id(),
								name: "IMG_2774 (to be sorted).mp4"
							},
							{
								uid: id(),
								name: "IMG_3900-FE (to be sorted).mp4"
							}
						],
						folders: [
							{
								uid: id(),
								name: "Humping her Bed",
								files: [],
								folders: [
									{
										uid: id(),
										name: "Family Events",
										files: [
											{
												uid: id(),
												name: "thanks-giving.mp4"
											},
											{
												uid: id(),
												name: "Baby Shower (Lucinda).mp4"
											},
										],
										folders: []
									},
									{
										uid: id(),
										name: "On Holiday",
										files: [
											{
												uid: id(),
												name: "Brass Lantern Inn.mp4"
											},
											{
												uid: id(),
												name: "Brass Lantern Inn (2).mp4"
											},
											{
												uid: id(),
												name: "IMG_1398-AAC.mp4"
											},
											{
												uid: id(),
												name: "stowe-vt.mp4"
											}
										],
										folders: []
									},
									{
										uid: id(),
										name: "Miscellaneous",
										files: [
											{
												uid: id(),
												name: "fail-compilation-1.mp4"
											},
											{
												uid: id(),
												name: "fail-compilation-2.mp4"
											},
											{
												uid: id(),
												name: "full-circle.mp4"
											}
										],
										folders: []
									}
								]
							},
							{
								uid: id(),
								name: "Playing on the Beach",
								files: [],
								folders: [
									{
										uid: id(),
										name: "Summer 2017",
										files: [],
										folders: []
									},
									{
										uid: id(),
										name: "Summer 2018",
										files: [
											{
												uid: id(),
												name: "Dyonis.mp4"
											},
											{
												uid: id(),
												name: "Madaket Beach - Sunrise.mp4"
											},
											{
												uid: id(),
												name: "Madaket Beach - Sunset.mp4"
											}
										],
										folders: []
									},
									{
										uid: id(),
										name: "Summer 2019",
										files: [],
										folders: []
									}
								]
							},
						]
					}
				]
			}
		]
	});

}
