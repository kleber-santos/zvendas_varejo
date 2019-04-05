sap.ui.define([
	"arcelor/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/format/DateFormat",
	"sap/m/Dialog",
	"sap/ui/layout/HorizontalLayout",
	"sap/ui/layout/VerticalLayout",
	"sap/m/Text",
	"sap/m/TextArea",
	"sap/m/Button",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/m/Popover",
	"arcelor/model/cart"
], function(BaseController, JSONModel, Filter, FilterOperator, DateFormat, Dialog, HorizontalLayout, VerticalLayout, Text, TextArea, 
		    Button, MessageToast, MessageBox, Popover, cart) {
	"use strict";
	
	var aDataItensCarrinho = [];
	
	return BaseController.extend("arcelor.controller.Produtos", {
	
		// onInit: function() {
		// },
		
		onSearch: function(oEvent) {
			
			var sQuery = oEvent.getParameter("query");
			this._searchProdutos(sQuery, "S");
		},
		
		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @private
		 */
		_applySearch: function(oTableSearchState) {
			var oViewModel = this.getModel("worklistView");
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
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onPress: function(oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		},
		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function(oItem) {
			this.getRouter().navTo("produtosdetalhe", {
				Id: oItem.getBindingContext().getProperty("Codproduto")
			});
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
			var oSearchField = this.getView().byId("searchField").getValue();
			var oSearchField1 = this.getView().byId("searchField1").getValue();  
			var searchField = '';
			
			if (tipo == 'S'){
			 searchField = query;
			}else{
				if (oSearchField != ''){
					searchField = oSearchField; 
				}else if (oSearchField1 != ''){
					searchField = oSearchField1;
				}
			}
			
			var filters = [];
			var filter = '', filter1 = '', filter2 = '', filter3 = '', filter4 = '';
			
			if (tipo == "G"){
				
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
			//var listImagem = this.getView().byId("ListImagem");
			//var bindingImagem = listImagem.getBinding("items");
			//bindingImagem.filter(filters);
			
			if( (tipo == 'G') || (tipo == 'S' && grpMercadoria == '') ){
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
		
		_onBindingChange: function(oEvent) {
			if (!this.getView.getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
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
		},
		
		onAddCarrinho: function(oEvent){
			
			var oEntry = oEvent.getSource().getBindingContext().getObject();
			
			var oCartModel = this.getView().getModel("cartProducts");
			var that = this;
			
			var filters = [];
			var filter  = "";
			var filter1 = "";
			
			filter = new sap.ui.model.Filter("Codconsulta", sap.ui.model.FilterOperator.EQ, "CU;UN");
			filter1 = new sap.ui.model.Filter("Material"  , sap.ui.model.FilterOperator.EQ, oEntry.Codproduto);
			filters.push(filter, filter1);
			var list = this.getView().byId("input-DM_DadoMestreOVSet");
			var binding = list.getBinding("items");
			binding.filter(filters);
			
			var aDataComboMedida   = [];
			var aDataComboCentro   = [];
			
			var dialog = new Dialog({
				title: 'Adicionar ao Carrinho',
				type: 'Message',
				content: [
					new HorizontalLayout({
						content: [
							new VerticalLayout({
								width: '120px',
								content: [
									new Text({ text: 'Quantidade: ' })
								]
							}),
							new VerticalLayout({
								content: [
									 new sap.m.Input('incluirQtd',{
										width: '100%',
										Text : "Quantidade",
										liveChange : function(oEvent){
											var value = oEvent.getParameter("value");
											var valueState = isNaN(value) ? "Error" : value <= 0 ? "Error" : "Success";
											oEvent.getSource().setValueState(valueState);
											
											if( ( (!$.isNumeric(value) || value <= 0) && value !== "") || value === ""  ){
												sap.ui.getCore().byId("btnQtdCarrinho").setEnabled(false);
											}else{
												sap.ui.getCore().byId("btnQtdCarrinho").setEnabled(true);
											}
									     }
									}),
									 new sap.m.ComboBox({
	                        			id : 'input-comboMedida',
	                        			Text : 'Medida',
	                        			width : "100%",
	                        			placeholder:"Medida",
	                        			showSecondaryValues :  true,
	                        			loadItems: function(oEvent){
	                        				
	                        				var table = that.getView().byId("input-DM_DadoMestreOVSet");
											var rowItems = table.getItems();
											
											aDataComboMedida = [];
											aDataComboCentro = [];
											
											for (var i = 0; i < rowItems.length; i++) {
												var item = rowItems[i];
												var Cells = item.getCells();
												
												var Codconsulta = Cells[0].getValue();
												var Coddadomestre = Cells[1].getValue();
												var Textodadomestre = Cells[2].getValue();
												
												if (Codconsulta === "UN") {
													aDataComboMedida.push({
														Codconsulta: Codconsulta,
														Coddadomestre: Coddadomestre,
														Textodadomestre: Textodadomestre
													});
												}
												
											}
	                        				
	                        				var oModelComboMedida = new sap.ui.model.json.JSONModel();
											 	oModelComboMedida.setSizeLimit(5000);
											 	oModelComboMedida.setData({
											 		modelDataComboMedida: aDataComboMedida
												});
											oEvent.getSource().setModel(oModelComboMedida);
	                        			},
	                        			items : {
	                            			path : "/modelDataComboMedida",
	                            			template : new sap.ui.core.ListItem({
	                                    		text : "{Coddadomestre}",
	                                    		key : "{Codconsulta}",
	                                    		additionalText: "{Textodadomestre}"
	                            			})
	                        			}
	            					}),
	            					new sap.m.ComboBox({
	                        			id : 'input-comboCentro',
	                        			width : "100%",
	                        			placeholder:"Centro",
	                        			showSecondaryValues :  true,
	                        			loadItems: function(oEvent){
	                        				
	                        				var table = that.getView().byId("input-DM_DadoMestreOVSet");
											var rowItems = table.getItems();
											
											aDataComboMedida = [];
											aDataComboCentro = [];
											
											for (var i = 0; i < rowItems.length; i++) {
												var item = rowItems[i];
												var Cells = item.getCells();
												
												var Codconsulta = Cells[0].getValue();
												var Coddadomestre = Cells[1].getValue();
												var Textodadomestre = Cells[2].getValue();
												
												if (Codconsulta === "CU") {
													aDataComboCentro.push({
														Codconsulta: Codconsulta,
														Coddadomestre: Coddadomestre,
														Textodadomestre: Textodadomestre
													});
												}
												
											}
	                        				
	                        				var oModelComboCentro = new sap.ui.model.json.JSONModel();
											 	oModelComboCentro.setSizeLimit(5000);
											 	oModelComboCentro.setData({
											 		modelDataComboCentro: aDataComboCentro
												});
											oEvent.getSource().setModel(oModelComboCentro);
	                        			},
	                        			items : {
	                            			path : "/modelDataComboCentro",
	                            			template : new sap.ui.core.ListItem({
	                                    		text : "{Coddadomestre}",
	                                    		key : "{Codconsulta}",
	                                    		additionalText: "{Textodadomestre}"
	                            			})
	                        			}
	            					})
									
								]
							})
						]
					})
				],
				beginButton: new Button('btnQtdCarrinho',{ 
					
					enabled: false,
					text: 'Incluir',
					icon: 'sap-icon://cart',
					press: function (oEvent) {
						
						var oView = that.getView(); 
						var oData = that.getView().getModel();
						var oCollectionEntries = $.extend({}, oCartModel.getData()["cartEntries"]);
						
						var centro = sap.ui.getCore().getElementById("input-comboCentro").getValue();
						var medida = sap.ui.getCore().getElementById("input-comboMedida").getValue();
						
						var sChave = oEntry.Codproduto+centro;
						var oCartEntry =  oCollectionEntries[sChave];
					
						if (oCartEntry !== undefined){
							//if (oCartEntry.Item === oEntry.Codproduto && oCartEntry.Centro === oEntry.Loja){
								MessageBox.error("Produto já incluído no carrinho.", {
									styleClass: "sapUiSizeCompact"
								});
							 	return;
							//}else{
							//	console.log("teste");
							//}
						}
						
						var onError = function(odata, response) {
							oView.setBusy(false);
							console.log("Error");
						};
						
						var onSuccess = function(odata) {
							oView.setBusy(false);
							
							aDataItensCarrinho = [];
							
							aDataItensCarrinho.push({
			                    Item           : "",
			                    Material       : oEntry.Codproduto,
			                    Descricao      : oEntry.Descrprod,
			                    Estque         : oEntry.Estoque,
			                    Qtd            : sap.ui.getCore().byId("incluirQtd").getValue(),
			                    Unidade        : oEntry.Undmedida,
			                    PrecoTbSemIPI  : odata.Preco, 
			                    PrecoNegComIPI : "",
			                    PrecoNegSemIPI : "",
			                    DescPercentual : "",
			                    ValorTotItem   : sap.ui.getCore().byId("incluirQtd").getValue() * odata.Preco, 
			                    PrecoTarget    : "",
			                    ValorST        : "",
			                    Centro         : sap.ui.getCore().getElementById("input-comboCentro").getValue(),
			                    Frete          : "",
			                    ItemPedCli     : ""
			                });
		                
							cart.addToCart(null, aDataItensCarrinho[0], oCartModel);
							
							var totalCarrinho = parseInt( sap.ui.getCore().byId("__component0---produtos--TotalCarrinho").getText() ); 
							sap.ui.getCore().byId("__component0---produtos--TotalCarrinho").setText(totalCarrinho+1);
					        
							MessageBox.success("Um novo item foi adicionado ao seu carrinho de compras. ", {
								styleClass: "sapUiSizeCompact"
							}),
							dialog.close();

						};
						
						var sPath = "/CalculaItemCarrinhoSet(Item='',Material='"+oEntry.Codproduto+"',Unidade='"+medida+
						            "',Quantidade="+sap.ui.getCore().byId("incluirQtd").getValue()+",Centro='"+centro+"')";
						
						oData.read(sPath, { success: onSuccess,	error: onError });
						
						oView.setBusy(true);
					}
				}),
				endButton: new Button({
					text: 'Cancelar',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
 
			dialog.open();
			
			
			
		
		},
		
		handleUserNamePress: function (oEvent) {
			var popover = new Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content:[
					new Button({
						text: 'Feedback',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Help',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Logout',
						type: sap.m.ButtonType.Transparent,
						press: function () {
							window.close();
						}
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');
 
			popover.openBy(oEvent.getSource());
		},
		
		onVisualizarCarrinho: function(oEvent){
			
			 this.getRouter().navTo("itenscarrinho", {
			     Id : 1
			 }, true);
			
			// this.getRouter().navTo("produtosdetalhe", {
			// 	Id: oItem.getBindingContext().getProperty("Codproduto")
			// });
			
		}
	
	});
});