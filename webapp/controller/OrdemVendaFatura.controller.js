sap.ui.define([
	"arcelor/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/GroupHeaderListItem",
	"sap/ui/Device",
	"arcelor/model/formatter",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/Token",
	"sap/m/MessagePopover",
	"sap/m/MessagePopoverItem"
], function(BaseController, JSONModel, History, Filter, FilterOperator, GroupHeaderListItem, Device, formatter, MessageBox, MessageToast,
	Token, MessagePopover, MessagePopoverItem) {
	"use strict";

	var aDataCargaDados = 0;
	var aDataTable;
	var aMessagePopover = [];
	var modelDataMessagePopover;

	var oMessageTemplate = new MessagePopoverItem({
		type: '{type}',
		title: '{title}',
		description: '{description}',
		subtitle: '{subtitle}',
		counter: '{counter}',
		link: ""
	});

	var oMessagePopover = new MessagePopover({
		items: {
			path: '/modelDataMessagePopover',
			template: oMessageTemplate
		}
	});

	return BaseController.extend("arcelor.controller.OrdemVendaFatura", {

		onInit: function() {

			this.setInitalDateValue();

		},

		onBeforeRendering: function() {

		},

		onAfterRendering: function() {

		},

		onNavBack: function(oEvent) {

			this.handleClearFields();
			this.getOwnerComponent().getRouter().navTo("Pedidos", null, true);
		},

		setInitalDateValue: function() {

			var date = this.getView().byId("input-dateEmitidas");
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

			date = this.getView().byId("input-DtRemessa");

			date.addEventDelegate({
				onAfterRendering: function() {
					var oDateInner = this.$().find('.sapMInputBaseInner');
					var oID = oDateInner[0].id;
					$('#' + oID).attr("disabled", "disabled");
				}
			}, date);

		},

		classColor: function(sStatus) {
			return (sStatus && sStatus.length > 0 ? "statusUiIcon" + sStatus : "");
		},

		status: function(Status) {

			var icone;

			switch (Status) {
				case "L0":
					icone = "sap-icon://status-inactive";
					break;
				case "L1":
					icone = "sap-icon://status-positive";
					break;
				case "L2":
					icone = "sap-icon://status-critical";
					break;
				case "L3":
					icone = "sap-icon://status-error";
					break;
				default:
					break;
			}

			return icone;

		},

		iconColor: function(Status) {

			var color;

			return color = "#9dd53a";

			/*switch (Status) {
				case "L0":
					color = "#9dd53a";
					break;
				case "L1":
					color = "#9dd53a";
					break;
				case "L2":
					color = "#DF013A";
					break;
				case "L3":
					color = "#DF013A";
					break;
				default:
					break;
			}

			return color;*/

		},

		onAddToken: function() {

			var oMultiInput = this.getView().byId("multiinput-ordem");
			var tokens = oMultiInput.getTokens();

			var value = oMultiInput.getValue();

			if (value !== "") {

				if ($.isNumeric(value)) {

					if (value.length <= 10) {

						oMultiInput.setValue("");
						var token = new Token({
							text: value,
							key: tokens.length + 1
						});
						oMultiInput.addToken(token);

					} else {

						MessageBox.error('Permitido no máximo 10 caracteres!', {
							title: "ArcelorMittal",
							styleClass: "sapUiSizeCompact"
						});

						return false;

					}

				} else {

					MessageBox.error('Valor informado deve ser numérico!', {
						title: "ArcelorMittal",
						styleClass: "sapUiSizeCompact"
					});

					return false;

				}

			}

		},

		_loadMasterData: function() {

			this._readListMasterData();
		},

		_readListMasterData: function() {

			var aDataStatusGeral = []; // GL
			var aDataLimbo = []; // LI
			var aDataCredito = []; // CR
			var aDataRemessa = []; // RE
			var aDataFatura = []; // FA

			if (aDataCargaDados === 0) {

				var table = this.getView().byId("input-dadosMestres");
				var rowItems = table.getItems(); //getSelectedItems();

				if (rowItems.length === 0) {
					return false;
				}

				aDataCargaDados = 1;

				for (var i = 0; i < rowItems.length; i++) {
					var item = rowItems[i];

					var Cells = item.getCells();
					// Get ID and Name
					var Codconsulta = Cells[0].getValue();
					var Coddadomestre = Cells[1].getValue();
					var Textodadomestre = Cells[2].getValue();

					if (Codconsulta === "GL") {
						aDataStatusGeral.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

					if (Codconsulta === "LI") {
						aDataLimbo.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

					if (Codconsulta === "CR") {
						aDataCredito.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

					if (Codconsulta === "RE") {
						aDataRemessa.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

					if (Codconsulta === "FA") {
						aDataFatura.push({
							Codconsulta: Codconsulta,
							Coddadomestre: Coddadomestre,
							Textodadomestre: Textodadomestre
						});
					}

				}

				var oModelStatusGeral = new sap.ui.model.json.JSONModel();
				oModelStatusGeral.setData({
					modelDataStatusGeral: aDataStatusGeral
				});
				var oDataStatusGeral = this.getView().byId("combo-geral");
				oDataStatusGeral.setModel(oModelStatusGeral);

				var oModelLimbo = new sap.ui.model.json.JSONModel();
				oModelLimbo.setData({
					modelDataLimbo: aDataLimbo
				});
				var oDataLimbo = this.getView().byId("combo-limbo");
				oDataLimbo.setModel(oModelLimbo);

				var oModelCredito = new sap.ui.model.json.JSONModel();
				oModelCredito.setData({
					modelDataCredito: aDataCredito
				});
				var oDataCredito = this.getView().byId("combo-credito");
				oDataCredito.setModel(oModelCredito);

				var oModelRemessa = new sap.ui.model.json.JSONModel();
				oModelRemessa.setData({
					modelDataRemessa: aDataRemessa
				});
				var oDataRemessa = this.getView().byId("combo-remessa");
				oDataRemessa.setModel(oModelRemessa);

				var oModelFatura = new sap.ui.model.json.JSONModel();
				oModelFatura.setData({
					modelDataFatura: aDataFatura
				});
				var oDataFatura = this.getView().byId("combo-fatura");
				oDataFatura.setModel(oModelFatura);

			}

		},

		onSearchCombo: function(oEvent) {

			var oTable, m, data;
			var oData = [];
			var oDataAux = [];
			var oBindingContext = oEvent.getSource();

			oTable = this.getView().byId("List");
			m = oTable.getModel();
			data = m.getProperty("/OrdemVendaFaturaSet");

			oData = m.oData;

			/*			var list = this.getView().byId("List");
						var binding = list.getBinding("items");
						aDataTable = list.getItems();

						for (var i = 0; i < aDataTable.length; i++) {

							if (i > 5) {
								aDataTable.splice(i, 1);
							}

						}

						var oModel = list.getModel();
						oModel.setData({
							OrdemVendaFaturaSet: aDataTable
						});

						list.setModel(oModel);*/

		},

		handleClearFields: function() {

			this.getView().byId("multiinput-ordem").removeAllTokens();
			this.getView().byId("input-DtRemessa").setValue("");
			this.getView().byId("input-Cliente").setValue("");
			this.getView().byId("input-dateEmitidas").setValue("");

			var filters = [];
			var list = this.getView().byId("List");
			var binding = list.getBinding("items");
			binding.filter(filters);

			this.setInitalDateValue();

		},

		onSearch: function() {

			this._loadMasterData();

			var thisView = this;

			var filters = [];
			var filter;
			var value;

			//	value = this.getView().byId("input-ordem").getValue("");
			value = this.getView().byId("multiinput-ordem");
			value = value.getTokens();

			if (value.length > 0) {

				var ordem;

				for (var i = 0; i < value.length; i++) {

					ordem = value[i].getProperty("text");
					filter = new sap.ui.model.Filter("Ordem", sap.ui.model.FilterOperator.Contains, ordem);
					filters.push(filter);

				}

			}

			value = this.getView().byId("input-Cliente").getValue("");
			if (value !== "") {
				filter = new sap.ui.model.Filter("Cliente", sap.ui.model.FilterOperator.Contains, value);
				filters.push(filter);
			}

			value = this.getView().byId("input-DtRemessa");
			if (value !== "") {

				var from = value.getDateValue();

				if (from !== null) {

					from = from.getFullYear() + '-' + this.utilMonthDateGet(from.getMonth()) + '-' + from.getDate();
					filter = new sap.ui.model.Filter("DtRemessaDe", sap.ui.model.FilterOperator.BT, from);
					filters.push(filter);

					var to = value.getSecondDateValue();
					to = to.getFullYear() + '-' + this.utilMonthDateGet(to.getMonth()) + '-' + to.getDate();
					filter = new sap.ui.model.Filter("DtRemessaAte", sap.ui.model.FilterOperator.BT, to);
					filters.push(filter);

				}

			}

			value = this.getView().byId("input-dateEmitidas");
			if (value !== "") {

				var from = value.getDateValue();

				if (from !== null) {

					from = from.getFullYear() + '-' + this.utilMonthDateGet(from.getMonth()) + '-' + from.getDate();
					filter = new sap.ui.model.Filter("DtEmiDe", sap.ui.model.FilterOperator.BT, from);
					filters.push(filter);

					var to = value.getSecondDateValue();
					to = to.getFullYear() + '-' + this.utilMonthDateGet(to.getMonth()) + '-' + to.getDate();
					filter = new sap.ui.model.Filter("DtEmiAte", sap.ui.model.FilterOperator.BT, to);
					filters.push(filter);

				} else {

					MessageBox.error('Informar data Emitidas no período.', {
						title: "ArcelorMittal",
						styleClass: "sapUiSizeCompact"
					});

					return false;

				}

			}

			var list = thisView.getView().byId("List");
			var binding = list.getBinding("items");
			binding.filter(filters);

		},

		handleSearchClientes: function(oEvent) {

			this.onSearchClientes(oEvent);

			/*var filters = [];
			var query = oEvent.getParameter("value");
			var query2 = query;
			query = this.utilFormatterCPFCNPJClearSearch(query);

			if ((query && query.length > 0) && (query.trim() !== "")) {

				var filter;

				if ($.isNumeric(query) && query.length === 11) {
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
			binding.filter(filters);*/

		},

		handleValueHelp: function(oEvent) {

			var sInputValue, sSearchFiled;

			sInputValue = oEvent.getSource().getValue();
			sInputValue = this.utilFormatterCPFCNPJClearSearch(sInputValue);

			if ($.isNumeric(sInputValue) && sInputValue.length === 11) {
				sSearchFiled = "Cpf";
			}
			if ($.isNumeric(sInputValue) && sInputValue.length < 11) {
				sSearchFiled = "Codcliente";
			} else if ($.isNumeric(sInputValue) && sInputValue.length > 11) {
				sSearchFiled = "Cnpj";
			} else if (!$.isNumeric(sInputValue)) {
				sSearchFiled = "Nome";
			}

			if (this._oDialog) {
				this._oDialog.destroy();
			}

			this.inputId = oEvent.getSource().getId();

			//if (! this._oDialog) {
			this._oDialog = sap.ui.xmlfragment("arcelor.view.ClientesPesquisaDialog", this);
			this._oDialog.setModel(this.getView().getModel());
			//}

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);

			// create a filter for the bindinghandleValueHelp
			this._oDialog.getBinding("items").filter(
				[new sap.ui.model.Filter(sSearchFiled, sap.ui.model.FilterOperator.Contains, sInputValue)]
			);

			// open value help dialog filtered by the input value
			this._oDialog.open(sInputValue);

		},

		_handleValueHelpClose: function(evt) {

			var oSelectedItem, fieldInput;

			oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				fieldInput = this.getView().byId(this.inputId);
				fieldInput.setValue(oSelectedItem.getDescription());
			}
			evt.getSource().getBinding("items").filter([]);

		},

		handleLiberarLimboPress: function(oEvent) {

			var thisView = this;

			var aItems = this.getView().byId('List').getItems();
			var qtdItems = 0;
			var indice;

			for (var i = 0; i < aItems.length; i++) {
				if (aItems[i].getSelected()) {
					indice = i;
					qtdItems = qtdItems + 1;
				}
			}

			if (qtdItems === 0) {

				MessageBox.error('Nenhum item foi selecionado', {
					title: "ArcelorMittal",
					styleClass: "sapUiSizeCompact"
				});

				return false;

			}

			if (qtdItems > 1) {

				MessageBox.error('Selecionar apenas um item!', {
					title: "ArcelorMittal",
					styleClass: "sapUiSizeCompact"
				});

				return false;

			}

			/*if (aItems[indice].getBindingContext().getProperty("StatusLimbo") !== "L3") {

				MessageBox.error('Documento não permite liberar Limbo!', {
					title: "ArcelorMittal",
					styleClass: "sapUiSizeCompact"
				});

				return false;
			}*/

			var ordem = aItems[indice].getBindingContext().getProperty("Ordem");

			var oModel = this.getView().getModel();

			var oData = {
				"Ordemvenda": ordem
			};

			this.getView().setBusy(true);

			oModel.create("/LimboSet", oData, {

				success: function(oCreatedEntry, success, response, odata) {

					thisView.getView().setBusy(false);

					var hdrMessage = success.headers["sap-message"];
					var hdrMessageObject = JSON.parse(hdrMessage);
					var message = hdrMessageObject.message;

					MessageBox.success(message, {
						title: "ArcelorMittal",
						styleClass: "sapUiSizeCompact"
					});

				},
				error: function(oError, response) {

					thisView.getView().setBusy(false);

					var hdrMessage = JSON.parse(oError.responseText).error.message.value;

					MessageBox.error(hdrMessage, {
						title: "ArcelorMittal",
						styleClass: "sapUiSizeCompact"
					});

				}

			});

			//	oModel.submitChanges();

		},

		handleLiberarCreditoPress: function(oEvent) {

			var thisView = this;

			var aItems = this.getView().byId('List').getItems();
			var qtdItems = 0;
			var indice;

			if (aItems.length === 0) {

				MessageBox.error('Nenhum item foi selecionado', {
					title: "ArcelorMittal",
					styleClass: "sapUiSizeCompact"
				});

				return false;

			}

			for (var i = 0; i < aItems.length; i++) {
				if (aItems[i].getSelected()) {
					indice = i;
					qtdItems = qtdItems + 1;
				}
			}

			if (qtdItems == "0") {

				MessageBox.error('Nenhum item foi selecionado', {
					title: "ArcelorMittal",
					styleClass: "sapUiSizeCompact"
				});

				return false;

			}

			if (qtdItems > 1) {

				MessageBox.error('Selecionar apenas um item!', {
					title: "ArcelorMittal",
					styleClass: "sapUiSizeCompact"
				});

				return false;

			}

			/*if (aItems[indice].getBindingContext().getProperty("StatusCred") !== "L3") {

				MessageBox.error('Documento não permite liberar Crédito!', {
					styleClass: "sapUiSizeCompact"
				});

				return false;
			}*/

			var ordem = aItems[indice].getBindingContext().getProperty("Ordem");

			var oModel = this.getView().getModel();

			var oData = {
				"Ordemvenda": ordem
			};

			this.getView().setBusy(true);

			oModel.create("/LiberarCreditoOVSet", oData, {

				success: function(oCreatedEntry, success, response, odata) {

					thisView.getView().setBusy(false);

					var hdrMessage = success.headers["sap-message"];
					var hdrMessageObject = JSON.parse(hdrMessage);
					var message = hdrMessageObject.message;

					MessageBox.success(message, {
						title: "ArcelorMittal",
						styleClass: "sapUiSizeCompact"
					});

				},
				error: function(oError, response) {

					thisView.getView().setBusy(false);

					var hdrMessage = JSON.parse(oError.responseText).error.message.value;

					MessageBox.error(hdrMessage, {
						title: "ArcelorMittal",
						styleClass: "sapUiSizeCompact"
					});

				}

			});

			//	oModel.submitChanges();

		},

		handleFaturarOVPress: function(oEvent) {

			var thisView = this;

			var aItems = this.getView().byId('List').getItems();
			var qtdItems = 0;
			var ordem;

			this.byId("button-popover").setVisible(false);

			for (var i = 0; i < aItems.length; i++) {
				if (aItems[i].getSelected()) {

					qtdItems = qtdItems + 1;

					if (qtdItems === 1) {
						ordem = aItems[i].getBindingContext().getProperty("Ordem");
					} else {
						ordem = ordem + ";" + aItems[i].getBindingContext().getProperty("Ordem");
					}

				}
			}

			if (qtdItems === 0) {

				MessageBox.error('Nenhum item foi selecionado', {
					title: "ArcelorMittal",
					styleClass: "sapUiSizeCompact"
				});

				return false;

			}

			/*if (qtdItems > 1) {

				MessageBox.error('Selecionar apenas um item!', {
					title: "ArcelorMittal",
					styleClass: "sapUiSizeCompact"
				});

				return false;

			}*/

			/*if (aItems[indice].getBindingContext().getProperty("StatusFatura") !== "L3") {

				MessageBox.error('Documento não permite liberar Crédito!', {
					title: "ArcelorMittal",
					styleClass: "sapUiSizeCompact"
				});

				return false;
			}*/

			var oModel = this.getView().getModel();

			var oData = {
				"Ordemvenda": ordem
			};

			this.getView().setBusy(true);

			oModel.create("/FaturarOVSet", oData, {

				success: function(oCreatedEntry, success, response, odata) {

					thisView.getView().setBusy(false);

					var hdrMessage = success.headers["sap-message"];
					var hdrMessageObject = JSON.parse(hdrMessage);
					var message = hdrMessageObject.message;

					MessageBox.success(message, {
						title: "ArcelorMittal",
						styleClass: "sapUiSizeCompact"
					});

					message = hdrMessageObject.details;

					aMessagePopover = [];

					for (var property1 in message) {

						var typeMessage;

						if (message[property1].severity === "info") {
							typeMessage = "Success";
						} else if (message[property1].severity === "error") {
							typeMessage = "Error";
						}

						aMessagePopover.push({
							type: typeMessage,
							title: "Processamento Ordem de Venda",
							description: message[property1].message,
							subtitle: message[property1].message,
							counter: parseInt(property1) + 1,
							link: ""
						});

					}

					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData({
						modelDataMessagePopover: aMessagePopover
					});

					oMessagePopover.setModel(oModel);

					thisView.byId("button-popover").setVisible(true);

				},
				error: function(oError, response) {

					thisView.getView().setBusy(false);

					var hdrMessage = JSON.parse(oError.responseText).error.message.value;

					MessageBox.error(hdrMessage, {
						title: "ArcelorMittal",
						styleClass: "sapUiSizeCompact"
					});

				}

			});

			//thisView.getView().setBusy(true);
			//	oModel.submitChanges();

		},

		handleMessagePopoverPress: function(oEvent) {
			oMessagePopover.openBy(oEvent.getSource());
		}

	});
});