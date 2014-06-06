function Controller() {
    function __alloyId10(e) {
        if (e && e.fromAdapter) return;
        __alloyId10.opts || {};
        var models = topRowFilter(__alloyId9);
        var len = models.length;
        var children = $.__views.topRowView.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.topRowView.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId2 = models[i];
            __alloyId2.__transform = transformTopRowData(__alloyId2);
            var __alloyId4 = Ti.UI.createImageView({
                height: "100%",
                borderWidth: 0,
                borderColor: "black",
                width: "undefined" != typeof __alloyId2.__transform["widths"] ? __alloyId2.__transform["widths"] : __alloyId2.get("widths")
            });
            $.__views.topRowView.add(__alloyId4);
            var __alloyId6 = Ti.UI.createView({
                width: "80%",
                height: "80%"
            });
            __alloyId4.add(__alloyId6);
            var __alloyId8 = Ti.UI.createLabel(function() {
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
                    },
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
                });
                _.extend(o, {
                    customer_id: "undefined" != typeof __alloyId2.__transform["id"] ? __alloyId2.__transform["id"] : __alloyId2.get("id"),
                    text: "undefined" != typeof __alloyId2.__transform["name"] ? __alloyId2.__transform["name"] : __alloyId2.get("name")
                });
                return o;
            }());
            __alloyId6.add(__alloyId8);
            goToPage ? __alloyId8.addEventListener("click", goToPage) : __defers["__alloyId8!click!goToPage"] = true;
        }
    }
    function __alloyId18(e) {
        if (e && e.fromAdapter) return;
        __alloyId18.opts || {};
        var models = bottomRowFilter(__alloyId17);
        var len = models.length;
        var children = $.__views.bottomRowView.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.bottomRowView.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId11 = models[i];
            __alloyId11.__transform = transformBottomRowData(__alloyId11);
            var __alloyId12 = Ti.UI.createImageView({
                height: "100%",
                borderWidth: 0,
                borderColor: "black",
                width: "undefined" != typeof __alloyId11.__transform["widths"] ? __alloyId11.__transform["widths"] : __alloyId11.get("widths")
            });
            $.__views.bottomRowView.add(__alloyId12);
            var __alloyId14 = Ti.UI.createView({
                width: "80%",
                height: "80%"
            });
            __alloyId12.add(__alloyId14);
            var __alloyId16 = Ti.UI.createLabel(function() {
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
                    },
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
                });
                _.extend(o, {
                    customer_id: "undefined" != typeof __alloyId11.__transform["id"] ? __alloyId11.__transform["id"] : __alloyId11.get("id"),
                    text: "undefined" != typeof __alloyId11.__transform["name"] ? __alloyId11.__transform["name"] : __alloyId11.get("name")
                });
                return o;
            }());
            __alloyId14.add(__alloyId16);
            goToPage ? __alloyId16.addEventListener("click", goToPage) : __defers["__alloyId16!click!goToPage"] = true;
        }
    }
    function getCustomerIds() {
        var arr = [];
        for (var cnr = 0; customerNeedRelationships.length > cnr; cnr++) customerNeedRelationships.at(cnr).get("businessNeed_id") == categoryID && arr.push(customerNeedRelationships.at(cnr).get("customer_id"));
        return arr;
    }
    function goToPage(e) {
        e.source.customer_id - 1;
        var args = {
            categoryID: categoryID,
            customerID: e.source.customer_id
        };
        Alloy.createController("project", args);
    }
    function customerFilter(collection) {
        var filtered = collection.filter(function(_customer) {
            return _.contains(customerIds, _customer.get("id"));
        });
        return filtered;
    }
    function topRowFilter(collection) {
        var rowCount = 0;
        var filtered = customerFilter(collection).filter(function() {
            rowCount += 1;
            return rowCount % 2;
        });
        return filtered;
    }
    function bottomRowFilter(collection) {
        var rowCount = 0;
        var filtered = customerFilter(collection).filter(function() {
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
        var filteredCount = customerFilter(customers).length;
        return 1 == filteredCount || 2 == filteredCount ? "100%" : 1 == filteredCount / 2 % 1 ? 100 * (1 / (filteredCount / 2)) + "%" : 100 * (1 / (filteredCount / 2 - .5)) + "%";
    }
    function getBottomRowWidth() {
        var filteredCount = customerFilter(customers).length;
        Ti.API.log("filterCount: " + filteredCount);
        if (1 == filteredCount || 2 == filteredCount) return "100%";
        return 1 == filteredCount / 2 % 1 ? 100 * (1 / (filteredCount / 2)) + "%" : 100 * (1 / (filteredCount / 2 + .5)) + "%";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "customer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("customer");
    $.__views.customer = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "customer"
    });
    $.__views.customer && $.addTopLevelView($.__views.customer);
    $.__views.needs = Ti.UI.createView({
        backgroundColor: "black",
        layout: "vertical",
        zIndex: "-100",
        id: "needs"
    });
    $.__views.customer.add($.__views.needs);
    $.__views.topRowView = Ti.UI.createView({
        width: "100%",
        height: "42.67578125%",
        layout: "horizontal",
        id: "topRowView",
        dataTransform: "transformTopRowData"
    });
    $.__views.needs.add($.__views.topRowView);
    var __alloyId9 = Alloy.Collections["customers"] || customers;
    __alloyId9.on("fetch destroy change add remove reset", __alloyId10);
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
    $.__views.needName = Ti.UI.createLabel({
        width: Ti.UI.Fill,
        height: Ti.UI.SIZE,
        color: "#00AEDB",
        font: {
            fontSize: 25
        },
        right: "28.5%",
        top: "70%",
        text: "NeedName",
        id: "needName"
    });
    $.__views.omni.add($.__views.needName);
    $.__views.bottomRowView = Ti.UI.createView({
        width: "100%",
        height: "42.67578125%",
        layout: "horizontal",
        id: "bottomRowView",
        dataTransform: "transformBottomRowData"
    });
    $.__views.needs.add($.__views.bottomRowView);
    var __alloyId17 = Alloy.Collections["customers"] || customers;
    __alloyId17.on("fetch destroy change add remove reset", __alloyId18);
    exports.destroy = function() {
        __alloyId9.off("fetch destroy change add remove reset", __alloyId10);
        __alloyId17.off("fetch destroy change add remove reset", __alloyId18);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var categoryName = args.categoryName || "";
    var categoryID = args.categoryID || "";
    require("lib/network");
    var customers = Alloy.Collections.customers;
    var mobileContents = Alloy.Collections.mobileContents;
    var customerNeedRelationships = Alloy.Collections.customerNeedRelationships;
    var customerIds = getCustomerIds();
    $.customer.addEventListener("swipe", function() {
        $.customer.hide();
    });
    $.customer.addEventListener("open", function() {});
    $.customer.addEventListener("close", function() {
        $.destroy();
    });
    customers.fetch();
    mobileContents.fetch();
    $.needName.text = categoryName;
    $.customer.open();
    __defers["__alloyId8!click!goToPage"] && __alloyId8.addEventListener("click", goToPage);
    __defers["__alloyId16!click!goToPage"] && __alloyId16.addEventListener("click", goToPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;