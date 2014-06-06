var args = arguments[0] || {};
var customerID = args.customerID || '' ;
var categoryID = args.categoryID || '' ;

var net = require('lib/network');
var omniLogoPath = '/omni_logos/OMNI-white-blue.png';
var mobileContents = Alloy.Collections.mobileContents;
var customerNeedRelationships = Alloy.Collections.customerNeedRelationships;
var contentIds = getContentIds();

// Helper
function getContentIds(){
	var arr = [];
	for (var cnr = 0; cnr < customerNeedRelationships.length; cnr++){
		if (customerNeedRelationships.at(cnr).get('businessNeed_id') == categoryID && customerNeedRelationships.at(cnr).get('customer_id') == customerID){
			arr.push(customerNeedRelationships.at(cnr).get('mobileContent_id'));
			//Ti.API.log('Mobile Content Id:' + customerNeedRelationships.at(cnr).get('mobileContent_id'));
		}			
	}
	return arr;
}

// Events
function goToPage(e) {	
	var args = {
		mobileContentId: e.source.project_id
	};
	//Ti.API.log(JSON.stringify(args));
	Alloy.createController('mobileContent', args);
}
$.project.addEventListener('swipe', function(e){
	//$.project.close();
	$.project.hide();
});

$.project.addEventListener('close', function(e){
	$.destroy();
});

// DataFilters - used in index.xml
function mobileContentFilter(collection) {
    var filtered = collection.filter(function(_mobileContent) {    	
    	return _.contains(contentIds, _mobileContent.get('id'));    	    
    });
    return filtered;
}
function topRowFilter(collection) {
    var rowCount = 0;
    var filtered = mobileContentFilter(collection).filter(function(_mobileContent) {    	
    	rowCount = rowCount + 1;
    	return (rowCount % 2);
    });
    return collection;
}
function bottomRowFilter(collection) {
    var rowCount = 0;
    var filtered =  mobileContentFilter(collection).filter(function(_mobileContent) {    
    	rowCount = rowCount + 1;
    	return (!(rowCount % 2));   	    
    });
    return filtered;
}

function transformTopRowData(model){
	var transform = model.toJSON();	
	//transform.widths = '50%';
	transform.widths = getTopRowWidth();
	return transform;
}
function transformBottomRowData(model){
	var transform = model.toJSON();
	transform.widths = getBottomRowWidth();
	return transform;
}

// Other
function getTopRowWidth(){
	var filteredCount = mobileContentFilter(mobileContents).length;
	// Ti.API.log((filteredCount / 2) % 1);
	if (filteredCount == 1 || filteredCount == 2){
		return '100%';
	}
	else if ((filteredCount / 2) % 1 == 1) 
	{
		return ((1 / (filteredCount / 2)) * 100) + '%'; 
		//bottomRowWidth = topRowWidth;
	}
	else{
		return ((1 / (((filteredCount) / 2) - .5)) * 100) + '%';
		//bottomRowWidth = ((1 / ((businessNeeds.length + .5) / 2)) * 100) + '%'; 
	}
}
function getBottomRowWidth(){
	var filteredCount = mobileContentFilter(mobileContents).length;
	if (filteredCount == 1 || filteredCount == 2){
		return '100%';
	}
	if ((filteredCount / 2) % 1 == 1) 
	{
		return ((1 / (filteredCount / 2)) * 100) + '%'; 
		
	}
	else{		
		return ((1 / (((filteredCount ) / 2) + .5)) * 100) + '%'; 
	}
}

mobileContents.fetch();
customerNeedRelationships.fetch();
$.project.open();

