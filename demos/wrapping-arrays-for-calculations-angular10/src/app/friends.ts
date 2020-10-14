
export interface Friend {
	id: number;
	name: string;
	isBFF: boolean;
	hobbies: string[];
}

export var friends: Friend[] = [];

for ( var id = 0, i = 0 ; i <= 50 ; i++ ) {

	friends.push( getRandomFriend() );

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

function getRandomFriend() : Friend {

	return({
		id: ++id,
		name: getRandomName(),
		isBFF: getRandomBff(),
		hobbies: getRandomHobbies()
	});

}

function getRandomBff() : boolean {

	var values = [ true, false, false, false, false, false, false, false, false, false, false, false ];

	return( getRandomValue( values ) );

}

function getRandomHobbies() : string[] {

	var values = [ "Working Out", "Hiking", "Swimming", "Biking", "Jogging", "Knitting", "Writing", "Singing", "Sky Diving", "Horse-Back Riding", "Bowling", "Golfing", "Dressage", "Ballroom Dancing", "Baking", "Weaving", "Ping-Pong", "Tennis", "Skating" ];

	var keyCount = getRandomValue( [ 0, 1, 2, 3 ] );
	var keys: any = {};

	for ( var i = 0 ; i < keyCount ; i++ ) {

		keys[ getRandomValue( values ) ] = true;

	}

	return( Object.keys( keys ) );

}

function getRandomName() : string {

	// Generated from: https://blog.reedsy.com/character-name-generator/language/english/
	var values = [ "Addison Yates", "Alex Wright", "Alexis Obrien", "Alger George", "Alvin Young", "Anthony Pauley", "Baldwin Lamb", "Barbara Schuman", "Barclay Carlson", "Beata Hammond", "Bobby Padilla", "Brooke Wintringham", "Cade Jennings", "Cade Weber", "Caesar Webster", "Chase Covington", "Chase Pena", "Chelsea Lyons", "Cheryl Mullins", "Chris Nguyen", "Clarissa Coleman", "Clement Mcdaniel", "Colin Taylor", "Conrad Burke", "Dawn Tucker", "Del Hart", "Diana Booth", "Ebenezer Hanson", "Edmond Schmidt", "Esmond Barnes", "Francis Gregory", "Frank Baker", "Frank Garrett", "Frank Glisson", "Gabrielle Moore", "Gale Potter", "Garrick Jensen", "Georgie Gutierrez", "Grace Ruell", "Greg Banks", "Grover Caldwell", "Guinevere Woolridge", "Hadwin Knowles", "Harper Cooper", "Heath Swanson", "Herb Garza", "Holly Hubbard", "Holly Titterington", "Horace Sarratt", "Ida Presley", "Jocelyn Kelley", "Joey Herrera", "Jordan Hawkins", "Joseph Pena", "Judy Hum", "Kendrick Estrada", "Kenelm Little", "Kennard Horton", "Kenneth Hines", "Lane Mullins", "Laurel Preston", "Leroy Tyler", "Les Garrett", "Lesley Richards", "Lizzie Gray", "Louie Henry", "Maggie Graves", "Maria Jensen", "Maria Jordan", "Marty Sarratt", "Matthew Simmons", "Maynard Schmidt", "Melissa Wintringham", "Miles Leonard", "Miranda Atkinson", "Muriel Fernandez", "Nancy Harmon", "Nathaniel Corbyn", "Nathaniel Santos", "Norris Hubbard", "Opal Higgins", "Osbert Day", "Patrick Mullins", "Percy Pearson", "Perry Tomlinson", "Rachel Moreno", "Raven Cummings", "Richard Frost", "Robin Goodman", "Ruby Smith", "Rusty Kirk", "Sabrina Shortle", "Shawn Mullins", "Tabitha Swanson", "Talia Baxter", "Theo Heath", "Tilda Rowse", "Toby Guzman", "Truman Hum", "Veronica Watson", "Vince Manning", "Violet Duncan", "Violet Stokes", "Vivian Morton", "Wade Jenning", "Wade Lambert", "Ward Dittman", "Warren Mullins", "Wayne Peters", "Webster Thornton", "Wendy Jackson", "Wesley Barnett", "Whitney Field", "Willette Feron", "Willette Pearce", "Winston Black", "Winston Woodward", "Yvette Ball", "Zelene Fields", "Zera George" ];

	return( getRandomValue( values ) );

}

function getRandomValue<T>( values: T[] ) : T {

	var index = Math.floor( Math.random() * values.length );

	return( values[ index ] );

}
