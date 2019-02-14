
export interface TreeItem {
	id: number;
	parentID: number;
	type: "group" | "item";
	name: string;
}

// I faciliate the building of a hierarchical tree of data.
export class TreeBuilder {

	private data: TreeItem[];
	private id: number;
	private idPath: number[];

	// I initialize the tree-builder.
	constructor() {

		this.data = [];
		this.id = 0;
		this.idPath = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return the current data.
	public getData() : TreeItem[] {

		return( this.data );

	}


	// I create another group and set it as the current context.
	public group( name: string ) : TreeBuilder {

		this.data.push({
			id: ++this.id,
			parentID: ( this.idPath[ this.idPath.length - 1 ] || 0 ),
			type: "group",
			name: name
		});

		this.idPath.push( this.id );

		return( this );

	}


	// I create an item in the current context.
	public item( name: string ) : TreeBuilder {

		this.data.push({
			id: ++this.id,
			parentID: ( this.idPath[ this.idPath.length - 1 ] || 0 ),
			type: "item",
			name: name
		});

		return( this );

	}


	// I move up into the parent group context.
	public up() : TreeBuilder {

		this.idPath.pop();

		return( this );

	}

}
