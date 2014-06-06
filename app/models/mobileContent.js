exports.definition = {
	config: {
		"columns": {
			id: "INTEGER PRIMARYKEY",
			name: "TEXT",
			customerId: "INTEGER", //foreign key to 
			technologies: "TEXT",
			showInMobileApp:"TEXT",
			image: "TEXT",
			sharepointId: "INTEGER",
			problemStatement: "TEXT",
			solutionStatement: "TEXT",
			valueStatement: "TEXT"			
		},
		"adapter": {
			"type": "sql",
			"collection_name": "mobileContents",		
			"idAttribute": 'id'
	 	}
	}
};
