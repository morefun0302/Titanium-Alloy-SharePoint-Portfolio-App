exports.definition = {
	config: {
		"columns": {
			id: "INTEGER PRIMARYKEY",
			mobileContent_id: 'INTEGER',
			fileType: 'TEXT',
			fileName: 'TEXT',
			url: 'TEXT',
			savedInFilesystem: 'TEXT'		
		},
		"adapter": {
			"type": "sql",
			"collection_name": "attachments",		
			"idAttribute": 'id'
	 	}
	}
};
