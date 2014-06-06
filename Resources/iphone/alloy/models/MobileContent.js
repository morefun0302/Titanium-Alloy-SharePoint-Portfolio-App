exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARYKEY",
            name: "TEXT",
            customerId: "INTEGER",
            technologies: "TEXT",
            showInMobileApp: "TEXT",
            image: "TEXT",
            sharepointId: "INTEGER",
            problemStatement: "TEXT",
            solutionStatement: "TEXT",
            valueStatement: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "mobileContents",
            idAttribute: "id"
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("mobileContent", exports.definition, []);

collection = Alloy.C("mobileContent", exports.definition, model);

exports.Model = model;

exports.Collection = collection;