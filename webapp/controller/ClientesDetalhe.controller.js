sap.ui.define([
	"arcelor/controller/BaseController",
	//"arcelor/controller/VendasVarejoTela",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/GroupHeaderListItem",
	"sap/ui/Device",
	"arcelor/model/formatter",
	"jquery.sap.global",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, Filter, FilterOperator, History, GroupHeaderListItem, Device, formatter, jQuery, MessageBox,
	MessageToast) {
	"use strict";

	var aDataContatos      = [];
	var aDataRecebedorMerc = [];
	var aDataCobrancaMerc  = [];
	var aDataCanalDist     = []; // CD
	var aDataCargaDados    = 0;

	return BaseController.extend("arcelor.controller.ClientesDetalhe", {
	//return VendasVarejoTela.extend("arcelor.controller.ClientesDetalhe", {

		formatter: formatter,

		onInit: function() {

			var that = this;

			var oRouter = this.getRouter();

			var myModel = this.getOwnerComponent().getModel();
			myModel.setSizeLimit(5000);

			this._oResourceBundle = this.getResourceBundle();
			this._oODataModel = this.getOwnerComponent().getModel();

			//	oRouter.getRoute("clientesdetalhe").attachMatched(this._onFillMasterData,this);
			oRouter.getRoute("clientesdetalhe").attachMatched(this._onRouterMatched, this);

			this._oViewModel = new JSONModel({
				enableCreate: false,
				delay: 0,
				busy: false,
				mode: "create",
				viewTitle: ""
			});
		},

		onbeforeRendering: function() {

		},

		onAfterRendering: function() {

		},

		_readListMasterData: function() {

			var aDataOrgVendas   = []; // OV
			//var aDataCanalDist = []; // CD
			var aDataSetorAtiv   = []; // SA
			var aDataClassific   = []; // CL
			var aDataCnae        = []; // CN
			var aDataUf          = []; // UF
			var aDataSetorInd    = []; // SI

			if (aDataCargaDados === 0) {

				aDataCargaDados = 1;
				var table = this.getView().byId("input-dadosMestres");
				var rowItems = table.getItems(); //getSelectedItems();
				for (var i = 0; i < rowItems.length; i++) {
					var item = rowItems[i];

					//var context = item.getBindingContext();
					//var obj = context.getProperty(null, context);
					//alert(obj.Name);
					// Get Cells from the selcted column

					var Cells = item.getCells();
					// Get ID and Name
					var Codconsulta = Cells[0].getValue();
					var Coddadomestre = Cells[1].getValue();
					var Textodadomestre = Cells[2].getValue();

					if (Codconsulta === "OV") {
						aDataOrgVendas.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

					//if(Codconsulta === "CD"){
					//	   aDataCanalDist.push({Codconsulta    : Codconsulta,
					//              		Coddadomestre  : Coddadomestre,
					// 				Textodadomestre: Textodadomestre
					// });
					//}

					if (Codconsulta === "SA") {
						aDataSetorAtiv.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

					if (Codconsulta === "CL") {
						aDataClassific.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

					if (Codconsulta === "CN") {
						aDataCnae.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

					if (Codconsulta === "UF") {
						aDataUf.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

					if (Codconsulta === "SI") {
						aDataSetorInd.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

				}

				var oModelOrgVendas = new sap.ui.model.json.JSONModel();
				oModelOrgVendas.setSizeLimit(5000);
				oModelOrgVendas.setData({
					modelDataOrgVendas: aDataOrgVendas
				});
				var oDataOrgVendas = this.getView().byId("input-multiComboxOrganizacao");
				oDataOrgVendas.setModel(oModelOrgVendas);

				//var oModelCanalDist = new sap.ui.model.json.JSONModel();
				//oModelCanalDist.setSizeLimit(5000);
				//oModelCanalDist.setData({modelDataCanalDist : aDataCanalDist});
				//var oDataCanalDist = this.getView().byId("input-multiComboxCanal");
				//oDataCanalDist.setModel(oModelCanalDist);

				var oModelSetorAtiv = new sap.ui.model.json.JSONModel();
				oModelSetorAtiv.setSizeLimit(5000);
				oModelSetorAtiv.setData({
					modelDataSetorAtiv: aDataSetorAtiv
				});
				var oDataSetorAtiv = this.getView().byId("input-multiComboxSetorAtividade");
				oDataSetorAtiv.setModel(oModelSetorAtiv);

				var oModelClassific = new sap.ui.model.json.JSONModel();
				oModelClassific.setSizeLimit(5000);
				oModelClassific.setData({
					modelDataClassific: aDataClassific
				});
				var oDataClassific = this.getView().byId("input-Kukla");
				oDataClassific.setModel(oModelClassific);

				var oModelCnae = new sap.ui.model.json.JSONModel();
				oModelCnae.setSizeLimit(5000);
				oModelCnae.setData({
					modelDataCnae: aDataCnae
				});
				var oDataCnae = this.getView().byId("input-Cnae");
				oDataCnae.setModel(oModelCnae);

				var oModelUf = new sap.ui.model.json.JSONModel();
				oModelUf.setSizeLimit(5000);
				oModelUf.setData({
					modelDataUf: aDataUf
				});
				var oDataUf = this.getView().byId("input-Regiao");
				oDataUf.setModel(oModelUf);

				var oModelSetorInd = new sap.ui.model.json.JSONModel();
				oModelSetorInd.setSizeLimit(5000);
				oModelSetorInd.setData({
					modelDataSetorInd: aDataSetorInd
				});
				var oDataSetorInd = this.getView().byId("input-SetorInd");
				oDataSetorInd.setModel(oModelSetorInd);
			}

		},

		_onFillMasterData: function(oEvent) {

			var filters = [];
			var filter = "";
			var filter1 = "";

			var thisView = this;

			var codCliente = "";

			jQuery.sap.delayedCall(2000, this, function() {
				//thisView._readListMasterData();
				codCliente = thisView.byId("input-Codcliente").getValue();

				filter = new sap.ui.model.Filter("Codconsulta", sap.ui.model.FilterOperator.EQ, "OV;CD;SA;CL;CN;UF;SI");
				filter1 = new sap.ui.model.Filter("Coddadomestre", sap.ui.model.FilterOperator.EQ, codCliente);

				filters.push(filter, filter1);

				var list = this.getView().byId("input-dadosMestres");
				var binding = list.getBinding("items");

				binding.filter(filters);

			});
		},

		_onRouterMatched: function(oEvent) {

			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();

			var thisView = this;

			oView = this.getView();

			thisView.byId("input-Codcliente").setValue(oArgs.Id);

			// consulta de dados mestres
			var filters = [];
			var filter = "";
			var filter1 = "";

			//var codCliente = "";

			//jQuery.sap.delayedCall(2000, this, function() {
			//thisView._readListMasterData();
			//codCliente = thisView.byId("input-Codcliente").getValue();

			//Todos os dados mestres
			filter = new sap.ui.model.Filter("Codconsulta", sap.ui.model.FilterOperator.EQ, "OV;SA;CL;CN;UF;SI");
			filter1 = new sap.ui.model.Filter("Coddadomestre", sap.ui.model.FilterOperator.EQ, oArgs.Id);

			filters.push(filter, filter1);

			var list = this.getView().byId("input-dadosMestres");
			var binding = list.getBinding("items");

			binding.filter(filters);
			//Fim todos os dados mestres

			//Canal de Distribuicao
			filter = "";
			filter1 = "";
			filters = [];

			filter = new sap.ui.model.Filter("Codconsulta", sap.ui.model.FilterOperator.EQ, "CD");
			filter1 = new sap.ui.model.Filter("Coddadomestre", sap.ui.model.FilterOperator.EQ, oArgs.Id);

			filters.push(filter, filter1);

			var listCanal = this.getView().byId("input-dadosMestresCanal");
			var bindingCanal = listCanal.getBinding("items");

			bindingCanal.filter(filters);
			//Fim Canal de Distribuicao
			//});
			// Fim dados mestres

			var oData = this.getView().getModel();

			var onError = function(odata, response) {
				oView.setBusy(false);
				MessageToast.show("Cliente não cadastrado!");
			};

			var onSuccess = function(odata) {

				oView.setBusy(false);

				var cpf = "";
				var cnpj = "";

				cpf = thisView.utilFormatterCPFCNPJ(odata.Cpf, "F");

				cnpj = thisView.utilFormatterCPFCNPJ(odata.Cnpj, "J");

				if (cpf !== "") {
					thisView._fieldsDisableEnable("SearchPF");
					thisView.getView().byId("label-Cnae").setRequired(false);
				}
				
				thisView.getView().byId("input-tipoClienteSAP").setValue(odata.Tipoclientesap);

				if (cnpj !== "") {
					//Retirado a validação do cliente do tipo Cobrança e entrega
					if (odata.Tipoclientesap !== "J"){
						thisView._fieldsDisableEnable("EditPJENTREGACOBRANCA");	
					}else{
						thisView._fieldsDisableEnable("EditPJ");
					}
					thisView.getView().byId("label-Cnae").setRequired(true);
				}

				jQuery.sap.delayedCall(2000, this, function() {
					thisView._readListMasterData();
				});

				thisView.byId("input-Codcliente").setValue(odata.Codcliente);
				thisView.byId("input-CpfCnpj").setValue(cpf + cnpj);
				thisView.byId("input-endereco").setValue(odata.Endereco);
				thisView.byId("input-numero").setValue(odata.Numero);
				thisView.byId("input-Complemento").setValue(odata.Complemento);
				thisView.byId("input-Bairro").setValue(odata.Bairro);
				thisView.byId("input-Cidade").setValue(odata.Cidade);
				thisView.byId("input-Cep").setValue(odata.Cep);
				thisView.byId("input-Cnae").setValue(odata.Cnae);
				thisView.byId("input-Classifcli").setValue(odata.Classicli);
				thisView.byId("input-nome").setValue(odata.Nome);
				thisView.byId("input-Origem").setValue(odata.Origem);

				thisView.byId("input-Matriz").setValue(odata.Clientematriz);
				thisView.byId("input-Telefone").setValue(odata.Telefone);
				thisView.byId("input-Email").setValue(odata.Email);
				thisView.byId("input-InscricaoEstadual").setValue(odata.Inscrestadual);

				thisView.byId("input-DomicilioFiscal").setSelectedKey(odata.Domiciliofiscal);
				thisView.byId("input-SubstTributaria").setSelectedKey(odata.Gruposubfiscal);

				var dateFormatted = "";
				var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "dd/MM/YYYY"
				});

				if (odata.Dtultcompra !== null) {
					dateFormatted = thisView.utilFormatterDateToBR(odata.Dtultcompra);
					thisView.byId("input-dtultimaCompra").setText(dateFormatted);
				// 	jQuery.sap.require("sap.ui.core.format.DateFormat");
				// 	dateFormatted = oDateFormat.format(new Date(odata.Dtultcompra));
				}else{
					thisView.byId("input-dtultimaCompra").setText("");
				}
				
				thisView.byId("input-UltimaOrdemVenda").setText(odata.Ordultcompra);

				jQuery.sap.require("sap.ui.core.format.NumberFormat");
				var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
					maxFractionDigits: 2,
					groupingEnabled: true,
					groupingSeparator: ".",
					decimalSeparator: ","
				});

				var valorLimiteCredito = oNumberFormat.format(odata.Limitecreditocli);
				var valorLimitecreditocard = oNumberFormat.format(odata.Limitecreditocard);

				thisView.byId("input-LimiteCredito").setText(valorLimiteCredito);
				thisView.byId("input-LimiteCard").setText(valorLimitecreditocard);

				thisView.byId("input-Regiao").setSelectedKey(odata.Regiao);
				thisView.utilSearchCity(odata.Regiao, thisView);

				if (odata.Kukla === !"") {
					thisView.byId("input-Kukla").setSelectedKey(odata.Kukla);
				} else {
					thisView.byId("input-Kukla").setSelectedKey(odata.Classifcli);
				}
				thisView.byId("input-Cnae").setSelectedKey(odata.Cnae);
				thisView.byId("input-SetorInd").setSelectedKey(odata.Setorindustrial);

				thisView.byId("input-RecebedorCodigo").setValue(odata.Recebedormercadoria);
				thisView.byId("input-PagadorCodigo").setValue(odata.Pagador);
				thisView.byId("input-RecebedorFaturaCodigo").setValue(odata.Recebedorfatura);

				thisView.byId("input-RecebedorMercadoriaNome").setValue(odata.Nomerecebedormercadoria);
				thisView.byId("input-PagadorNome").setValue(odata.Nomepagador);
				thisView.byId("input-RecebedorFaturaNome").setValue(odata.Nomerecebedorfatura);
				thisView.byId("input-Suframa").setValue(odata.Suframa);

				if (odata.Suframa !== "") {

					var sDategui = thisView.utilFormatterDateToBR(odata.Datasuframa);

					//	var sDategui = oDateFormat.format(new Date(odata.Datasuframa));
					//oDateFormat.format(odata.Datasuframa);
					thisView.byId("input-DtSufurama").setValue(sDategui);
				}
				
				//Início Recebedor Mercadoria
				if(odata.Recebedormercadoria !== ""){
					
					var arrayRecebedorMercadoria         = odata.Recebedormercadoria.split(";"); 
					var arrayNomeRecebedorMercadoria     = odata.Nomerecebedormercadoria.split(";");
					var arrayEnderecoRecebedorMercadoria = odata.Enderecorecebedormercadoria.split(";");
					var arrayLocalRecebedorMercadoria    = odata.Localrecebedormercadoria.split(";");
					
					aDataRecebedorMerc = [];
					
					for(var i = 0 ; i < arrayRecebedorMercadoria.length ; i++){
						
						if (arrayRecebedorMercadoria[i] !== ""){	
							aDataRecebedorMerc.push({
								RecebedorMercCodigo   : arrayRecebedorMercadoria[i].trim(),
								RecebedorMercNome     : arrayNomeRecebedorMercadoria[i],
								RecebedorMercEndereco : arrayEnderecoRecebedorMercadoria[i],
								RecebedorMercLocal    : arrayLocalRecebedorMercadoria[i],
								Status  			  : false,
								StatusPesquisa        : false
							});
						}
					}
					
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData({modelDataRecebedorMerc: aDataRecebedorMerc});
							
					var oTableData = thisView.getView().byId("listRecebedorMerc");
							
					oTableData.setModel(oModel);
					
				}
				//Fim Recebedor Mercadoria
				
				//Início Cobranca Mercadoria
				if(odata.Cobranca !== ""){
					
					var arrayCobrancaMercadoria     = odata.Cobranca.split(";"); 
					var arrayNomeCobrancaMercadoria = odata.Nomecobranca.split(";");
					var arrayEnderecoCobrancaMercadoria = odata.Enderecocobranca.split(";");
					var arrayLocalCobrancaMercadoria    = odata.Localcobranca.split(";");
					
					aDataCobrancaMerc = [];
					
					for(var i = 0 ; i < arrayCobrancaMercadoria.length ; i++){
						
						if (arrayCobrancaMercadoria[i] !== ""){	
							aDataCobrancaMerc.push({
								CobrancaMercCodigo   : arrayCobrancaMercadoria[i].trim(),
								CobrancaMercNome     : arrayNomeCobrancaMercadoria[i],
								CobrancaMercEndereco : arrayEnderecoCobrancaMercadoria[i],
								CobrancaMercLocal    : arrayLocalCobrancaMercadoria[i],
								Status  			 : false,
								StatusPesquisa       : false
							});
						}
						
					}
					
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData({modelDataCobrancaMerc: aDataCobrancaMerc});
							
					var oTableData = thisView.getView().byId("listCobrancaMerc");
							
					oTableData.setModel(oModel);
					
				}
				
				thisView.byId("input-CobrancaCodigo").setValue(odata.Cobranca);
				thisView.byId("input-CobrancaNome").setValue(odata.Nomecobranca);

				var arrayOrgvendas_splt  = odata.Orgvendas_splt.split(";");
				var arrayCanaldistr_splt = odata.Canaldistr_splt.split(";");
				var arraySetorativ_splt  = odata.Setorativ_splt.split(";");

				for (var i = 0; i < arrayOrgvendas_splt.length; i++) {
					thisView.byId("input-multiComboxOrganizacao").addSelectedKeys(arrayOrgvendas_splt[i]);
				}
				//Fim Cobranca Mercadoria
				
				//Início Canal de Distribuicao
				var aDataCanalDistNew = [];
				aDataCanalDist = [];

				var oModelCanalDist = new sap.ui.model.json.JSONModel();
				oModelCanalDist.setSizeLimit(5000);
				oModelCanalDist.setData({modelDataCanalDist: aDataCanalDistNew});
				var oDataCanalDist = thisView.byId("input-multiComboxCanal");
				oDataCanalDist.setModel(oModelCanalDist);

				jQuery.sap.delayedCall(2500, this, function() {

					var table = thisView.byId("input-dadosMestresCanal");
					var rowItems = table.getItems();

					for (var i = 0; i < rowItems.length; i++) {
						var item = rowItems[i];
						var Cells = item.getCells();
						// Get ID and Name
						var Codconsulta = Cells[0].getValue();
						var Coddadomestre = Cells[1].getValue();
						var Textodadomestre = Cells[2].getValue();

						aDataCanalDist.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

					for (var i = 0; i < aDataCanalDist.length; i++) {

						for (var j = 0; j < arrayCanaldistr_splt.length; j++) {
							if (aDataCanalDist[i].Coddadomestre === arrayCanaldistr_splt[j]) {
								aDataCanalDistNew.push({
									Codconsulta: aDataCanalDist[i].Codconsulta,
									Coddadomestre: aDataCanalDist[i].Coddadomestre,
									Textodadomestre: aDataCanalDist[i].Textodadomestre
								});
							}
						}

					}

					oModelCanalDist = new sap.ui.model.json.JSONModel();
					oModelCanalDist.setSizeLimit(5000);
					oModelCanalDist.setData({
						modelDataCanalDist: aDataCanalDistNew
					});
					oDataCanalDist = thisView.byId("input-multiComboxCanal");
					oDataCanalDist.setModel(oModelCanalDist);

					for (var i = 0; i < arrayCanaldistr_splt.length; i++) {
						thisView.byId("input-multiComboxCanal").addSelectedKeys(arrayCanaldistr_splt[i]);
					}

				});
				//Fim Canal Distribuicao

				for (var i = 0; i < arraySetorativ_splt.length; i++) {
					thisView.byId("input-multiComboxSetorAtividade").addSelectedKeys(arraySetorativ_splt[i]);
				}
				
				//Inicia Contatos
				var aDataNull = [];
				aDataContatos = aDataNull;
				if ( (odata.Nomecontato_split !== "") || (odata.Sobrenomecontato_split !== "") ) {

					var arrayNomecontato_split      = odata.Nomecontato_split.split(";");
					var arraySobrenomecontato_split = odata.Sobrenomecontato_split.split(";");
					var arrayFonecontato_split      = odata.Fonecontato_split.split(";");
					var arrayEmailcontato_split     = odata.Emailcontato_split.split(";");

					//var aDataNull = [];
					//aDataContatos = aDataNull;
						
						for (var i = 0; i < arraySobrenomecontato_split.length; i++) {

							if ( (arrayNomecontato_split[i] !== "") || (arraySobrenomecontato_split[i] !== "") ){
								
								var sTelefone = "";
								if (arrayFonecontato_split[i] !== "" && arrayFonecontato_split[i] !== undefined){
								  sTelefone = thisView.utilFormatterTelefone(arrayFonecontato_split[i]);
								}
								
								aDataContatos.push({
									Nome         : arrayNomecontato_split[i],
									Sobrenome    : arraySobrenomecontato_split[i],
									Telefone     : sTelefone,
									Email        : arrayEmailcontato_split[i],
									Status       : false,
									Novo         : "",
									StatusCampos : false
								});
							}
							
						}

						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData({modelData: aDataContatos});

						var oTableData = thisView.getView().byId("input-listContatos");
						oTableData.setModel(oModel);
					}
			};

			oView.setBusy(true);
			var sPath = "/ClientesSet(Codcliente='" + oArgs.Id + "',Nome='',Cnpj='',Cpf='',Tipocliente='')";
			oData.read(sPath, {
				success: onSuccess,
				error: onError
			});

		},

		formatDate: function(v) {
			jQuery.sap.require("sap.ui.core.format.DateFormat");
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "dd-MM-YYYY"
			});
			return oDateFormat.format(new Date(v));
		},

		_onBindingChange: function(oEvent) {
			//if (!this.getView.getBindingContext()){
			//	this.getRouter().getTargets().display("notFound");
			//}
		},

		onExit: function() {
			for (var sPropertyName in this._formFragments) {
				if (!this._formFragments.hasOwnProperty(sPropertyName)) {
					return;
				}

				this._formFragments[sPropertyName].destroy();
				this._formFragments[sPropertyName] = null;
			}
		},

		handleValueHelp : function (oEvent) {
			
			var sInputValue, sSearchFiled;
			
			sInputValue = oEvent.getSource().getValue();
			
			//sInputValue = this.utilFormatterCPFCNPJClearSearch(sInputValue);
			
			if ($.isNumeric(sInputValue) && sInputValue.length == 11){
				 sInputValue = this.utilFormatterCPFCNPJClearSearch(sInputValue);
				 sSearchFiled = "Cpf";
			}if ($.isNumeric(sInputValue) && sInputValue.length < 11){
				 sSearchFiled = "Codcliente";
			} else if ($.isNumeric(sInputValue) && sInputValue.length > 11){
				 sInputValue = this.utilFormatterCPFCNPJClearSearch(sInputValue);
				 sSearchFiled = "Cnpj";
			} else if(!$.isNumeric(sInputValue)){
				 sSearchFiled = "Nome";
			}

			this.inputId = oEvent.getSource().getId();
			
			if (this._valueHelpDialog) {   
	            this._valueHelpDialog = null;
			}
				
			// create value help dialog
			this._valueHelpDialog = sap.ui.xmlfragment(
				"arcelor.view.ClientesPesquisaDialog",this
			);
			this.getView().addDependent(this._valueHelpDialog);
			
			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter(
				[new sap.ui.model.Filter(sSearchFiled, sap.ui.model.FilterOperator.Contains, sInputValue)]
			);

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
			
		},

		handleSearchClientes: function(oEvent) {
			//create model filter

			var filters = [];
			var query = oEvent.getParameter("value");
			var query2 = query;
			
			query = this.utilFormatterCPFCNPJClearSearch(query);

			if ((query && query.length > 0) && (query.trim() != '')) {

				var filter;

				if ($.isNumeric(query) && query.length == 11) {
					filter = new sap.ui.model.Filter("Cpf", sap.ui.model.FilterOperator.Contains, query);
				}
				if ($.isNumeric(query) && query.length < 11) {
					filter = new sap.ui.model.Filter("Codcliente", sap.ui.model.FilterOperator.Contains, query);
				} else if ($.isNumeric(query) && query.length > 11) {
					filter = new sap.ui.model.Filter("Cnpj", sap.ui.model.FilterOperator.Contains, query);
				} else if (!$.isNumeric(query)) {
					filter = new sap.ui.model.Filter("Nome", sap.ui.model.FilterOperator.Contains, query2);
				}
				filters.push(filter);
			}

			var binding = oEvent.getSource().getBinding("items");
			binding.filter(filters);

		},

		_handleValueHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				"Name",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpClose: function(evt) {

			var oSelectedItem, fieldInput, aContexts, oModel;
			var bc, pos, codigo, nome, oTable, m, data, property1;
			var codigo, nome;
			var nomeSplit, localidadeSplit, enderecoSplit, localSplit, endereco, local;

			oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				fieldInput = this.getView().byId(this.inputId);
				fieldInput.setValue(oSelectedItem.getDescription());
			}
			evt.getSource().getBinding("items").filter([]);

			if (this.inputId === "__component0---clientesdetalhe--input-Contatos") {

				aContexts = evt.getParameter("selectedContexts");

				fieldInput.setValue("");

				nome = aContexts.map(
					function(oContext) {
						return oContext.getObject().Nome;
					}
				);

				var telefone = aContexts.map(
					function(oContext) {
						return oContext.getObject().Telefone;
					}
				);

				var email = aContexts.map(
					function(oContext) {
						return oContext.getObject().Email;
					}
				);

				aDataContatos.push({
					Nome         : nome,
					Telefone     : telefone,
					Email        : email,
					Status       : true,
					Novo         : 1,
					StatusCampos : true
				});

				oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({modelData: aDataContatos});

				var oTableData = this.getView().byId("ListContatosChange");

				oTableData.setModel(oModel);

			}
			
			if(fieldInput.oParent.oParent.sId === "__component0---clientesdetalhe--listRecebedorMerc"){
					
				fieldInput = this.getView().byId(this.inputId);
				fieldInput.setValue(oSelectedItem.getDescription());
					
				bc              = fieldInput.getBindingContext();
				pos             = bc.sPath.split("/");
	            codigo          = oSelectedItem.getDescription();  
	            nomeSplit       = oSelectedItem.getTitle().split("-");
				nome            = nomeSplit[0];
				localidadeSplit = oSelectedItem.getInfo().split("/");
				enderecoSplit   = localidadeSplit[0].split(":");
				localSplit      = localidadeSplit[4].split(":");
				endereco        = "";
				local           = "";
				
				if (enderecoSplit[1] !== "undefined"){
					endereco = enderecoSplit[1].trim();	
				}
				
				if (localSplit[1] !== "undefined"){
					local    = localSplit[1].trim();
				}
					
				oTable  = this.getView().byId("listRecebedorMerc");
			    m       = oTable.getModel();
			    data    = m.getProperty("/modelDataRecebedorMerc");
			    	
			    aDataRecebedorMerc = [];
			    	
			    for ( property1 in data) {
			    	if(property1 === pos[2]){ 
				     	aDataRecebedorMerc.push({
							RecebedorMercCodigo    : codigo,
							RecebedorMercNome      : nome,
							RecebedorMercEndereco  : endereco,
							RecebedorMercLocal     : local,
							RecebedorMercLocalNovo : 1,
							StatusPesquisa         : false
						});
			    	}else{
			    		
			    		var recebedorNovo = false;
			    		
			    		if (data[property1].RecebedorMercLocalNovo === 1){
			    			if(data[property1].RecebedorMercCodigo === ""){
			    				recebedorNovo = true;
			    			}
			    		}
			    		
			    		aDataRecebedorMerc.push({
							RecebedorMercCodigo    : data[property1].RecebedorMercCodigo,
							RecebedorMercNome      : data[property1].RecebedorMercNome,
							RecebedorMercEndereco  : data[property1].RecebedorMercEndereco,
							RecebedorMercLocal     : data[property1].RecebedorMercLocal,
							RecebedorMercLocalNovo : data[property1].RecebedorMercLocalNovo,
							StatusPesquisa         : recebedorNovo
						});
			    	}
				}
					
				oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({modelDataRecebedorMerc: aDataRecebedorMerc});
								
				oTable.setModel(oModel);

			}

			if (this.inputId === "__component0---clientesdetalhe--input-Pagador" || this.inputId ===
				"__component0---clientesdetalhe--input-Matriz") {

				aContexts = evt.getParameter("selectedContexts");

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

				this.getView().byId("input-PagadorCodigo").setValue(codigo);
				this.getView().byId("input-PagadorNome").setValue(nome);

			}

			if (this.inputId === "__component0---clientesdetalhe--input-RecebedorFatura") {

				aContexts = evt.getParameter("selectedContexts");

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

				this.getView().byId("input-RecebedorFaturaCodigo").setValue(codigo);
				this.getView().byId("input-RecebedorFaturaNome").setValue(nome);

			}
			
			if (fieldInput.oParent.oParent.sId === "__component0---clientesdetalhe--listCobrancaMerc"){
					
				fieldInput = this.getView().byId(this.inputId);
				fieldInput.setValue(oSelectedItem.getDescription());
					
				bc              = fieldInput.getBindingContext();
				pos             = bc.sPath.split("/");
	            codigo          = oSelectedItem.getDescription();  
	            nomeSplit       = oSelectedItem.getTitle().split("-");
				nome            = nomeSplit[0];
				localidadeSplit = oSelectedItem.getInfo().split("/");
				enderecoSplit   = localidadeSplit[0].split(":");
				localSplit      = localidadeSplit[4].split(":");
				endereco        = "";
				local           = "";
				
				if (enderecoSplit[1] !== "undefined"){
					endereco = enderecoSplit[1].trim();	
				}
				
				if (localSplit[1] !== "undefined"){
					local    = localSplit[1].trim();
				}
					
				oTable  = this.getView().byId("listCobrancaMerc");
			    m       = oTable.getModel();
			    data    = m.getProperty("/modelDataCobrancaMerc");
			    	
			    aDataCobrancaMerc = [];
			    	
			    for (property1 in data) {
			    	if(property1 === pos[2]){ 
				     	aDataCobrancaMerc.push({
							CobrancaMercCodigo     : codigo,
							CobrancaMercNome       : nome,
							CobrancaMercEndereco   : endereco,
							CobrancaMercLocal      : local,
							CobrancaMercLocalNovo  : 1,
							StatusPesquisa         : false
						});
			    	}else{
			    		
			    		var cobrancaNovo = false;
			    		
			    		if (data[property1].CobrancaMercLocalNovo === 1){
			    			if(data[property1].CobrancaMercCodigo === ""){
			    				cobrancaNovo = true;
			    			}
			    		}
			    		
			    		aDataCobrancaMerc.push({
							CobrancaMercCodigo     : data[property1].CobrancaMercCodigo,
							CobrancaMercNome       : data[property1].CobrancaMercNome,
							CobrancaMercEndereco   : data[property1].CobrancaMercEndereco,
							CobrancaMercLocal      : data[property1].CobrancaMercLocal,
							CobrancaMercLocalNovo  : data[property1].CobrancaMercLocalNovo,
							StatusPesquisa         : cobrancaNovo
						});
			    	}
				}
					
				oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({modelDataCobrancaMerc: aDataCobrancaMerc});
								
				oTable.setModel(oModel);
				
			}

		},
		
		onDeleteSelectedItems: function(oEvent) {

			var oSelectedItem = oEvent.getSource().getParent();
			var oPath         = oSelectedItem.getBindingContext().getPath();
			var oIndex        = parseInt(oPath.substring(oPath.lastIndexOf('/') + 1));
			var oTable        = this.getView().byId("input-listContatos");
			var m             = oTable.getModel();
			var data          = m.getProperty("/modelData");
			var removed       = data.splice(oIndex, 1);
			m.setProperty("/modelData", data);
			sap.m.MessageToast.show("Contato removido!");
			//sap.m.MessageToast.show(JSON.stringify(removed[0]) +  'is removed');  
			//this.calcTotal(data);

		},
		
		onDeleteSelectedItemsRecebedor: function(oEvent){
	
			 var oSelectedItem = oEvent.getSource().getParent();
			 var oPath   = oSelectedItem.getBindingContext().getPath();
			 var oIndex  = parseInt(oPath.substring(oPath.lastIndexOf('/') +1));
			 var oTable  = this.getView().byId("listRecebedorMerc");
		     var m       = oTable.getModel();
		     var data    = m.getProperty("/modelDataRecebedorMerc");
		     var removed = data.splice(oIndex, 1);
		     m.setProperty("/modelDataRecebedorMerc",data);
		     sap.m.MessageToast.show("Recebedor removido!");
	
		},
		
		onDeleteSelectedItemsCobranca: function(oEvent){
	
			 var oSelectedItem = oEvent.getSource().getParent();
			 var oPath   = oSelectedItem.getBindingContext().getPath();
			 var oIndex  = parseInt(oPath.substring(oPath.lastIndexOf('/') +1));
			 var oTable  = this.getView().byId("listCobrancaMerc");
		     var m       = oTable.getModel();
		     var data    = m.getProperty("/modelDataCobrancaMerc");
		     var removed = data.splice(oIndex, 1);
		     m.setProperty("/modelDataCobrancaMerc",data);
		     sap.m.MessageToast.show("Cobrança removido!");
	
		},

		handleEditPress: function() {

			this._toggleButtonsAndView(true);
			this._oViewModel.setProperty("/mode", "edit");
			this._fieldsDisableEnable("Edit");
			jQuery.sap.delayedCall(500, this, function() {
				this.getView().byId("input-nome").focus();
			});
		},

		handleCancelPress: function() {

			this._fieldsDisableEnable("Cancel");
			this._fieldsDisableEnable("CancelPJ");
			this._toggleButtonsAndView(false);

		},

		_clearForm: function() {

			var thisView = this;
			thisView.byId("input-Codcliente").setValue("");
			thisView.byId("input-endereco").setValue("");
			thisView.byId("input-numero").setValue("");
			thisView.byId("input-Complemento").setValue("");
			thisView.byId("input-Bairro").setValue("");
			thisView.byId("input-Cidade").setSelectedKey(null);
			thisView.byId("input-Cep").setValue("");
			thisView.byId("input-nome").setValue("");
			thisView.byId("input-Origem").setValue("");
			thisView.byId("input-Telefone").setValue("");
			thisView.byId("input-Email").setValue("");
			thisView.byId("input-InscricaoEstadual").setValue("");
			thisView.byId("input-Cnae").setSelectedKey(null);
			thisView.byId("input-SubstTributaria").setValue("");
			thisView.byId("input-Matriz").setValue("");
			thisView.byId("input-Regiao").setSelectedKey(null);
			thisView.byId("input-SetorInd").setSelectedKey(null);
			thisView.byId("input-Kukla").setValue("");
			thisView.byId("input-multiComboxOrganizacao").setValue("");
			thisView.byId("input-multiComboxCanal").setValue("");
			thisView.byId("input-multiComboxSetorAtividade").setValue("");
			//thisView.byId("input-Classifcli").setValue("");
			thisView.byId("input-multiComboxOrganizacao").setValue("");
			thisView.byId("input-multiComboxCanal").setValue("");
			thisView.byId("input-multiComboxSetorAtividade").setValue("");
			thisView.byId("input-RecebedorMercadoria").setValue("");
			thisView.byId("input-Pagador").setValue("");
			thisView.byId("input-RecebedorFatura").setValue("");
			thisView.byId("input-RecebedorCodigo").setValue("");
			thisView.byId("input-PagadorCodigo").setValue("");
			thisView.byId("input-RecebedorFaturaCodigo").setValue("");
			thisView.byId("input-RecebedorMercadoriaNome").setValue("");
			thisView.byId("input-PagadorNome").setValue("");
			thisView.byId("input-RecebedorFaturaNome").setValue("");
			thisView.byId("input-InscricaoEstadual").setValue("");
			//thisView.byId("input-DtVerificacao").setValue("");
			thisView.byId("input-Suframa").setValue("");
			thisView.byId("input-DtSufurama").setValue("");
			thisView.byId("input-DomicilioFiscal").setSelectedKey(null);
			thisView.byId("input-CobrancaCodigo").setValue("");
			thisView.byId("input-CobrancaNome").setValue("");
			//thisView.byId("combo-tipoPessoa").setValue("");
			//thisView.byId("searchCnpjCpf").setValue("");

			//limpar contatos
			var oTable = this.getView().byId("input-listContatos");
			var m = oTable.getModel();
			var data = m.getProperty("/modelData");
			var removed = "";

			for (var property1 in data) {
				removed = data.splice(data[property1], 1);
			}

			m.setProperty("/modelData", data);
			//Fim limpar fim contatos

			//limpar áreas de venda
			this.getView().byId("input-multiComboxOrganizacao").setSelectedItems([]);
			this.getView().byId("input-multiComboxCanal").setSelectedItems([]);
			this.getView().byId("input-multiComboxSetorAtividade").setSelectedItems([]);

		},

		_fieldsDisableEnable: function(action) {

			var thisView = this;

			if (action === "Edit") {

				this.getView().byId("input-endereco").setEnabled(true);
				this.getView().byId("input-Bairro").setEnabled(true);
				this.getView().byId("input-Cep").setEnabled(true);
				this.getView().byId("input-Kukla").setEnabled(true);
				this.getView().byId("input-nome").setEnabled(true);
				this.getView().byId("input-numero").setEnabled(true);
				this.getView().byId("input-Complemento").setEnabled(true);
				this.getView().byId("input-Cidade").setEnabled(true);
				this.getView().byId("input-Regiao").setEnabled(true);
				this.getView().byId("input-Telefone").setEnabled(true);
				this.getView().byId("input-Origem").setEnabled(true);
				this.getView().byId("input-SubstTributaria").setEnabled(true);

					if (this.utilFormatterCPFCNPJClear(this.getView().byId("input-CpfCnpj").getValue()).length > 11) {
						thisView.getView().byId("input-Matriz").setEnabled(true);
						thisView.getView().byId("input-RecebedorMercadoria").setEnabled(true);
						thisView.getView().byId("input-Cobranca").setEnabled(true);
						thisView.getView().byId("input-Pagador").setEnabled(true);
						thisView.getView().byId("input-RecebedorFatura").setEnabled(true);
						thisView.getView().byId("input-Matriz").setEnabled(true);
						thisView.getView().byId("btn-Recebedor").setEnabled(true);
						thisView.getView().byId("btn-Pagador").setEnabled(true);
						thisView.getView().byId("btn-RecebedorFatura").setEnabled(true);
						//thisView.getView().byId("btn-Cobranca").setEnabled(true);
						thisView.getView().byId("SimpleFormContatos").setVisible(true);
						thisView.getView().byId("input-button").setEnabled(true);
						thisView.getView().byId("input-buttonRecebedor").setEnabled(true);
						thisView.getView().byId("input-buttonCobranca").setEnabled(true);
						this.getView().byId("input-InscricaoEstadual").setEnabled(true);
						this.getView().byId("input-Cnae").setEnabled(true);
						this.getView().byId("input-Suframa").setEnabled(true);
						this.getView().byId("input-DtSufurama").setEnabled(true);
						this.getView().byId("input-InscricaoEstadual").setEnabled(true);
						this.getView().byId("input-Cnae").setEnabled(true);
						thisView._enableDisableContatos(true);
						thisView._enableDisableRecebedor(true);
						thisView._enableDisableCobranca(true);
						
							if (thisView.getView().byId("input-tipoClienteSAP").getValue() !== "J" ){
								 thisView.getView().byId("btn-Recebedor").setEnabled(false);
								 thisView.getView().byId("btn-Pagador").setEnabled(false);
								 thisView.getView().byId("btn-RecebedorFatura").setEnabled(false);
								 thisView.getView().byId("btn-Cobranca").setEnabled(false);
								 thisView.getView().byId("input-buttonRecebedor").setEnabled(false);
								 thisView.getView().byId("input-buttonCobranca").setEnabled(false);
								 thisView.getView().byId("input-Pagador").setEnabled(false);
								 thisView._enableDisableRecebedor(false);
								 thisView._enableDisableCobranca(false);
							}else{
								 thisView.getView().byId("btn-Recebedor").setEnabled(true);
								 thisView.getView().byId("btn-Pagador").setEnabled(true);
								 thisView.getView().byId("btn-RecebedorFatura").setEnabled(true);
								 thisView.getView().byId("btn-Cobranca").setEnabled(true);
								 thisView.getView().byId("input-buttonRecebedor").setEnabled(true);
								 thisView.getView().byId("input-buttonCobranca").setEnabled(true);
								 thisView.getView().byId("input-Pagador").setEnabled(true);
								 thisView._enableDisableRecebedor(true);
								 thisView._enableDisableCobranca(true);
							}
					}

				this.getView().byId("input-Email").setEnabled(true);
				this.getView().byId("input-SetorInd").setEnabled(true);

				//this.getView().byId("input-multiComboxOrganizacao").setEnabled(true);
				this.getView().byId("input-multiComboxCanal").setEnabled(true);
				this.getView().byId("input-multiComboxSetorAtividade").setEnabled(true);
				this.getView().byId("input-DomicilioFiscal").setEnabled(true);

			} else if (action === "SearchPF") {

				thisView.getView().byId("SimpleFormVincularCliente").setVisible(false);
				thisView.getView().byId("SimpleFormContatos").setVisible(false);
				thisView.getView().byId("SimpleFormRecebedorMerc").setVisible(false);
				thisView.getView().byId("SimpleFormCobrancaMerc").setVisible(false);

			} else if (action === "EditPJ") {
				
				thisView.getView().byId("SimpleFormVincularCliente").setVisible(true);
				thisView.getView().byId("SimpleFormContatos").setVisible(true);
				thisView.getView().byId("SimpleFormRecebedorMerc").setVisible(true);
				thisView.getView().byId("SimpleFormCobrancaMerc").setVisible(true);
				thisView.getView().byId("input-buttonRecebedor").setVisible(true);
				thisView.getView().byId("input-buttonCobranca").setVisible(true);
				thisView._enableDisableRecebedor(true);
				thisView._enableDisableCobranca(true);
			
				
			} else if (action === "EditPJENTREGACOBRANCA") {
				
				thisView.getView().byId("SimpleFormContatos").setVisible(true);
				thisView.getView().byId("SimpleFormVincularCliente").setVisible(true);
				thisView.getView().byId("SimpleFormRecebedorMerc").setVisible(true);
				thisView.getView().byId("SimpleFormCobrancaMerc").setVisible(true);
				thisView.getView().byId("input-buttonRecebedor").setVisible(false);
				thisView.getView().byId("input-buttonCobranca").setVisible(false);
				thisView._enableDisableRecebedor(false);
				thisView._enableDisableCobranca(false);
				
			} else if (action === "CancelPJ") {
				
				thisView.getView().byId("input-button").setEnabled(false);
				thisView.getView().byId("input-buttonRecebedor").setEnabled(false);
				thisView.getView().byId("input-buttonCobranca").setEnabled(false);
				thisView.getView().byId("btn-Cobranca").setEnabled(false);
				thisView.getView().byId("input-Cobranca").setEnabled(false); 
				thisView._enableDisableContatos(false);
				thisView._enableDisableRecebedor(false);
				thisView._enableDisableCobranca(false);

			} else {

				this.getView().byId("input-endereco").setEnabled(false);
				this.getView().byId("input-Bairro").setEnabled(false);
				this.getView().byId("input-Cep").setEnabled(false);
				this.getView().byId("input-Kukla").setEnabled(false);
				this.getView().byId("input-Classifcli").setEnabled(false);
				this.getView().byId("input-Cnae").setEnabled(false);
				this.getView().byId("input-nome").setEnabled(false);
				this.getView().byId("input-numero").setEnabled(false);
				this.getView().byId("input-Complemento").setEnabled(false);
				this.getView().byId("input-Cidade").setEnabled(false);
				this.getView().byId("input-Regiao").setEnabled(false);
				this.getView().byId("input-Telefone").setEnabled(false);
				this.getView().byId("input-Origem").setEnabled(false);
				this.getView().byId("input-SubstTributaria").setEnabled(false);
				this.getView().byId("input-Matriz").setEnabled(false);
				this.getView().byId("input-Email").setEnabled(false);
				this.getView().byId("input-SetorInd").setEnabled(false);
				this.getView().byId("input-InscricaoEstadual").setEnabled(false);
				this.getView().byId("input-multiComboxOrganizacao").setEnabled(false);
				this.getView().byId("input-multiComboxCanal").setEnabled(false);
				this.getView().byId("input-multiComboxSetorAtividade").setEnabled(false);
				this.getView().byId("input-RecebedorMercadoria").setEnabled(false);
				this.getView().byId("input-Cobranca").setEnabled(false); 
				this.getView().byId("input-CobrancaCodigo").setEnabled(false);
				this.getView().byId("input-CobrancaNome").setEnabled(false);
				this.getView().byId("input-Pagador").setEnabled(false);
				this.getView().byId("input-RecebedorFatura").setEnabled(false);
				this.getView().byId("input-InscricaoEstadual").setEnabled(false);
				this.getView().byId("input-Cnae").setEnabled(false);
				thisView.byId("btn-Recebedor").setEnabled(false);
				thisView.byId("btn-Pagador").setEnabled(false);
				thisView.byId("btn-RecebedorFatura").setEnabled(false);
				this.getView().byId("btn-Cobranca").setEnabled(false);
				this.getView().byId("input-Suframa").setEnabled(false);
				this.getView().byId("input-Matriz").setEnabled(false);
				thisView.getView().byId("input-RecebedorMercadoria").setEnabled(false);
				thisView.getView().byId("input-Pagador").setEnabled(false);
				thisView.getView().byId("input-RecebedorFatura").setEnabled(false);
				thisView.getView().byId("input-Matriz").setEnabled(false);
				thisView.getView().byId("btn-Recebedor").setEnabled(false);
				thisView.getView().byId("btn-Pagador").setEnabled(false);
				thisView.getView().byId("btn-RecebedorFatura").setEnabled(false);
				thisView.getView().byId("input-Suframa").setEnabled(false);
				thisView.getView().byId("input-DtSufurama").setEnabled(false);
				thisView.getView().byId("input-DomicilioFiscal").setEnabled(false);
				thisView.getView().byId("input-button").setEnabled(false);
				thisView.getView().byId("input-buttonRecebedor").setEnabled(false);
				thisView.getView().byId("input-buttonCobranca").setEnabled(false);
				thisView._enableDisableContatos(false);
				thisView._enableDisableRecebedor(false);
				thisView._enableDisableCobranca(false);

			}

		},

		_enableDisableContatos: function(sStatus) {
			var oTable = this.getView().byId("input-listContatos");
			var m = oTable.getModel();
			var data = m.getProperty("/modelData");

			if (data !== undefined) {
				if (data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						data[i].Status       = sStatus;
						data[i].StatusCampos = false;
					}
					m.setProperty("/modelData", data);
				}
			}
		},
		
		_enableDisableRecebedor: function(sStatus){
			
			var oTable  = this.getView().byId("listRecebedorMerc");
 			var m       = oTable.getModel();
			var data    = m.getProperty("/modelDataRecebedorMerc");
			
			if(data !== undefined){
				if(data.length > 0){
					for (var i = 0; i < data.length; i++){
					   	data[i].Status = sStatus;
					}
					m.setProperty("/modelDataRecebedorMerc",data);
				}
			}
			
		},
		
		_enableDisableCobranca: function(sStatus){
			
			var oTable  = this.getView().byId("listCobrancaMerc");
 			var m       = oTable.getModel();
			var data    = m.getProperty("/modelDataCobrancaMerc");
			
			if(data !== undefined){
				if(data.length > 0){
					for (var i = 0; i < data.length; i++){
					   	data[i].Status = sStatus;
					}
					m.setProperty("/modelDataCobrancaMerc",data);
				}
			}
			
		},

		_readContatos: function(field) {

			var oTable = this.getView().byId("input-listContatos");
			var m = oTable.getModel();
			var data = m.getProperty("/modelData");
			var retorno = "";

			for (var property1 in data) {
				
				if (property1 > 0){
					retorno += ";";
				}

				if (field === "Nome") {
					if (data[property1].Nome === undefined){
						retorno += "";
					}else{
						retorno += data[property1].Nome;	
					}
				}
				
				if (field === "Sobrenome") {
					if (data[property1].Sobrenome === undefined){
						retorno += "";
					}else{
						retorno += data[property1].Sobrenome;	
					}
				}

				if (field === "Telefone") {
					retorno += data[property1].Telefone;
				}

				if (field === "Email") {
					retorno += data[property1].Email;
				}

			}

			return retorno;

		},

		handleSavePress: function() {

			var thisView = this,
				oModel = this.getModel();

			var tipoCliente = "";
			var cpf = "";
			var cnpj = "";

			if (this.getView().byId("input-nome").getValue() === "") {
				MessageBox.error("Campo Nome Inválido.", {
					styleClass: "sapUiSizeCompact"
				});
				thisView().byId("input-nome").focus();
				return;
			}

			if (this.getView().byId("input-Cep").getValue() === "") {
				MessageBox.error("Campo CEP Inválido.", {
					styleClass: "sapUiSizeCompact"
				});
				thisView().byId("input-Cep").focus();
				return;
			}

			if (this.getView().byId("input-endereco").getValue() === "") {
				MessageBox.error("Campo Rua Inválido.", {
					styleClass: "sapUiSizeCompact"
				});
				thisView().byId("input-endereco").focus();
				return;
			}

			if (this.getView().byId("input-numero").getValue() === "") {
				MessageBox.error("Campo Número Inválido.", {
					styleClass: "sapUiSizeCompact"
				});
				thisView().byId("input-numero").focus();
				return;
			}

			if (this.getView().byId("input-Bairro").getValue() === "") {
				MessageBox.error("Campo Bairro Inválido.", {
					styleClass: "sapUiSizeCompact"
				});
				thisView().byId("input-Bairro").focus();
				return;
			}

			if (this.getView().byId("input-Cidade").getValue() === "") {
				MessageBox.error("Campo Cidade Inválido.", {
					styleClass: "sapUiSizeCompact"
				});
				thisView().byId("input-Cidade").focus();
				return;
			}

			if (this.getView().byId("input-Regiao").getSelectedKey() === "") {
				MessageBox.error("Campo Estado Inválido.", {
					styleClass: "sapUiSizeCompact"
				});
				thisView().byId("input-Regiao").focus();
				return;
			}

			if (this.getView().byId("input-DomicilioFiscal").getSelectedKey() === "") {
				MessageBox.error("Campo Domicílio Fiscal Inválido.", {
					styleClass: "sapUiSizeCompact"
				});
				thisView().byId("input-DomicilioFiscal").fcus();
				return;
			}

			if (this.getView().byId("input-SubstTributaria").getSelectedKey() === "") {
				MessageBox.error("Campo Subst. Tributária Inválida.", {
					styleClass: "sapUiSizeCompact"
				});
				thisView().byId("input-SubstTributaria").focus();
				return;
			}

			if (this.getView().byId("input-SetorInd").getSelectedKey() === "") {
				MessageBox.error("Campo Setor Industrial Inválido.", {
					styleClass: "sapUiSizeCompact"
				});
				thisView().byId("input-SetorInd").focus();
				return;
			}

			var oData;

			var oComboBoxOrganizacao = this.getView().byId("input-multiComboxOrganizacao").getSelectedKeys();
			var inputOrgvendas = this._splitMultiCombo(oComboBoxOrganizacao);

			var oComboBoxCanal = this.getView().byId("input-multiComboxCanal").getSelectedKeys();
			var inputCanal = this._splitMultiCombo(oComboBoxCanal);

			var oComboBoxSetorAtividade = this.getView().byId("input-multiComboxSetorAtividade").getSelectedKeys();
			var inputSetorAtividade = this._splitMultiCombo(oComboBoxSetorAtividade);
			
			//Recebedor
		    var oTable  			  = this.getView().byId("listRecebedorMerc");
		    var m       			  = oTable.getModel();
		    var data    			  = m.getProperty("/modelDataRecebedorMerc");
		    var recebedorMercCodigo   = "";
		    var recebedorMercNome     = "";
		    var recebedorMercEndereco = "";
		    var recebedorMercLocal    = "";
		    	
		    for (var property1 in data) {
		    	if( data[property1].RecebedorMercCodigo !== "" ){
			    	if(property1 === '0'){
			    		recebedorMercCodigo   = data[property1].RecebedorMercCodigo;
						recebedorMercNome     = data[property1].RecebedorMercNome;  
						recebedorMercEndereco = data[property1].RecebedorMercEndereco;
						recebedorMercLocal    = data[property1].RecebedorMercLocal;
			    	}else{
						recebedorMercCodigo   = recebedorMercCodigo  +";"+ data[property1].RecebedorMercCodigo;
						recebedorMercNome     = recebedorMercNome    +";"+ data[property1].RecebedorMercNome;
						recebedorMercEndereco = recebedorMercEndereco+";"+ data[property1].RecebedorMercEndereco;
						recebedorMercLocal    = recebedorMercLocal   +";"+ data[property1].RecebedorMercLocal;
			    	}
		    	}
			}
		    //Fim Recebedor
		    
		    //Cobranca
		    oTable = "";
		    m      = "";
		    data   = "";
		    
		    oTable                   = this.getView().byId("listCobrancaMerc");
		    m                        = oTable.getModel();
		    data                     = m.getProperty("/modelDataCobrancaMerc");
		    var cobrancaMercCodigo   = "";
		    var cobrancaMercNome     = "";
		    var cobrancaMercEndereco = "";
		    var cobrancaMercLocal    = "";
		    
		    for (var property1 in data) {
		    	if( data[property1].CobrancaMercCodigo !== ""){
			    	if(property1 === '0'){
			    		cobrancaMercCodigo   = data[property1].CobrancaMercCodigo;
						cobrancaMercNome     = data[property1].CobrancaMercNome;  
						cobrancaMercEndereco = data[property1].CobrancaMercEndereco;
						cobrancaMercLocal    = data[property1].CobrancaMercLocal;
			    	}else{
						cobrancaMercCodigo   = cobrancaMercCodigo+";"+data[property1].CobrancaMercCodigo;
						cobrancaMercNome     = cobrancaMercNome+";"+data[property1].CobrancaMercNome;
						cobrancaMercEndereco = cobrancaMercEndereco+";"+data[property1].CobrancaMercEndereco;
						cobrancaMercLocal    = cobrancaMercLocal+";"+data[property1].CobrancaMercLocal;
			    	}
		    	}
			}
		    //Fim Cobranca

			//Contatos
			var nomeContato      = this._readContatos("Nome");
			var sobrenomeContato = this._readContatos("Sobrenome");
			var telefoneContato  = this._readContatos("Telefone");
			var emailContato     = this._readContatos("Email");
			var sDtSuframa       = null;

			if (thisView.byId("input-Suframa").getValue() !== "" && thisView.byId("input-DtSufurama").getValue() === "") {
				MessageBox.alert("Suframa preenchido, favor cadastrar uma data.", {
					styleClass: "sapUiSizeCompact"
				});
				return;
			}
			//Fim Contatos

			if (thisView.byId("input-DtSufurama").getValue() !== "") {

				var sDtSuframaSplit = thisView.byId("input-DtSufurama").getValue().split("/");

				var sDtSuframa = sDtSuframaSplit[2] + "-" + sDtSuframaSplit[1] + "-" + sDtSuframaSplit[0];

				if (sDtSuframa !== "") {
					sDtSuframa = new Date(sDtSuframa);
				} else {
					sDtSuframa = null;
				}

			}

			oData = {
				"Nome": this.byId("input-nome").getValue(),
				"Endereco": this.byId("input-endereco").getValue(),
				"Numero": this.byId("input-numero").getValue(),
				"Complemento": this.byId("input-Complemento").getValue(),
				"Bairro": this.byId("input-Bairro").getValue(),
				"Cidade": this.byId("input-Cidade").getValue(),
				"Regiao": this.byId("input-Regiao").getSelectedKey(),
				"Cep": this.byId("input-Cep").getValue(),
				"Pais": "BR",
				"Telefone": this.byId("input-Telefone").getValue(),
				"Email": this.byId("input-Email").getValue(),
				"Pessoacontato": "",
				"Clientematriz": this.byId("input-Matriz").getValue(),
				"Setorindustrial": this.getView().byId("input-SetorInd").getSelectedKey(),
				"Classifcli": this.byId("input-Classifcli").getValue(),
				"Origem": this.byId("input-Origem").getValue(),
				"Orgvendas_splt": inputOrgvendas,
				"Canaldistr_splt": inputCanal,
				"Setorativ_splt": inputSetorAtividade,
				"Inscrestadual": this.byId("input-InscricaoEstadual").getValue(),
				"Tipocliente": tipoCliente,
				"Cnae": this.byId("input-Cnae").getSelectedKey(),
				"Kukla": this.getView().byId("input-Kukla").getSelectedKey(),
				"Nomecontato_split": nomeContato,
				"Sobrenomecontato_split": sobrenomeContato,
				"Fonecontato_split": telefoneContato,
				"Emailcontato_split": emailContato,
				"Domiciliofiscal": this.getView().byId("input-DomicilioFiscal").getSelectedKey(),
				"Recebedorfatura": this.getView().byId("input-RecebedorFaturaCodigo").getValue(),
				"Recebedormercadoria": recebedorMercCodigo, //this.getView().byId("input-RecebedorCodigo").getValue(),
				"Pagador": this.getView().byId("input-PagadorCodigo").getValue(),
				"Gruposubfiscal": this.getView().byId("input-SubstTributaria").getSelectedKey(),
				"Suframa": this.getView().byId("input-Suframa").getValue(),
				"Datasuframa": sDtSuframa,
				"Cobranca" : cobrancaMercCodigo,  
				"Nomecobranca" : cobrancaMercNome, 
				"Enderecorecebedormercadoria" : recebedorMercEndereco,
				"Localrecebedormercadoria" : recebedorMercLocal,
				"Enderecocobranca": cobrancaMercEndereco,
				"Localcobranca" : cobrancaMercLocal
			};

			oModel.update("/ClientesSet(Codcliente='" + this.byId('input-Codcliente').getValue() + "',Nome='',Cnpj='" + cnpj + "',Cpf='" + cpf +
				"',Tipocliente='" + tipoCliente + "')", oData, {
					//async : true,	
					success: function(success, response, odata) {

						thisView.getView().setBusy(false);
						var hdrMessage = response.headers["sap-message"];
						var hdrMessageObject = JSON.parse(hdrMessage);

						var msgSplit = hdrMessageObject.message.split("-");

						if (msgSplit[0] !== "E") {
							MessageBox.success(msgSplit[1], {
								styleClass: "sapUiSizeCompact"
							});
							thisView._fieldsDisableEnable("Save");
							thisView._toggleButtonsAndView(false);
						} else {
							thisView._errorFieldFocus(hdrMessageObject.target);
							MessageBox.error(msgSplit[1], {
								styleClass: "sapUiSizeCompact"
							});

						}

						thisView.getView().setBusy(false);

						//thisView._clearForm();
					},
					error: function(oError, response) {
						thisView.getView().setBusy(false);
						var hdrMessage = JSON.parse(oError.responseText).error.message.value;
						MessageBox.success(hdrMessage, {
							styleClass: "sapUiSizeCompact"
						});
						thisView.getView().setBusy(false);

					}
				});

			oModel.submitChanges();
			thisView.getView().setBusy(true);

		},

		_errorFieldFocus: function(idFieldDePara) {

			var thisView = this;
			var retorno = "";

			//000      Cód. Cliente
			if (idFieldDePara === "000") {
				thisView.getView().byId("input-Codcliente").focus();
			}

			//001      Nome
			if (idFieldDePara === "001") {
				thisView.getView().byId("input-nome").focus();
			}

			//002      CEP
			if (idFieldDePara === "002") {
				thisView.getView().byId("input-Cep").focus();
			}

			//003      Rua
			if (idFieldDePara === "003") {
				thisView.getView().byId("input-endereco").focus();
			}

			//004      Numero
			if (idFieldDePara === "004") {
				thisView.getView().byId("input-numero").focus();
			}

			//005      Bairro
			if (idFieldDePara === "005") {
				thisView.getView().byId("input-Bairro").focus();
			}

			//006      Cidade
			if (idFieldDePara === "006") {
				thisView.getView().byId("input-Cidade").focus();
				//retorno = "input-Cidade";
			}

			//007      Estado
			if (idFieldDePara === "007") {
				thisView.getView().byId("input-Regiao").focus();
			}

			//008      CNAE
			if (idFieldDePara === "008") {
				thisView.getView().byId("input-Cnae").focus();
			}

			//009      Domic. Fiscal
			if (idFieldDePara === "009") {
				thisView.getView().byId("input-DomicilioFiscal").focus();
			}

			//010      Subst. Tributaria
			if (idFieldDePara === "010") {
				thisView.getView().byId("input-SubstTributaria").focus();
			}

			//011      Setor Ind.
			if (idFieldDePara === "011") {
				thisView.getView().byId("input-SetorInd").focus();
			}

			//012      Suframa
			if (idFieldDePara === "012") {
				thisView.getView().byId("input-Suframa").focus();
			}

			//013      Suframa Validade
			if (idFieldDePara === "013") {
				thisView.getView().byId("input-DtSufurama").focus();
			}

			//014      Grupo de Contas
			if (idFieldDePara === "014") {
				thisView.getView().byId("input-multiComboxCanal").focus();
			}

			//015      Telefone
			if (idFieldDePara === "015") {
				thisView.getView().byId("input-Telefone").focus();
			}

			//016      Contato
			// if(idFieldDePara === "016"){

			// }

			//017      Email
			if (idFieldDePara === "017") {
				thisView.getView().byId("input-Email").focus();
			}

			//018      Data de Verificação Seguinte (Tela de Alteração de Crédito)
			// if(idFieldDePara === "018"){

			// }

			//019      Limite de Crédito (Tela de Alteração de Crédito)
			// if(idFieldDePara === "019"){

			// }

			//777      CPF já existe
			// if(idFieldDePara === "777"){
			// 	//input-CpfCnpj	
			// }

			//778      Cliente já cadastrado!.
			// if(idFieldDePara === "778"){

			// }

			//779      'O CPF/CNPJ  informado está incorreto
			// if(idFieldDePara === "779"){

			// }

			//780      'O Centro informado não Existe
			// if(idFieldDePara === "780"){

			// }

			return retorno;

		},

		_splitMultiCombo: function(comboboxItems) {

			var filter = '',
				query = '';

			if (comboboxItems.length != '') {

				for (var i = 0; i < comboboxItems.length; i++) {
					query += "" + comboboxItems[i].toString() + "";
					if (i != comboboxItems.length - 1) {
						query += ";";
					}
				}

				filter = query;
			}

			return filter;
		},

		onCreateItems: function(oEvent) {

			aDataContatos.push({
				Nome         : "",
				Telefone     : "",
				Email        : "",
				Novo         : 1,
				Status       : true,
				StatusCampos : true
			});

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({modelData: aDataContatos});

			var oTableData = this.getView().byId("input-listContatos");

			oTableData.setModel(oModel);
			
			// oTableData.focus();
			// var table = this.byId("__component0---clientesdetalhe--input-listContatosNome");
			// table.bFocusoutDueRendering = true;
			
			// jQuery.sap.delayedCall(500, this, function() {
			// 	//this.byId("input-listContatosNome").focus();
			// 	this.byId("__component0---clientesdetalhe--input-listContatosNome")
			
	 		//this.byId("__component0---clientesdetalhe--input-listContatos-tblBody").focus();
			// });

		},
		
		onCreateItemsRecebedor: function(){
//			
			aDataRecebedorMerc.push({
					RecebedorMercCodigo    : "",
					RecebedorMercNome      : "",
					RecebedorMercEndereco  : "",
					recebedorMercLocal     : "",
					RecebedorMercLocalNovo : 1,
					StatusPesquisa         : true
				});
				
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({modelDataRecebedorMerc: aDataRecebedorMerc});
				
				var oTableData = this.getView().byId("listRecebedorMerc");
				
				oTableData.setModel(oModel);
				
		},
		
		onCreateItemsCobranca: function(){
			
			aDataCobrancaMerc.push({
					CobrancaMercCodigo    : "",
					CobrancaMercNome      : "",
					CobrancaMercEndereco  : "",
					CobrancaMercLocal     : "",
					CobrancaMercLocalNovo : 1
				});
				
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({modelDataCobrancaMerc: aDataCobrancaMerc});
				
				var oTableData = this.getView().byId("listCobrancaMerc");
				
				oTableData.setModel(oModel);
				
		},

		_formFragments: {},

		_toggleButtonsAndView: function(bEdit) {

			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			//this._showFormFragment(bEdit ? "ClientesDetalheChange" : "ClientesDetalheDisplay");
		},

		_getFormFragment: function(sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "arcelor.view." + sFragmentName);

			return this._formFragments[sFragmentName] = oFormFragment;
		},

		_showFormFragment: function(sFragmentName) {
			var oPage = this.getView().byId("page");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		},

		onNavBack: function(event) {

			this._fieldsDisableEnable("Save");
			this._toggleButtonsAndView(false);
			this._clearForm();
			this.onExit();

			this.getOwnerComponent().getRouter().navTo("ClientesConsulta", null, true);
		},

		onDeleteRecebedor: function() {
			this.getView().byId("input-RecebedorCodigo").setValue("");
			this.getView().byId("input-RecebedorMercadoriaNome").setValue("");
		},

		onDeletePagador: function() {
			this.getView().byId("input-PagadorCodigo").setValue("");
			this.getView().byId("input-PagadorNome").setValue("");
		},

		onDeleteRecebedorFatura: function() {
			this.getView().byId("input-RecebedorFaturaCodigo").setValue("");
			this.getView().byId("input-RecebedorFaturaNome").setValue("");
		},
		
		onDeleteCobranca: function() {
			this.getView().byId("input-CobrancaCodigo").setValue("");
			this.getView().byId("input-CobrancaNome").setValue("");
		},

		onMaskCEP: function(oEvent) {

			var thisView = this;
			var cep = thisView.utilClearCharToNumber(oEvent.getParameter("value"));

			if (cep.length >= 8) {

				this.getView().byId("input-Cep").setValue(this.utilFormatterCEP(cep));

				var oView = this.getView();
				var oData = this.getView().getModel();

				var onError = function(odata, response) {
					oView.setBusy(false);

					sap.m.MessageBox.show('Cep não encontrado', {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "ArcelorMittal",
						actions: [sap.m.MessageBox.Action.OK],
						onClose: function(oAction) {
							thisView.byId("input-endereco").setValue("");
							thisView.byId("input-Bairro").setValue("");
							thisView.byId("input-numero").setValue("");
							thisView.byId("input-Complemento").setValue("");
							thisView.byId("input-Regiao").setSelectedKey(null);
							thisView.byId("input-Cidade").setSelectedKey(null);
						}
					});

				};

				var onSuccess = function(odata) {

					thisView.utilSearchCity(odata.Estado, thisView);
					var endereco = odata.TpLogradouro + " " + odata.Logradouro;
					thisView.byId("input-endereco").setValue(endereco);
					thisView.byId("input-Bairro").setValue(odata.Bairro);
					thisView.byId("input-Regiao").setSelectedKey(odata.Estado);
					thisView.byId("input-numero").setValue("");
					thisView.byId("input-Complemento").setValue("");
					thisView.byId("input-Cidade").setSelectedKey(odata.CodCidade);
					oView.setBusy(false);
				};

				oView.setBusy(true);
				var sPath = "/EnderecoSet(Cep='" + cep + "')";
				oData.read(sPath, {
					success: onSuccess,
					error: onError
				});

			}

		},
		
		onLimiteCidade: function(oEvent){
		
		 var sValue = oEvent.getParameter("value");
		 var thisView = this;
		 
		 if(sValue.length >= 35){
		 	var sTamanho = sValue.substr(0,34); 
		 	thisView.byId("input-Cidade").setValue(sTamanho);
		 }
			
		},

		onSearchCity: function() {

			var thisView = this;
			var oView = this.getView();

			var estado = thisView.getView().byId("input-Regiao").getSelectedKey();

			thisView.byId("input-endereco").setValue("");
			thisView.byId("input-Bairro").setValue("");
			thisView.byId("input-numero").setValue("");
			thisView.byId("input-Complemento").setValue("");
			thisView.byId("input-Cidade").setSelectedKey(null);

			if (estado !== " ") {
				oView.setBusy(true);
				thisView.utilSearchCity(estado, thisView);
				oView.setBusy(false);
			}

		},

		onSelectCity: function() {

			var thisView = this;

			thisView.byId("input-endereco").setValue("");
			thisView.byId("input-Bairro").setValue("");
			thisView.byId("input-numero").setValue("");
			thisView.byId("input-Complemento").setValue("");

		},

		onMaskTelefone: function(oEvent) {

			var telefone = oEvent.getParameter("value");

			//if(telefone.length >= 11){
			this.getView().byId("input-Telefone").setValue(this.utilFormatterTelefone(telefone));

			//this.getView().byId("input-listContatosTelefone").setValue(this.utilFormatterTelefone(telefone));
			//}

		},

		onMaskTelefoneContato: function(oEvent) {

			var telefone = oEvent.getParameter("value");

			var oTable    = this.getView().byId("input-listContatos");
			var m         = oTable.getModel();
			var data      = m.getProperty("/modelData");
			aDataContatos = [];

			for (var property1 in data) {
				aDataContatos.push({
					Nome         : data[property1].Nome,
					Sobrenome    : data[property1].Sobrenome,
					Telefone     : this.utilFormatterTelefone(data[property1].Telefone),
					Email        : data[property1].Email,
					Status       : data[property1].Status,
					Novo         : data[property1].Novo,
					StatusCampos : data[property1].StatusCampos
				});
			}

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({modelData: aDataContatos});

			var oTableData = this.getView().byId("input-listContatos");

			oTableData.setModel(oModel);

		}

	});

});