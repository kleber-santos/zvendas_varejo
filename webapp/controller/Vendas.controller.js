sap.ui.define([
	"jquery.sap.global",
	"arcelor/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/GroupHeaderListItem",
	"sap/ui/core/Fragment",
	"sap/ui/Device",
	"arcelor/model/formatter",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"arcelor/model/cart"
], function(jQuery, BaseController, JSONModel, History, Filter, FilterOperator, GroupHeaderListItem, Device, formatter, 
            MessageToast, MessageBox, cart) {
	"use strict";
	
	var aData = [];
	var sCartModelName = "cartProducts";
	var sCartEntriesPedidos = "cartEntriesPedidos";
	var aDataItensCarrinho  = [];
	var that;
	
	return BaseController.extend("arcelor.controller.Vendas", {
		
		formatter: formatter,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf arcelor.view.Venda
		 */
		onInit: function() {
			
			that = this;
			//this._wizard = this.getView().byId("ShoppingCartWizard");
			//this._oNavContainer = this.getView().byId("wizardNavContainer");
			//this._oWizardContentPage = this.getView().byId("wizardContentPage");
			//this._oWizardReviewPage = sap.ui.xmlfragment("sap.m.sample.WizardBranching.ReviewPage", this);

		//	this._oNavContainer.addPage(this._oWizardReviewPage);
		
			//this._oNavContainer.addPage(this._oWizardReviewPage);
			this.model = new sap.ui.model.json.JSONModel();
			
			var myModel = this.getOwnerComponent().getModel();
			myModel.setSizeLimit(5000);
			
			//this.model.attachRequestCompleted(null, function () {
				//that.model.getData().ProductCollection.splice(5,that.model.getData().ProductCollection.length);
				//that.model.setProperty("/selectedPayment", "Credit Card");
				//that.model.setProperty("/selectedDeliveryMethod", "Standard Delivery");
				//that.model.setProperty("/differentDeliveryAddress", false);
				//that.model.setProperty("/CashOnDelivery", {});
				//that.model.setProperty("/BillingAddress", {});
				//that.model.setProperty("/CreditCard", {});
				//that.calcTotal();
				//that.model.updateBindings();
			//});
			
			this._onFillDateNow();
			
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf arcelor.view.Venda
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf arcelor.view.Venda
		 */
			onAfterRendering: function() {
				this._onCombosInicio();
			},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf arcelor.view.Venda
		 */
		//	onExit: function() {
		//
		//	}
			/**
		 *@memberOf arcelor.controller.ClientesCadastro
		 */
		 
		_onCombosInicio: function(){
			
			//TipoOperacao;Escritorio;Cond.Pagamento;Utilizacao;Versao
			var filters = [];
			var filter = "";
			
			filter = new sap.ui.model.Filter("Codconsulta", sap.ui.model.FilterOperator.EQ,"TO;ES;CP;UT;VS");
			filters.push(filter);
			var list = this.getView().byId("input-DM_DadoMestreOVSet");
			var binding = list.getBinding("items");
			binding.filter(filters);
			
		}, 
		
		onProcessarTable: function(oEvent){
			
			this._onPreencherCombos();
			
		},
		
		_onCombosCliente: function(sCliente){
			
			//Entrega;Cobrança;Canal;DomicilioFiscal
			var filters = [];
			var filter;
			var filter1;
			filter      = new sap.ui.model.Filter("Codconsulta", sap.ui.model.FilterOperator.EQ,"CE;CC;CD");
			filter1     = new sap.ui.model.Filter("Codcliente", sap.ui.model.FilterOperator.EQ,sCliente);
			filters.push(filter,filter1);
			var list    = this.getView().byId("input-DM_DadoMestreOVSet");
			var binding = list.getBinding("items");
			binding.filter(filters);
			
		},
		
		_onPreencherCombos: function(){
			
			var table = that.getView().byId("input-DM_DadoMestreOVSet");
			var rowItems = table.getItems();
			
			//
			var aDataTipoOperacao  = [];
			var aDataEscritorio    = []; 
			var aDataCondPagamento = [];
			var aDataUtilizacao    = [];
			var aDataVersao        = [];
			
			//Clientes
			var aDataEntrega     = [];
			var aDataCobranca    = [];
			var aDataCanal       = [];
			var aDomicilioFiscal = [];
				
			for (var i = 0; i < rowItems.length; i++) {
					
				var item = rowItems[i];
				var Cells = item.getCells();
				var Codconsulta = Cells[0].getValue();
				var Coddadomestre = Cells[1].getValue();
				var Textodadomestre = Cells[2].getValue();
												
				if (Codconsulta === "TO") {
					aDataTipoOperacao.push({
						Codconsulta: Codconsulta,
						Coddadomestre: Coddadomestre,
						Textodadomestre: Textodadomestre
					});
				}
				
				if (Codconsulta === "ES") {
					aDataEscritorio.push({
						Codconsulta: Codconsulta,
						Coddadomestre: Coddadomestre,
						Textodadomestre: Textodadomestre
					});
				}
				
				if (Codconsulta === "CP") {
					aDataCondPagamento.push({
						Codconsulta: Codconsulta,
						Coddadomestre: Coddadomestre,
						Textodadomestre: Textodadomestre
					});
				}
				
				if (Codconsulta === "UT") {
					aDataUtilizacao.push({
						Codconsulta: Codconsulta,
						Coddadomestre: Coddadomestre,
						Textodadomestre: Textodadomestre
					});
				}
				
				if (Codconsulta === "VS") {
					aDataVersao.push({
						Codconsulta: Codconsulta,
						Coddadomestre: Coddadomestre,
						Textodadomestre: Textodadomestre
					});
				}
				
				if (Codconsulta === "CE") {
					aDataEntrega.push({
						Codconsulta: Codconsulta,
						Coddadomestre: Coddadomestre,
						Textodadomestre: Textodadomestre
					});
				}
				
				if (Codconsulta === "CC") {
					aDataCobranca.push({
						Codconsulta: Codconsulta,
						Coddadomestre: Coddadomestre,
						Textodadomestre: Textodadomestre
					});
				}
				
				if (Codconsulta === "CD") {
					aDataCanal.push({
						Codconsulta: Codconsulta,
						Coddadomestre: Coddadomestre,
						Textodadomestre: Textodadomestre
					});
				}
				
				if (Codconsulta === "") {
					aDomicilioFiscal.push({
						Codconsulta: Codconsulta,
						Coddadomestre: Coddadomestre,
						Textodadomestre: Textodadomestre
					});
				}
				
			}
			
			//Todos Combos
			if(aDataTipoOperacao.length > 0){
				var oModelComboTipoOperacao = new sap.ui.model.json.JSONModel();
				 	oModelComboTipoOperacao.setSizeLimit(5000);
				 	oModelComboTipoOperacao.setData({
				 		modelDataComboTipoOperacao: aDataTipoOperacao  
					});
				var oDataTipoOperacao = this.getView().byId("id-ComboTipoOperacao");
				oDataTipoOperacao.setModel(oModelComboTipoOperacao);	
			}
				
			if( aDataEscritorio.length > 0){	
				var oModelComboEscritorio = new sap.ui.model.json.JSONModel();
				 	oModelComboEscritorio.setSizeLimit(5000);
				 	oModelComboEscritorio.setData({
				 		modelDataComboEscritorio: aDataEscritorio
					});
				var oDataEscritorio = this.getView().byId("id-ComboEscritorio");
				oDataEscritorio.setModel(oModelComboEscritorio);	
			}
			
			if( aDataCondPagamento.length > 0){
				var oModelComboCondPagamento = new sap.ui.model.json.JSONModel();
				 	oModelComboCondPagamento.setSizeLimit(5000);
				 	oModelComboCondPagamento.setData({
				 		modelDataComboCondPagamento: aDataCondPagamento
					});
				var oDataCondPagamento = this.getView().byId("id-ComboCondPgto");
				oDataCondPagamento.setModel(oModelComboCondPagamento);	
			}
			
			if( aDataUtilizacao.length > 0){	
				var oModelComboUtilizacao = new sap.ui.model.json.JSONModel();
				 	oModelComboUtilizacao.setSizeLimit(5000);
				 	oModelComboUtilizacao.setData({
				 		modelDataComboUtilizacao: aDataUtilizacao
					});
				var oDataUtilizacao = this.getView().byId("id-ComboUtilizacao");
				oDataUtilizacao.setModel(oModelComboUtilizacao);
		    }
		
			if( aDataVersao.length > 0){
				var oModelComboVersao = new sap.ui.model.json.JSONModel();
				 	oModelComboVersao.setSizeLimit(5000);
				 	oModelComboVersao.setData({
				 		modelDataComboVersao: aDataVersao
					});
				var oDataVersao = this.getView().byId("id-ComboVersao");
				oDataVersao.setModel(oModelComboVersao);
			}
			
			//Combos Cliente
			if( aDataEntrega.length > 0){
				var oModelComboDtEntrega = new sap.ui.model.json.JSONModel();
				 	oModelComboDtEntrega.setSizeLimit(5000);
				 	oModelComboDtEntrega.setData({
				 		modelDataComboEntrega: aDataEntrega
					});
				var oDataDtEntrega = this.getView().byId("id-ComboEntrega");
				oDataDtEntrega.setModel(oModelComboDtEntrega);
			}
			
			if( aDataCobranca.length > 0){
				var oModelComboCobranca = new sap.ui.model.json.JSONModel();
				 	oModelComboCobranca.setSizeLimit(5000);
				 	oModelComboCobranca.setData({
				 		modelDataComboCobranca: aDataCobranca
					});
				var oDataCobranca = this.getView().byId("id-ComboCobranca");
				oDataCobranca.setModel(oModelComboCobranca);
			}
			
			if( aDataCanal.length > 0){
				var oModelComboCanal = new sap.ui.model.json.JSONModel();
				 	oModelComboCanal.setSizeLimit(5000);
				 	oModelComboCanal.setData({
				 		modelDataComboCanal: aDataCanal
					});
				var oDataCanal = this.getView().byId("id-ComboCanal");
				oDataCanal.setModel(oModelComboCanal);
			}
			
			if( aDomicilioFiscal.length > 0){
				var oModelComboDomicilioFiscal = new sap.ui.model.json.JSONModel();
				 	oModelComboDomicilioFiscal.setSizeLimit(5000);
				 	oModelComboDomicilioFiscal.setData({
				 		modelDataComboDomicilioFiscal: aDomicilioFiscal
					});
				var oDataDomicilioFiscal = this.getView().byId("id-ComboVersao");
				oDataDomicilioFiscal.setModel(oModelComboDomicilioFiscal);
			}
		},
		
		_onFillDateNow: function(){
			//this.getView().byId("idDateToday").setText(this._onDateNow());
		},
		
		_onDateNow: function(){
			
			var today = new Date();
        	var dd    = today.getDate();
        	var mm    = today.getMonth()+1; //January is 0!
        	var yyyy  = today.getFullYear();
        	
        	return dd + "/" + mm + "/" + yyyy;
			
		},
		 
		onNavBack: function(oEvent) {
			
			this.getOwnerComponent().getRouter().navTo("Pedidos", null, true);
			
		},
		
		onPressFinalizar: function(oEvent){
			this.getOwnerComponent().getRouter().navTo("RevisaoVenda", null, true);
		},
		
		onSearchClientes: function(oEvent){
			
			if (this._oDialog) {
				this._oDialog.destroy();
			}
			
			//if (! this._oDialog) {
				this._oDialog = sap.ui.xmlfragment( "arcelor.view.ClientesConsultaFrag",this);
				this._oDialog.setModel(this.getView().getModel());
			//}
			
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
		
		handleSearchClientes: function(oEvent) {
			//create model filter
			
			var filters = [];
			var query = oEvent.getParameter("value");
			
			if ((query && query.length > 0) && (query.trim() != '')) {
				
				var filter;
				
				if ($.isNumeric(query) && query.length == 11){
				 filter = new sap.ui.model.Filter("Cpf", sap.ui.model.FilterOperator.Contains, query);
				}if ($.isNumeric(query) && query.length < 11){
				 filter = new sap.ui.model.Filter("Codcliente", sap.ui.model.FilterOperator.Contains, query);
				} else if ($.isNumeric(query) && query.length > 11){
				 filter = new sap.ui.model.Filter("Cnpj", sap.ui.model.FilterOperator.Contains, query);
				} else if(!$.isNumeric(query)){
				 filter = new sap.ui.model.Filter("Nome", sap.ui.model.FilterOperator.Contains, query); 
				}
				 filters.push(filter);
			}
			
			var binding = oEvent.getSource().getBinding("items");
			binding.filter(filters);
			
		},
		
		onSearchMaterial: function(oEvent){
			
			if (this._oDialog) {
				this._oDialog.destroy();
			}
			
			this._oDialog = sap.ui.xmlfragment( "arcelor.view.ProdutosConsultaFrag",this);
			this._oDialog.setModel(this.getView().getModel());
			
			//this._oDialog.SearchFieldValue.value = "teste";
			
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			
			this._oDialog.open();
			
		//	var oSearchField = this.getView().byId("searchField");//.getValue();
			
			
			//var searchfield = this._oDialog.prototype().Filter = "teste"; //byId("ListProdutos-searchField"); 
			
		},
		
		handleSearchMaterial: function(oEvent){
			
			var filters = [];
			var query = oEvent.getParameter("value");
			
			//var oSearchField = this.getView().byId("ListProdutos");
			//ListProdutos-searchField
			
			if (query != '') {
				
				var filter;
				
				if ($.isNumeric(query)){
					filter = new sap.ui.model.Filter("Codproduto", sap.ui.model.FilterOperator.EQ, query);
				}else{
					filter = new sap.ui.model.Filter("Texto", sap.ui.model.FilterOperator.EQ, query);  
				}
				
				filters.push(filter);	
				
			}
			
			var binding = oEvent.getSource().getBinding("items");
			binding.filter(filters);
			
		},
		
		handleCloseClientes: function(oEvent){
		
			var clienteCodigo, clienteNome, cnpj, cpf;
			
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				
				clienteCodigo = aContexts.map(
				 	function(oContext) { 
				 		return oContext.getObject().Codcliente; 
				 	}
				 );
				
				clienteNome = aContexts.map(
				 	function(oContext) { 
				 		return oContext.getObject().Nome; 
				 	}
				 );
				 
				 cnpj = aContexts.map(
				 	function(oContext) { 
				 		return oContext.getObject().Cnpj; 
				 	}
				 );
				 
				 cpf = aContexts.map(
				 	function(oContext) { 
				 		return oContext.getObject().Cpf; 
				 	}
				 );
			}
			
			var oTextClienteCodigo = this.getView().byId("textClienteCodigo");
			oTextClienteCodigo.setText(clienteCodigo);
			
			var oTextClienteNome = this.getView().byId("textClienteTexto");
			oTextClienteNome.setText(clienteNome);
			
			this.getView().byId("textCnpjCpf").setText(cnpj+""+cpf);
			
		},
		
		onCartEntriesDelete: function (oEvent) {
			this._deleteProduct(sCartEntriesPedidos, oEvent);
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
			this.getView().byId("textValorTotalVenda").setText("Total: " + totalprice);
			
			//var totalCarrinho = sap.ui.getCore().byId("__component0---produtos--TotalCarrinho").getText();
			//sap.ui.getCore().byId("__component0---produtos--TotalCarrinho").setText(totalCarrinho-1);
			
		},
		
		handleCloseMaterial: function(oEvent){
	
			var codigo, descrprod, preco, preco2, quantidade, unidade, centro, tipofrete, subtotal;
			
			var aContexts = oEvent.getParameter("selectedContexts");
			
			if(aContexts.toString() != "undefined"){
			
				if (aContexts && aContexts.length) {
					
					codigo = aContexts.map(
					 	function(oContext) { 
					 		return oContext.getObject().Codproduto; 
					 	}
					 );
					
					descrprod = aContexts.map(
					 	function(oContext) { 
					 		return oContext.getObject().Descrprod; 
					 	}
					 );
					 
					 preco = aContexts.map(
					 	function(oContext) { 
					 		return parseFloat(oContext.getObject().Precodezx); 
					 	}
					 );
					 
					 quantidade = 1;
					 
					 centro = aContexts.map(
					 	function(oContext) { 
					 		return oContext.getObject().Loja; 
					 	}
					 );
					 
					 unidade = aContexts.map(
					 	function(oContext) { 
					 		return oContext.getObject().Undmedida; 
					 	}
					 );
					 
					 centro = aContexts.map(
					 	function(oContext) { 
					 		return oContext.getObject().Loja; 
					 	}
					 );
					 
					 tipofrete = '';
					 
					 subtotal = preco;
					 
				}
				
				var oCartModel = that.getView().getModel("cartProducts");
				var cartKey = codigo+centro;
				var oCollectionEntries = $.extend({}, oCartModel.getData()["cartEntriesPedidos"]);
				var oCartEntry =  oCollectionEntries[cartKey];
	
				aDataItensCarrinho = [];
				
				aDataItensCarrinho.push({
			                    // Item     : "",
			                    // Material : codigo.toString(),
			                    // Descricao: descrprod.toString(),
			                    // Preco    : preco.toString(), 
			                    // Qtd      : quantidade.toString(),
			                    // Unidade  : unidade.toString(),
			                    // Centro   : centro.toString(),
			                    // SubTotal : subtotal.toString()
			                    Item           : "",
			                    Material       : codigo.toString(),
			                    Descricao      : descrprod.toString(),
			                    Estque         : "",
			                    Qtd            : "1",
			                    Unidade        : unidade.toString(),
			                    PrecoTbSemIPI  : preco.toString(), 
			                    PrecoNegComIPI : "",
			                    PrecoNegSemIPI : "",
			                    DescPercentual : "",
			                    ValorTotItem   : "1", 
			                    PrecoTarget    : "",
			                    ValorST        : "",
			                    Centro         : centro.toString(),
			                    Frete          : "",
			                    ItemPedCli     : ""
			    });
		                
		        if (oCartEntry === undefined) {
					oCartEntry = $.extend({}, aDataItensCarrinho[0]);
					oCartEntry.Quantity = aDataItensCarrinho[0].Qtd;
					oCollectionEntries[cartKey] = oCartEntry;
				} else {
					oCartEntry.Quantity += 1;
				}
				
				oCartModel.setProperty("/cartEntriesPedidos", $.extend({}, oCollectionEntries));        
		                
				
			}
			
		},
		
		onDeleteSelectedItems: function(oEvent){
	
			 var oSelectedItem = oEvent.getSource().getParent();
			 var oPath   = oSelectedItem.getBindingContext().getPath();
			 var oIndex  = parseInt(oPath.substring(oPath.lastIndexOf('/') +1));
			 var oTable  = this.getView().byId("List");
		     var m       = oTable.getModel();
		     var data    = m.getProperty("/modelData");
		     var removed = data.splice(oIndex, 1);
		     m.setProperty("/modelData",data);
		     sap.m.MessageToast.show("Produto removido!");
		     //sap.m.MessageToast.show(JSON.stringify(removed[0]) +  'is removed');  
		     this.calcTotal(data);
	
		},
		
		onCalculateProduct: function(oEvent){
			
			 var oSelectedItem = oEvent.getSource().getParent();
			 var oPath   = oSelectedItem.getBindingContext().getPath();
			 var oIndex  = parseInt(oPath.substring(oPath.lastIndexOf('/') +1));
			 var oTable  = this.getView().byId("List");
		     var m       = oTable.getModel();
		     var data    = m.getProperty("/modelData");
		     
		    for (var i = 0; i < data.length; i++) {
				//data[i].Subtotal = parseFloat(data[i].Quantidade) * parseFloat(data[i].Preco);
				data[i].Subtotal = data[i].Quantidade * data[i].Preco;
			}
		     
		    var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({modelData: data}); 
		    
		     this.calcTotal(data);
			
		},
		
		calcSubTotal: function(data){
			
			if (data) {
				var total = data.reduce(function (prev, current) {
					//prev = parseFloat(prev.Subtotal) || parseFloat(prev);
					prev = prev.Subtotal || prev;
					return prev + current.Subtotal;
				});
				//this.model.setProperty("/ProductsTotalPrice", parseFloat(total.Preco) || parseFloat(total));
				//this.getView().byId("textValorTotalVenda").setText(parseFloat(total.Subtotal)||parseFloat(total));
				this.getView().byId("textValorTotalVenda").setText(total.Subtotal||total);
			} else {
				this.model.setProperty("/ProductsTotalPrice", 0);
			}
			
		},
		
		calcTotal: function(data){
			
			//var data = this.model.getData();//.aData;
			if (data) {
				var total = data.reduce(function (prev, current) {
					prev = parseFloat(prev.Subtotal) || parseFloat(prev);
					return parseFloat(prev) + parseFloat(current.Subtotal);
				});
				//this.model.setProperty("/ProductsTotalPrice", parseFloat(total.Preco) || parseFloat(total));
				this.getView().byId("textValorTotalVenda").setText(parseFloat(total.Subtotal)||parseFloat(total));
			} else {
				this.model.setProperty("/ProductsTotalPrice", 0);
			}
			
		},
		
		_handleMessageBoxOpen : function (sMessage, sMessageBoxType) {
			var that = this;
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						that._wizard.discardProgress(that._wizard.getSteps()[0]);
						that._navBackToList();
					}
				}
			});
		},
		
		_navBackToList: function () {
			this._navBackToStep(this.getView().byId("CarrinhoStep"));
		},
		
		completeCarrinhoStep: function(){
			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({modelData: aData});
				
			var oTableData = this.getView().byId("ListReverPedidos");
			var binding = oTableData.getBinding("items");
			binding.filter();
				
			oTableData.setModel(oModel);
			oTableData.getModel().refresh();
			
			var codigoCliente = this.getView().byId("textClienteCodReverPedido");
			codigoCliente.setText(this.getView().byId("textClienteCodigo").getText() + ' - ' + this.getView().byId("textClienteTexto").getText());
			
			var entrega = this.getView().byId("textEntregaReverPedido");
			entrega.setText(this.getView().byId("selectEntrega").getSelectedItem().getText());
			
			var cnpjcpf = this.getView().byId("textCNPJCPFReverPedido");
			cnpjcpf.setText(this.getView().byId("textCnpjCpf").getText());
			
			var formaPagamento = this.getView().byId("textFormaPagReverPedido");
			formaPagamento.setText(this.getView().byId("selectFormaPag").getSelectedItem().getText());
			
		},
		
		handleValueHelp: function(oEvent) {

			var sInputValue, sSearchFiled;

			sInputValue = oEvent.getSource().getValue();

			if ($.isNumeric(sInputValue) && sInputValue.length == 11) {
				sInputValue = this.utilFormatterCPFCNPJClearSearch(sInputValue);
				sSearchFiled = "Cpf";
			}
			if ($.isNumeric(sInputValue) && sInputValue.length < 11) {
				sSearchFiled = "Codcliente";
			} else if ($.isNumeric(sInputValue) && sInputValue.length > 11) {
				sInputValue = this.utilFormatterCPFCNPJClearSearch(sInputValue);
				sSearchFiled = "Cnpj";
			} else if (!$.isNumeric(sInputValue)) {
				sSearchFiled = "Nome";
			}

			this.inputId = oEvent.getSource().getId();

			if (this._valueHelpDialog) {
				this._valueHelpDialog = null;
			}

			// create value help dialog
			this._valueHelpDialog = sap.ui.xmlfragment(
				"arcelor.view.ClientesPesquisaDialog",
				this
			);
			this.getView().addDependent(this._valueHelpDialog);
			
			this._valueHelpDialog.getBinding("items").filter(
				[new sap.ui.model.Filter(sSearchFiled, sap.ui.model.FilterOperator.Contains, sInputValue)]
			);

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);

		},
		
		_handleValueHelpClose: function(evt) {

			var oSelectedItem, fieldInput, aContexts, oModel;
			var codigo, nome;

			oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				fieldInput = this.getView().byId(this.inputId);
				fieldInput.setValue(oSelectedItem.getDescription());
			}
			evt.getSource().getBinding("items").filter([]);

				aContexts = evt.getParameter("selectedContexts");

				fieldInput.setValue("");
				
				codigo = aContexts.map(
					function(oContext) {
						return oContext.getObject().Codcliente;
					}
				);
				
				nome = aContexts.map(
					function(oContext) {
						return oContext.getObject().Nome;
					}
				);
				
				this.getView().byId("input-ClienteCodigo").setText(codigo);
				this.getView().byId("input-Clientedescricao").setText(nome);
				
				this._onCombosCliente(codigo);
				this._onPreencherCombos();
				
		},
		
		onCalcular: function(oEvent){
			this._processarOV(oEvent,"S");
		},
		
		onFinalizar: function(oEvent){
			this._processarOV(oEvent,"C");
		},
		
		_processarOV: function(sEvent,sTipoExecucao){
			
			var that = this;
			
			var oModel = this.getView().getModel();
			var oTable = this.byId("List").getBinding("items"); 
			var m       = oTable.getModel();
			var data    = m.getProperty("/cartEntriesPedidos");
			var aSalesOrderItemSetNavig = [];
			var oDataOV = {};
			
			for ( var property1 in data) {
			 	aSalesOrderItemSetNavig.push({
					Item          : "",
					Ordem		  : "",
					Material	  : data[property1].Material,
					Quantidade	  : data[property1].Qtd,
					UnidadeMedida : data[property1].Unidade,
					Centro	      : data[property1].Centro
				});
			 	
			}
			
			var sDtDesejada;
			
			if( this.byId("input-DtDEntrega").getValue() !== ""){
				var sDtDesejadaSplit = this.byId("input-DtDEntrega").getValue().split("/");
				sDtDesejada = sDtDesejadaSplit[2]+"-"+sDtDesejadaSplit[1]+"-"+sDtDesejadaSplit[0];
				sDtDesejada = new Date(sDtDesejada);
			}
			
			//cart.addToCart(null, null, null);
			
			oDataOV = {
			    	"Ordem"            : "",
			    	"TipoOperacao"	   : this.byId("id-ComboTipoOperacao").getSelectedKey(),
			    	"Cliente"          : this.byId("input-ClienteCodigo").getText(),
			    	"TipoExecucao"     : sTipoExecucao,//S:SIMULACAO - C: CRIACAO - A:ALTERACAO
					 "User"			   : "",
					 "CondPagamento"   : this.byId("id-ComboCondPgto").getSelectedKey(),
					 "Frete"		   : "",
					 "Imposto"		   : this.byId("textImposto").getText(),
					 "Canalsetor"	   : this.byId("id-ComboCanal").getSelectedKey(),
					 "Contribuinte"	   : "",
					 "ClienteCobranca" : this.byId("id-ComboCobranca").getSelectedKey(),
					 "ClienteEntrega"  : this.byId("id-ComboEntrega").getSelectedKey(),
					 "EscritorioVendas": this.byId("id-ComboEscritorio").getSelectedKey(),
					 "Transporte"	   : "",
					 "Lifnr"		   : "",
					 "DescTransp"	   : "",
					 "DataDesEntrega"  : sDtDesejada, 
					 "Obs1"			   : this.byId("input-nfeObs1").getValue(),
					 "Obs2"			   : this.byId("input-nfeObs2").getValue(),
					 "Obs3"			   : this.byId("input-nfeObs3").getValue(),
					 "Obs4"			   : this.byId("input-nfeObs4").getValue(),
					 "Obs5"			   : this.byId("input-carregamObs1").getValue(),
					 "Obs6"			   : this.byId("input-carregamObs2").getValue(),
			    	SalesOrderItemSetNavig : aSalesOrderItemSetNavig
			};
			    
			
			var oModel = this.getView().getModel();
			
			oModel.create("/SalesOrderSet", oDataOV, {
				
				success: function(oCreatedEntry, success, response, odata) {
					
					that.getView().setBusy(false);
					
					var aDataRetorno = [];
					var oCartModel   = that.getView().getModel("cartProducts");
					var oModelData   = oCartModel.getData();
					var oCollectionEntries = $.extend({}, oCartModel.getData()["cartEntriesPedidos"]);
					var cartKey;
					aDataRetorno = success.data.SalesOrderItemSetNavig.results;
					
					for ( var property1 in aDataRetorno) {
						cartKey                   = aDataRetorno[property1].Material+aDataRetorno[property1].Centro;
						var oCartEntry            = oCollectionEntries[cartKey];
						oCartEntry.Item           = aDataRetorno[property1].Item;
						oCartEntry.PrecoTbSemIPI  = aDataRetorno[property1].Preco;
						oCartEntry.PrecoNegComIPI = aDataRetorno[property1].ValZvti;
			            oCartEntry.PrecoNegSemIPI = aDataRetorno[property1].VlTotSipi; 
			            oCartEntry.VlPrecoTarget  = aDataRetorno[property1].PrecoTarget;
						var oListToAddItem = $.extend({}, oModelData["cartEntriesPedidos"]);
						oListToAddItem[cartKey] = $.extend({}, oCartEntry);
						oCartModel.refresh(true);
					}
					
					var hdrMessage       = success.headers["sap-message"];
					var hdrMessageObject = JSON.parse(hdrMessage);
					//var msgSplit         = hdrMessageObject.message.split("-");
					var sMessage         = hdrMessageObject.message;
					MessageToast.show(sMessage);
					
				},
				error: function(oError, response) {
					that.getView().setBusy(false);
					var sMessage = JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sMessage);
					
				}
				
			});

			that.getView().setBusy(true);
			
		}
		

	});

});