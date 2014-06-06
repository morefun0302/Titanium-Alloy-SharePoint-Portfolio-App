exports.definition = {
	config: {
		"columns": {
			id: "INTEGER PRIMARYKEY",
			name: "TEXT",
			logo: "TEXT",
			sharepointId: "INTEGER"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "customers",		
			"idAttribute": 'id'
	 	}
	}
};
