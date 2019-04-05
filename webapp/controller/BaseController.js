/*global history */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/Popover",
	"sap/m/Button"
], function(Controller, History, Popover, Button) {
	"use strict";

	return Controller.extend("arcelor.controller.BaseController", {
		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},

		getRouterVarejo: function() {
			return this.getRouter();
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function(sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Event handler for navigating back.
		 * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 */
		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash(),
				oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {
				history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true);
			}
		},

		utilFormatterCPFCNPJ: function(sValue, sTipo) {
			var retorno = "";

			if (sTipo === "F") {
				retorno = sValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
			} else {
				retorno = sValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
			}

			return retorno;
		},

		utilFormatterCPFCNPJClear: function(sValue) {
			return sValue.replace(/\D+/g, '');
		},

		utilClearCharToNumber: function(sValue) {
			return sValue.replace(/\D+/g, '');
		},

		utilFormatterCPFCNPJClearSearch: function(sValue) {
			var exp = /\-|\.|\/|\(|\)| /g;
			var campoSoNumeros = sValue.toString().replace(exp, "");
			return campoSoNumeros;
		},

		utilFormatterCEP: function(sValue) {
			return sValue.replace(/^([\d]{5})([\d]{3})/, "$1-$2");
		},

		utilFormatterTelefone: function(sValue) {
			sValue = sValue.replace(/\D/g, ""); //Remove tudo o que não é dígito
			sValue = sValue.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos tres primeiros dígitos
			sValue = sValue.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
			return sValue;
		},

		utilFormatterNumber: function(sValue) {
			var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
				maxFractionDigits: 2,
				groupingEnabled: true,
				groupingSeparator: ",",
				decimalSeparator: "."
			});

			return oNumberFormat.parse(sValue);

		},

		utilFormatterNumberUS: function(sValue) {

			var oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
				maxFractionDigits: 3,
				groupingEnabled: true,
				groupingSeparator: ".",
				decimalSeparator: ","
			});

			return oNumberFormat.parse(sValue);

		},

		uitlFormatterFieldMoeda: function(sValue) {

			sValue = sValue + '';
			sValue = parseInt(sValue.replace(/[\D]+/g, ''));
			sValue = sValue + '';
			sValue = sValue.replace(/([0-9]{2})$/g, ",$1");
			if (sValue.length > 6) {
				sValue = sValue.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
			}

			return sValue;

		},

		utilFormatterCurrency: function(sValue, sLocale) {

			return sValue.toLocaleString(sLocale);

		},

		utilMonthDateGet: function(sValue) {

			var month;

			switch (sValue) {

				case 0:
					month = '01';
					break;

				case 1:
					month = '02';
					break;

				case 2:
					month = '03';
					break;

				case 3:
					month = '04';
					break;

				case 4:
					month = '05';
					break;

				case 5:
					month = '06';
					break;

				case 6:
					month = '07';
					break;

				case 7:
					month = '08';
					break;

				case 8:
					month = '09';
					break;

				case 9:
					month = '10';
					break;

				case 10:
					month = '11';
					break;

				case 11:
					month = '12';
					break;

				default:
					break;
			}
			return month;
		},

		utilFormatterDateToBR: function(sValue) {

			var date = new Date(sValue);
			date.setDate(date.getDate() + 1);

			var day = date.getDate();
			var month = this.utilMonthDateGet(date.getMonth());
			var year = date.getFullYear();

			return day + '/' + month + '/' + year;

		},

		utilSearchCity: function(oEvent, thisView) {

			//var thisView = this;
			var filters = [];
			var filter;

			filter = new sap.ui.model.Filter("Estado", sap.ui.model.FilterOperator.EQ, oEvent);
			filters.push(filter);

			var cidades = thisView.getView().byId("input-Cidade");
			var binding = cidades.getBinding("items");
			binding.filter(filters);

		},

		handleUserNamePress: function(oEvent) {
			var popover = new Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content: [
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
						press: function() {
							window.close();
						}
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			popover.openBy(oEvent.getSource());
		},

		onSearchClientes: function(oEvent) {

			var filters = [];
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
			binding.filter(filters);

		}

	});

});