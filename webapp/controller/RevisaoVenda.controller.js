sap.ui.define([
	"arcelor/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("arcelor.controller.RevisaoVenda", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf arcelor.controller.view.RevisaoVenda
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf arcelor.controller.view.RevisaoVenda
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf arcelor.controller.view.RevisaoVenda
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf arcelor.controller.view.RevisaoVenda
		 */
		//	onExit: function() {
		//
		//	}
		
		onNavBack : function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("Vendas", null, true);
		},
        
         onPressconfirmar : function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("Pagamento", null, true);
		}

	});

});