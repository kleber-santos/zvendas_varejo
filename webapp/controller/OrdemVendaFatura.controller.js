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

			// Model Inicial
			if (!this.getModel("OVModel")) {
				this.setModel(new JSONModel(), "OVModel");
			}

			this.getRouter().getRoute("OrdemVendaFatura").attachPatternMatched(this._onObjectMatched.bind(this), this);

		},

		_onObjectMatched: function(oEvent) {
			this.getModel("OVModel").setData({});
			this.getModel("OVModel").refresh(true);
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

		onSearchCombo: function(oEvent) {
			var aFilters = [];
			var oOVModelData = this.getView().getModel("OVModel").getData();

			if (oOVModelData.OVData.length > 0) {
				for (var sProperty in oOVModelData) {
					switch (sProperty) {
						case "GeralFilter":
							aFilters.push( new Filter("StatusGlobal", FilterOperator.EQ, oOVModelData[sProperty].substring(1, 3)));
							break;
						case "LimboFilter":
							aFilters.push( new Filter("StatusLimbo", FilterOperator.EQ, oOVModelData[sProperty].substring(1, 3)));
							break;
						case "CreditoFilter":
							aFilters.push( new Filter("StatusCred", FilterOperator.EQ, oOVModelData[sProperty].substring(1, 3)));
							break;
						case "RemessaFilter":
							aFilters.push( new Filter("StatusReme", FilterOperator.EQ, oOVModelData[sProperty].substring(1, 3)));
							break;
						case "FaturaFilter":
							aFilters.push( new Filter("StatusFatura", FilterOperator.EQ, oOVModelData[sProperty].substring(1, 3)));
							break;
						default:
							break;
					}
				}

				if (aFilters.length > 0) {
					this.getView().byId("List").getBinding("items").filter(aFilters);
				}
			}

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

			this.getModel("OVModel").setData({});
			this.getModel("OVModel").refresh(true);
		},

		onSearch: function() {

			//this._loadMasterData();

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

			// Busca de Ordens de Venda    
			this.getView().setBusy(true);
			this.getModel().read("/OrdemVendaFaturaSet", {
				filters: filters,
				success: function(oSalesOrders) { 
					this.getView().setBusy(false);
					this.getModel("OVModel").setData({
						OVData: oSalesOrders.results
					});
					this.getModel("OVModel").refresh(true);
					this.getView().byId("List").getBinding("items").filter([]);
				}.bind(this),
				error: function(oError) {
					this.getView().setBusy(false);
					MessageBox.error('Erro ao buscar Ordens de Venda', {
						title: "ArcelorMittal",
						styleClass: "sapUiSizeCompact"
					});
				}.bind(this)
			});

		},

		handleSearchClientes: function(oEvent) {

			this.onSearchClientes(oEvent);

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

		},

		handleMessagePopoverPress: function(oEvent) {
			oMessagePopover.openBy(oEvent.getSource());
		}

	});
});