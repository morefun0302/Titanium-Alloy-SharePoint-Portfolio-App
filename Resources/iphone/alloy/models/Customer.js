exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARYKEY",
            name: "TEXT",
            logo: "TEXT",
            sharepointId: "INTEGER"
        },
        adapter: {
            type: "sql",
            collection_name: "customers",
            idAttribute: "id"
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("customer", exports.definition, []);

collection = Alloy.C("customer", exports.definition, model);

exports.Model = model;

exports.Collection = collection;