var args = arguments[0] || {};
var categoryName = args.categoryName || '' ;
var categoryID = args.categoryID || '' ;
var net = require('lib/network');

var omniLogoPath = '/omni_logos/OMNI-white-blue.png';
var customers = Alloy.Collections.customers;
//var businessNeeds = Alloy.Collections.businessNeeds;
var mobileContents = Alloy.Collections.mobileContents;
var customerNeedRelationships = Alloy.Collections.customerNeedRelationships;
var customerIds = getCustomerIds();

// Setup
function getCustomerIds() {
	var arr = [];
	for (var cnr = 0; cnr < customerNeedRelationships.length; cnr++){
		if (customerNeedRelationships.at(cnr).get('businessNeed_id') == categoryID){
			arr.push(customerNeedRelationships.at(cnr).get('customer_id'));
			//Ti.API.log('Customer Id:' + customerNeedRelationships.at(cnr).get('customer_id'));
		}			
	}
	return arr;
}
function setDynamicWidth() {
	var topChildren = $.topRowView.getChildren();
	for (var t in topChildren){
		topChildren[t].width = ((1 / topChildren.length) * 100) + '%';
	}
	
	var bottomChildren = $.bottomRowView.getChildren();
	for (var b in bottomChildren){
		bottomChildren[b].width = ((1 / bottomChildren.length) * 100) + '%';
	}
}
// Events
function goToPage(e) {	
	var id = e.source.customer_id - 1;
	
	var args = {
		categoryID: categoryID,
		customerID: e.source.customer_id
	};
	//Ti.API.log(JSON.stringify(args));
	Alloy.createController('project', args);
	//$.customer.close();
}
$.customer.addEventListener('swipe', function(e){
	//$.customer.close();
	$.customer.hide();
});
$.customer.addEventListener('open', function(e){
	//setDynamicWidth();
	
	// Used to mask the label while it moves position
	//$.topRowView.visible = true;
	//$.bottomRowView.visible = true;
});
$.customer.addEventListener('close', function(e){
	$.destroy();
});

// DataFilters - used in index.xml
function customerFilter(collection) {
    var filtered = collection.filter(function(_customer) {
    	//return _.contains(_customer.get('id'), customerIds);
    	return _.contains(customerIds, _customer.get('id'));     	
    });
    return filtered;
}
function topRowFilter(collection) {
    var rowCount = 0;
    var filtered = customerFilter(collection).filter(function(_project) {    	
    	rowCount = rowCount + 1;
    	return (rowCount % 2);
    	//return _.contains(_customer.get('id'), customerIds);    	    
    });
    return filtered;
}
function bottomRowFilter(collection) {
    var rowCount = 0;
    var filtered = customerFilter(collection).filter(function(_project) {    	
    	rowCount = rowCount + 1;
    	return (!(rowCount % 2));
    	//return _.contains(_customer.get('id'), customerIds);    	    
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
	var filteredCount = customerFilter(customers).length;
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
	var filteredCount = customerFilter(customers).length;
	Ti.API.log('filterCount: ' + filteredCount);
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

//businessNeeds.fetch();
customers.fetch();
mobileContents.fetch();

$.needName.text = categoryName;

$.customer.open();


