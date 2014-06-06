function Controller() {
    function __alloyId65(e) {
        if (e && e.fromAdapter) return;
        __alloyId65.opts || {};
        var models = filterAttachmentData(__alloyId64);
        var len = models.length;
        var views = [];
        for (var i = 0; len > i; i++) {
            var __alloyId59 = models[i];
            __alloyId59.__transform = transformAttachmentData(__alloyId59);
            var __alloyId61 = Ti.UI.createView({
                borderWidth: 1,
                borderColor: "grey",
                top: 25,
                left: 25,
                views: __alloyId58
            });
            views.push(__alloyId61);
            var __alloyId63 = Ti.UI.createWebView({
                top: 25,
                autoplay: true,
                backgroundColor: "white",
                height: "100%",
                width: 640,
                mediaControlStyle: Titanium.Media.VIDEO_CONTROL_DEFAULT,
                scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                data: "undefined" != typeof __alloyId59.__transform["file"] ? __alloyId59.__transform["file"] : __alloyId59.get("file")
            });
            __alloyId61.add(__alloyId63);
        }
        $.__views.slideParent.views = views;
    }
    function swipeHeader() {
        $.mobileContent.close();
    }
    function filterAttachmentData(collection) {
        var filtered = collection.filter(function(model) {
            return model.get("mobileContent_id") == mobileContentId;
        });
        return filtered;
    }
    function transformAttachmentData(model) {
        var transform = model.toJSON();
        var fileType = model.get("fileType").toLowerCase();
        var fileName = model.get("fileName");
        "mp4" == fileType || "mov" == fileType || "m4v" == fileType;
        transform.file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);
        return transform;
    }
    function init() {
        for (var mc = 0; mobileContents.length > mc; mc++) if (mobileContents.at(mc).get("id") == mobileContentId) {
            var currMC = mobileContents.at(mc);
            $.projectName.text = currMC.get("name");
            $.problemStatement.text = currMC.get("problemStatement");
            $.solutionStatement.text = currMC.get("solutionStatement");
            $.valueStatement.text = currMC.get("valueStatement");
            customerId = currMC.get("customerId");
            customerName = "";
            for (var c = 0; customers.length > c; c++) {
                Ti.API.log("logo? -> " + customers.at(c).get("logo"));
                customers.at(c).get("id") == customerId && (customerName = customers.at(c).get("name"));
            }
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mobileContent";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("attachment");
    $.__views.mobileContent = Ti.UI.createWindow({
        backgroundColor: "black",
        id: "mobileContent"
    });
    $.__views.mobileContent && $.addTopLevelView($.__views.mobileContent);
    $.__views.wrapperView = Ti.UI.createView({
        backgroundColor: "black",
        layout: "vertical",
        zIndex: "-100",
        id: "wrapperView"
    });
    $.__views.mobileContent.add($.__views.wrapperView);
    $.__views.__alloyId46 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: "100%",
            height: "150",
            top: 0
        });
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: "75",
            top: 0
        });
        _.extend(o, {
            id: "__alloyId46"
        });
        return o;
    }());
    $.__views.wrapperView.add($.__views.__alloyId46);
    swipeHeader ? $.__views.__alloyId46.addEventListener("swipe", swipeHeader) : __defers["$.__views.__alloyId46!swipe!swipeHeader"] = true;
    $.__views.__alloyId47 = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            image: "/omni_logos/OMNI-white-blue.png",
            width: "300",
            height: "100",
            top: "25",
            left: "25"
        });
        Alloy.isHandheld && _.extend(o, {
            image: "/omni_logos/OMNI-white-blue.png",
            width: 100,
            height: 33,
            top: "25",
            left: "25"
        });
        _.extend(o, {
            id: "__alloyId47"
        });
        return o;
    }());
    $.__views.__alloyId46.add($.__views.__alloyId47);
    $.__views.projectName = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "65",
            left: "340",
            font: {
                fontSize: 30
            },
            color: "white"
        });
        Alloy.isHandheld && _.extend(o, {
            top: "30",
            left: "125",
            font: {
                fontSize: 15
            },
            color: "white"
        });
        _.extend(o, {
            id: "projectName"
        });
        return o;
    }());
    $.__views.__alloyId46.add($.__views.projectName);
    $.__views.customerLogo = Ti.UI.createImageView({
        top: "25",
        right: "25",
        id: "customerLogo"
    });
    $.__views.__alloyId46.add($.__views.customerLogo);
    $.__views.__alloyId48 = Ti.UI.createView({
        width: "100%",
        color: "white",
        id: "__alloyId48"
    });
    $.__views.wrapperView.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: "25%",
            height: "30%",
            layout: "vertical",
            bottom: 0,
            left: 0,
            color: "white"
        });
        Alloy.isHandheld && _.extend(o, {
            width: "25%",
            height: "30%",
            layout: "vertical",
            bottom: 0,
            left: 0,
            color: "white"
        });
        _.extend(o, {
            top: "0%",
            id: "__alloyId49"
        });
        return o;
    }());
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "25",
            left: "25",
            font: {
                fontSize: 30
            },
            color: "white"
        });
        Alloy.isHandheld && _.extend(o, {
            top: "0",
            left: "25",
            font: {
                fontSize: 15
            },
            color: "white"
        });
        _.extend(o, {
            text: "Problem",
            id: "__alloyId50"
        });
        return o;
    }());
    $.__views.__alloyId49.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId51"
    });
    $.__views.__alloyId49.add($.__views.__alloyId51);
    $.__views.problemStatement = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "20",
            left: "35",
            font: {
                fontSize: 15
            },
            color: "white"
        });
        Alloy.isHandheld && _.extend(o, {
            top: "0",
            left: "35",
            font: {
                fontSize: 8
            },
            color: "white"
        });
        _.extend(o, {
            id: "problemStatement"
        });
        return o;
    }());
    $.__views.__alloyId51.add($.__views.problemStatement);
    $.__views.__alloyId52 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: "25%",
            height: "30%",
            layout: "vertical",
            bottom: 0,
            left: 0,
            color: "white"
        });
        Alloy.isHandheld && _.extend(o, {
            width: "25%",
            height: "30%",
            layout: "vertical",
            bottom: 0,
            left: 0,
            color: "white"
        });
        _.extend(o, {
            top: "33%",
            id: "__alloyId52"
        });
        return o;
    }());
    $.__views.__alloyId48.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "25",
            left: "25",
            font: {
                fontSize: 30
            },
            color: "white"
        });
        Alloy.isHandheld && _.extend(o, {
            top: "0",
            left: "25",
            font: {
                fontSize: 15
            },
            color: "white"
        });
        _.extend(o, {
            text: "Solution",
            id: "__alloyId53"
        });
        return o;
    }());
    $.__views.__alloyId52.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId54"
    });
    $.__views.__alloyId52.add($.__views.__alloyId54);
    $.__views.solutionStatement = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "20",
            left: "35",
            font: {
                fontSize: 15
            },
            color: "white"
        });
        Alloy.isHandheld && _.extend(o, {
            top: "0",
            left: "35",
            font: {
                fontSize: 8
            },
            color: "white"
        });
        _.extend(o, {
            id: "solutionStatement"
        });
        return o;
    }());
    $.__views.__alloyId54.add($.__views.solutionStatement);
    $.__views.__alloyId55 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: "25%",
            height: "30%",
            layout: "vertical",
            bottom: 0,
            left: 0,
            color: "white"
        });
        Alloy.isHandheld && _.extend(o, {
            width: "25%",
            height: "30%",
            layout: "vertical",
            bottom: 0,
            left: 0,
            color: "white"
        });
        _.extend(o, {
            top: "66%",
            id: "__alloyId55"
        });
        return o;
    }());
    $.__views.__alloyId48.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "25",
            left: "25",
            font: {
                fontSize: 30
            },
            color: "white"
        });
        Alloy.isHandheld && _.extend(o, {
            top: "0",
            left: "25",
            font: {
                fontSize: 15
            },
            color: "white"
        });
        _.extend(o, {
            text: "Value",
            id: "__alloyId56"
        });
        return o;
    }());
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId57"
    });
    $.__views.__alloyId55.add($.__views.__alloyId57);
    $.__views.valueStatement = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "20",
            left: "35",
            font: {
                fontSize: 15
            },
            color: "white"
        });
        Alloy.isHandheld && _.extend(o, {
            top: "0",
            left: "35",
            font: {
                fontSize: 8
            },
            color: "white"
        });
        _.extend(o, {
            id: "valueStatement"
        });
        return o;
    }());
    $.__views.__alloyId57.add($.__views.valueStatement);
    var __alloyId58 = [];
    $.__views.slideParent = Ti.UI.createScrollableView({
        showPagingControl: "true",
        width: "65%",
        height: "100%",
        right: "5%",
        bottom: 0,
        color: "white",
        views: __alloyId58,
        id: "slideParent"
    });
    $.__views.__alloyId48.add($.__views.slideParent);
    var __alloyId64 = Alloy.Collections["attachments"] || attachments;
    __alloyId64.on("fetch destroy change add remove reset", __alloyId65);
    exports.destroy = function() {
        __alloyId64.off("fetch destroy change add remove reset", __alloyId65);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var mobileContentId = args.mobileContentId || "";
    var mobileContents = Alloy.Collections.mobileContents;
    var attachments = Alloy.Collections.attachments;
    var customers = Alloy.Collections.customers;
    mobileContents.fetch();
    attachments.fetch();
    customers.fetch();
    var customerName = "";
    var customerId = 0;
    var logoFile = "";
    $.mobileContent.addEventListener("close", function() {
        $.destroy();
    });
    init();
    Ti.API.log("logo " + logoFile);
    $.customerLogo.image = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, customerName.replace(" ", ""));
    $.mobileContent.open();
    __defers["$.__views.__alloyId46!swipe!swipeHeader"] && $.__views.__alloyId46.addEventListener("swipe", swipeHeader);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;