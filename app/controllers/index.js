var net = require('lib/network');
//var omniLogoPath = '/omni_logos/Omni-gray-blue.png';
var customers = Alloy.Collections.customers;
var businessNeeds = Alloy.Collections.businessNeeds;
var mobileContents = Alloy.Collections.mobileContents;
var customerNeedRelationships = Alloy.Collections.customerNeedRelationships;
var attachments = Alloy.Collections.attachments;

// Database related
function getCurrentTime() {
	var currentTime = new Date();
	var hours = (currentTime.getHours());
	var minutes = (currentTime.getMinutes());
	var month = (currentTime.getMonth() + 1);
	var day = (currentTime.getDate());
	var year = currentTime.getFullYear();
	 
	return month + "/" + day + "/" + year + " @ " + hours + ":" + minutes;
}	
function clearTable(_collection) {
	while(_collection.length != 0){
		_collection.at(_collection.length-1).destroy();
	}
}
function deleteFilesFromLocal(_collection){
	for(var df = 0; df < _collection.length; df++){
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,_collection.at(df).get('fileName'));
		if (f.exists() && f.writeable) {
			var success = f.deleteFile();
			Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
		}	
	}
}
function deleteLogosFromLocal(){
	for (var z = 0; z < customers.length; z++){
		var d = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,customers.at(z).get('name').replace(' ', ''));
		if (d.exists() && d.writeable) {
			var success = d.deleteFile();
			Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
		}
	}
}

function clearLocalDB() {
	clearTable(customers);
	clearTable(businessNeeds);
	clearTable(mobileContents);
	clearTable(customerNeedRelationships);
}
function callSyncDBFromNetwork () {		
	//clearTable(customerNeedRelationships);
	
	net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/Customers", $.username.value, $.password.value, loadCustomersIntoDB, true, '');
	net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/BusinessNeeds", $.username.value, $.password.value, loadBusinessNeedsIntoDB, true, '');
	net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/MobileContent", $.username.value, $.password.value, loadMobileContentsIntoDB, true, '');
	
	//net.addRequest('http://omniportal/marketingapp/Lists/Mobile%20Content/Attachments/1/MillerInsight.mp4', $.username.value, $.password.value, processRequestForMedia, false, 'MillerInsight.mp4');
	//net.addRequest('http://omniportal/marketingapp/Lists/Mobile%20Content/Attachments/1/SalesAppSamplePDF.pdf', $.username.value, $.password.value , processRequestForMedia, false, 'SalesAppSamplePDF.pdf');
	//net.addRequest('http://omniportal/marketingapp/Lists/Mobile%20Content/Attachments/1/SalesAppSampleWord.docx', $.username.value, $.password.value , processRequestForMedia, false, 'SalesAppSampleWord.docx');
	toggleSyncView();
	
	// change to call in sync after all lists are synced
	Ti.App.Properties.setString('lastSync', getCurrentTime());		
}
function loadCustomersIntoDB(_response) {
	var _customers = (JSON.parse(_response.responseText)).d.results;
	//Ti.API.log(_customers);
	deleteLogosFromLocal();
	clearTable(customers);
	
	for (var x = 0; x < _customers.length; x++){
		var modelC = Alloy.createModel('customer', {id: _customers[x].Id , name: _customers[x].Title , logo: '', sharepointId: _customers[x].Id});
		//Ti.API.log(_customers[x].Logo);
		customers.add(modelC);
		modelC.save();
		net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/Customers(" + _customers[x].Id + ")/Attachments", $.username.value, $.password.value, loadCustomerLogoIntoDB, true, '');
	}
	customers.fetch();
}
function loadMobileContentsIntoDB(_response) {
	var _mobileContents = (JSON.parse(_response.responseText)).d.results;
	
	clearTable(mobileContents);
	clearTable(customerNeedRelationships);
	deleteFilesFromLocal(attachments);
	clearTable(attachments);
	
	
	for (var x = 0; x < _mobileContents.length; x++){
		var modelC = Alloy.createModel('mobileContent', {id: _mobileContents[x].Id , name: _mobileContents[x].Title , customerId: _mobileContents[x].CustomerId, technologies: _mobileContents[x].Technologies, showInMobileApp: _mobileContents[x].ShowInMobileApp, image: '', sharepointId: _mobileContents[x].Id, problemStatement: _mobileContents[x].ProblemStatement.replace(/<\/?[^>]+(>|$)/g, ""), solutionStatement: _mobileContents[x].SolutionStatement.replace(/<\/?[^>]+(>|$)/g, ""), valueStatement: _mobileContents[x].ValueStatement.replace(/<\/?[^>]+(>|$)/g, "") });		
		
		// Create record for customerNeedRelationship
		net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/MobileContent(" + _mobileContents[x].Id + ")/BusinessNeeds", $.username.value, $.password.value, loadCustNeedRelationsIntoDB, true, '');
		
		// Get MobileContent Attachments
		net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/MobileContent(" + _mobileContents[x].Id + ")/Attachments", $.username.value, $.password.value, loadAttachmentsIntoDB, true, '');
		mobileContents.add(modelC);
		modelC.save();
		
	}
	// m/*
		
	mobileContents.fetch();
}

