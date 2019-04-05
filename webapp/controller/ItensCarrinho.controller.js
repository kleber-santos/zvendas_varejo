sap.ui.define([
	"arcelor/controller/BaseController",
	"sap/ui/Device",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"arcelor/model/formatter"
], function(BaseController, Device, MessageToast, MessageBox, formatter) {
	"use strict";

	var sCartModelName = "cartProducts";
	var sSavedForLaterEntries = "savedForLaterEntries";
	var sCartEntries = "cartEntries";
	var sCartEntriesPedidos = "cartEntriesPedidos";

	return BaseController.extend("arcelor.controller.ItensCarrinho", {
		
		formatter: formatter,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf arcelor.view.view.ItensCarrinho
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf arcelor.view.view.ItensCarrinho
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf arcelor.view.view.ItensCarrinho
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf arcelor.view.view.ItensCarrinho
		 */
		//	onExit: function() {
		//
		//	}
		onResetCart: function () {
			var oCartModel = this.getView().getModel(sCartModelName);

			
			oCartModel.setProperty("/cartEntries", {});
			//oCartModel.setProperty("/savedForLaterEntries", {});
			oCartModel.setProperty("/totalPrice", "0");
			sap.ui.getCore().byId("__component0---produtos--TotalCarrinho").setText(0);
			
		},
		
		onNavBack: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("Produtos", null, true);
		},
		
		onSaveCart: function(oEvent){
			
			var that = this;
			
			var box = new sap.m.VBox({
				items: [
					new sap.m.Text({
						text: 'Deseja fechar o pedido?'
					})
				]
			});
			box.setModel(new sap.ui.model.json.JSONModel({
				message: ''
			}));
			sap.m.MessageBox.show(
					box, {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "ArcelorMittal",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {
							if (oAction === sap.m.MessageBox.Action.YES) {
								var oCartModel = that.getModel("cartProducts");
								var oCollectionEntries = $.extend({}, oCartModel.getData()["cartEntries"]);
								oCartModel.setProperty("/cartEntriesPedidos", $.extend({}, oCollectionEntries));
								that.onResetCart();
								that.getOwnerComponent().getRouter().navTo("Vendas", null, true);
								
							} 
						}
					}
				);
		},
		
		onCartEntriesDelete: function (oEvent) {
			this._deleteProduct(sCartEntries, oEvent);
		},
		
		onCartEntriesUpdate: function (oEvent){
			var oBindingContext = oEvent.getSource().getBindingContext(sCartModelName);
			
			this._changeList(sCartEntries, oBindingContext);
		},
		
		_deleteProduct: function (sCollection, oEvent) {
			
			var oSelectedItem = oEvent.getSource().getParent();
			var oPath   = oSelectedItem.oBindingContexts.cartProducts.sPath;
			
			var oCartModel = this.getView().getModel(sCartModelName);
			var oCollectionEntries = $.extend({}, oCartModel.getData()[sCollection]);
					
			var sEntryId = oPath.split("/");  
			delete oCollectionEntries[sEntryId[2]];
					
			oCartModel.setProperty("/" + sCollection, $.extend({}, oCollectionEntries));
			
			sap.m.MessageToast.show("Produto removido!");
			
			var totalprice = formatter.totalPrice(oCollectionEntries);
			
			oCartModel.setProperty("/totalPrice", totalprice);
			this.getView().byId("totalPriceText").setText("Total: " + totalprice);
			
			var totalCarrinho = sap.ui.getCore().byId("__component0---produtos--TotalCarrinho").getText();
			sap.ui.getCore().byId("__component0---produtos--TotalCarrinho").setText(totalCarrinho-1);
			
		},
		
		_changeList: function (sListToAddItem, oBindingContext) {
			
			var oCartModel        = oBindingContext.getModel();
			var oProduct          = oBindingContext.getObject();
			oProduct.ValorTotItem = oProduct.PrecoTbSemIPI * oProduct.Qtd;
			var oModelData        = oCartModel.getData();
			
			var oListToAddItem = $.extend({}, oModelData[sListToAddItem]);
			var sProductId     = oProduct.Material+oProduct.Centro;
			
			if (oListToAddItem[sProductId] === undefined) {
				oListToAddItem[sProductId] = $.extend({}, oProduct);
			}
			
			oCartModel.setProperty("/" + sListToAddItem, oListToAddItem);
			
			var totalprice = formatter.totalPrice(oListToAddItem);
			
			oCartModel.setProperty("/totalPrice", totalprice);
			this.getView().byId("totalPriceText").setText("Total: " + totalprice);
			
		}

	});

});