function Controller() {
    function __alloyId29(e) {
        if (e && e.fromAdapter) return;
        __alloyId29.opts || {};
        var models = topRowFilter(__alloyId28);
        var len = models.length;
        var children = $.__views.topRowView.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.topRowView.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId21 = models[i];
            __alloyId21.__transform = transformTopRowData(__alloyId21);
            var __alloyId23 = Ti.UI.createImageView({
                height: "100%",
                borderWidth: 0,
                borderColor: "white",
                width: "undefined" != typeof __alloyId21.__transform["widths"] ? __alloyId21.__transform["widths"] : __alloyId21.get("widths")
            });
            $.__views.topRowView.add(__alloyId23);
            var __alloyId25 = Ti.UI.createView({
                width: "80%",
                height: "80%"
            });
            __alloyId23.add(__alloyId25);
            var __alloyId27 = Ti.UI.createLabel(function() {
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
                    need_id: "undefined" != typeof __alloyId21.__transform["id"] ? __alloyId21.__transform["id"] : __alloyId21.get("id"),
                    text: "undefined" != typeof __alloyId21.__transform["title"] ? __alloyId21.__transform["title"] : __alloyId21.get("title")
                });
                return o;
            }());
            __alloyId25.add(__alloyId27);
            goToPage ? __alloyId27.addEventListener("click", goToPage) : __defers["__alloyId27!click!goToPage"] = true;
        }
    }
    function __alloyId37(e) {
        if (e && e.fromAdapter) return;
        __alloyId37.opts || {};
        var models = bottomRowFilter(__alloyId36);
        var len = models.length;
        var children = $.__views.bottomRowView.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.bottomRowView.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId30 = models[i];
            __alloyId30.__transform = transformBottomRowData(__alloyId30);
            var __alloyId31 = Ti.UI.createImageView({
                height: "100%",
                borderWidth: 0,
                borderColor: "white",
                width: "undefined" != typeof __alloyId30.__transform["widths"] ? __alloyId30.__transform["widths"] : __alloyId30.get("widths")
            });
            $.__views.bottomRowView.add(__alloyId31);
            var __alloyId33 = Ti.UI.createView({
                width: "80%",
                height: "80%"
            });
            __alloyId31.add(__alloyId33);
            var __alloyId35 = Ti.UI.createLabel(function() {
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
                    need_id: "undefined" != typeof __alloyId30.__transform["id"] ? __alloyId30.__transform["id"] : __alloyId30.get("id"),
                    text: "undefined" != typeof __alloyId30.__transform["title"] ? __alloyId30.__transform["title"] : __alloyId30.get("title")
                });
                return o;
            }());
            __alloyId33.add(__alloyId35);
            goToPage ? __alloyId35.addEventListener("click", goToPage) : __defers["__alloyId35!click!goToPage"] = true;
        }
    }
    function getCurrentTime() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        return month + "/" + day + "/" + year + " @ " + hours + ":" + minutes;
    }
    function clearTable(_collection) {
        while (0 != _collection.length) _collection.at(_collection.length - 1).destroy();
    }
    function deleteFilesFromLocal(_collection) {
        for (var df = 0; _collection.length > df; df++) {
            var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, _collection.at(df).get("fileName"));
            if (f.exists() && f.writeable) {
                var success = f.deleteFile();
                Ti.API.info(true == success ? "success" : "fail");
            }
        }
    }
    function deleteLogosFromLocal() {
        for (var z = 0; customers.length > z; z++) {
            var d = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, customers.at(z).get("name").replace(" ", ""));
            if (d.exists() && d.writeable) {
                var success = d.deleteFile();
                Ti.API.info(true == success ? "success" : "fail");
            }
        }
    }
    function callSyncDBFromNetwork() {
        net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/Customers", $.username.value, $.password.value, loadCustomersIntoDB, true, "");
        net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/BusinessNeeds", $.username.value, $.password.value, loadBusinessNeedsIntoDB, true, "");
        net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/MobileContent", $.username.value, $.password.value, loadMobileContentsIntoDB, true, "");
        toggleSyncView();
        Ti.App.Properties.setString("lastSync", getCurrentTime());
    }
    function loadCustomersIntoDB(_response) {
        var _customers = JSON.parse(_response.responseText).d.results;
        deleteLogosFromLocal();
        clearTable(customers);
        for (var x = 0; _customers.length > x; x++) {
            var modelC = Alloy.createModel("customer", {
                id: _customers[x].Id,
                name: _customers[x].Title,
                logo: "",
                sharepointId: _customers[x].Id
            });
            customers.add(modelC);
            modelC.save();
            net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/Customers(" + _customers[x].Id + ")/Attachments", $.username.value, $.password.value, loadCustomerLogoIntoDB, true, "");
        }
        customers.fetch();
    }
    function loadMobileContentsIntoDB(_response) {
        var _mobileContents = JSON.parse(_response.responseText).d.results;
        clearTable(mobileContents);
        clearTable(customerNeedRelationships);
        deleteFilesFromLocal(attachments);
        clearTable(attachments);
        for (var x = 0; _mobileContents.length > x; x++) {
            var modelC = Alloy.createModel("mobileContent", {
                id: _mobileContents[x].Id,
                name: _mobileContents[x].Title,
                customerId: _mobileContents[x].CustomerId,
                technologies: _mobileContents[x].Technologies,
                showInMobileApp: _mobileContents[x].ShowInMobileApp,
                image: "",
                sharepointId: _mobileContents[x].Id,
                problemStatement: _mobileContents[x].ProblemStatement.replace(/<\/?[^>]+(>|$)/g, ""),
                solutionStatement: _mobileContents[x].SolutionStatement.replace(/<\/?[^>]+(>|$)/g, ""),
                valueStatement: _mobileContents[x].ValueStatement.replace(/<\/?[^>]+(>|$)/g, "")
            });
            net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/MobileContent(" + _mobileContents[x].Id + ")/BusinessNeeds", $.username.value, $.password.value, loadCustNeedRelationsIntoDB, true, "");
            net.addRequest("http://omniportal/marketingapp/_vti_bin/listdata.svc/MobileContent(" + _mobileContents[x].Id + ")/Attachments", $.username.value, $.password.value, loadAttachmentsIntoDB, true, "");
            mobileContents.add(modelC);
            modelC.save();
        }
        mobileContents.fetch();
    }
    function loadCustNeedRelationsIntoDB(_response, _empty, _url) {
        var cnr = JSON.parse(_response.responseText).d.results;
        cnr.length;
        var cnrCount = customerNeedRelationships.length + 1;
        for (var c = 0; cnr.length > c; c++) {
            var mobileContentId = Number(getMobileContentIdFromUrl(_url));
            var customerId = 0;
            for (var mc = 0; mobileContents.length > mc; mc++) mobileContents.at(mc).get("id") == mobileContentId && (customerId = mobileContents.at(mc).get("customerId"));
            var modelCNR = Alloy.createModel("customerNeedRelationship", {
                id: cnrCount,
                mobileContent_id: mobileContentId,
                customer_id: customerId,
                businessNeed_id: cnr[c].Id
            });
            customerNeedRelationships.add(modelCNR);
            modelCNR.save();
            cnrCount += 1;
        }
        customerNeedRelationships.fetch();
    }
    function loadAttachmentsIntoDB(_response, _empty, _url) {
        Ti.API.log("in loadAttachments");
        var attachData = JSON.parse(_response.responseText).d.results;
        var totalAttach = attachData.length;
        var attachCount = attachments.length + 1;
        for (var a = 0; totalAttach > a; a++) {
            var mobileContentId = Number(getMobileContentIdFromUrl(_url));
            var fileType = attachData[a].Name.substring(attachData[a].Name.indexOf(".") + 1, attachData[a].Name.length);
            var mediaUrl = attachData[a].__metadata.media_src.trim().replace(" ", "%20");
            var fileName = attachData[a].Name;
            var modelA = Alloy.createModel("attachment", {
                id: attachCount,
                mobileContent_id: mobileContentId,
                fileType: fileType,
                fileName: fileName,
                url: mediaUrl,
                savedInFilesystem: "false"
            });
            attachments.add(modelA);
            modelA.save();
            attachCount++;
            net.addRequest(mediaUrl, $.username.value, $.password.value, processRequestForMedia, false, fileName);
        }
        attachments.fetch();
    }
    function loadCustomerLogoIntoDB(_response, _empty, _url) {
        Ti.API.log("in loadCustomerLogoIntoDB");
        var logoData = JSON.parse(_response.responseText).d.results;
        var fileName = "";
        var totalLogo = logoData.length;
        for (var a = 0; totalLogo > a; a++) {
            var customerId = Number(getCustomerIdFromMediaUrl(_url));
            for (var c = 0; customers.length > c; c++) customers.at(c).get("id") == customerId && (fileName = customers.at(c).get("name").replace(" ", ""));
            Ti.API.log("filename -> " + fileName);
            var mediaUrl = logoData[a].__metadata.media_src.trim().replace(" ", "%20");
            net.addRequest(mediaUrl, $.username.value, $.password.value, processRequestForLogo, false, fileName);
        }
    }
    function loadBusinessNeedsIntoDB(_response) {
        var _businessNeeds = JSON.parse(_response.responseText).d.results;
        clearTable(businessNeeds);
        _businessNeeds.length;
        for (var x = 0; _businessNeeds.length > x; x++) {
            var model = Alloy.createModel("businessNeed", {
                id: _businessNeeds[x].Id,
                title: _businessNeeds[x].Title
            });
            businessNeeds.add(model);
            model.save();
        }
        businessNeeds.fetch();
    }
    function processRequestForMedia(_response, _filename, _url) {
        if (_response) {
            var mobileContentId = getMobileContentIdFromMediaUrl(_url);
            var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, _filename);
            f.write(_response.responseData);
            var aCount = attachments.length;
            for (var m = 0; aCount > m; m++) if (attachments.at(m).get("fileName") == _filename && attachments.at(m).get("mobileContent_id") == mobileContentId) {
                attachments.at(m).set({
                    savedInFilesystem: "true"
                });
                attachments.at(m).save();
                Ti.API.log(_filename + "file saved to local storage");
            }
        } else Ti.API.log("In processRequestForMedia, issue with _response for " + _filename);
    }
    function processRequestForLogo(_response, _filename, _url) {
        Ti.API.log("in processRequestForLogo for " + _url);
        if (_response) {
            var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, _filename);
            f.write(_response.responseData);
            Ti.API.log("done processRequestForLogo");
        } else Ti.API.log("In processRequestForMedia, issue with _response for " + _filename);
    }
    function goToPage(e) {
        var id = e.source.need_id - 1;
        var categoryName;
        categoryName = businessNeeds.at(id).get("title");
        var args = {
            categoryName: categoryName,
            categoryID: e.source.need_id
        };
        Alloy.createController("customer", args);
    }
    function onSyncButtonClicked() {
        $.username.blur();
        $.password.blur();
        callSyncDBFromNetwork();
    }
    function toggleSyncView() {
        Ti.API.log(Ti.App.Properties.getString("lastSync"));
        if (true != $.loginView.visible) {
            $.lastSyncText.text = "Last sync: " + Ti.App.Properties.getString("lastSync");
            var animation = Ti.UI.createAnimation();
            animation.top = "15%";
            animation.duration = 300;
            $.loginView.top = "99%";
            $.loginView.visible = true;
            $.loginView.animate(animation);
        } else {
            var animation = Ti.UI.createAnimation();
            animation.top = "99%";
            animation.duration = 300;
            $.loginView.animate(animation);
            $.loginView.visible = "false";
        }
    }
    function topRowFilter(collection) {
        var totalNeeds = collection.length;
        var filtered = collection.filter(function(_need) {
            return totalNeeds / 2 > _need.get("id");
        });
        return filtered;
    }
    function bottomRowFilter(collection) {
        var totalNeeds = collection.length;
        var filtered = collection.filter(function(_need) {
            return _need.get("id") >= totalNeeds / 2;
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
        return 1 == businessNeeds.length / 2 % 1 ? 100 * (1 / (businessNeeds.length / 2)) + "%" : 100 * (1 / (businessNeeds.length / 2 - .5)) + "%";
    }
    function getBottomRowWidth() {
        return 1 == businessNeeds.length / 2 % 1 ? 100 * (1 / (businessNeeds.length / 2)) + "%" : 100 * (1 / (businessNeeds.length / 2 + .5)) + "%";
    }
    function getMobileContentIdFromUrl(_url) {
        var mString = _url.trim().replace("http://omniportal/marketingapp/_vti_bin/listdata.svc/MobileContent(", "");
        var endIndex = mString.indexOf(")");
        return mString.substring(0, endIndex);
    }
    function getMobileContentIdFromMediaUrl(_url) {
        var mString = _url.trim().replace("http://omniportal/marketingapp/Lists/Mobile%20Content/Attachments/", "");
        var endIndex = mString.indexOf("/");
        return mString.substring(0, endIndex);
    }
    function getCustomerIdFromMediaUrl(_url) {
        var mString = _url.trim().replace("http://omniportal/marketingapp/_vti_bin/listdata.svc/Customers(", "");
        var endIndex = mString.indexOf(")");
        return mString.substring(0, endIndex);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("businessNeed");
    $.__views.index = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT ],
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.needs = Ti.UI.createView({
        backgroundColor: "black",
        layout: "vertical",
        zIndex: "-100",
        id: "needs"
    });
    $.__views.index.add($.__views.needs);
    $.__views.topRowView = Ti.UI.createView({
        width: "100%",
        height: "42.67578125%",
        layout: "horizontal",
        id: "topRowView",
        dataTransform: "transformTopRowData"
    });
    $.__views.needs.add($.__views.topRowView);
    var __alloyId28 = Alloy.Collections["businessNeeds"] || businessNeeds;
    __alloyId28.on("fetch destroy change add remove reset", __alloyId29);
    $.__views.omni = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            image: "/omni_logos/Omni-gray-blue.png",
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
    var __alloyId36 = Alloy.Collections["businessNeeds"] || businessNeeds;
    __alloyId36.on("fetch destroy change add remove reset", __alloyId37);
    $.__views.showSyncButtonView = Ti.UI.createView({
        id: "showSyncButtonView",
        zIndex: "400",
        bottom: "0",
        right: "0",
        width: "60",
        height: "60",
        backgroundColor: "black"
    });
    $.__views.index.add($.__views.showSyncButtonView);
    toggleSyncView ? $.__views.showSyncButtonView.addEventListener("click", toggleSyncView) : __defers["$.__views.showSyncButtonView!click!toggleSyncView"] = true;
    $.__views.loginView = Ti.UI.createView({
        backgroundColor: "white",
        layout: "center",
        top: "99%",
        height: Ti.UI.SIZE,
        width: "500",
        id: "loginView",
        visible: "false"
    });
    $.__views.index.add($.__views.loginView);
    var __alloyId39 = [];
    $.__views.cancelSyncButton = Ti.UI.createButton({
        style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        title: "Cancel",
        id: "cancelSyncButton"
    });
    __alloyId39.push($.__views.cancelSyncButton);
    toggleSyncView ? $.__views.cancelSyncButton.addEventListener("click", toggleSyncView) : __defers["$.__views.cancelSyncButton!click!toggleSyncView"] = true;
    $.__views.__alloyId40 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId39.push($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "Black",
        text: "SharePoint Sync",
        id: "__alloyId41"
    });
    __alloyId39.push($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId39.push($.__views.__alloyId42);
    $.__views.syncButton = Ti.UI.createButton({
        title: "Sync",
        top: "0",
        right: "0",
        zIndex: "100",
        visible: Titanium.Network.online,
        style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        borderWidth: "5",
        borderColor: "black",
        id: "syncButton"
    });
    __alloyId39.push($.__views.syncButton);
    onSyncButtonClicked ? $.__views.syncButton.addEventListener("click", onSyncButtonClicked) : __defers["$.__views.syncButton!click!onSyncButtonClicked"] = true;
    $.__views.syncToolbar = Ti.UI.iOS.createToolbar({
        platform: "ios",
        top: "0",
        borderTop: "false",
        borderBottom: "false",
        backgroundColor: "black",
        items: __alloyId39,
        id: "syncToolbar"
    });
    $.__views.loginView.add($.__views.syncToolbar);
    $.__views.username = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "black",
        width: "250",
        height: "40",
        hintText: "username",
        top: "75",
        id: "username"
    });
    $.__views.loginView.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "black",
        width: "250",
        height: "40",
        passwordMask: "true",
        hintText: "password",
        top: "135",
        id: "password"
    });
    $.__views.loginView.add($.__views.password);
    $.__views.lastSyncText = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "gray",
        top: "225",
        id: "lastSyncText"
    });
    $.__views.loginView.add($.__views.lastSyncText);
    $.__views.__alloyId43 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "50",
        color: "white",
        top: "250",
        text: "     ",
        id: "__alloyId43"
    });
    $.__views.loginView.add($.__views.__alloyId43);
    exports.destroy = function() {
        __alloyId28.off("fetch destroy change add remove reset", __alloyId29);
        __alloyId36.off("fetch destroy change add remove reset", __alloyId37);
    };
    _.extend($, $.__views);
    var net = require("lib/network");
    var customers = Alloy.Collections.customers;
    var businessNeeds = Alloy.Collections.businessNeeds;
    var mobileContents = Alloy.Collections.mobileContents;
    var customerNeedRelationships = Alloy.Collections.customerNeedRelationships;
    var attachments = Alloy.Collections.attachments;
    $.index.addEventListener("open", function() {});
    $.index.addEventListener("close", function() {
        $.destroy();
    });
    $.index.addEventListener("focus", function() {});
    Ti.App.addEventListener("databaseUpdated", function() {});
    businessNeeds.fetch();
    customers.fetch();
    mobileContents.fetch();
    customerNeedRelationships.fetch();
    attachments.fetch();
    $.index.open();
    __defers["__alloyId27!click!goToPage"] && __alloyId27.addEventListener("click", goToPage);
    __defers["__alloyId35!click!goToPage"] && __alloyId35.addEventListener("click", goToPage);
    __defers["$.__views.showSyncButtonView!click!toggleSyncView"] && $.__views.showSyncButtonView.addEventListener("click", toggleSyncView);
    __defers["$.__views.cancelSyncButton!click!toggleSyncView"] && $.__views.cancelSyncButton.addEventListener("click", toggleSyncView);
    __defers["$.__views.syncButton!click!onSyncButtonClicked"] && $.__views.syncButton.addEventListener("click", onSyncButtonClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;