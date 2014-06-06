function Controller() {
    function __alloyId76(e) {
        if (e && e.fromAdapter) return;
        __alloyId76.opts || {};
        var models = mobileContentFilter(__alloyId75);
        var len = models.length;
        var children = $.__views.topRowView.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.topRowView.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId68 = models[i];
            __alloyId68.__transform = transformTopRowData(__alloyId68);
            var __alloyId70 = Ti.UI.createImageView({
                height: "100%",
                borderWidth: 0,
                borderColor: "black",
                width: "undefined" != typeof __alloyId68.__transform["widths"] ? __alloyId68.__transform["widths"] : __alloyId68.get("widths")
            });
            $.__views.topRowView.add(__alloyId70);
            var __alloyId72 = Ti.UI.createView({
                width: "80%",
                height: "80%"
            });
            __alloyId70.add(__alloyId72);
            var __alloyId74 = Ti.UI.createLabel(function() {
                var o = {};
                _.extend(o, {
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    color: "white",
                    font: {
                        fontSize: 30
                    },
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
                });
                Alloy.isHandheld && _.extend(o, {
                    color: "white",
                    font: {
                        fontSize: 15
                    }
                });
                _.extend(o, {
                    project_id: "undefined" != typeof __alloyId68.__transform["id"] ? __alloyId68.__transform["id"] : __alloyId68.get("id"),
                    text: "undefined" != typeof __alloyId68.__transform["name"] ? __alloyId68.__transform["name"] : __alloyId68.get("name")
                });
                return o;
            }());
            __alloyId72.add(__alloyId74);
            goToPage ? __alloyId74.addEventListener("click", goToPage) : __defers["__alloyId74!click!goToPage"] = true;
        }
    }
    function __alloyId84(e) {
        if (e && e.fromAdapter) return;
        __alloyId84.opts || {};
        var models = bottomRowFilter(__alloyId83);
        var len = models.length;
        var children = $.__views.bottomRowView.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.bottomRowView.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId77 = models[i];
            __alloyId77.__transform = transformBottomRowData(__alloyId77);
            var __alloyId78 = Ti.UI.createImageView({
                height: "100%",
                borderWidth: 0,
                borderColor: "black",
                width: "undefined" != typeof __alloyId77.__transform["widths"] ? __alloyId77.__transform["widths"] : __alloyId77.get("widths")
            });
            $.__views.bottomRowView.add(__alloyId78);
            var __alloyId80 = Ti.UI.createView({
                width: "80%",
                height: "80%"
            });
            __alloyId78.add(__alloyId80);
            var __alloyId82 = Ti.UI.createLabel(function() {
                var o = {};
                _.extend(o, {
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE,
                    color: "white",
                    font: {
                        fontSize: 30
                    },
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
                });
                Alloy.isHandheld && _.extend(o, {
                    color: "white",
                    font: {
                        fontSize: 15
                    }
                });
                _.extend(o, {
                    project_id: "undefined" != typeof __alloyId77.__transform["id"] ? __alloyId77.__transform["id"] : __alloyId77.get("id"),
                    text: "undefined" != typeof __alloyId77.__transform["name"] ? __alloyId77.__transform["name"] : __alloyId77.get("name")
                });
                return o;
            }());
            __alloyId80.add(__alloyId82);
            goToPage ? __alloyId82.addEventListener("click", goToPage) : __defers["__alloyId82!click!goToPage"] = true;
        }
    }
    function getContentIds() {
        var arr = [];
        for (var cnr = 0; customerNeedRelationships.length > cnr; cnr++) customerNeedRelationships.at(cnr).get("businessNeed_id") == categoryID && customerNeedRelationships.at(cnr).get("customer_id") == customerID && arr.push(customerNeedRelationships.at(cnr).get("mobileContent_id"));
        return arr;
    }
    function goToPage(e) {
        var args = {
            mobileContentId: e.source.project_id
        };
        Alloy.createController("mobileContent", args);
    }
    function mobileContentFilter(collection) {
        var filtered = collection.filter(function(_mobileContent) {
            return _.contains(contentIds, _mobileContent.get("id"));
        });
        return filtered;
    }
    function bottomRowFilter(collection) {
        var rowCount = 0;
        var filtered = mobileContentFilter(collection).filter(function() {
            rowCount += 1;
            return !(rowCount % 2);
        });
        return filtered;
    }
    function transformTopRowData(model) {
        var transform = model.toJSON();
        transform.widths = getTopRowWidth();
        return transform;
    }
    function transformBottomRowData(model) {
        var transform = model.toJSON();
        transform.widths = getBottomRowWidth();
        return transform;
    }
    function getTopRowWidth() {
        var filteredCount = mobileContentFilter(mobileContents).length;
        return 1 == filteredCount || 2 == filteredCount ? "100%" : 1 == filteredCount / 2 % 1 ? 100 * (1 / (filteredCount / 2)) + "%" : 100 * (1 / (filteredCount / 2 - .5)) + "%";
    }
    function getBottomRowWidth() {
        var filteredCount = mobileContentFilter(mobileContents).length;
        if (1 == filteredCount || 2 == filteredCount) return "100%";
        return 1 == filteredCount / 2 % 1 ? 100 * (1 / (filteredCount / 2)) + "%" : 100 * (1 / (filteredCount / 2 + .5)) + "%";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "project";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("mobileContent");
    $.__views.project = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "project"
    });
    $.__views.project && $.addTopLevelView($.__views.project);
    $.__views.needs = Ti.UI.createView({
        backgroundColor: "black",
        layout: "vertical",
        zIndex: "-100",
        id: "needs"
    });
    $.__views.project.add($.__views.needs);
    $.__views.topRowView = Ti.UI.createView({
        width: "100%",
        height: "42.67578125%",
        layout: "horizontal",
        id: "topRowView",
        dataTransform: "transformTopRowData"
    });
    $.__views.needs.add($.__views.topRowView);
    var __alloyId75 = Alloy.Collections["mobileContents"] || mobileContents;
    __alloyId75.on("fetch destroy change add remove reset", __alloyId76);
    $.__views.omni = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            image: "/omni_logos/Omni-gray-blue-notitle.png",
            height: 150
        });
        Alloy.isHandheld && _.extend(o, {
            image: "/omni_logos/OMNI-white-blue.png",
            height: 75
        });
        _.extend(o, {
            id: "omni"
        });
        return o;
    }());
    $.__views.needs.add($.__views.omni);
    $.__views.bottomRowView = Ti.UI.createView({
        width: "100%",
        height: "42.67578125%",
        layout: "horizontal",
        id: "bottomRowView",
        dataTransform: "transformBottomRowData"
    });
    $.__views.needs.add($.__views.bottomRowView);
    var __alloyId83 = Alloy.Collections["mobileContents"] || mobileContents;
    __alloyId83.on("fetch destroy change add remove reset", __alloyId84);
    exports.destroy = function() {
        __alloyId75.off("fetch destroy change add remove reset", __alloyId76);
        __alloyId83.off("fetch destroy change add remove reset", __alloyId84);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var customerID = args.customerID || "";
    var categoryID = args.categoryID || "";
    require("lib/network");
    var mobileContents = Alloy.Collections.mobileContents;
    var customerNeedRelationships = Alloy.Collections.customerNeedRelationships;
    var contentIds = getContentIds();
    $.project.addEventListener("swipe", function() {
        $.project.hide();
    });
    $.project.addEventListener("close", function() {
        $.destroy();
    });
    mobileContents.fetch();
    customerNeedRelationships.fetch();
    $.project.open();
    __defers["__alloyId74!click!goToPage"] && __alloyId74.addEventListener("click", goToPage);
    __defers["__alloyId82!click!goToPage"] && __alloyId82.addEventListener("click", goToPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;