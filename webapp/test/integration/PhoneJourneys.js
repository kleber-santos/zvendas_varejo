jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"arcelor/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"arcelor/test/integration/pages/App",
	"arcelor/test/integration/pages/Browser",
	"arcelor/test/integration/pages/Master",
	"arcelor/test/integration/pages/Detail",
	"arcelor/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "arcelor.view."
	});

	sap.ui.require([
		"arcelor/test/integration/NavigationJourneyPhone",
		"arcelor/test/integration/NotFoundJourneyPhone",
		"arcelor/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});