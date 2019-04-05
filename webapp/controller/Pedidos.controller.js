sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"arcelor/model/formatter"	
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("arcelor.controller.Pedidos", {
		
		formatter: formatter,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ancelor.view.view.Pedidos
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ancelor.view.view.Pedidos
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ancelor.view.view.Pedidos
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ancelor.view.view.Pedidos
		 */
		//	onExit: function() {
		//
		//	}
		
		test: function(sdummy){
			debugger;
		},
		
		actionVendas: function(oEvent) {
			this.getOwnerComponent().getRouter().navTo("Vendas", null, true);
		},

		actionOrdemVendaFatura: function(oEvent) {
			this.ClearFieldsOrdemVendaFatura();
			this.getOwnerComponent().getRouter().navTo("OrdemVendaFatura", null, true);
		},

		onPress: function(oEvent) {
			this.getOwnerComponent().getRouter().navTo("Finalizar", null, true);
		},
		
		_destroyFormVendas: function(){
			//var view = sap.ui.getCore().byId("__component0---ordemvendafatura");
			
		},

		ClearFieldsOrdemVendaFatura: function() {

			var view = sap.ui.getCore().byId("__component0---ordemvendafatura");

			if (view !== undefined) {

				sap.ui.getCore().byId("__component0---ordemvendafatura--multiinput-ordem").removeAllTokens();
				sap.ui.getCore().byId("__component0---ordemvendafatura--input-DtRemessa").setValue("");
				sap.ui.getCore().byId("__component0---ordemvendafatura--input-Cliente").setValue("");
				sap.ui.getCore().byId("__component0---ordemvendafatura--input-dateEmitidas").setValue("");

				var filters = [];
				var list = sap.ui.getCore().byId("__component0---ordemvendafatura--List");
				var binding = list.getBinding("items");
				binding.filter(filters);

				this.setInitalDateValue();

			}

		},
		
		setInitalDateValue: function() {

			var date = sap.ui.getCore().byId("__component0---ordemvendafatura--input-dateEmitidas");
			date.setDelimiter("-");
			date.setDateValue(new Date());
			date.setSecondDateValue(new Date());
			date.setValueFormat("dd/MM/yyyy");

			date.addEventDelegate({
				onAfterRendering: function() {
					var oDateInner = this.$().find('.sapMInputBaseInner');
					var oID = oDateInner[0].id;
					$('#' + oID).attr("disabled", "disabled");
				}
			}, date);

			date = sap.ui.getCore().byId("__component0---ordemvendafatura--input-DtRemessa");

			date.addEventDelegate({
				onAfterRendering: function() {
					var oDateInner = this.$().find('.sapMInputBaseInner');
					var oID = oDateInner[0].id;
					$('#' + oID).attr("disabled", "disabled");
				}
			}, date);

		}

	});

});