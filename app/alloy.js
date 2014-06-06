// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Collections.customers = Alloy.createCollection('customer');
Alloy.Collections.businessNeeds = Alloy.createCollection('businessNeed');
Alloy.Collections.mobileContents = Alloy.createCollection('mobileContent');
Alloy.Collections.topics = Alloy.createCollection('topic');
Alloy.Collections.customerNeedRelationships = Alloy.createCollection('customerNeedRelationship');
Alloy.Collections.attachments = Alloy.createCollection('attachment');

