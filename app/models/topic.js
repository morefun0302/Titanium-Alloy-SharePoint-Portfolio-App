exports.definition = {
	config: {
		"columns": {
			id: "INTEGER PRIMARYKEY",
			name: "TEXT",
			sharepointId: "INTEGER"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "topics",		
			"idAttribute": 'id'
	 	}
	}
};
