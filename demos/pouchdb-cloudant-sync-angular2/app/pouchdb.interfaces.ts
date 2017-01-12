
// CAUTION: There is currently no up-to-date "Definitely Typed" set of interfaces for
// PouchDB. So, in an effort to help me learn about the PouchDB API, I'm providing a few
// tiny interfaces here so I can get a better idea of what data is available.

export interface IPouchDBAllDocsResult {
	offset: number;
	total_rows: number;
	rows: IPouchDBRow[];
}

export interface IPouchDBGetResult {
	_id: string;
	_rev: string;
}

export interface IPouchDBPutResult {
	ok: boolean;
	id: string;
	rev: string;
}

export interface IPouchDBRemoveResult {
	ok: boolean;
	id: string;
	rev: string;
}

export interface IPouchDBRow {
	id: string;
	key: string;
	value: { rev: string };

	// Only included if include_docs is set to true during query.
	doc?: any; 
}

export interface IPouchDBSyncChangeResult {
	direction: ( "push" | "pull" );
	change: {
		doc_write_failures: number;
		docs_read: number;
		docs_written: number;
		errors: any[];
		last_seq: string;
		ok: boolean;
		start_time: string;
		docs: any[];
			// _id: 'docId',
			// _rev: '1-e798a1a7eb4247b399dbfec84ca699d4',
			// and: 'data'
	};
}

export interface IPouchDBSyncCompleteResult {
	pull: {
		doc_write_failures: number;
		docs_read: number;
		docs_written: number;
		end_time: string;
		errors: any[];
		last_seq: string;
		ok: boolean;
		start_time: string;
		status: string;
	};
	push: {
		doc_write_failures: number;
		docs_read: number;
		docs_written: number;
		end_time: string;
		errors: any[];
		last_seq: string;
		ok: boolean;
		start_time: string;
		status: string;
	};
}
