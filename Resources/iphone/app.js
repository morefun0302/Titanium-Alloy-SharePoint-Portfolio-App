var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Collections.customers = Alloy.createCollection("customer");

Alloy.Collections.businessNeeds = Alloy.createCollection("businessNeed");

Alloy.Collections.mobileContents = Alloy.createCollection("mobileContent");

Alloy.Collections.topics = Alloy.createCollection("topic");

Alloy.Collections.customerNeedRelationships = Alloy.createCollection("customerNeedRelationship");

Alloy.Collections.attachments = Alloy.createCollection("attachment");

Alloy.createController("index");