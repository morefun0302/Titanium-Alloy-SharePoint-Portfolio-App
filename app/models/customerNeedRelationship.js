exports.definition = {
	config: {
		"columns": {
			id: "INTEGER PRIMARYKEY",
			mobileContent_id: "INTEGER",
			customer_id: "INTEGER",
			businessNeed_id: "INTEGER"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "customerNeedRelationships",		
			"idAttribute": 'id'
	 	}
	}
};