function loadCustNeedRelationsIntoDB(_response, _empty, _url){
	var cnr = (JSON.parse(_response.responseText)).d.results;
	
	var totalCNR = cnr.length;
	var cnrCount = customerNeedRelationships.length + 1;
	for (var c = 0; c < cnr.length; c++){
		var mobileContentId =Number(getMobileContentIdFromUrl(_url));
		var customerId = 0;//mobileContents.at(mobileContentId).get('customerId');
		for(var mc = 0; mc < mobileContents.length; mc++){
			if (mobileContents.at(mc).get('id') == mobileContentId){
				customerId = mobileContents.at(mc).get('customerId');
			}
		}
		
		var modelCNR = Alloy.createModel('customerNeedRelationship', {id: cnrCount, mobileContent_id: mobileContentId, customer_id: customerId , businessNeed_id: cnr[c].Id});
		customerNeedRelationships.add(modelCNR);
		modelCNR.save();
		cnrCount = cnrCount + 1;
	}
	customerNeedRelationships.fetch();
}

function loadAttachmentsIntoDB(_response, _empty, _url){
	Ti.API.log('in loadAttachments');
	var attachData = (JSON.parse(_response.responseText)).d.results;
	
	var totalAttach = attachData.length;
	var attachCount = attachments.length + 1;
	
	for (var a = 0; a < totalAttach; a++){
		var mobileContentId = Number(getMobileContentIdFromUrl(_url));
		
		var fileType = attachData[a].Name.substring((attachData[a].Name.indexOf('.') + 1), attachData[a].Name.length);
		var mediaUrl = (attachData[a].__metadata.media_src).trim().replace(' ', '%20');
		var fileName = attachData[a].Name;
		
		//Ti.API.log('id: ' + attachCount + ' - mobileContent_id ' + mobileContentId + ' - fileType ' +  fileType + ' - fileName ' + attachData[a].Name + ' - url ' + attachData[a].__metadata.media_src);
		var modelA = Alloy.createModel('attachment', 
		{
			id: attachCount,
			mobileContent_id: mobileContentId,
			fileType: fileType,
			fileName: fileName,
			url: mediaUrl,
			savedInFilesystem: 'false'
		});
		attachments.add(modelA);
		modelA.save();
		attachCount++;
		net.addRequest(mediaUrl, $.username.value, $.password.value, processRequestForMedia, false, fileName);
	}
	attachments.fetch();
}

function loadCustomerLogoIntoDB(_response, _empty, _url){
	Ti.API.log('in loadCustomerLogoIntoDB');
	var logoData = (JSON.parse(_response.responseText)).d.results;
	var fileName = '';
	
	var totalLogo = logoData.length;
	
	for (var a = 0; a < totalLogo; a++){
		var customerId = Number(getCustomerIdFromMediaUrl(_url));
		var customerName = '';
		
		for (var c = 0; c < customers.length; c++){
			//Ti.API.log('Current Id ' + customers.at(c).get('id') + ' trying to find custId : ' + customerId);
			if (customers.at(c).get('id') == customerId){
				//customerName = customers.at(c).get('name');
				// var cust = customers.at(c);
				// cust.set({
						// logo: logoData[a].Name	
				// });
				// cust.save();
				//fileName = logoData[a].Name;
				fileName = customers.at(c).get('name').replace(' ', '');
				//customers.at(c).save();
			}
					
		}		
		Ti.API.log('filename -> ' + fileName);
		var mediaUrl = (logoData[a].__metadata.media_src).trim().replace(' ', '%20');
		//var fileName = customerName.replace(' ', '') + '.jpg'; // logoData[a].Name;
		
		net.addRequest(mediaUrl, $.username.value, $.password.value, processRequestForLogo, false, fileName);
	}	
}

function loadBusinessNeedsIntoDB(_response) {
	var _businessNeeds = (JSON.parse(_response.responseText)).d.results;
	
	clearTable(businessNeeds);
	var totalNeeds = _businessNeeds.length;
	for (var x = 0; x < _businessNeeds.length; x++){
		var model = Alloy.createModel('businessNeed', {id: _businessNeeds[x].Id , title: _businessNeeds[x].Title});
		businessNeeds.add(model);
		model.save();
	}
	businessNeeds.fetch();
	//setBNRowWidth(businessNeeds);
	//$.index.open();

	//net.createRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/MobileContent", $.username.value, $.password.value, loadMobileContentsIntoDB, true, '');
}

function processRequestForMedia(_response, _filename, _url){
	//Ti.API.log('in processRequestForMedia');
	if (_response){
		var mobileContentId = getMobileContentIdFromMediaUrl(_url);
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, _filename);
		f.write(_response.responseData); // write to the file	
		var aCount = attachments.length;
		for(var m = 0; m < aCount; m++){
			if (attachments.at(m).get('fileName') == _filename){
				if (attachments.at(m).get('mobileContent_id') == mobileContentId){
					attachments.at(m).set(
					{
						savedInFilesystem: "true"	
					});
					attachments.at(m).save();
					Ti.API.log(_filename + 'file saved to local storage');
				}
			}
		}
	}else{
		Ti.API.log('In processRequestForMedia, issue with _response for ' + _filename);
	}
}

