exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARYKEY",
            title: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "businessNeeds",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("businessNeed", exports.definition, []);

collection = Alloy.C("businessNeed", exports.definition, model);

exports.Model = model;

exports.Collection = collection;