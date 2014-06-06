exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARYKEY",
            name: "TEXT",
            sharepointId: "INTEGER"
        },
        adapter: {
            type: "sql",
            collection_name: "topics",
            idAttribute: "id"
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("topic", exports.definition, []);

collection = Alloy.C("topic", exports.definition, model);

exports.Model = model;

exports.Collection = collection;