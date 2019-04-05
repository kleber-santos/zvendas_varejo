jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 MenuSet in the list

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
		"arcelor/test/integration/MasterJourney",
		"arcelor/test/integration/NavigationJourney",
		"arcelor/test/integration/NotFoundJourney",
		"arcelor/test/integration/BusyJourney",
		"arcelor/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});