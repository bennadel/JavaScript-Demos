
export interface Friend {
	id: number;
	name: string;
}

var id = 0;

// NOTE: I had to do it this way because TypeScript compiling-away every other approach
// that I tried to generate this collection. I'll have to figure out why it did that;
// but, for now, I'm just brute-forcing it.
export var friends: Friend[] = [
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(),
	getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend(), getRandomFriend()
];

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

function getRandomFriend() : Friend {

	return({
		id: ++id,
		name: getRandomName()
	});

}

function getRandomName() : string {

	var firstNames = [ "Aaron", "Abigail", "Adam", "Alan", "Albert", "Alexander", "Alexis", "Alice", "Amanda", "Amber", "Amy", "Andrea", "Andrew", "Angela", "Ann", "Anna", "Anthony", "Arthur", "Ashley", "Austin", "Barbara", "Benjamin", "Betty", "Beverly", "Billy", "Bobby", "Bradley", "Brandon", "Brenda", "Brian", "Brittany", "Bruce", "Bryan", "Carl", "Carol", "Carolyn", "Catherine", "Charles", "Charlotte", "Cheryl", "Christian", "Christina", "Christine", "Christopher", "Cynthia", "Daniel", "Danielle", "David", "Deborah", "Debra", "Denise", "Dennis", "Diana", "Diane", "Donald", "Donna", "Doris", "Dorothy", "Douglas", "Dylan", "Edward", "Elizabeth", "Emily", "Emma", "Eric", "Ethan", "Eugene", "Evelyn", "Frances", "Frank", "Gabriel", "Gary", "George", "Gerald", "Gloria", "Grace", "Gregory", "Hannah", "Harold", "Heather", "Helen", "Henry", "Isabella", "Jack", "Jacob", "Jacqueline", "James", "Janet", "Janice", "Jason", "Jean", "Jeffrey", "Jennifer", "Jeremy", "Jerry", "Jesse", "Jessica", "Joan", "Joe", "John", "Johnny", "Jonathan", "Jordan", "Jose", "Joseph", "Joshua", "Joyce", "Juan", "Judith", "Judy", "Julia", "Julie", "Justin", "Karen", "Katherine", "Kathleen", "Kathryn", "Kayla", "Keith", "Kelly", "Kenneth", "Kevin", "Kimberly", "Kyle", "Larry", "Laura", "Lauren", "Lawrence", "Linda", "Lisa", "Logan", "Louis", "Madison", "Margaret", "Maria", "Marie", "Marilyn", "Mark", "Martha", "Mary", "Matthew", "Megan", "Melissa", "Michael", "Michelle", "Nancy", "Natalie", "Nathan", "Nicholas", "Nicole", "Noah", "Olivia", "Pamela", "Patricia", "Patrick", "Paul", "Peter", "Philip", "Rachel", "Ralph", "Randy", "Raymond", "Rebecca", "Richard", "Robert", "Roger", "Ronald", "Rose", "Roy", "Russell", "Ruth", "Ryan", "Samantha", "Samuel", "Sandra", "Sara", "Sarah", "Scott", "Sean", "Sharon", "Shirley", "Sophia", "Stephanie", "Stephen", "Steven", "Susan", "Teresa", "Terry", "Theresa", "Thomas", "Timothy", "Tyler", "Victoria", "Vincent", "Virginia", "Walter", "Wayne", "William", "Willie", "Zachary" ];
	var lastNames = [ "Adams", "Alexander", "Allen", "Anderson", "Bailey", "Baker", "Barnes", "Bell", "Bennett", "Brooks", "Brown", "Bryant", "Butler", "Campbell", "Carter", "Clark", "Coleman", "Collins", "Cook", "Cooper", "Cox", "Davis", "Diaz", "Edwards", "Evans", "Flores", "Foster", "Garcia", "Gonzales", "Gonzalez", "Gray", "Green", "Griffin", "Hall", "Harris", "Hayes", "Henderson", "Hernandez", "Hill", "Howard", "Hughes", "Jackson", "James", "Jenkins", "Johnson", "Jones", "Kelly", "King", "Lee", "Lewis", "Long", "Lopez", "Martin", "Martinez", "Miller", "Mitchell", "Moore", "Morgan", "Morris", "Murphy", "Nelson", "Parker", "Patterson", "Perez", "Perry", "Peterson", "Phillips", "Powell", "Price", "Ramirez", "Reed", "Richardson", "Rivera", "Roberts", "Robinson", "Rodriguez", "Rogers", "Ross", "Russell", "Sanchez", "Sanders", "Scott", "Simmons", "Smith", "Stewart", "Taylor", "Thomas", "Thompson", "Torres", "Turner", "Walker", "Ward", "Washington", "Watson", "White", "Williams", "Wilson", "Wood", "Wright", "Young" ];

	return( getRandomValue( firstNames ) + " " + getRandomValue( lastNames ) );

}

function getRandomValue<T>( values: T[] ) : T {

	var index = Math.floor( Math.random() * values.length );

	return( values[ index ] );

}
