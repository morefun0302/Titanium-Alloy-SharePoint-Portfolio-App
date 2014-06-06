exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARYKEY",
            mobileContent_id: "INTEGER",
            fileType: "TEXT",
            fileName: "TEXT",
            url: "TEXT",
            savedInFilesystem: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "attachments",
            idAttribute: "id"
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("attachment", exports.definition, []);

collection = Alloy.C("attachment", exports.definition, model);

exports.Model = model;

exports.Collection = collection;