exports.definition = {
	config: {
		"columns": {
			id: "INTEGER PRIMARYKEY",
			title: "TEXT"			
		},
		"adapter": {
			"type": "sql",
			"collection_name": "businessNeeds",		
			"idAttribute": 'id'
	 	}
	},
    extendModel: function(Model) {		
	    _.extend(Model.prototype, {
	        // Implement the validate method						
	        // alertStuff: function (attrs) {
		        // for (var key in attrs) {
	                // var value = attrs[key];
	                // if (key === "title") {
	                    // alert(value);
	                // }               
	            // }
	        // },
	        // // Extend Backbone.Model
	        // rowWidth: '',
	        // logModel: function() {
	            // Ti.API.info(this.get('id') + ' - ' + this.get('title') + ' - ' + this.rowWidth);
	        // },
	        // returnWidth: function() {
	        	// return '33.3333%';
	        // },
	        // openBusinessNeed: function(){
	        	// Ti.API.info('Opened business need: ' + this.get('id') );
	        // }	        	
	    });
		
	    return Model;
	},
    extendCollection: function(Collection) {		
	    _.extend(Collection.prototype, {
			
	        // Implement the comparator method.
		    // rowWidth : function(_modelId) {
	    	    // var collectionCount = this.length;
	    	    // Ti.API.log('collectionCount -' + collectionCount + ' ModelId - ' + _modelId);
// 	    	    
	    	    // var lastInTopRow = collectionCount / 2;
	    	    // if (lastInTopRow % 1 != 0){
	    	    	// lastInTopRow = lastInTopRow - .5;
    	    	// }
    	    	// Ti.API.log('lastInTopRow -' + lastInTopRow);
    	    	// if (_modelId <= lastInTopRow) {
    	    		// return ((1 / lastInTopRow * 100) - .1) + '%';
    	    	// }else {
    	    		// return ((1 / (collectionCount - lastInTopRow) * 100) - .1) + '%';
    	    	// }	    	 	   	    	    
	        // }	        
	    }); // end extend
		
	    return Collection;
    }
};
