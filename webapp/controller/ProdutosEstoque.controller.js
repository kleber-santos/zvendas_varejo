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

	return BaseController.extend("arcelor.controller.ProdutosEstoque", {
	//return VendasVarejoTela.extend("arcelor.controller.ProdutosEstoque", {	

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf arcelor.view.ProdutosEstoque
		 */
		onInit: function() {
		 	var oRouter = this.getRouter();
			oRouter.getRoute("produtosestoque").attachMatched(this._onRouterMatched, this);
		},
	
		onSearch: function(oEvent) {
		 	var sQuery = oEvent.getParameter("query");
			this._searchProdutos(sQuery,'S');
		},
		
		onNavBack : function(){
			this.getOwnerComponent().getRouter().navTo("ProdutosDetalhe", null, true);
		},
		
		_searchProdutos: function(query, tipo) {
			
			//Filtro Categoria
		    var oComboBoxCategoria = this.getView().byId("combo1");
		    var comboboxItems = oComboBoxCategoria.getSelectedKeys();
		    
		    //Loja
		    var oComboBox = this.getView().byId("combo2");
			var loja = oComboBox.getSelectedKey();
			
			//Grupo Mercadoria
			var oText = this.getView().byId("labelGrupoMercadoria");
			var grpMercadoria = oText.getText(); 
			
			//Searchfield
			var oSearchField  = this.getView().byId("searchField").getValue();
			var oSearchField1 = this.getView().byId("searchField1").getValue();  
			var searchField = '';
			
			if (tipo == 'S')
			 searchField = query;
			else{
				if (oSearchField != '')
					searchField = oSearchField; 
				else if (oSearchField1 != '')
					searchField = oSearchField1;
			}
			
			var filters = [];
			var filter = '', filter1 = '', filter2 = '', filter3 = '', filter4 = '';
			
			if (tipo == 'I'){
				
				if ($.isNumeric(query))
				  filter = new sap.ui.model.Filter("Codproduto", sap.ui.model.FilterOperator.Contains, query);
				else  
				 filter = new sap.ui.model.Filter("Texto", sap.ui.model.FilterOperator.Contains, query);
			
				
				filters.push(filter);
				
			}else if(tipo == "G"){
				
				filter = new sap.ui.model.Filter("Grpmercmacro", sap.ui.model.FilterOperator.Contains, query);
				
				if (searchField != '') {
					if ($.isNumeric(searchField))
						filter1 = new sap.ui.model.Filter("Codproduto", sap.ui.model.FilterOperator.EQ, searchField);
					else
						filter1 = new sap.ui.model.Filter("Texto", sap.ui.model.FilterOperator.EQ, searchField);  
				}
				
				if(filter != '' && filter1 != '')
					filters.push(filter,filter1);
				else if(filter != '' && filter1 == '')
					filters.push(filter);
				
			}else if(tipo == 'L'){
				
				if (loja != ''){
			
					filter1 = new sap.ui.model.Filter("Loja", sap.ui.model.FilterOperator.EQ, loja);
					
					if (grpMercadoria != '')
						filter2 = new sap.ui.model.Filter("Grpmercmacro", sap.ui.model.FilterOperator.EQ, grpMercadoria);
						
					if (searchField != '') {
						if ($.isNumeric(searchField))
							filter3 = new sap.ui.model.Filter("Codproduto", sap.ui.model.FilterOperator.EQ, searchField);
						else
							filter3 = new sap.ui.model.Filter("Texto", sap.ui.model.FilterOperator.EQ, searchField);  
					}
					
					if(comboboxItems.length != ''){
					
						 filter4 = this._filterCategoria(comboboxItems);
					}
					
					if(filter2 != '' && filter3 == '' && filter4 == '')
						filters.push(filter1,filter2);
					else if(filter2 != '' && filter3 != '' && filter4 == '')
						filters.push(filter1,filter2,filter3);
					else if(filter2 != '' && filter3 != '' && filter4 != '') 
						filters.push(filter1,filter2,filter3,filter4);
					else if(filter2 != '' && filter4 != '') //Grupo Macro, Grupo Mercadoria e Loja/			
						filters.push(filter1,filter2,filter4);
					else if(filter1 != '' && filter3 != '') //Grupo Macro, Grupo Mercadoria e Loja/			
						filters.push(filter1,filter3);	
					else if(filter1 == '' && filter2 == '' && filter3 != '' && field4 == '') 
						filters.push(filter2);	
					else 
						filters.push(filter1);
						
				}else{
					
					if (grpMercadoria != '')
						filter2 = new sap.ui.model.Filter("Grpmercmacro", sap.ui.model.FilterOperator.EQ, grpMercadoria);
				
					if (searchField != '') {
						if ($.isNumeric(searchField))
							filter3 = new sap.ui.model.Filter("Codproduto", sap.ui.model.FilterOperator.EQ, searchField);
						else
							filter3 = new sap.ui.model.Filter("Texto", sap.ui.model.FilterOperator.EQ, searchField);  
					}
					
					if(comboboxItems.length != ''){
						 filter4 = this._filterCategoria(comboboxItems);
					}
					
					if(filter2 != '' && filter3 == '' && filter4 == '')
						filters.push(filter2);
					else if(filter2 != '' && filter3 != '' && filter4 == '')
						filters.push(filter2,filter3);
					else if(filter2 != '' && filter3 != '' && filter4 != '') 
						filters.push(filter3,filter4);
					else if(filter2 != '' && filter4 != '') //Grupo Macro, Grupo Mercadoria e Loja/			
						filters.push(filter2,filter4);
					else if(filter2 == '' && filter3 != '' && filter4 == '') //Grupo Macro, Grupo Mercadoria e Loja/			
						filters.push(filter3);						
					else if(filter2 == '' && filter3 != '' && filter4 != '') //Grupo Macro, Grupo Mercadoria e Loja/			
						filters.push(filter3,filter4);						
					else 
						filters.push(filter2);
				}
				
			}else if(tipo == "C"){
				
				//Filtro Categoria 
				if(comboboxItems.length != ''){
					
					filter = this._filterCategoria(comboboxItems);
					
					if (grpMercadoria != '')
					 filter1 = new sap.ui.model.Filter("Grpmercmacro", sap.ui.model.FilterOperator.EQ, grpMercadoria);
					
					if (searchField != '') {
						if ($.isNumeric(searchField))
							filter2 = new sap.ui.model.Filter("Codproduto", sap.ui.model.FilterOperator.EQ, searchField);
						else
							filter2 = new sap.ui.model.Filter("Texto", sap.ui.model.FilterOperator.EQ, searchField);  
					}
					
					if (filter1 != '' && filter2 == '')
						filters.push(filter,filter1);
					else if (filter1 != '' && filter2 != '')
						filters.push(filter,filter1,filter2);
					else if (filter != '' && filter2 != '')
						filters.push(filter,filter2);
					else
						filters.push(filter);
					
				}else{
					if (grpMercadoria != ''){
					 filter1 = new sap.ui.model.Filter("Grpmercmacro", sap.ui.model.FilterOperator.EQ, grpMercadoria);
					} 
					
					if (searchField != '') {
						if ($.isNumeric(searchField))
							filter2 = new sap.ui.model.Filter("Codproduto", sap.ui.model.FilterOperator.EQ, searchField);
						else
							filter2 = new sap.ui.model.Filter("Texto", sap.ui.model.FilterOperator.EQ, searchField);  
					}
					
					if (filter1 != '' && filter2 == '')
						filters.push(filter1);
					else if (filter1 != '' && filter2 != '')
						filters.push(filter1,filter2);
					else
						filters.push(filter);
				}
				
			}else if(tipo == "S") {
				
				if (searchField != '') {
					if ($.isNumeric(searchField))
						filter = new sap.ui.model.Filter("Codproduto", sap.ui.model.FilterOperator.EQ, searchField);
					else
						filter = new sap.ui.model.Filter("Texto", sap.ui.model.FilterOperator.EQ, searchField);  
				}
					
				//Filtro Categoria 
				filter1 = this._filterCategoria(comboboxItems);
				
				if (grpMercadoria != '')
					 filter2 = new sap.ui.model.Filter("Grpmercmacro", sap.ui.model.FilterOperator.EQ, grpMercadoria);
				
				if (loja != '')
					filter3 = new sap.ui.model.Filter("Loja", sap.ui.model.FilterOperator.EQ, loja);
					
				if (filter != '' && filter1 != '' && filter2 == '' && filter3 == '')
					filters.push(filter,filter1);
				else if (filter != '' && filter1 != '' && filter2 != '' && filter3 == '')
					filters.push(filter,filter1,filter2);
				else if (filter != '' && filter1 != '' && filter2 != '' && filter3 != '')	
					filters.push(filter,filter1,filter2,filter3);
				else if (filter != '' && filter1 == '' && filter2 != '' && filter3 == '')
					filters.push(filter,filter2);
				else if (filter != '' && filter1 == '' && filter2 == '' && filter3 != '')	
					filters.push(filter,filter3);
				else if (filter != '' && filter1 == '' && filter2 != '' && filter3 != '')	
					filters.push(filter,filter2,filter3);	
				else if(filter != '')
					filters.push(filter);	
				else if(filter == '')
						if (filter1 != '' && filter2 == '' && filter3 == '')
							filters.push(filter1);
						else if (filter1 != '' && filter2 != '' && filter3 == '')
							filters.push(filter1,filter2);
						else if (filter1 != '' && filter2 != '' && filter3 != '')	
							filters.push(filter1,filter2,filter3);
						else if (filter1 == '' && filter2 != '' && filter3 == '')	
							filters.push(filter2);
						else if (filter1 == '' && filter2 != '' && filter3 != '')	
							filters.push(filter2,filter3);
				}
			
			this._carregarDados(filters,tipo);
			
		},
		
		_onLabelGrupoMacro : function(filtro,label){
			var oText = this.getView().byId("labelGrupoMercadoria");
			oText.setText(filtro); 
			
			var oLabel = this.getView().byId("label1");
			oLabel.setText("Grupo Macro: " + this.getView().byId("__label"+label).getText()); 
			
			var oLabel1 = this.getView().byId("label30");
			oLabel1.setText("Grupo Macro: " + this.getView().byId("__label"+label).getText());
		},
		
		/**
		 *@memberOf arcelor.controller
		 */
		_filterCategoria: function(comboboxItems){
		  
		  var filter = '', query = '';
		   
		    	if(comboboxItems.length != ''){
			
					 for (var i = 0; i < comboboxItems.length; i++) {
					 	query += "" + comboboxItems[i].toString() + "";
					 	if (i != comboboxItems.length-1) {
					 		query += ",";
					 	}
					 }
				
					filter = new sap.ui.model.Filter("Grupomat", sap.ui.model.FilterOperator.Contains, query);
				}
		  
		  return filter;	
		},
		
		/**
		 *@memberOf arcelor.controller
		 */
		_carregarDados: function(filters,tipo){
			
			//Grupo Mercadoria
			var oText = this.getView().byId("labelGrupoMercadoria");
			var grpMercadoria = oText.getText();
			
			//update list binding
			//Grid Table
			var list = this.getView().byId("List");
			var binding = list.getBinding("items");
			binding.filter(filters);
			
			//Image table
			// var listImagem = this.getView().byId("ListImagem");
			// var bindingImagem = listImagem.getBinding("items");
			// bindingImagem.filter(filters);
			
			if( (tipo == 'G') || (tipo == 'S' && grpMercadoria == '') || (tipo == 'I') ){
				//Filtro Categoria
				var combo1 = this.getView().byId("combo1");
				var bindingCombo1 = combo1.getBinding("items");
				bindingCombo1.filter(filters);
					
				//Loja	
				var combo2 = this.getView().byId("combo2");
				var bindingCombo2 = combo2.getBinding("items");
				bindingCombo2.filter(filters);
			}
			
		},
		
		 onLojaFilter: function(oEvent){
		 	this._searchProdutos('','L');
	    },
	    
		onCategoriaFilter: function(oEvent) {
			this._searchProdutos('','C');
		},

		_onRouterMatched: function(oEvent) {
			
			 var oArgs, oView;
			 var oSearchField = this.getView().byId("searchField");
			 var oSearchField1 = this.getView().byId("searchField1");
			 
			 oArgs = oEvent.getParameter("arguments");
			 
			 oSearchField.setValue(parseInt(oArgs.Id));
			 oSearchField1.setValue(parseInt(oArgs.Id));
			 
			 //INICIAL
			 this._searchProdutos(oArgs.Id,'I');
			
		},
		
		_onBindingChange: function(oEvent) {
			if (!this.getView.getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		
		/**
		 *@memberOf arcelor.controller.Produtos
		 */
		onGrupoMacro1: function(evt) {
			var filtro = "000005BBA";
			this._searchProdutos(filtro, "G");
			this._onLabelGrupoMacro(filtro,6);
		},
		
		/**
		 *@memberOf arcelor.controller.Produtos
		 */
		onGrupoMacro2: function() {
			var filtro = "000004INDSTRIA";
			this._searchProdutos(filtro, "G");
			this._onLabelGrupoMacro(filtro,7);
		},
		
		/**
		 *@memberOf arcelor.controller.Produtos
		 */
		onGrupoMacro3: function() {
			var filtro = "000003CONSTRUOCIVIL";
			this._searchProdutos(filtro, "G");
			this._onLabelGrupoMacro(filtro,8);
		},
		
		/**
		 *@memberOf arcelor.controller.Produtos
		 */
		onGrupoMacro4: function() {
			var filtro = "000006PLANOSEDERIVAD";
			this._searchProdutos(filtro, "G");
			this._onLabelGrupoMacro(filtro,9);
		},
		
		/**
		 *@memberOf arcelor.controller.Produtos
		 */
		onGrupoMacro5: function() {
			var filtro = "000044TUBOS";
			this._searchProdutos(filtro, "G");
			this._onLabelGrupoMacro(filtro,20);
		},
		
		/**
		 *@memberOf arcelor.controller.Produtos
		 */
		onGrupoMacro6: function() {
			var filtro = "000426AOSINOX";
			this._searchProdutos(filtro, "G");
			this._onLabelGrupoMacro(filtro,21);
		},
		
		/**
		 *@memberOf arcelor.controller.Produtos
		 */
		onGrupoMacro7: function() {
			var filtro = "000424LINHACOMPLEMEN";
			this._searchProdutos(filtro, "G");
			this._onLabelGrupoMacro(filtro,22);
		},
		
		/**
		 *@memberOf arcelor.controller.Produtos
		 */
		onGrupoMacro8: function() {
			var filtro = "000002ACINDAR";
			this._searchProdutos(filtro, "G");
			this._onLabelGrupoMacro(filtro,23);
		},
		
		/**
		 *@memberOf arcelor.controller.Produtos
		 */
		onGrupoMacro9: function() {
			var filtro = "000480PERFILIMPORTAD";
			this._searchProdutos(filtro, "G");
			this._onLabelGrupoMacro(filtro,24);
		},
		
		/**
		 *@memberOf arcelor.controller.Produtos
		 */
		onGrupoMacro10: function() {
			var filtro = "000487STEELDECK";
			this._searchProdutos(filtro, "G");
			this._onLabelGrupoMacro(filtro,25);
		},
	    
	    /**
		 *@memberOf arcelor.controller.Produtos
		 */
		onChangeImageGrid: function(oItem) {
			//This code was generated by the layout editor.
		    var oComboBox = this.getView().byId("imagemGrid");
			var valor = oComboBox.getSelectedKey();
			
			var tabelaGrid   = this.getView().byId("List");
			//var tabelaImagem = this.getView().byId("ListImagem");
			
			if (valor == 'Imagem'){
				tabelaGrid.setVisible(false);
				//tabelaImagem.setVisible(true);
			}else{
				tabelaGrid.setVisible(true);
				//tabelaImagem.setVisible(false);
			}
		}
		
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf arcelor.view.ProdutosEstoque
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf arcelor.view.ProdutosEstoque
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf arcelor.view.ProdutosEstoque
		 */
		//	onExit: function() {
		//
		//	}

	});

});