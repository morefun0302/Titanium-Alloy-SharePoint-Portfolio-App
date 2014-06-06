function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "businessNeed";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        height: "100dp",
        width: "95%",
        backgroundColor: "#f8f8f8",
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 8,
        top: "10dp",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.title = Ti.UI.createLabel({
        top: "5dp",
        left: "10dp",
        right: "100dp",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        id: "title",
        text: "[{title}]"
    });
    $.__views.container.add($.__views.title);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;