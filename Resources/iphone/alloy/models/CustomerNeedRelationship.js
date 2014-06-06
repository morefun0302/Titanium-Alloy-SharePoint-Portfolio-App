exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARYKEY",
            mobileContent_id: "INTEGER",
            customer_id: "INTEGER",
            businessNeed_id: "INTEGER"
        },
        adapter: {
            type: "sql",
            collection_name: "customerNeedRelationships",
            idAttribute: "id"
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("customerNeedRelationship", exports.definition, []);

collection = Alloy.C("customerNeedRelationship", exports.definition, model);

exports.Model = model;

exports.Collection = collection;