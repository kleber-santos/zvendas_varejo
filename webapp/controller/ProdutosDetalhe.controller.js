sap.ui.define([
	"arcelor/controller/BaseController",
	//"arcelor/controller/VendasVarejoTela",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/GroupHeaderListItem",
	"sap/ui/Device",
	"arcelor/model/formatter"
], function(BaseController, JSONModel, Filter, FilterOperator, History, GroupHeaderListItem, Device, formatter, Controller) {
	"use strict";
	
	var url = "";
	
	return BaseController.extend("arcelor.controller.ProdutosDetalhe", {
	//return VendasVarejoTela.extend("arcelor.controller.ProdutosDetalhe", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf arcelor.view.ProdutosDetalhe
		 */
		onInit: function() {
			
			if (this._oDialog) {
				this._oDialog.destroy();
			}
			var oRouter = this.getRouter();
			oRouter.getRoute("produtosdetalhe").attachMatched(this._onRouterMatched, this);
			
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf arcelor.view.ProdutosDetalhe
		 */
		//	onBeforeRendering: function() {
		//	
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf arcelor.view.ProdutosDetalhe
		 */
		//	onAfterRendering: function() {
		//		
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf arcelor.view.ProdutosDetalhe
		 */
		onExit: function() {
			this.destroy();
		},
		
		onNavBack : function(){
			this.getOwnerComponent().getRouter().navTo("Produtos", null, true);
			this._oDialog.destroy();
		},
		
		_onRouterMatched: function(oEvent) {
			
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			
			var url;
			if(window.location.hostname === "localhost"){
				url = 'http://mb1abdb0.bms.com.br/SAP/PUBLIC/BC/UI2/ZVENDASVAREJO/IMG/PRODUTOS/'+parseInt(oArgs.Id)+'.jpg';
			}else{
				url = window.location.origin+'/SAP/PUBLIC/BC/UI2/ZVENDASVAREJO/IMG/PRODUTOS/'+parseInt(oArgs.Id)+'.jpg';	
			}
			this.getView().byId("imgProduto").setSrc(url);
			
			oView = this.getView();
			oView.bindElement({
				path: "/ProdutosSet(Codproduto='" + oArgs.Id +
					"',Grpmercmacro='',Texto='',Loja='',Orgvendas='',Canal='',Setorativ='',Escrvendas='',Eqpvendas='',Grupomerc='',Grupomat='')",
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function(oEvent) {
						  oView.setBusy(true);
					},
					dataReceived: function(oEvent) {
						 oView.setBusy(false);
					}
				}
			}); 
			
		},
		_onBindingChange: function(oEvent) {
			//if (!this.getView.getBindingContext()) {
			//	this.getRouter().getTargets().display("notFound");
			//}
		},
		/**
		 *@memberOf arcelor.controller.ProdutosDetalhe
		 */
		onPress: function(oEvent) {
			this._showObject(oEvent.getSource());
		},
		
		onPressAplicacao: function(oEvent){
		   	var sRef = oEvent.getSource().getBindingContext().getProperty("Urlyoutube1");
            sap.m.URLHelper.redirect("http://"+sRef,true);
		},
		
		onPressRecomendacao: function(oEvent){
			var sRef = oEvent.getSource().getBindingContext().getProperty("Urlyoutube2");
            sap.m.URLHelper.redirect("http://"+sRef,true);
		},

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function(oItem) {
			this.getRouter().navTo("produtosestoque", {
				Id: oItem.getBindingContext().getProperty("Codproduto")
			});
		}
	});
});