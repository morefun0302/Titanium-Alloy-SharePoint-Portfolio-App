var args = arguments[0] || {};
var mobileContentId = args.mobileContentId || '' ;

var omniLogoPath = '/omni_logos/OMNI-white-blue.png';
var mobileContents = Alloy.Collections.mobileContents;
var attachments = Alloy.Collections.attachments;
var customers = Alloy.Collections.customers;
mobileContents.fetch();
attachments.fetch();
customers.fetch();
var customerName = '';
var customerId = 0;
var logoFile = '';

function swipeHeader() {
	$.mobileContent.close();
}
$.mobileContent.addEventListener('close', function(e){
	$.destroy();
});


function filterAttachmentData(collection){
    var filtered = collection.filter(function(model) {    	
     	return model.get('mobileContent_id') == mobileContentId;   	    
    });
    return filtered;
}

function transformAttachmentData(model){
	var transform = model.toJSON();
	var fileType = model.get('fileType').toLowerCase();
	var fileName = model.get('fileName');
	if (fileType == 'mp4' || fileType == 'mov' || fileType == 'm4v'){
		//transform.fileClass = "video";
	} else {
		//transform.fileClass = "document";
	}
	transform.file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);
	//transform.file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MillerElectric.jpg');
	return transform;
}
function init(){
	for(var mc=0; mc < mobileContents.length; mc++){
		 if (mobileContents.at(mc).get('id') == mobileContentId){
			var currMC = mobileContents.at(mc);
			$.projectName.text = currMC.get('name'); 
			$.problemStatement.text = currMC.get('problemStatement');
			$.solutionStatement.text = currMC.get('solutionStatement');
			$.valueStatement.text = currMC.get('valueStatement');
			customerId = currMC.get('customerId');
			customerName = '';
			
			for (var c = 0; c < customers.length; c++){
				//Ti.API.log(customers.at(c).get('logo'));
				//Ti.API.log('Current Id ' + customers.at(c).get('id') + ' trying to find custId : ' + customerId);
				Ti.API.log('logo? -> ' + customers.at(c).get('logo'));
				if (customers.at(c).get('id') == customerId){
					customerName = customers.at(c).get('name');					
				}			
			} 	 			
		 }
	}
	
	//$.slideParent.add()
	// var videoPlayer = Titanium.Media.createVideoPlayer({
		    // top : 2,
		    // autoplay : true,
		    // backgroundColor : 'blue',
		    // height : 300,
		    // width : 300,
		    // mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
		    // scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FIT
			// });
	// var videoView = Ti.UI.createView({
		// borderWidth: 1,
		// borderColor: 'grey',
		// top: 25,
		// left: 25		
	// });
	// videoPlayer.url = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'MillerInsight.mp4').getNativePath();
	// videoView.add(videoPlayer);
	// $.slideParent.add(videoView);
}

init();



Ti.API.log('logo ' + logoFile);
$.customerLogo.image = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, customerName.replace(' ', ''));
$.mobileContent.open();