function processRequestForLogo(_response, _filename, _url){
	Ti.API.log('in processRequestForLogo for ' + _url);
	if (_response){		
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, _filename);
		f.write(_response.responseData); // write to the file	
		Ti.API.log('done processRequestForLogo');			
	}else{
		Ti.API.log('In processRequestForMedia, issue with _response for ' + _filename);
	}
}

// VIEW EVENTS
function goToPage(e) {	
	var id = e.source.need_id - 1;
	
	var categoryName;
	categoryName = businessNeeds.at(id).get('title');
	
	var args = {
		categoryName: categoryName,
		categoryID: e.source.need_id
	};
	
	//var matrix = Ti.UI.create2DMatrix();
	
  	//matrix = matrix.rotate(180);
 	//matrix = matrix.scale(2, 2);
	//var a = Ti.UI.createAnimation({
	 //   transform : matrix,
	 //   duration : 2000,
	 //   autoreverse : true,
	 //   repeat : 1
	//});
	
  	//e.source.getParent().animate(a);
	
	Alloy.createController('customer', args);
}
function goToOmni(_val) {
	alert('goToOmni');
}
function onSyncButtonClicked (){
	//var localDB = require('lib/localDB');
	//localDB.callSyncDBFromNetwork();	
	$.username.blur();
	$.password.blur();
	callSyncDBFromNetwork();
}
function toggleSyncView () {
 	// $.loginView.visible = ($.loginView.visible == 'true') ? 'false' : 'true';//!$.loginView.visible;
 	
 	Ti.API.log(Ti.App.Properties.getString('lastSync'));
 	if ($.loginView.visible != true){
		$.lastSyncText.text = 'Last sync: ' + Ti.App.Properties.getString('lastSync');		
		var animation = Ti.UI.createAnimation();
		animation.top = '15%';
		animation.duration = 300;
	
		$.loginView.top = '99%';
		$.loginView.visible = true;	
		$.loginView.animate(animation);	
  	} else {				
		var animation = Ti.UI.createAnimation();
		animation.top = '99%';
		animation.duration = 300;
				
		$.loginView.animate(animation);	
		$.loginView.visible = 'false';
  	}
}

// Data Filters - used in index.xml
function topRowFilter(collection) {
    var totalNeeds = collection.length;
    var filtered = collection.filter(function(_need) {
    	return _need.get('id') < (totalNeeds / 2);
    });
    return filtered;
}
function bottomRowFilter(collection) {
    var totalNeeds = collection.length;
    var filtered = collection.filter(function(_need) {
    	return _need.get('id') >= (totalNeeds / 2);
    });
    return filtered;
}

function transformTopRowData(model){
	var transform = model.toJSON();	
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
	if ((businessNeeds.length / 2) % 1 == 1) 
	{
		return ((1 / (businessNeeds.length / 2)) * 100) + '%'; 
		//bottomRowWidth = topRowWidth;
	}
	else{
		return ((1 / (((businessNeeds.length) / 2) - .5)) * 100) + '%';
		//bottomRowWidth = ((1 / ((businessNeeds.length + .5) / 2)) * 100) + '%'; 
	}
}
function getBottomRowWidth(){
	if ((businessNeeds.length / 2) % 1 == 1) 
	{
		return ((1 / (businessNeeds.length / 2)) * 100) + '%'; 
		
	}
	else{		
		return ((1 / (((businessNeeds.length) / 2) + .5)) * 100) + '%'; 
	}
}
function getMobileContentIdFromUrl(_url){
	var mString = _url.trim().replace('http://omniportal/marketingapp/_vti_bin/listdata.svc/MobileContent(', '');
	var endIndex = mString.indexOf(')');
	return mString.substring(0, endIndex);
}
function getMobileContentIdFromMediaUrl(_url){
	var mString = _url.trim().replace('http://omniportal/marketingapp/Lists/Mobile%20Content/Attachments/', '');
	var endIndex = mString.indexOf('/');
	return mString.substring(0, endIndex);
}

function getCustomerIdFromMediaUrl(_url){
	var mString = _url.trim().replace('http://omniportal/marketingapp/_vti_bin/listdata.svc/Customers(', '');
	var endIndex = mString.indexOf(')');
	return mString.substring(0, endIndex);
}

$.index.addEventListener('open', function(e){
	  //setDynamicRowWidth();
	  
});
$.index.addEventListener('close', function(e){
	$.destroy();
});
$.index.addEventListener('focus', function(e){
	//Ti.API.log('onFocus: ' + $.bottomRowView.children.length);
});
Ti.App.addEventListener('databaseUpdated', function(e){
	//Ti.API.log('databaseUpdated');
});

businessNeeds.fetch();
customers.fetch();
mobileContents.fetch();
customerNeedRelationships.fetch();
attachments.fetch();

$.index.open();


