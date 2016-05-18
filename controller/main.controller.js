jQuery.sap.require("sap.ui.commons.RichTooltip");
jQuery.sap.require("sap.ui.commons.TextView");
jQuery.sap.require("sap.ui.commons.TextViewDesign");
jQuery.sap.require("sap.ui.commons.Image");
jQuery.sap.require("sap.ui.ux3.OverlayContainer");
jQuery.sap.require("sap.ui.comp.valuehelpdialog.ValueHelpDialog");
sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("ZSLCM_PREGRADO.controller.main", {
		//init Controller
		onInit: function() {
			var oView = this.getView();
			var oITFDatosPersonales = oView.byId("oITFDatosPersonales");
			oITFDatosPersonales.data("AcceptCond", "0", true);
			oITFDatosPersonales.data("Incomplete", "0", true);

			var oITFDatosInscripcion = oView.byId("oITFDatosInscripcion");
			oITFDatosInscripcion.data("Incomplete", "0", true);

			var oITFDatosAcademicos = oView.byId("oITFDatosAcademicos");
			oITFDatosAcademicos.data("Incomplete", "0", true);

			var oITFDatosFamiliares = oView.byId("oITFDatosFamiliares");
			oITFDatosFamiliares.data("Incomplete", "0", true);

			var oITFDatosAdicionales = oView.byId("oITFDatosAdicionales");
			oITFDatosAdicionales.data("Incomplete", "0", true);

			var oITFResumen = oView.byId("oITFResumen");
			oITFResumen.data("Incomplete", "0", true);

			var oIColegio = this.getView().byId("oIColegio");
			var oToolTipColegio = new sap.ui.commons.RichTooltip({
				text: "Usa palabras claves de tu colegio \nPor ejemplo: 'San Viator', 'Gimnasio Moderno', 'Liceo frances'... \nLuego has clic en el icono de este campo para buscar el Colegio o en el boton Buscar",
				title: "Ayuda Rapida"
			});
			oIColegio.setTooltip(oToolTipColegio);

			var oIUniversidad = this.getView().byId("oIUniversidad");
			var oToolTipUniversidad = new sap.ui.commons.RichTooltip({
				text: "Usa palabras claves de tu universidad \nPor ejemplo: 'Sergio', 'Piloto', 'Nacional'... \nLuego has clic en el icono de este campo para buscar la Universidad o en el boton Buscar",
				title: "Ayuda Rapida"
			});
			oIUniversidad.setTooltip(oToolTipUniversidad);

			var oITelInd = this.getView().byId("oITelResInd");
			var oToolTip_TelInd = new sap.ui.commons.RichTooltip({
				text: "Digita el Indicativo de tu telefono fijo \nPor ejemplo: 031, 035...",
				title: "Ayuda Rapida"
			});
			oITelInd.setTooltip(oToolTip_TelInd);

			var oICelular1 = this.getView().byId("oITelCelInd");
			var oToolTip_cel1 = new sap.ui.commons.RichTooltip({
				text: "Digita los 3 primeros numeros de tu número de celular \nPor ejemplo: 320, 301...",
				title: "Ayuda Rapida"
			});
			oICelular1.setTooltip(oToolTip_cel1);

			var oICelular2 = this.getView().byId("oITelCel");
			var oToolTip_cel2 = new sap.ui.commons.RichTooltip({
				text: "Digita el resto de tu número de celular",
				title: "Ayuda Rapida"
			});
			oICelular2.setTooltip(oToolTip_cel2);
			
			var oSDptoNac = this.getView().byId("oSDptoNac");
			var oToolTip_DptoNac = new sap.ui.commons.RichTooltip({
				text: "Si su lugar de nacimiento es la ciudad de Bogotá, debe seleccionar en departamento, Bogotá, No Cundinamarca.",
				title: "Importante!"
			});
			oSDptoNac.setTooltip(oToolTip_DptoNac);
			
			var oSDptoRes = this.getView().byId("oSDptoRes");
			var oToolTip_DptoRes = new sap.ui.commons.RichTooltip({
				text: "Si su lugar de nacimiento es la ciudad de Bogotá, debe seleccionar en departamento, Bogotá, No Cundinamarca.",
				title: "Importante!"
			});
			oSDptoRes.setTooltip(oToolTip_DptoRes);
			
			this.aEstudioItems = [{
				Id: "oIColegio"
			}, {
				Id: "oITituloColegio"
			}, {
				Id: "oSEstatusColegio"
			}, {
				Id: "oDTIGradoColegio"
			}, {
				Id: "oIUniversidad"
			}, {
				Id: "oITituloUniversidad"
			}, {
				Id: "oSEstatusUniversidad"
			}, {
				Id: "oDTIGradoUniversidad"
			}];
			
			var path = $.sap.getModulePath("", "/image/logo2.jpg");
			path.replace("resources/", "");
			var oImgUsaLogo = oView.byId("oImgUsaLogo");
			oImgUsaLogo.setSrc(path);

			this.aUpdateEstudiante = false;
			this.aSaveEstudiante = false;
			this.aSaveEstudio = false;
			this.aSaveReferencia = false;
			this.aEncuesta = false;
			this.aSaveSaber = false;
			this.aUpdateDir = false;
			this.TextPopUP = "";
		},
		//ayuda de busqueda titulo secundario
		helpRequestTituloBachiller: function() {
			var oView = this.getView();
			var oITituloColegio = oView.byId("oITituloColegio");
			var sTextSearch = oITituloColegio.getValue();
			var oModel = oView.getModel();
			var sPath = "/TituloBachillerSet?$filter=startswith(Stext, '" + sTextSearch + "')";
			if (!this._oDialogTituloColegio) {
				this._oDialogTituloColegio = sap.ui.xmlfragment("oDialogTituloColegio", "ZSLCM_PREGRADO.view.TituloBachiller", this);
				this._oDialogTituloColegio.setContentWidth("50%");
			}
			if(this.aSaveEstudio === false){
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					label: "Codigo",
					template: "Objid",
					width: "20%"
				}, {
					label: "Titulo",
					template: "Stext",
					demandPopin: true
				}]
			});
			sap.ui.getCore().byId("oDialogTituloColegio--oTSDTituloBachiller").setModel(oColModel, "columns");
			sap.ui.getCore().byId("oDialogTituloColegio--oTSDTituloBachiller").setModel(oModel);
			var oTable = sap.ui.getCore().byId("oDialogTituloColegio--oTSDTituloBachiller");
			if (sap.ui.getCore().byId("oDialogTituloColegio--oTSDTituloBachiller").bindItems) {
				oTable.bindAggregation("items", sPath, function(sId, oContext) {
					var aCols = oTable.getModel("columns").getData().cols;
					return new sap.m.ColumnListItem({
						cells: aCols.map(function(column) {
							var colname = column.template;
							return new sap.m.Label({
								text: "{" + colname + "}"
							}).addStyleClass("word-wrap");
						})
					});
				});
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", oView, this._oDialogTituloColegio);
			this._oDialogTituloColegio.open(sTextSearch);
			}
		},
		handleTituloBachillerSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var sPath = "/TituloBachillerSet?$filter=startswith(Stext, '" + sValue + "')";
			var oTable = sap.ui.getCore().byId("oDialogTituloColegio--oTSDTituloBachiller");
			oTable.unbindItems();
			if (sap.ui.getCore().byId("oDialogTituloColegio--oTSDTituloBachiller").bindItems) {
				oTable.bindAggregation("items", sPath, function(sId, oContext) {
					var aCols = oTable.getModel("columns").getData().cols;
					return new sap.m.ColumnListItem({
						cells: aCols.map(function(column) {
							var colname = column.template;
							return new sap.m.Label({
								text: "{" + colname + "}"
							}).addStyleClass("word-wrap");
						})
					});
				});
			}
		},
		handleTituloBachillerConfirm: function(evt) {
			var oView = this.getView();
			var oITituloColegio = oView.byId("oITituloColegio");
			var oSelectedItem = evt.getParameter("selectedItem");
			var datos = oSelectedItem.mAggregations.cells;
			if (datos) {
				oITituloColegio.data("Objid", datos[0].mProperties.text, true);
				oITituloColegio.setValue(datos[1].mProperties.text);
				oITituloColegio.setValueState(sap.ui.core.ValueState.None);
			}
		},
		handleTituloBachillerClose: function() {
			var oTable = sap.ui.getCore().byId("oDialogTituloColegio--oTSDTituloBachiller");
			oTable.unbindItems();
			this._oDialogTituloColegio.close();
		},
		//ayuda de busqueda titulo universitario
		helpRequestTituloUniversitario: function() {
			var oView = this.getView();
			var oITituloUniversidad = oView.byId("oITituloUniversidad");
			var sTextSearch = oITituloUniversidad.getValue();
			var oModel = oView.getModel();
			var sPath = "/TituloUniversitarioSet?$filter=startswith(Stext, '" + sTextSearch + "')";
			if (!this._oDialogTituloUniversitario) {
				this._oDialogTituloUniversitario = sap.ui.xmlfragment("oDialogTituloUniversitario", "ZSLCM_PREGRADO.view.TituloUniversitario", this);
				this._oDialogTituloUniversitario.setContentWidth("50%");
			}
			if(this.aSaveEstudio === false){
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					label: "Codigo",
					template: "Objid",
					width: "20%"
				}, {
					label: "Titulo",
					template: "Stext",
					demandPopin: true
				}]
			});
			sap.ui.getCore().byId("oDialogTituloUniversitario--oTSDTituloUniversitario").setModel(oColModel, "columns");
			sap.ui.getCore().byId("oDialogTituloUniversitario--oTSDTituloUniversitario").setModel(oModel);
			var oTable = sap.ui.getCore().byId("oDialogTituloUniversitario--oTSDTituloUniversitario");
			if (sap.ui.getCore().byId("oDialogTituloUniversitario--oTSDTituloUniversitario").bindItems) {
				oTable.bindAggregation("items", sPath, function(sId, oContext) {
					var aCols = oTable.getModel("columns").getData().cols;
					return new sap.m.ColumnListItem({
						cells: aCols.map(function(column) {
							var colname = column.template;
							return new sap.m.Label({
								text: "{" + colname + "}"
							}).addStyleClass("word-wrap");
						})
					});
				});
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", oView, this._oDialogTituloUniversitario);
			this._oDialogTituloUniversitario.open(sTextSearch);
			}
		},
		handleTituloUniversitarioSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var sPath = "/TituloUniversitarioSet?$filter=startswith(Stext, '" + sValue + "')";
			var oTable = sap.ui.getCore().byId("oDialogTituloUniversitario--oTSDTituloUniversitario");
			oTable.unbindItems();
			if (sap.ui.getCore().byId("oDialogTituloUniversitario--oTSDTituloUniversitario").bindItems) {
				oTable.bindAggregation("items", sPath, function(sId, oContext) {
					var aCols = oTable.getModel("columns").getData().cols;
					return new sap.m.ColumnListItem({
						cells: aCols.map(function(column) {
							var colname = column.template;
							return new sap.m.Label({
								text: "{" + colname + "}"
							}).addStyleClass("word-wrap");
						})
					});
				});
			}
		},
		handleTituloUniversitarioConfirm: function(evt) {
			var oView = this.getView();
			var oITituloUniversidad = oView.byId("oITituloUniversidad");
			var oSelectedItem = evt.getParameter("selectedItem");
			var datos = oSelectedItem.mAggregations.cells;
			if (datos) {
				oITituloUniversidad.data("Objid", datos[0].mProperties.text, true);
				oITituloUniversidad.setValue(datos[1].mProperties.text);
				oITituloUniversidad.setValueState(sap.ui.core.ValueState.None);
			}
		},
		handleTituloUniversitarioClose: function() {
			var oTable = sap.ui.getCore().byId("oDialogTituloUniversitario--oTSDTituloUniversitario");
			oTable.unbindItems();
			this._oDialogTituloUniversitario.close();
		},
		//ayuda de busqueda Colegio
		helpRequestColegio: function() {
			var oView = this.getView();
			var oIColegio = oView.byId("oIColegio");
			var sTextSearch = oIColegio.getValue();
			var oModel = oView.getModel();
			var sPath = "/ColegioSet?$filter=startswith(Stext, '" + sTextSearch + "')";
			if (!this._oDialogcolegio) {
				this._oDialogcolegio = sap.ui.xmlfragment("oDialogcolegio", "ZSLCM_PREGRADO.view.Colegio", this);
			}
			if(this.aSaveEstudio === false){
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					label: "Colegio",
					template: "Stext",
					width: "40%"
				}, {
					label: "Codigo",
					template: "Objid",
					demandPopin: true
				}, {
					label: "Pais",
					template: "Landx50",
					width: "20%",
					demandPopin: true
				}, {
					label: "Dpto",
					template: "Bezei",
					demandPopin: true
				}, {
					label: "Ciudad",
					template: "Ort01",
					demandPopin: true
				}]
			});
			sap.ui.getCore().byId("oDialogcolegio--oTSDColegio").setModel(oColModel, "columns");
			sap.ui.getCore().byId("oDialogcolegio--oTSDColegio").setModel(oModel);
			var oTable = sap.ui.getCore().byId("oDialogcolegio--oTSDColegio");
			if (sap.ui.getCore().byId("oDialogcolegio--oTSDColegio").bindItems) {
				oTable.bindAggregation("items", sPath, function(sId, oContext) {
					var aCols = oTable.getModel("columns").getData().cols;
					return new sap.m.ColumnListItem({
						cells: aCols.map(function(column) {
							var colname = column.template;
							return new sap.m.Label({
								text: "{" + colname + "}"
							}).addStyleClass("word-wrap");
						})
					});
				});
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", oView, this._oDialogcolegio);
			this._oDialogcolegio.open(sTextSearch);
			}
		},
		handleColegioSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var sPath = "/ColegioSet?$filter=startswith(Stext, '" + sValue + "')";
			var oTable = sap.ui.getCore().byId("oDialogcolegio--oTSDColegio");
			oTable.unbindItems();
			if (sap.ui.getCore().byId("oDialogcolegio--oTSDColegio").bindItems) {
				oTable.bindAggregation("items", sPath, function(sId, oContext) {
					var aCols = oTable.getModel("columns").getData().cols;
					return new sap.m.ColumnListItem({
						cells: aCols.map(function(column) {
							var colname = column.template;
							return new sap.m.Label({
								text: "{" + colname + "}"
							}).addStyleClass("word-wrap");
						})
					});
				});
			}
		},
		handleColegioConfirm: function(evt) {
			var oView = this.getView();
			var oIColegio = oView.byId("oIColegio");
			var oIDptoColegio = oView.byId("oIDptoColegio");
			var oICiudadColegio = oView.byId("oICiudadColegio");
			var oSelectedItem = evt.getParameter("selectedItem");
			var datos = oSelectedItem.mAggregations.cells;
			if (datos) {
				oIColegio.data("Objid", datos[1].mProperties.text, true);
				oIColegio.data("Landx50", datos[2].mProperties.text, true);
				oIColegio.setValue(datos[0].mProperties.text);
				oIDptoColegio.setValue(datos[3].mProperties.text);
				oICiudadColegio.setValue(datos[4].mProperties.text);
				oIColegio.setValueState(sap.ui.core.ValueState.None);
			}
		},
		handleColegioClose: function() {
			var oTable = sap.ui.getCore().byId("oDialogUniversidad--oTSDUniversidad");
			oTable.unbindItems();
			this._oUniversidadDialog.close();
		},
		//ayuda de busqueda Universidad
		helpRequestUniversidad: function() {
			var oView = this.getView();
			var oIUniversidad = oView.byId("oIUniversidad");
			var sTextSearch = oIUniversidad.getValue();
			var oModel = oView.getModel();
			var sPath = "/UniversidadSet?$filter=startswith(Stext, '" + sTextSearch + "')";
			if (!this._oDialogUniversidad) {
				this._oDialogUniversidad = sap.ui.xmlfragment("oDialogUniversidad", "ZSLCM_PREGRADO.view.Universidad", this);
			}
			if(this.aSaveEstudio === false){
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [{
					label: "Universidad",
					template: "Stext",
					width: "40%"
				}, {
					label: "Codigo",
					template: "Objid",
					demandPopin: true
				}, {
					label: "Pais",
					template: "Landx50",
					width: "20%",
					demandPopin: true
				}, {
					label: "Dpto",
					template: "Bezei",
					demandPopin: true
				}, {
					label: "Ciudad",
					template: "Ort01",
					demandPopin: true
				}]
			});
			sap.ui.getCore().byId("oDialogUniversidad--oTSDUniversidad").setModel(oColModel, "columns");
			sap.ui.getCore().byId("oDialogUniversidad--oTSDUniversidad").setModel(oModel);
			var oTable = sap.ui.getCore().byId("oDialogUniversidad--oTSDUniversidad");
			if (sap.ui.getCore().byId("oDialogUniversidad--oTSDUniversidad").bindItems) {
				oTable.bindAggregation("items", sPath, function(sId, oContext) {
					var aCols = oTable.getModel("columns").getData().cols;
					return new sap.m.ColumnListItem({
						cells: aCols.map(function(column) {
							var colname = column.template;
							return new sap.m.Label({
								text: "{" + colname + "}"
							}).addStyleClass("word-wrap");
						})
					});
				});
			}
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialogUniversidad);
			this._oDialogUniversidad.open(sTextSearch);
			}
		},
		handleUniversidadSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var sPath = "/UniversidadSet?$filter=startswith(Stext, '" + sValue + "')";
			var oTable = sap.ui.getCore().byId("oDialogUniversidad--oTSDUniversidad");
			oTable.unbindItems();
			if (sap.ui.getCore().byId("oDialogUniversidad--oTSDUniversidad").bindItems) {
				oTable.bindAggregation("items", sPath, function(sId, oContext) {
					var aCols = oTable.getModel("columns").getData().cols;
					return new sap.m.ColumnListItem({
						cells: aCols.map(function(column) {
							var colname = column.template;
							return new sap.m.Label({
								text: "{" + colname + "}"
							}).addStyleClass("word-wrap");
						})
					});
				});
			}
		},
		handleUniversidadConfirm: function(evt) {
			var oView = this.getView();
			var oIUniversidad = oView.byId("oIUniversidad");
			var oIDptoUniversidad = oView.byId("oIDptoUniversidad");
			var oICiudadUniversidad = oView.byId("oICiudadUniversidad");
			var oSelectedItem = evt.getParameter("selectedItem");
			var datos = oSelectedItem.mAggregations.cells;
			if (datos) {
				oIUniversidad.data("Objid", datos[1].mProperties.text, true);
				oIUniversidad.data("Landx50", datos[2].mProperties.text, true);
				oIUniversidad.setValue(datos[0].mProperties.text);
				oIDptoUniversidad.setValue(datos[3].mProperties.text);
				oICiudadUniversidad.setValue(datos[4].mProperties.text);
				oIUniversidad.setValueState(sap.ui.core.ValueState.None);
			}
		},
		handleUniversidadClose: function() {
			var oTable = sap.ui.getCore().byId("oDialogUniversidad--oTSDUniversidad");
			oTable.unbindItems();
			this._oUniversidadDialog.close();
		},
		//armar direccion pestaña datos personales
		tomarDirEst: function() {
			var oView = this.getView();
			var oIDirRes = oView.byId("oIDirRes");
			var sDirGen = "";
			var oDirElements = this._oDireccionDialogEst.getContent()[0].getFormContainers()[0].getFormElements();
			$.each(oDirElements, function(iEIndex, oElement) {
				var oFields = oElement.getFields();
				$.each(oFields, function(iFIndex, oField) {
					if (oField.getValue) {
						sDirGen = sDirGen + " " + oField.getValue();
					} else if (oField.getSelectedItem) {
						if (sDirGen === "") {
							sDirGen = oField.getSelectedItem().getText();
						} else {
							sDirGen = sDirGen + " " + oField.getSelectedItem().getText();
						}
					}
				});
			});
			oIDirRes.setValue(sDirGen);
			this._oDireccionDialogEst.close();
		},
		//armar direccion pestaña datos referencia
		tomarDirRef: function() {
			var oView = this.getView();
			var oIDirRef = oView.byId("oIDirRef");
			var sDirRef = "";
			var oDirRefElements = this._oDireccionDialogRef.getContent()[0].getFormContainers()[0].getFormElements();
			$.each(oDirRefElements, function(iEIndex, oElement) {
				var oFields = oElement.getFields();
				$.each(oFields, function(iFIndex, oField) {
					if (oField.getValue) {
						sDirRef = sDirRef + " " + oField.getValue();
					} else if (oField.getSelectedItem) {
						if (sDirRef === "") {
							sDirRef = oField.getSelectedItem().getText();
						} else {
							sDirRef = sDirRef + " " + oField.getSelectedItem().getText();
						}
					}
				});
			});
			oIDirRef.setValue(sDirRef);
			this._oDireccionDialogRef.close();
		},
		//buscar encuesta
		getEncuesta: function(that, oView, sNumId) {
			var aEncuesta = false;
			var sEncuestaPath = "/EncuestaSet('" + sNumId + "')";
			var oITFDatosAdicionales = oView.byId("oITFDatosAdicionales");
			oView.getModel().read(sEncuestaPath, null, null, false, function(oDataEst, oResponse) {
					console.log(oDataEst);
					if (oDataEst.ItId !== "") {
						oITFDatosAdicionales.unbindElement();
						oITFDatosAdicionales.bindElement(sEncuestaPath);
						that.aEncuesta = true;
						// jQuery.sap.delayedCall(100, that, function() {that.unlockForm(oITFDatosAdicionales, oView);});
					} else {
						oITFDatosAdicionales.unbindElement();
						aEncuesta = false;
						// jQuery.sap.delayedCall(100, that, function() {that.unlockForm(oITFDatosAdicionales, oView);});
					}
				},
				function(oDataRef, oResponse) {
					oITFDatosAdicionales.unbindElement();
					aEncuesta = false;
					// that.unlockForm(oITFDatosAdicionales, oView);
				});
			return aEncuesta;
		},
		//buscar estudio
		getEstudio: function(that, oView, sNumId, sEntityPath) {
			var oInput;
			var oModel = oView.getModel();
			var sEstudioPath = "/EstudioSet('" + sNumId + "')";
			var oITFDatosAcademicos = oView.byId("oITFDatosAcademicos");
			oView.getModel().read(sEstudioPath, null, null, false, function(oDataEst, oResponse) {
					console.log(oDataEst);
					if (oDataEst.ItId !== "") {
						oITFDatosAcademicos.unbindElement();
						oITFDatosAcademicos.bindElement(sEstudioPath);
						if(oDataEst.StextUni === ""){
							that.aSaveEstudio = false;
							oView.byId("oIUniversidad").setEditable(true);
							oView.byId("oITituloUniversidad").setEnabled(true);
							oView.byId("oSEstatusUniversidad").setEnabled(true);
							oView.byId("oDTIGradoUniversidad").setEnabled(true);
						}else{
							
							that.aSaveEstudio = true;
						}
						jQuery.sap.delayedCall(100, that, function() {
							that.unlockForm(oITFDatosAcademicos, oView);
						});
					} else {
						oITFDatosAcademicos.unbindElement();
						that.aSaveEstudio = false;
						jQuery.sap.delayedCall(100, that, function() {
							that.unlockForm(oITFDatosAcademicos, oView);
						});
					}
				},
				function(oDataRef, oResponse) {
					oITFDatosAcademicos.unbindElement();
					that.aSaveReferencia = false;
					that.unlockForm(oITFDatosAcademicos, oView);
				});
			//saber 11
			var oTbMaterias = oView.byId("oTbMaterias");
			var sMateriaPath = sEntityPath + "/EstudianteToSaber";
			oTbMaterias.bindAggregation("items", {
				path: sMateriaPath,
				template: new sap.m.ColumnListItem({
					cells: [
						new sap.m.Label({
							text: "{Subtesttext}"
						}),
						new sap.m.Text({
							text: "{Subtestid}"
						}),
						new sap.m.Text({
							text: "{Subtestres}"
						})
						// new sap.m.Button({
						// 	text:"borrar",
						// 	type:"Reject",
						// 	icon:"sap-icon://delete",
						// 	press : function(evt) {  
      //                                  if (evt.getSource().getParent().getParent().getItems().length > 0) {  
      //                                      var row = evt.getSource().getParent().getId();  
      //                                      evt.getSource().getParent().getParent().removeItem(row);  
      //                              }
						// 		}
						// 	}) 
					]
				})
			});
		},
		//agregar prueba saber
		addPruebaSaber: function(evt){
			var oView = this.getView();
			var oIPuntaje = oView.byId("oIPuntaje");
			var oSMateria = oView.byId("oSMateria");
			if(oSMateria.getSelectedItem().getText() !== "" && oIPuntaje.getValue() !== ""){
			var oTable = oView.byId("oTbMaterias");
			oTable.addItem(
				new sap.m.ColumnListItem({
					cells: [
						new sap.m.Text({
							text: oSMateria.getSelectedItem().getText()
						}),
						new sap.m.Text({
							text: oSMateria.getSelectedItem().getKey()
						}),
						new sap.m.Text({
							text: oIPuntaje.getValue()
						}),
						new sap.m.Button({
							text:"borrar",
							type:"Reject",
							icon:"sap-icon://delete",
							press : function(evt) {  
                                        if (evt.getSource().getParent().getParent().getItems().length > 0) {  
                                            var row = evt.getSource().getParent().getId();  
                                            evt.getSource().getParent().getParent().removeItem(row);  
                                    }
								}
							}) 
					]
				}));
				oIPuntaje.setValue("");
				oSMateria.setSelectedItemId("__xmlview0--oLIMateria-__xmlview0--oSMateria-0");
			}else{
				this.showDialog("Debe ingresar Materia y puntaje");
			}
		},
		//buscar referencia por documento
		getRefOnly: function() {
			var that = this;
			var oView = this.getView();
			var busyDialog = oView.byId("BusyDialog");
			var oModel = oView.getModel();
			var oINumIdenRef = oView.byId("oINumIdenRef");
			var oSTipoIdenRef = oView.byId("oSTipoIdenRef");
			var sNumId = oINumIdenRef.getValue();
			var sItemKey = oSTipoIdenRef.getSelectedItem().getKey();
			var srefPath = "/ReferenciaOnlySet(Identificationcategory='" + sItemKey + "',Identificationnumber='" + sNumId + "')";
			var oITFDatosFamiliares = oView.byId("oITFDatosFamiliares");
			oITFDatosFamiliares.unbindElement();
			oModel.attachRequestSent(function() {
				busyDialog.open();
			});
			oModel.attachRequestCompleted(function() {
				busyDialog.close();
			});
			console.log(srefPath);
			oView.getModel().read(srefPath, null, null, false, function(oDataRef, oResponse) {
					console.log(oDataRef);
					if (oDataRef.Identificationnumber !== "") {
						oITFDatosFamiliares.unbindElement();
						oITFDatosFamiliares.bindElement(srefPath);
						// that.aSaveReferencia = true;
						jQuery.sap.delayedCall(500, that, function() {
							that.unlockForm(oITFDatosFamiliares, oView);
						});
						that.getDptoRef(oDataRef);
						that.getCiudadRef(oDataRef);
					} else {
						oITFDatosFamiliares.unbindElement();
						// that.aSaveReferencia = false;
						jQuery.sap.delayedCall(500, that, function() {
							that.unlockForm(oITFDatosFamiliares, oView);
						});
						// that.showDialog("Documento no encontrado...\n" + "Ingrese referencia manualmente");
					}
				},
				function(oDataRef, oResponse) {
					oITFDatosFamiliares.unbindElement();
					that.unlockForm(oITFDatosFamiliares, oView);
					that.showDialog("Documento no encontrado...\n" + "Ingrese referencia manualmente");
				});
		},
		//buscar referencia de estudiante
		getEstRef: function(that, oView, sNumId) {
			var aSaveReferencia = false;
			var srefPath = "/ReferenciaSet('" + sNumId + "')";
			var oITFDatosFamiliares = oView.byId("oITFDatosFamiliares");
			oView.getModel().read(srefPath, null, null, false, function(oDataRef, oResponse) {
					console.log(oDataRef);
					if (oDataRef.Identificationnumber !== "") {
						oITFDatosFamiliares.unbindElement();
						oITFDatosFamiliares.bindElement(srefPath);
						aSaveReferencia = false;
						jQuery.sap.delayedCall(100, that,
							function() {
								that.unlockForm(oITFDatosFamiliares, oView);
								that.getDptoRef(oDataRef);
								that.getCiudadRef(oDataRef);
							});
					} else {
						oITFDatosFamiliares.unbindElement();
						aSaveReferencia = false;
						// jQuery.sap.delayedCall(100, that, function() {
						// 	that.unlockForm(oITFDatosFamiliares, oView);
						// });
						// that.showDialog("Documento no encontrado...\n" + "Ingrese referencia manualmente");
					}
				},
				function(oDataRef, oResponse) {
					oITFDatosFamiliares.unbindElement();
					aSaveReferencia = false;
					// that.unlockForm(oITFDatosFamiliares, oView);
				});
			// that.aSaveReferencia = aSaveReferencia;
			return aSaveReferencia;
		},
		//buscar Estudiante
		getEstudiante: function() {
			var that = this;
			var oView = this.getView();
			var oITFDatosPersonales = oView.byId("oITFDatosPersonales");
			var oITFDatosAcademicos = oView.byId("oITFDatosAcademicos");
			var oITFDatosFamiliares = oView.byId("oITFDatosFamiliares");
			var oITFDatosAdicionales = oView.byId("oITFDatosAdicionales");
			var oTbMaterias = oView.byId("oTbMaterias");
			var oDTIGradoColegio = oView.byId("oDTIGradoColegio");
			var oDTIGradoUniversidad = oView.byId("oDTIGradoUniversidad");
			oTbMaterias.unbindAggregation("items",true);
			oDTIGradoColegio.setValue("");
			oDTIGradoUniversidad.setValue("");
			oITFDatosPersonales.unbindElement();
			oITFDatosAcademicos.unbindElement();
			oITFDatosFamiliares.unbindElement();
			oITFDatosAdicionales.unbindElement();
			that.unlockForm(oITFDatosPersonales, oView);
			that.unlockForm(oITFDatosAcademicos, oView);
			that.unlockForm(oITFDatosFamiliares, oView);
			that.unlockForm(oITFDatosAdicionales, oView);
			this.aUpdateEstudiante = false;
			this.aSaveEstudiante = false;
			this.aUpdateDir = false;
			this.aSaveEstudio = false;
			this.aSaveReferencia = false;
			this.aEncuesta = false;
			this.aSaveSaber = false;
			
			// var aSaveReferencia;
			// var aEncuesta;
			var oINumEst = oView.byId("oINumEst");
			var oINHijos = oView.byId("oINHijos");
			var oSTipId = oView.byId("oSTipId");
			var oItem = oSTipId.getSelectedItem();
			var sItemKey = oSTipId.getSelectedItem().getKey();
			var sEntityPath;
			var oData;
			var sNumId = oINumEst.getValue();
			var sTipId = oItem.getText();
			var busyDialog = oView.byId("BusyDialog");
			var oModel = oView.getModel();
			oINumEst.data("EstudianteAntiguo", "", true);
			oModel.attachRequestSent(function() {
				busyDialog.open();
			});
			oModel.attachRequestCompleted(function() {
				busyDialog.close();
			});
			if (sNumId === "" || sTipId === "") {
				if (sNumId === "") {
					oINumEst.setValueState(sap.ui.core.ValueState.Warning);
				}
				if (sTipId === "") {
					oSTipId.addStyleClass("warning");
				}
			} else {
				sEntityPath = "/EstudianteSet(Idnumber='" + sNumId + "',Type='" + sItemKey + "')";
				oINumEst.setValueState(sap.ui.core.ValueState.None);
				oSTipId.removeStyleClass("warning");
				oITFDatosPersonales.unbindElement();
				oITFDatosPersonales.bindElement(sEntityPath);
				if (!oITFDatosPersonales.getModel().getData(sEntityPath)) {
					oITFDatosPersonales.getElementBinding().attachEventOnce("dataReceived", jQuery.proxy(function() {
						oData = oITFDatosPersonales.getModel().getData(sEntityPath);
						if (!oData) {
							that.clearform();
							oINumEst.data("EstudianteAntiguo", "", true);
							oINumEst.data("OnlyBp", "", true);
							that.showDialog("Documento no encontrado...\n" + "Ingrese sus datos manualmente");
							that.unlockForm(oITFDatosPersonales, oView);
							that.unlockForm(oITFDatosAcademicos, oView);
							// that.unlockForm(oITFDatosFamiliares, oView);
						} else {
							oINumEst.data("EstudianteAntiguo", "X", true);
							oINumEst.data("OnlyBp", oData.OnlyBp, true);
							oINumEst.data("BP", oData.Bpartner, true);
							if(oData.DirRes !== ""){
								that.aUpdateDir = true;
							}
							that.unlockForm(oITFDatosPersonales, oView);
							that.getDpto(oData);
							that.getCiudad(oData);
							that.getEstudio(that, oView, sNumId, sEntityPath);
							that.aSaveReferencia = that.getEstRef(that, oView, sNumId);
							that.aEncuesta = that.getEncuesta(that, oView, sNumId);
							that.showDialog("Revisa tus datos y completa los que falten, una ves termines puedes ir a la pestaña de Datos Academicos");
							if(oData.ZzHijos === "0"){
								oINHijos.setValue("");
								oINHijos.setEditable(true);
							}
						}
					}));
				}
				// this.aSaveReferencia = aSaveReferencia;
				// this.aEncuesta = aEncuesta;
			}
		},
		//crear estudiante
		createEstudiante: function() {
			var aSaveEstudiante = false;
			var oView = this.getView();
			var oEstudiante = {};
			var oINHijos = oView.byId("oINHijos");

			oEstudiante.Idnumber = oView.byId("oINumEst").getValue();
			oEstudiante.Type = oView.byId("oSTipId").getSelectedItem().getKey();

			var sNombre = oView.byId("oIPrimerNombre").getValue();
			oEstudiante.Nombres = sNombre.toUpperCase();

			var sApellidos = oView.byId("oIPrimerApellido").getValue();
			oEstudiante.Apellidos = sApellidos.toUpperCase();

			var sNombres2 = oView.byId("oISegundoNombre").getValue();
			oEstudiante.Nombres2 = sNombres2.toUpperCase();

			var Apellidos2 = oView.byId("oISegundoApellido").getValue();
			oEstudiante.Apellidos2 = Apellidos2.toUpperCase();

			var sDirRes = oView.byId("oIDirRes").getValue();
			oEstudiante.DirRes = sDirRes.substring(0, 60);
			
			oEstudiante.Email = oView.byId("oIEmailEst").getValue();
			oEstudiante.PaisRes = oView.byId("oSPaisRes").getSelectedItem().getKey();
			oEstudiante.DptoRes = oView.byId("oSDptoRes").getSelectedItem().getKey();
			if(oEstudiante.PaisRes === oEstudiante.DptoRes){
					oEstudiante.DptoRes = "";
			}
			
			oEstudiante.CiudadRes =  oView.byId("oSCiudadRes").getSelectedItem().getKey();
			oEstudiante.TxtCiudadRes = oView.byId("oSCiudadRes").getSelectedItem().getText();
			oEstudiante.Sexo = oView.byId("oSGenero").getSelectedItem().getKey();

			console.log(oView.byId("oDPFechaNac"));
			// var fecha = new Date(oView.byId("oDPFechaNac").mProperties.value);
			var fecha = oView.byId("oDPFechaNac").mProperties.dateValue;
			fecha.setDate(fecha.getDate() + 1);
			oEstudiante.FechaNac = fecha;

			// oEstudiante.IndicativoAlterno = oView.byId("oICelularInd").getValue();
			oEstudiante.IndicativoAlterno = "057";
			oEstudiante.TelefonoAltP1 = oView.byId("oITelCelInd").getValue() + oView.byId("oITelCel").getValue();
			oEstudiante.IndicativoRes = oView.byId("oITelResInd").getValue();
			oEstudiante.TelefonoRes = oView.byId("oITelRes").getValue();
			oEstudiante.Gblnd = oView.byId("oSPaisNac").getSelectedItem().getKey();
			oEstudiante.Gbdep = oView.byId("oSDptoNac").getSelectedItem().getKey();
			if(oEstudiante.Gblnd === oEstudiante.Gbdep){
				oEstudiante.Gbdep = "";
			}
			
			oEstudiante.Gbort = oView.byId("oICiudadNac").getValue();
			oEstudiante.TpSede = oView.byId("oSSede").getSelectedItem().getKey();
			oEstudiante.EstadoCivil = oView.byId("oSEstadoCivil").getSelectedItem().getKey();
			var sHijos = oView.byId("oINHijos").getValue();
			if(sHijos === "" || sHijos === "" ){
				oEstudiante.ZzHijos = "0";
			}else{
				oEstudiante.ZzHijos = oView.byId("oINHijos").getValue();
			}
			
			oEstudiante.EthnicGrp = oView.byId("oSEtniaCual").getSelectedItem().getKey();
			// var sangre = (oView.byId("oSTipSangre").getSelectedItem().getText()).split(" ");
			// oEstudiante.ZzSangre = sangre[0];
			// oEstudiante.ZzRh = sangre[1];
			oEstudiante.ZzDiscapacitado = oView.byId("oSDiscapacidad").getSelectedItem().getKey();
			oEstudiante.ZzGpEtnico = oView.byId("oSEtnia").getSelectedItem().getKey();
			oEstudiante.ZzVictima = oView.byId("oSVictima").getSelectedItem().getKey();
			var oSDiscapacidad_cual = oView.byId("oSDiscapacidadCual").getSelectedItem().getKey();
			if (oSDiscapacidad_cual === "00") {
				oEstudiante.Chtyp = "";
			} else {
				// oEstudiante.Chtyp = oView.byId("oSDiscapacidadCual").getSelectedItem().getKey();
				oEstudiante.Chtyp = oSDiscapacidad_cual;
			}
			var oModel = oView.getModel();
			console.log(oEstudiante);
			console.log(this.aSaveEstudiante);
			if (this.aSaveEstudiante === false) {
				jQuery.sap.syncStyleClass("sapUiSizeCompact", oView, this._oLoadDialog);
				this._oLoadDialog.open();
				jQuery.sap.delayedCall(100, this, function() {
					oModel.setHeaders({
						"X-Requested-With": "X"
					});
					oModel.create("EstudianteSet", oEstudiante, null, function(oData, oResponse) {
							aSaveEstudiante = true;
							sap.m.MessageToast.show("Datos guardados correctamente!");
							console.log(oData);
							oView.byId("oINumEst").data("BP", oData.Bpartner, true);
						},
						function(oData, oResponse) {
							aSaveEstudiante = false;
							sap.m.MessageToast.show("Ha ocurrido un error de comunicacion con el servidor, por favor actualiza la pagina");
						}, true);
					this.aSaveEstudiante = aSaveEstudiante;
					if (aSaveEstudiante) {
						oView.byId("oINumEst").setEditable(false);
						oView.byId("oSTipId").setEnabled(false);
						this.aUpdateDir == true;
					}
					this._oLoadDialog.close();
					oINHijos.setValue(oEstudiante.ZzHijos);
				});
			}
		},
		//actualizar estudiante
		updateEstudiante: function() {
			var aUpdateEstudiante = false;
			var oView = this.getView();
			var oEstudiante = {};
			oEstudiante.OnlyBp = oView.byId("oINumEst").data("OnlyBp");
			oEstudiante.Idnumber = oView.byId("oINumEst").getValue();
			oEstudiante.Type = oView.byId("oSTipId").getSelectedItem().getKey();

			var sNombre = oView.byId("oIPrimerNombre").getValue();
			oEstudiante.Nombres = sNombre.toUpperCase();

			var sApellidos = oView.byId("oIPrimerApellido").getValue();
			oEstudiante.Apellidos = sApellidos.toUpperCase();

			var sNombres2 = oView.byId("oISegundoNombre").getValue();
			oEstudiante.Nombres2 = sNombres2.toUpperCase();

			var Apellidos2 = oView.byId("oISegundoApellido").getValue();
			oEstudiante.Apellidos2 = Apellidos2.toUpperCase();

			var sDirRes = oView.byId("oIDirRes").getValue();
			oEstudiante.DirRes = sDirRes.substring(0, 60);
			
			oEstudiante.Email = oView.byId("oIEmailEst").getValue();
			oEstudiante.PaisRes = oView.byId("oSPaisRes").getSelectedItem().getKey();
			oEstudiante.DptoRes = oView.byId("oSDptoRes").getSelectedItem().getKey();
			if(oEstudiante.PaisRes === oEstudiante.DptoRes){
					oEstudiante.DptoRes = "";
			}
			
			oEstudiante.CiudadRes =  oView.byId("oSCiudadRes").getSelectedItem().getKey();
			oEstudiante.TxtCiudadRes = oView.byId("oSCiudadRes").getSelectedItem().getText();
			// oEstudiante.TxtCiudadRes = oView.byId("oICiudadRes").getValue();
			
			oEstudiante.Sexo = oView.byId("oSGenero").getSelectedItem().getKey();

			// var fecha = new Date(oView.byId("oDPFechaNac").mProperties.value);
			// fecha.setDate(fecha.getDate() + 1);
			// oEstudiante.FechaNac = fecha;

			// console.log(oView.byId("oDPFechaNac"));
			// var fecha = new Date(oView.byId("oDPFechaNac").mProperties.value);
			var fecha = oView.byId("oDPFechaNac").mProperties.dateValue;
			fecha.setDate(fecha.getDate() + 1);
			oEstudiante.FechaNac = fecha;

			// oEstudiante.IndicativoAlterno = oView.byId("oICelularInd").getValue();
			oEstudiante.IndicativoAlterno = "057";
			oEstudiante.TelefonoAltP1 = oView.byId("oITelCelInd").getValue() + oView.byId("oITelCel").getValue();
			oEstudiante.IndicativoRes = oView.byId("oITelResInd").getValue();
			oEstudiante.TelefonoRes = oView.byId("oITelRes").getValue();
			oEstudiante.Gblnd = oView.byId("oSPaisNac").getSelectedItem().getKey();
			oEstudiante.Gbdep = oView.byId("oSDptoNac").getSelectedItem().getKey();
			if(oEstudiante.Gblnd === oEstudiante.Gbdep){
				oEstudiante.Gbdep = "";
			}
			
			oEstudiante.Gbort = oView.byId("oICiudadNac").getValue();
			oEstudiante.TpSede = oView.byId("oSSede").getSelectedItem().getKey();
			oEstudiante.EstadoCivil = oView.byId("oSEstadoCivil").getSelectedItem().getKey();
			// oEstudiante.ZzHijos = oView.byId("oINHijos").getValue();
			var sHijos = oView.byId("oINHijos").getValue();
			if(sHijos === "" || sHijos === "" ){
				oEstudiante.ZzHijos = "0";
			}else{
				oEstudiante.ZzHijos = oView.byId("oINHijos").getValue();
			}
			
			oEstudiante.EthnicGrp = oView.byId("oSEtniaCual").getSelectedItem().getKey();
			// var sangre = (oView.byId("oSTipSangre").getSelectedItem().getText()).split(" ");
			// oEstudiante.ZzSangre = sangre[0];
			// oEstudiante.ZzRh = sangre[1];
			oEstudiante.ZzDiscapacitado = oView.byId("oSDiscapacidad").getSelectedItem().getKey();
			oEstudiante.ZzGpEtnico = oView.byId("oSEtnia").getSelectedItem().getKey();
			oEstudiante.ZzVictima = oView.byId("oSVictima").getSelectedItem().getKey();
			var oSDiscapacidad_cual = oView.byId("oSDiscapacidadCual").getSelectedItem().getKey();
			if (oSDiscapacidad_cual === "00") {
				oEstudiante.Chtyp = "";
			} else {
				// oEstudiante.Chtyp = oView.byId("oSDiscapacidadCual").getSelectedItem().getKey();
				oEstudiante.Chtyp = oSDiscapacidad_cual;
			}
			var oModel = oView.getModel();
			console.log(oEstudiante);
			console.log(this.aSaveEstudiante);
			if (this.aSaveEstudiante === false) {
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLoadDialog);
				this._oLoadDialog.open();
				jQuery.sap.delayedCall(100, this, function() {
					oModel.setHeaders({
						"X-Requested-With": "X"
					});
					oModel.update("EstudianteSet(Idnumber='" + oEstudiante.Idnumber + "',Type='" + oEstudiante.Type + "')", oEstudiante, null,
						function(oData, oResponse) {
							aUpdateEstudiante = true;
							sap.m.MessageToast.show("Datos guardados correctamente!");
							console.log(oResponse);
						},
						function(oData, oResponse) {
							aUpdateEstudiante = false;
							sap.m.MessageToast.show("Ha ocurrido un error de comunicacion con el servidor, por favor actualiza la pagina");
						});
					this.aSaveEstudiante = aUpdateEstudiante;
					if (aUpdateEstudiante) {
						oView.byId("oINumEst").setEditable(false);
						oView.byId("oSTipId").setEnabled(false);
						this.aUpdateDir == true;
					}
					this._oLoadDialog.close();
				});
			}
		},
		//guardar referencia
		saveReferencia: function() {
			var oView = this.getView();
			var aSaveReferencia = false;
			var oReferencia = {};
			oReferencia.EstId = oView.byId("oINumEst").getValue();
			oReferencia.RelationshipType = oView.byId("oSParentesco").getSelectedItem().getKey();
			oReferencia.Identificationcategory = oView.byId("oSTipoIdenRef").getSelectedItem().getKey();
			oReferencia.Identificationnumber = oView.byId("oINumIdenRef").getValue();

			var snom1 = oView.byId("oIPrimerNomRef").getValue();
			oReferencia.NameFirst = snom1.toUpperCase();

			var snom2 = oView.byId("oISegundoNomRef").getValue();
			oReferencia.NameFirst2 = snom2.toUpperCase();

			var sapp1 = oView.byId("oIPrimerApellidoRef").getValue();
			oReferencia.NameLast = sapp1.toUpperCase();

			var sapp2 = oView.byId("oIsegundoApellidoRef").getValue();
			oReferencia.NameLast2 = sapp2.toUpperCase();

			oReferencia.TitleKey = oView.byId("oSNivelEstudioRef").getSelectedItem().getKey();
			oReferencia.Country = oView.byId("oSPaisResRef").getSelectedItem().getKey();
			oReferencia.Region = oView.byId("oSDptoResRef").getSelectedItem().getKey();
			oReferencia.City1 = oView.byId("oSCiudadResRef").getSelectedItem().getKey();
			oReferencia.TxCity1 = oView.byId("oSCiudadResRef").getSelectedItem().getText();
			oReferencia.TelNumber = oView.byId("oITelResRef").getValue();
			oReferencia.CelNumber = oView.byId("oICelRef").getValue();
			oReferencia.Street = oView.byId("oIDirRef").getValue();
			oReferencia.SmtpAddr = oView.byId("oIEmailRef").getValue();
			oReferencia.Remark = oView.byId("oIEmpresaRef").getValue();

			var oModel = oView.getModel();
			console.log(oReferencia);
			console.log(this.aSaveReferencia);
			if (this.aSaveReferencia === false) {
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLoadDialog);
				this._oLoadDialog.open();
				jQuery.sap.delayedCall(100, this, function() {
					oModel.setHeaders({
						"X-Requested-With": "X"
					});
					oModel.create("ReferenciaSet", oReferencia, null, function(oData, oResponse) {
							aSaveReferencia = true;
							console.log(oData);
							console.log(oResponse);
							// 		this.showDialog("Datos guardados correctamente!");
						},
						function(oData, oResponse) {
							aSaveReferencia = false;
							console.log(oData);
							console.log(oResponse);
						});
					this.aSaveReferencia = aSaveReferencia;
					this._oLoadDialog.close();
				});
			}
		},
		//guardar encuesta
		saveEncuesta: function() {
			var oView = this.getView();
			var aEncuesta = false;
			var oEncuesta = {};

			oEncuesta.Id = oView.byId("oINumEst").getValue();
			oEncuesta.ZzEntit = oView.byId("oSEPS").getSelectedItem().getKey();
			oEncuesta.ZzSangre = oView.byId("oSTipSangre").getSelectedItem().getKey();
			oEncuesta.ZzRh = oView.byId("oSRH").getSelectedItem().getKey();
			oEncuesta.SocialGrp = oView.byId("oSEstrato").getSelectedItem().getKey();

			oEncuesta.ZzDecidio = oView.byId("oSRazon").getSelectedItem().getKey();
			oEncuesta.ZzConocio = oView.byId("oSMedio").getSelectedItem().getKey();

			oEncuesta.ZzMotivo = oView.byId("oIRazonTransfer").getValue();
			oEncuesta.ZzPrimera = oView.byId("oIUniversidad1").getValue();
			oEncuesta.ZzSegunda = oView.byId("oIUniversidad2").getValue();

			oEncuesta.ZzComida = "" + oView.byId("OCBComida").getSelected() + "";
			oEncuesta.ZzActualidad = "" + oView.byId("oCBActualidad").getSelected() + "";
			oEncuesta.ZzLectura = "" + oView.byId("oCBLectura").getSelected() + "";
			oEncuesta.ZzMusica = "" + oView.byId("OCBMusica").getSelected() + "";
			oEncuesta.ZzTecnologia = "" + oView.byId("oCBTecnologia").getSelected() + "";
			oEncuesta.ZzArtes = "" + oView.byId("oCBArtes").getSelected() + "";
			// oEncuesta.ZzCultura = "" + oView.byId("oCBLectura").getSelected() + "";
			oEncuesta.ZzMedio = "" + oView.byId("oCBMedioAmbiente").getSelected() + "";
			oEncuesta.ZzViajes = "" + oView.byId("oCBViajes").getSelected() + "";
			oEncuesta.ZzCine = "" + oView.byId("oCBCine").getSelected() + "";
			oEncuesta.ZzDeportes = "" + oView.byId("oCBDeportes").getSelected() + "";
			oEncuesta.ZzModa = "" + oView.byId("oCBModa").getSelected() + "";
			oEncuesta.ZzReligion = "" + oView.byId("oCBReligion").getSelected() + "";
			oEncuesta.ZzOtros = "" + oView.byId("oCBOtro").getSelected() + "";
			oEncuesta.ZzCual = "" + oView.byId("oIOtro").getValue() + "";

			var oModel = oView.getModel();
			console.log(oEncuesta);
			console.log(this.aEncuesta);
			if (this.aEncuesta === false) {
				var busyDialog = oView.byId("BusyDialog");
				busyDialog.open();
				jQuery.sap.delayedCall(100, this, function() {
					oModel.setHeaders({
						"X-Requested-With": "X"
					});
					oModel.create("EncuestaSet", oEncuesta, null, function(oData, oResponse) {
							aEncuesta = true;
							console.log(oData);
							console.log(oResponse);
							// 		this.showDialog("Datos guardados correctamente!");
						},
						function(oData, oResponse) {
							aEncuesta = false;
							console.log(oData);
							console.log(oResponse);
							// 		this.showDialog("Error");
						});
					this.aEncuesta = aEncuesta;
					busyDialog.close();
				});
			}
		},
		//guardar estudios
		saveEstudios: function() {
			var oView = this.getView();
			var aSaveEstudio = false;
			var aSaveSaber = false;
			var that = this;
			var oEstudio = {};
			//guardar pruebas saber 11
			var oSaberAll = [];
			var oSaber = {};
			var oTable = oView.byId("oTbMaterias");
			var sNumId = oView.byId("oINumEst").getValue();
			var sItemKey = oView.byId("oSTipId").getSelectedItem().getKey();
			var sEntityPath = "/EstudianteSet(Idnumber='" + sNumId + "',Type='" + sItemKey + "')/EstudianteToSaber";
			var oLIMaterias = oTable.getItems();
			//guardar pruebas saber 11
			oEstudio.ItId = oView.byId("oINumEst").getValue();
			var oSEstatusColegio = oView.byId("oSEstatusColegio").getSelectedItem().getKey();
			if(oSEstatusColegio === "COMP"){
				oEstudio.EfEnddaEsc = oView.byId("oDTIGradoColegio").getDateValue();	
			}else{
				oEstudio.EfEnddaEsc = new Date();
			}
			oEstudio.TrstatusEsc = oSEstatusColegio;
			oEstudio.IsseoEsc = oView.byId("oIColegio").data("Objid");
			oEstudio.PaisEsc = oView.byId("oIColegio").data("Landx50");
			oEstudio.CiudadEsc = oView.byId("oICiudadColegio").getValue();
			oEstudio.DegreeidEsc = oView.byId("oITituloColegio").data("Objid");
			
			if(oView.byId("oIUniversidad").data("Objid")){
			var oSEstatusUniversidad = oView.byId("oSEstatusUniversidad").getSelectedItem().getKey();
			if(oSEstatusUniversidad === "COMP"){
				oEstudio.EfEnddaUni = oView.byId("oDTIGradoColegio").getDateValue();	
			}else{
				oEstudio.EfEnddaUni = new Date();
			}
			oEstudio.TrstatusUni = oSEstatusUniversidad;
			oEstudio.IsseoUni = oView.byId("oIUniversidad").data("Objid");
			oEstudio.PaisUni = oView.byId("oIUniversidad").data("Landx50");
			oEstudio.CiudadUni = oView.byId("oICiudadUniversidad").getValue();
			oEstudio.DegreeidUni = oView.byId("oITituloUniversidad").data("Objid");
			}
			
			var oModel = oView.getModel();
			console.log(oEstudio);
			console.log(this.aSaveEstudio);
			if (this.aSaveEstudio === false) {
				if(oEstudio.DegreeidEsc !== null){
				// var idIconTabBar = oView.byId("idIconTabBar");
				// if (oEstudio.Isseo === "" || oEstudio.Isseo === null) {
				// 	this.goToTab(idIconTabBar, "__xmlview0--oITFDatosAcademicos", 2);
				// 	this.showDialog(
				// 		"Debes Utilizar la ayuda de busqueda del campo Universidad este es el icono ubicado a la izquierda del campo, o el boton 'Buscar Universidad'"
				// 	);
				// 	oView.byId("oIUniversidad").setValueState(sap.ui.core.ValueState.Warning);
				// } else if (oEstudio.Degreeid === "" || oEstudio.Degreeid === null) {
				// 	this.goToTab(idIconTabBar, "__xmlview0--oITFDatosAcademicos", 2);
				// 	this.showDialog(
				// 		"Debes Utilizar la ayuda de busqueda del campo Titulo este es el icono ubicado a la izquierda del campo, o el boton 'Buscar Titulo'"
				// 	);
				// 	oView.byId("oITitulo").setValueState(sap.ui.core.ValueState.Warning);
				// } else {
					jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLoadDialog);
					this._oLoadDialog.open();
					jQuery.sap.delayedCall(100, this, function() {
						oModel.setHeaders({
							"X-Requested-With": "X"
						});
						oModel.create("EstudioSet", oEstudio, null, function(oData, oResponse) {
								aSaveEstudio = true;
								sap.m.MessageToast.show("Datos guardados correctamente!");
							},
							function(oData, oResponse) {
								aSaveEstudio = false;
								sap.m.MessageToast.show("Error");
							});
						this.aSaveEstudio = aSaveEstudio;
						this._oLoadDialog.close();
					});
					} else if(oView.byId("oIUniversidad").data("Objid")){
						oEstudio.EfEnddaEsc = null;
						oEstudio.TrstatusEsc = "";
						oEstudio.IsseoEsc = "";
						oEstudio.PaisEsc  = "";
						oEstudio.CiudadEsc = "";
						oEstudio.DegreeidEsc = "";
					
						jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLoadDialog);
						this._oLoadDialog.open();
						jQuery.sap.delayedCall(100, this, function() {
							oModel.setHeaders({
								"X-Requested-With": "X"
							});
							oModel.create("EstudioSet", oEstudio, null, function(oData, oResponse) {
									aSaveEstudio = true;
									sap.m.MessageToast.show("Datos guardados correctamente!");
								},
								function(oData, oResponse) {
									aSaveEstudio = false;
									sap.m.MessageToast.show("Error");
								});
							// this.aSaveEstudio = aSaveEstudio;
						// 		$.each(oLIMaterias, function(index,oMateria){
						// 			console.log(oMateria);
						// 			var oCells = oMateria.getAggregation("cells");
						// 			var sNomMateria = oCells[0].mProperties.text;
						// 			var sCodMateria = oCells[1].mProperties.text;
						// 			var sPuntMateria = oCells[2].mProperties.text;
						// 			oSaber.Id = oView.byId("oINumEst").getValue();
						// 			oSaber.Type = oView.byId("oSTipId").getSelectedItem().getKey();
						// 			oSaber.Subtestid = sCodMateria;
						// 			oSaber.Subtesttext = sNomMateria;
						// 			oSaber.Subtestres = sPuntMateria;
						// 			// oSaberAll.push(oSaber);
						// 			// jQuery.sap.delayedCall(100, this, function() {
						// 				oModel.setHeaders({
						// 					"X-Requested-With": "X"
						// 				});
						// 				oModel.create(sEntityPath, oSaber, null, function(oData, oResponse) {
						// 						// aSaveEstudio = true;
						// 						// sap.m.MessageToast.show("Datos guardados correctamente!");
						// 						console.log(oData);
						// 					},
						// 					function(oData, oResponse) {
						// 						// aSaveEstudio = false;
						// 						// sap.m.MessageToast.show("Error");
						// 						console.log(oData);
						// 					});
						// 				this.aSaveEstudio = aSaveEstudio;
						// 				this._oLoadDialog.close();
						// // });
						// 	});
							// this._oLoadDialog.close();
						});
					}
				// }
			}
		if	(this.aSaveSaber === false){
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oLoadDialog);
			this._oLoadDialog.open();
			$.each(oLIMaterias, function(index,oMateria){
				console.log(oMateria);
				var oCells = oMateria.getAggregation("cells");
				var sNomMateria = oCells[0].mProperties.text;
				var sCodMateria = oCells[1].mProperties.text;
				var sPuntMateria = oCells[2].mProperties.text;
				oSaber.Id = oView.byId("oINumEst").getValue();
				oSaber.Type = oView.byId("oSTipId").getSelectedItem().getKey();
				oSaber.Subtestid = sCodMateria;
				oSaber.Subtesttext = sNomMateria;
				oSaber.Subtestres = sPuntMateria;
				// oSaberAll.push(oSaber);
						jQuery.sap.delayedCall(100, this, function() {
							oModel.setHeaders({
								"X-Requested-With": "X"
							});
							oModel.create(sEntityPath, oSaber, null, function(oData, oResponse) {
									aSaveSaber = true;
									// sap.m.MessageToast.show("Datos guardados correctamente!");
									console.log(oData);
								},
								function(oData, oResponse) {
									aSaveSaber = false;
									// sap.m.MessageToast.show("Error");
									console.log(oData);
								});
							that.aSaveSaber = aSaveSaber;
							that._oLoadDialog.close();
						});
			});
			// oSaberAll.Id = oView.byId("oINumEst").getValue();
			// oSaberAll.Type = oView.byId("oSTipId").getSelectedItem().getKey();
			// console.log(oSaberAll);
			// oSaberAll = JSON.stringify(oSaberAll);
			// console.log(oSaberAll);
		}
		this._oLoadDialog.close();
		},
		//crear admision
		createAdmision: function() {
			var that  = this;
			var oView = this.getView();
			var oModel = oView.getModel();
			var aConfirm;
			var sTextPopUp;
			var oLoadDialog = this._oLoadDialog;
			var oITBMenu = oView.byId("oITBMenu");
			if (oView.byId("oTNumIden").data("liquidar") === "" || oView.byId("oTNumIden").data("liquidar") === null) {
				var sPath = "TextoHabeasSet('"+that.TextPopUP+"')";
				oModel.read(sPath, null, null, false, function(oData, oResponse) {
					sTextPopUp = oData.Texto.toString();
					var TextArray = sTextPopUp.split("<br>");
					sTextPopUp = "";
					$.each(TextArray, function(index,text){
						if(text !== "" || text !== "<br>"){
							sTextPopUp = sTextPopUp + text + "\n";
					}
					});
				});
				var dialog = new sap.m.Dialog({
					title: "Condiciones de la Admisión",
					type: "Message",
					content: new sap.m.Text({text:sTextPopUp}),
					// content: new sap.m.Text({
					// 	text: "El día de su entrevista debe presentarse con los siguientes documentos: \n"+
					// 			"Fotocopia ampliada del documento de identidad. \n"+
					// 			"Fotocopia ampliada del carné de la EPS o medicina prepagada. \n"+
					// 			"Fotocopia autenticada del acta de grado o certificado del colegio donde conste que actualmente cursas grado 11. \n"+
					// 			"Fotocopia del diploma de bachiller. \n"+
					// 			"Resultados prueba SABER 11 (antiguo ICFES) de 2000 a 2014-1: Igual o superior a 45 puntos en cada una de las áreas afines al programa de interés por el aspirante \n"+
					// 			"Resultados prueba SABER 11 a partir de 2014-2:  Igual o superior a 50 puntos en cada una de las áreas afines al programa de interés por el aspirante \n"+
					// 			"Recibo de consignación por valor de la inscripción. \n"+
					// 			"\n"+
					// 			"1.	Debes presentarte con 30 minutos de antelación a tu entrevista en la Cr 15  74-60 \n"+
					// 			"2.	Si deseas ampliar la información comunícate con la línea 3 25 81 81 y solicita hablar con el consejero de tu programa. \n"+
					// 			"¿Deseas continuar?"
					// 			}),
					beginButton: new sap.m.Button({
						text: "Continuar",
						press: function() {
							dialog.close();
							aConfirm = true;
						}
					}),
					endButton: new sap.m.Button({
						text: "Cancelar",
						press: function() {
							dialog.close();
							aConfirm = false;
						}
					}),
					afterClose: function() {
						dialog.destroy();
						if (aConfirm === false) {
							oITBMenu.fireSelect({
								item: oITBMenu.getItems()[4],
								key: "__xmlview0--oITFDatosAdicionales"
							});
							oITBMenu.setSelectedKey("__xmlview0--oITFDatosAdicionales");
						} else {
							var oSSede = oView.byId("oSSede");
							var oAdmision = {};
							oAdmision.Id = oView.byId("oINumEst").getValue();
							oAdmision.Programa = oView.byId("oSNombrePrograma").getSelectedItem().getKey();
							oAdmision.Sede = oSSede.getSelectedItem().getKey();
							oAdmision.SedeTxt = oSSede.getSelectedItem().getText();
							console.log(oAdmision);
							var oModel = oSSede.getModel();
							jQuery.sap.syncStyleClass("sapUiSizeCompact", oView, oLoadDialog);
							oLoadDialog.open();
							jQuery.sap.delayedCall(100, this, function() {
								oModel.setHeaders({
									"X-Requested-With": "X"
								});
								oModel.create("AdmisionSet", oAdmision, null, function(oData, oResponse) {
										// sap.ui.commons.MessageBox.alert("Datos guardados correctamente!");
										console.log(oData);
										console.log(oResponse);
										// 	oITFPagar.setModel(oData);
										// var oBtnPagar = oView.byId("oBtnPagar");
										oView.byId("oTNumIden").data("liquidar", "X", true);
										oView.byId("oTNumIden").setText(oAdmision.Id);
										oView.byId("oTSede").setText(oAdmision.SedeTxt);
										oView.byId("oTPrograma").setText(oView.byId("oSNombrePrograma").getSelectedItem().getText());
										oView.byId("oTFactura").setText(oData.EtFactura);
										oData.EtValorFactura = oData.EtValorFactura.replace(".", "");
										oData.EtValorFactura = oData.EtValorFactura.slice(0, -1);
										oData.EtValorFactura = oData.EtValorFactura.replace("-", "");
										oView.byId("oTValorFactura").setText(oData.EtValorFactura + " " + oData.EtMonedaFactura);
										if (oData.EtFechaVencFactura !== null) {
											oData.EtFechaVencFactura.setDate(oData.EtFechaVencFactura.getDate() + 1);
											var year = oData.EtFechaVencFactura.getFullYear();
											var mes = oData.EtFechaVencFactura.getMonth() +1;
											var dia = oData.EtFechaVencFactura.getDate();
											oView.byId("oTFechaVenc").setText(dia + "." + mes + "." + year);
										}
										// 			if(oAdmision.TpResult === "E"){
										if (oAdmision.EtFactura === "") {
											oData.Mensaje = oData.Mensaje + "/nPor favor comunicate con la universidad";
											oView.byId("oTMensaje").setText(oData.Mensaje);
										} else {
											oView.byId("oTMensaje").setText(oData.Mensaje);
										}
									},
									function(oData, oResponse) {
										// sap.ui.commons.MessageBox.alert("Error");
										oView.byId("oTNumIden").data("liquidar", "", true);
										console.log(oData);
										console.log(oResponse);
									});
								oLoadDialog.close();
							});
						}
					}
				});
				dialog.open();
			}
		},
		// buscar Dpto estudiante 	
		getDpto: function(oData) {
			var oView = this.getView();
			var oSDptoNac = oView.byId("oSDptoNac");
			var oSPaisNac = oView.byId("oSPaisNac");
			var oModel = oView.getModel();
			var oItemTemplate = new sap.ui.core.ListItem();
			oItemTemplate.bindProperty("text", "Bezei");
			oItemTemplate.bindProperty("key", "Bland");
			var item = oSPaisNac.getSelectedItem();
			var oContext = item.getBindingContext();
			var sPath = oContext.getPath() + "/PaisToRegion";
			oSDptoNac.setModel(oModel);
			oSDptoNac.setValue("");
			oSDptoNac.unbindItems();
			// oSDptoNac.bindItems(sPath, oItemTemplate);
			oSDptoNac.unbindAggregation("items",true);
			oSDptoNac.bindAggregation("items", {
				path : sPath,
				template : oItemTemplate,
				events : {
				     dataReceived : function(){
				     	// busyDialog.open();
				     	oData.Gbdep = oData.Gbdep.trim();
				     	oSDptoNac.setSelectedKey(oData.Gbdep);
				    	if (oData.Gbdep === "") {
							oSDptoNac.setEnabled(true);
						} else {
							oSDptoNac.setEnabled(false);
						}
				     	// busyDialog.close();
				     }
				}
				});
			
			
			var oSPaisRes = oView.byId("oSPaisRes");
			var oSDptoRes = oView.byId("oSDptoRes");
			item = oSPaisRes.getSelectedItem();
			oContext = item.getBindingContext();
			sPath = oContext.getPath() + "/PaisToRegion";
			oSDptoRes.setModel(oModel);
			oSDptoRes.setValue("");
			oSDptoRes.unbindItems();
			oSDptoRes.bindItems(sPath, oItemTemplate);
			
			if (oData.Gbdep === "") {
				oSDptoNac.setEnabled(true);
			} else {
				oSDptoNac.setEnabled(false);
			}

			if (oData.DptoRes === "") {
				oSDptoRes.setEnabled(true);
			} else {
				oSDptoRes.setEnabled(false);
			}
		},
		//buscar ciudad
		getCiudad: function(oData){
			var oView = this.getView();
			var oModel = oView.getModel();
			if(oData.PaisRes !== "" && oData.DptoRes !== ""){
				// var oSDptoRes = oView.byId("oSDptoRes");
				var busyDialog = oView.byId("BusyDialog");
				// var oContext = item.getBindingContext();
				// var sPath = oContext.getPath() + "/RegionToCiudad";
				var sPath = "/RegionSet(Land1='"+ oData.PaisRes +"',Bland='"+ oData.DptoRes +"')/RegionToCiudad";
				var oSCiudadRes = oView.byId("oSCiudadRes");
				var oItemTemplate = new sap.ui.core.ListItem();
				oSCiudadRes.setModel(oModel);
				oItemTemplate.bindProperty("text", "CityExt");
				oItemTemplate.bindProperty("key", "CityCode");
				oSCiudadRes.setValue("");
				oSCiudadRes.unbindItems();
				oSCiudadRes.unbindAggregation("items",true);
				// oSCiudadRes.bindItems(sPath, oItemTemplate);
				oSCiudadRes.bindAggregation("items", {
						path : sPath,
						template : oItemTemplate,
						events : {
						     dataReceived : function(){
						     	busyDialog.open();
						     	oData.CiudadRes = oData.CiudadRes.trim();
						     	oSCiudadRes.setSelectedKey(oData.CiudadRes);
						    	if (oData.CiudadRes === "") {
									oSCiudadRes.setEnabled(true);
								} else {
									oSCiudadRes.setEnabled(false);
								}
						     	busyDialog.close();
						     }
						}
						});
			}
		},
		//validar fecha
		onChangeDate: function(evt) {
			var oDP = sap.ui.getCore().byId(evt.getSource().getId());
			//var sValue = evt.getParameter("value");
			var bValid = evt.getParameter("valid");
			if (bValid) {
				oDP.setValueState(sap.ui.core.ValueState.None);
			} else {
				oDP.setValueState(sap.ui.core.ValueState.Error);
				this.showDialog(evt.getParameter("value") +" no es una fecha valida");
			}
		},
		// buscar dpto referencia
		getDptoRef: function(oData) {
			var oView = this.getView();
			var oSDptoResRef = oView.byId("oSDptoResRef");
			var oSPaisResRef = oView.byId("oSPaisResRef");
			var oModel = oView.getModel();
			var oItemTemplate = new sap.ui.core.ListItem();
			oItemTemplate.bindProperty("text", "Bezei");
			oItemTemplate.bindProperty("key", "Bland");
			var item = oSPaisResRef.getSelectedItem();
			var oContext = item.getBindingContext();
			var sPath;
			if(oContext.getPath() === "/PaisSet('')"){
				sPath = "/PaisSet('" + oData.Country + "')" + "/PaisToRegion";	
			}else{
				sPath = oContext.getPath() + "/PaisToRegion";
			}
			oSDptoResRef.setModel(oModel);
			oSDptoResRef.setValue("");
			oSDptoResRef.unbindItems();
			// oSDptoResRef.bindItems(sPath, oItemTemplate);
			oSDptoResRef.unbindAggregation("items",true);
			oSDptoResRef.bindAggregation("items", {
				path : sPath,
				template : oItemTemplate,
				events : {
				     dataReceived : function(){
				     	// busyDialog.open();
				     	oData.Region = oData.Region.trim();
				     	oSDptoResRef.setSelectedKey(oData.Region);
				    	if (oData.Region === "") {
							oSDptoResRef.setEnabled(true);
						} else {
							oSDptoResRef.setEnabled(false);
						}
				     	// busyDialog.close();
				     }
				}
				});
			// if (oData.Region === "") {
			// 	oSDptoResRef.setEnabled(true);
			// } else {
			// 	oSDptoResRef.setEnabled(false);
			// }
		},
		//buscar ciudad referencia
		getCiudadRef: function(oData){
			var oView = this.getView();
			var oModel = oView.getModel();
			// console.log(oData);
			if(oData.Country !== "" && oData.Region !== ""){
				var busyDialog = oView.byId("BusyDialog");
				var sPath = "/RegionSet(Land1='"+ oData.Country +"',Bland='"+ oData.Region +"')/RegionToCiudad";
				var oSCiudadResRef = oView.byId("oSCiudadResRef");
				var oItemTemplate = new sap.ui.core.ListItem();
				oSCiudadResRef.setModel(oModel);
				oItemTemplate.bindProperty("text", "CityExt");
				oItemTemplate.bindProperty("key", "CityCode");
				oSCiudadResRef.setValue("");
				oSCiudadResRef.unbindItems();
				oSCiudadResRef.unbindAggregation("items",true);
				// oSCiudadRes.bindItems(sPath, oItemTemplate);
				// console.log(sPath);
				oSCiudadResRef.bindAggregation("items", {
						path : sPath,
						template : oItemTemplate,
						events : {
						     dataReceived : function(){
						     	busyDialog.open();
						     	oData.City1 = oData.City1.trim();
						     	oSCiudadResRef.setSelectedKey(oData.City1);
						    	if (oData.City1 === "") {
									oSCiudadResRef.setEnabled(true);
								} else {
									oSCiudadResRef.setEnabled(false);
								}
						     	busyDialog.close();
						     }
						}
						});
			}	
		},
		//buscar Dpto por pais
		onChangePais: function(evt) {
			var oSDpto;
			var oView = this.getView();
			var item = sap.ui.getCore().getControl(evt.getSource().getId()).getSelectedItem();
			if (evt.getSource().getId() === "__xmlview0--oSPaisNac") {
				oSDpto = this.getView().byId("oSDptoNac");
			} else if (evt.getSource().getId() === "__xmlview0--oSPaisRes") {
				oSDpto = this.getView().byId("oSDptoRes");
			} else if (evt.getSource().getId() === "__xmlview0--oSPaisResRef") {
				oSDpto = this.getView().byId("oSDptoResRef");
			}
			var oModel = oView.getModel();
			var oContext = item.getBindingContext();
			var sPath = oContext.getPath() + "/PaisToRegion";
			var oItemTemplate = new sap.ui.core.ListItem();
			oSDpto.setModel(oModel);
			oItemTemplate.bindProperty("text", "Bezei");
			oItemTemplate.bindProperty("key", "Bland");
			oSDpto.setValue("");
			oSDpto.unbindItems();
			oSDpto.bindItems(sPath, oItemTemplate);
		},
		//buscar ciudad por dpto
		onChangeDpto: function(evt){
		var oSCiudad;
		var oView = this.getView();	
		var item = sap.ui.getCore().getControl(evt.getSource().getId()).getSelectedItem();
			if (evt.getSource().getId() === "__xmlview0--oSDptoNac") { // pendiente!!! esto no va
				// oSCiudad = this.getView().byId("oICiudadNac"); pendiente!!!
			} else if (evt.getSource().getId() === "__xmlview0--oSDptoRes") {
				oSCiudad = this.getView().byId("oSCiudadRes");
			} else if (evt.getSource().getId() === "__xmlview0--oSDptoResRef") {
				oSCiudad = this.getView().byId("oSCiudadResRef");
			}
			var oModel = oView.getModel();
			var oContext = item.getBindingContext();
			var sPath = oContext.getPath() + "/RegionToCiudad";
			var oItemTemplate = new sap.ui.core.ListItem();
			oSCiudad.setModel(oModel);
			oItemTemplate.bindProperty("text", "CityExt");
			oItemTemplate.bindProperty("key", "CityCode");
			oSCiudad.setValue("");
			oSCiudad.unbindItems();
			oSCiudad.bindItems(sPath, oItemTemplate);
		},
		//evento botones
		onPress: function(evt) {
			var oITBMenu, oModel, oView;
			console.log(evt.getSource().getId() + " pressed!");
			switch (evt.getSource().getId()) {
				case "__xmlview0--oBtnSalir":
					var dialog = new sap.m.Dialog({
						title: "Confirmación",
						type: "Message",
						content: new sap.m.Text({
							text: "Se perderan los datos no guardados...\n" +
							"¿Desea Salir?"
						}),
						beginButton: new sap.m.Button({
							text: "Salir",
							press: function() {
								dialog.close();
								if (window.location.replace) {
									window.location.replace("http://www.usergioarboleda.edu.co");
								} else {
									this.window.location.replace("http://www.usergioarboleda.edu.co");
								}
							}
						}),
						endButton: new sap.m.Button({
							text: "Cancelar",
							press: function() {
								dialog.close();
							}
						}),
						afterClose: function() {
							dialog.destroy();
						}
					});
					dialog.open();
					break;
				case "__xmlview0--oBtnBuscarEst":
					this.getEstudiante();
					break;
				case "__xmlview0--oINumEst":
					this.getEstudiante();
					break;
				case "__xmlview0--oBtnBuscarTituloBachiller":
					if(this.aSaveEstudio === false){
					this.helpRequestTituloBachiller();
					}
					break;
				case "__xmlview0--oBtnBuscarTituloUniversitario":
					if(this.aSaveEstudio === false){
					this.helpRequestTituloUniversitario();
					}
					break;
				case "__xmlview0--oBtnBuscarColegio":
					if(this.aSaveEstudio === false){
						this.helpRequestColegio();
					}
					break;
				case "__xmlview0--oBtnBuscarUniversidad":
					if(this.aSaveEstudio === false){
					this.helpRequestUniversidad();
					}
					break;
				case "oBtnAceptar":
					sap.ui.core.BusyIndicator.hide();
					this._oautorizaciones.close();
					break;
				case "oBtnCancelar":
					oView = this.getView();
					oITBMenu = oView.byId("oITBMenu");
					this.goToTab(oITBMenu, "__xmlview0--oITFDatosInscripcion", 0);
					sap.ui.core.BusyIndicator.hide();
					this._oautorizaciones.close();
					break;
				case "__xmlview0--oBtnDirRef":
					oView = this.getView();
					oModel = oView.getModel();
					var oIDirRef = oView.byId("oIDirRef");
					if (this.aUpdateDir === false) {
						if (!this._oDireccionDialogRef) {
							this._oDireccionDialogRef = sap.ui.xmlfragment("oDireccionDialogRef", "ZSLCM_PREGRADO.view.Direccion", this);
						}
						this._oDireccionDialogRef.setModel(oModel);
						oView.addDependent(this._oDireccionDialogRef);
						this._oDireccionDialogRef.open();
					}
					break;
				case "oDireccionDialogRef--oBtnCancelarDir":
					this._oDireccionDialogRef.close();
					break;
				case "oDireccionDialogRef--oBtnTomarDir":
					this.tomarDirRef();
					break;
				case "__xmlview0--oBtnDirEst":
					oView = this.getView();
					oModel = oView.getModel();
					var oIDirRes = oView.byId("oIDirRes");
					if (this.aSaveEstudiante === false) {
						if (!this._oDireccionDialogEst) {
							this._oDireccionDialogEst = sap.ui.xmlfragment("oDireccionDialogEst", "ZSLCM_PREGRADO.view.Direccion", this);
						}
						this._oDireccionDialogEst.setModel(oModel);
						oView.addDependent(this._oDireccionDialogEst);
						this._oDireccionDialogEst.open();
					}
					break;
				case "oDireccionDialogEst--oBtnCancelarDir":
					this._oDireccionDialogEst.close();
					break;
				case "oDireccionDialogEst--oBtnTomarDir":
					this.tomarDirEst();
					break;
				case "__xmlview0--oBtnBuscarRef":
					this.getRefOnly();
					break;
				case "__xmlview0--oBtnPagar":
					var oTNumFactura = this.getView().byId("oTFactura");
					if (oTNumFactura.getText() !== "") {
						var sBp = this.getView().byId("oINumEst").data("BP");
						var sUrl;
						//  se verifica si se trae alias para consultar erp backend   
					// 	if (jQuery.sap.getUriParameters() !== null && jQuery.sap.getUriParameters() !== undefined) {
					// 		if (jQuery.sap.getUriParameters().get("odata") !== null && jQuery.sap.getUriParameters().get("odata") !== undefined) {
					// 			var sAlias = jQuery.sap.getUriParameters().get("odata").trim();
					// 			if (sAlias === "UED_190") {
					// 				sUrl = "http://10.11.238.10:8000/sap/bc/webdynpro/sap/zwdslcm_pagosweb_tab_fiori?sap-client=190&sap-language=ES&BPARTNER=" +
					// 					sBp + "&TP_PAGO=ADMISION#";
					// 			} else {
					// 				sUrl =
					// 					"http://prd.epp.usergioarboleda.edu.co:8000/sap/bc/webdynpro/sap/zwdslcm_pagosweb_tab_fiori?sap-client=300&sap-language=ES&BPARTNER=" +
					// 					sBp + "&TP_PAGO=ADMISION#";
					// 			}
					// 		} else {
					// 			sUrl =
					// 				"http://prd.epp.usergioarboleda.edu.co:8000/sap/bc/webdynpro/sap/zwdslcm_pagosweb_tab_fiori?sap-client=300&sap-language=ES&BPARTNER=" +
					// 				sBp + "&TP_PAGO=ADMISION#";
					// 		}
					// 	} else {
					// 		sUrl =
					// 			"http://prd.epp.usergioarboleda.edu.co:8000/sap/bc/webdynpro/sap/zwdslcm_pagosweb_tab_fiori?sap-client=300&sap-language=ES&BPARTNER=" +
					// 			sBp + "&TP_PAGO=ADMISION#";
					// }
					sUrl = "http://10.11.238.10:8000/sap/bc/webdynpro/sap/zwdslcm_pagosweb_tab_fiori?sap-client=190&sap-language=ES&BPARTNER=" +
							sBp + "&TP_PAGO=ADMISION#";
						if (window.location.replace) {
							window.location.replace(sUrl);
						} else {
							this.window.location.replace(sUrl);
						}
					}
				break;
			}
		},
		//motrar ventana emergente
		showOverlay: function() {
			var oView = this.getView();
			var oModel = oView.getModel();
			var oCore = sap.ui.getCore();
			var oITFDatosPersonales = oView.byId("oITFDatosPersonales");
			var sAcceptCond = oITFDatosPersonales.data("AcceptCond");
			sap.ui.core.BusyIndicator.show(0);
			if (sAcceptCond === "0") {
				if (!this._oautorizaciones) {
					this._oautorizaciones = sap.ui.xmlfragment("ZSLCM_PREGRADO.view.autorizaciones", this);
					jQuery.sap.syncStyleClass("sapUiSizeCompact", oView, this._oautorizaciones);
				}
			} else {
				sap.ui.core.BusyIndicator.hide();
			}
			if (!this._oautorizaciones.isOpen() && sAcceptCond === "0") {
				this._oautorizaciones.setModel(oModel);
				oView.addDependent(this._oautorizaciones);
				
				//ZHABEAS_ACUDIENTE
				var sReferenciaPath = "TextoHabeasSet('ZHABEAS_ACUDIENTE')";
				oModel.read(sReferenciaPath, null, null, false, function(oData, oResponse) {
					var aut__text0 = oCore.getControl("aut__text0");
					aut__text0.setText(oData.Texto);
				});
				
				//Autorizaciones de comunicaciones institucionales
				sReferenciaPath = "TextoHabeasSet('ZHABEAS_EMAIL')";
				oModel.read(sReferenciaPath, null, null, false, function(oData, oResponse) {
					var aut__text1 = oCore.getControl("aut__text1");
					aut__text1.setText(oData.Texto);
				});
				
				//HABEAS data
				sReferenciaPath = "TextoHabeasSet('ZHABEAS_SENSIBLE')";
				oModel.read(sReferenciaPath, null, null, false, function(oData, oResponse) {
					var aut__text5 = oCore.getControl("aut__text5");
					aut__text5.setText(oData.Texto);
				});
				
				//datos personales sensibles
				sReferenciaPath = "TextoHabeasSet('ZINCLUSION_ACUDIENTE')";
				oModel.read(sReferenciaPath, null, null, false, function(oData, oResponse) {
					var aut__text6 = oCore.getControl("aut__text6");
					aut__text6.setText(oData.Texto);
				});
			this._oautorizaciones.open();
			}
		},
		//aceptar declaracion de privacidad
		onAcceptCond: function(evt) {
			var oCB = sap.ui.getCore().byId(evt.getSource().getId());
			var oBtnAceptar = sap.ui.getCore().byId("oBtnAceptar");
			var oView = this.getView();
			var oITFDatosPersonales = oView.byId("oITFDatosPersonales");
			if (oCB.getSelected()) {
				oBtnAceptar.setEnabled(true);
				oITFDatosPersonales.data("AcceptCond", "1", true);
			} else {
				oBtnAceptar.setEnabled(false);
				oITFDatosPersonales.data("AcceptCond", "0", true);
			}
		},
		//obtener posicion de tab
		getTabPos: function(sKey) {
			switch (sKey) {
				case "oITFDatosInscripcion":
					return 0;
					// 	break;
				case "oITFDatosPersonales":
					return 1;
					// 	break;
				case "oITFDatosAcademicos":
					return 2;
					// 	break;
				case "oITFDatosFamiliares":
					return 3;
					// 	break;
				case "oITFDatosAdicionales":
					return 4;
					// 	break;
			}
		},
		// ir a pestaña
		goToTab: function(idIconTabBar, tab, tabPos) {
			// this.showDialog("complete los datos de esta pestaña");
			idIconTabBar.fireSelect({
				item: idIconTabBar.getItems()[tabPos],
				key: tab
			});
			idIconTabBar.setSelectedKey(tab);
		},
		//se valida si la pestaña esta completa
		isComplete: function() {
			var sValue;
			var that = this;
			var sComplete = true;
			var oView = this.getView();
			var oITBMenu = oView.byId("oITBMenu");
			var sKey = oITBMenu.getSelectedKey();
			var oITFactual = oView.byId(sKey);
			var oContent = oITFactual.getContent();
			$.each(oContent, function(iEIndex, oForm) {
				if (oForm.getFormContainers) { //es Form
					var oFormContainers = oForm.getFormContainers();
					$.each(oFormContainers, function(iFCIndex, oFormContainer) {
						var oFormElements = oFormContainer.getFormElements();
						$.each(oFormElements, function(iFEIndex, oFormElement) {
							if (oFormElement.getLabelControl) {
								var oLabel = oFormElement.getLabelControl();
								var oFields = oFormElement.getFields();
								if (oLabel !== null) {
									if (oLabel.getRequired()) {
										$.each(oFields, function(iFIndex, oField) {
											var oInput = oView.byId(oField.getId());
											if (oInput.getValue) {
												// console.log(oField.getId() + " Valor: " + oInput.getValue());
												sValue = oInput.getValue();
											} else if (oInput.getSelectedItem) {
												// console.log(oField.getId() + " Valor: " + oInput.getSelectedItem().getText());
												sValue = oInput.getSelectedItem().getText();
											}
											if (sValue === "") {
												if (oInput.setValueState) {
													oInput.setValueState(sap.ui.core.ValueState.Warning);
													sComplete = false;
												} else {
													oInput.addStyleClass("warning");
													sComplete = false;
												}
												// console.log(sComplete);
												// iPos = that.getTabPos(sKey);
												//             that.goToTab(oITBMenu,"__xmlview0--"+sKey ,iPos);
											} else {
												if (oInput.setValueState) {
													oInput.setValueState(sap.ui.core.ValueState.None);
												} else {
													oInput.removeStyleClass("warning");
												}
											}
										});

									}
								}
							}
						});
					});
				} else { //es simple form
					$.each(oForm._aElements, function(iElIndex, oElement) {
						if (oElement.sParentAggregationName === "label") {
							if (oElement.mProperties.required === true) {
								var oInput = oView.byId(oElement.__sLabeledControl);
								if(oElement.__sLabeledControl === "__xmlview0--oSNombrePrograma"){
									var oModel = oView.getModel();
									var sPrograma = oInput.getSelectedItem().getKey();
									var oSTipoPrograma = oView.byId("oSTipoPrograma");
									var sTipoProg = oSTipoPrograma.getSelectedItem().getKey();
									var oSSede = oView.byId("oSSede");
									var sSede = oSSede.getSelectedItem().getKey();
									var sPath = "/PregradoSet(ScObjid='"+sPrograma+"',Sobid='"+sSede+"',Objid='"+sTipoProg+"')";
									console.log(sPath);
									oModel.read(sPath, null, null, false, function(oData, oResponse) {
										that.TextPopUP = "ZSLCM_PROGRAMACION"+oData.Peryr+oData.Perid+sPrograma+sSede;
										console.log(that.TextPopUP);
										});
								}
								if (oInput.getValue) {
									sValue = oInput.getValue();
								} else if (oInput.getSelectedItem) {
									var oItem = sap.ui.getCore().getControl(oElement.__sLabeledControl).getSelectedItem();
									if (oItem !== null) {
										// console.log(oItem.mProperties.key);
										// console.log(oItem.mProperties.text);
										sValue = oItem.mProperties.text;
									}
								}
								if (sValue === "") {
									if (oInput.setValueState) {
										oInput.setValueState(sap.ui.core.ValueState.Warning);
										sComplete = false;
									} else {
										oInput.addStyleClass("warning");
										sComplete = false;
									}
									// console.log(sComplete);
									// 	iPos = that.getTabPos(sKey);
									// 	that.goToTab(oITBMenu,"__xmlview0--"+sKey ,iPos);
								} else {
									if (oInput.setValueState) {
										oInput.setValueState(sap.ui.core.ValueState.None);
									} else {
										oInput.removeStyleClass("warning");
									}
								}
							}
						}
					});
				}
			});
			if (sComplete === true) {
				this.showDialog("Has completado los campos de esta pestaña! puedes seguir a la siguiente pestaña");
			}
		},
		//limpiar campos formulario
		clearform: function(){
			// var sValue;
			// var that = this;
			// var sComplete = true;
			var oView = this.getView();
			var oITBMenu = oView.byId("oITBMenu");
			var sKey = oITBMenu.getSelectedKey();
			var oITFactual = oView.byId(sKey);
			var oContent = oITFactual.getContent();
			$.each(oContent, function(iEIndex, oForm) {
				if (oForm.getFormContainers) { //es Form
					var oFormContainers = oForm.getFormContainers();
					$.each(oFormContainers, function(iFCIndex, oFormContainer) {
						var oFormElements = oFormContainer.getFormElements();
						$.each(oFormElements, function(iFEIndex, oFormElement) {
							if (oFormElement.getLabelControl) {
								var oLabel = oFormElement.getLabelControl();
								var oFields = oFormElement.getFields();
								if (oLabel !== null) {
									// if (oLabel.getRequired()) {
										$.each(oFields, function(iFIndex, oField) {
											var oInput = oView.byId(oField.getId());
											if (oInput.getValue) {
												// console.log(oField.getId() + " Valor: " + oInput.getValue());
												// sValue = oInput.getValue();
												if(oField.getId() !== "__xmlview0--oINumEst"){
													oInput.setValue("");
												}
												// if(oField.getId() !== "__xmlview0--oINumIdenRef"){
												// 	oInput.setValue("");	
												// }
											} else if (oInput.getSelectedItem) {
												// console.log(oField.getId() + " Valor: " + oInput.getSelectedItem().getText());
												// sValue = oInput.getSelectedItem().getText();
												oInput.setValue("");
											}
										});
									// }
								}
							}
						});
					});
				}
			});
											// if (sValue === "") {
											// 	if (oInput.setValueState) {
											// 		oInput.setValueState(sap.ui.core.ValueState.Warning);
											// 		sComplete = false;
											// 	} else {
											// 		oInput.addStyleClass("warning");
											// 		sComplete = false;
											// 	}
											// 	// console.log(sComplete);
											// 	// iPos = that.getTabPos(sKey);
											// 	//             that.goToTab(oITBMenu,"__xmlview0--"+sKey ,iPos);
											// } else {
											// 	if (oInput.setValueState) {
											// 		oInput.setValueState(sap.ui.core.ValueState.None);
											// 	} else {
											// 		oInput.removeStyleClass("warning");
											// 	}
											// }
		},
		//validar campos formulario
		valForm: function(sKey) {
			var sValue;
			// 			var iPos;
			var sIncomplete = true;
			// 			var that = this;
			var oView = this.getView();
			// 			var oITBMenu = oView.byId("oITBMenu");
			var oITFactual = oView.byId(sKey);
			var oContent = oITFactual.getContent();
			$.each(oContent, function(iEIndex, oForm) {
				if (oForm.getFormContainers) { //es Form
					var oFormContainers = oForm.getFormContainers();
					$.each(oFormContainers, function(iFCIndex, oFormContainer) {
						var oFormElements = oFormContainer.getFormElements();
						$.each(oFormElements, function(iFEIndex, oFormElement) {
							if (oFormElement.getLabelControl) {
								var oLabel = oFormElement.getLabelControl();
								var oFields = oFormElement.getFields();
								if (oLabel !== null) {
									if (oLabel.getRequired()) {
										$.each(oFields, function(iFIndex, oField) {
											var oInput = oView.byId(oField.getId());
											if (oInput.getValue) {
												// console.log(oField.getId() + " Valor: " + oInput.getValue());
												sValue = oInput.getValue();
											} else if (oInput.getSelectedItem) {
												// console.log(oField.getId() + " Valor: " + oInput.getSelectedItem().getText());
												var oItem = oInput.getSelectedItem();
												if(oItem.getText){
													// sValue = oInput.getSelectedItem().getText();
													sValue = oItem.getText();
												}else{
													sValue = "";
												}
											}
											if (sValue === "") {
												if (oInput.setValueState) {
													oInput.setValueState(sap.ui.core.ValueState.Warning);
													sIncomplete = false;
												} else {
													oInput.addStyleClass("warning");
													sIncomplete = false;
												}
												if (oField.getId() === "__xmlview0--oISegundoNombre" || 
												    oField.getId() === "__xmlview0--oISegundoApellido" ||
												    oField.getId() === "__xmlview0--oISegundoNomRef" ||
												    oField.getId() === "__xmlview0--oIsegundoApellidoRef") {
													oInput.setValueState(sap.ui.core.ValueState.None);
													sIncomplete = true;
												}
												if (oInput.getValueState) {
													if(oInput.getValueState() === sap.ui.core.ValueState.Error){
														sIncomplete = false;
													}
												} else {
													oInput.addStyleClass("warning");
													sIncomplete = false;
												}
												// console.log(sIncomplete);
												// iPos = that.getTabPos(sKey);
												//             that.goToTab(oITBMenu,"__xmlview0--"+sKey ,iPos);
											} else {
												if (oInput.setValueState) {
													oInput.setValueState(sap.ui.core.ValueState.None);
												} else {
													oInput.removeStyleClass("warning");
												}
											}
										});

									}
								}
							}
						});
					});
				} else { //es simple form
					$.each(oForm._aElements, function(iElIndex, oElement) {
						if (oElement.sParentAggregationName === "label") {
							if (oElement.mProperties.required === true) {
								var oInput = oView.byId(oElement.__sLabeledControl);
								if (oInput.getValue) {
									sValue = oInput.getValue();
								} else if (oInput.getSelectedItem) {
									var oItem = sap.ui.getCore().getControl(oElement.__sLabeledControl).getSelectedItem();
									if (oItem !== null) {
										// console.log(oItem.mProperties.key);
										// console.log(oItem.mProperties.text);
										sValue = oItem.mProperties.text;
									}
								}
								if (sValue === "") {
									if (oInput.setValueState) {
										oInput.setValueState(sap.ui.core.ValueState.Warning);
										sIncomplete = false;
									} else {
										oInput.addStyleClass("warning");
										sIncomplete = false;
									}
									// console.log(sIncomplete);
									// 	iPos = that.getTabPos(sKey);
									// 	that.goToTab(oITBMenu,"__xmlview0--"+sKey ,iPos);
								} else {
									if (oInput.setValueState) {
										oInput.setValueState(sap.ui.core.ValueState.None);
									} else {
										oInput.removeStyleClass("warning");
									}
								}
							}
						}
					});
				}
			});
			return sIncomplete;
		},
		//bloquiar tab
		lockForm: function(sKey) {
			console.log("lock " + sKey);
			var oView = this.getView();
			var oITFactual = oView.byId(sKey);
			var oContent = oITFactual.getContent();
			$.each(oContent, function(iEIndex, oForm) {
				if (oForm.getFormContainers) { //es Form
					var oFormContainers = oForm.getFormContainers();
					$.each(oFormContainers, function(iFCIndex, oFormContainer) {
						var oFormElements = oFormContainer.getFormElements();
						$.each(oFormElements, function(iFEIndex, oFormElement) {
							if (oFormElement.getLabelControl) {
								var oLabel = oFormElement.getLabelControl();
								var oFields = oFormElement.getFields();
								if (oLabel !== null) {
									$.each(oFields, function(iFIndex, oField) {
										var oInput = oView.byId(oField.getId());
										if (oInput.getValue) {
											// console.log(oField.getId() + " Valor: " + oInput.getValue());
											// if(oInput.getValue() === ""){
											// 	oInput.setEditable(true);	
											// }else{
											oInput.setEditable(false);
											// }
										} else if (oInput.getSelectedItem) {
											// console.log(oField.getId() + " Valor: " + oInput.getSelectedItem());
											// if(oInput.getSelectedItem().getText){
											// console.log(oField.getId() + " Valor: " + oInput.getSelectedItem().getText());
											// if(oInput.getSelectedItem().getText() === ""){
											oInput.setEnabled(false);
											// }
											// }else{
											// 	oInput.setEnabled(false);
											// }
										}
									});
								}
							}
						});
					});
				} else { //es simple form
					$.each(oForm._aElements, function(iElIndex, oElement) {
						if (oElement.sParentAggregationName === "label") {
							var oInput = oView.byId(oElement.__sLabeledControl);
							if (oInput.getValue) {
								// if(oInput.getValue() === ""){
								oInput.setEditable(false);
								// }
							} else if (oInput.getSelectedItem) {
								var oItem = sap.ui.getCore().getControl(oElement.__sLabeledControl).getSelectedItem();
								if (oItem !== null) {
									// console.log(oItem.mProperties.key);
									// console.log(oItem.mProperties.text);
									// if(oItem.mProperties.text === ""){
									oInput.setEnabled(false);
									// }
								}
							}
						}
					});
				}
			});
		},
		//desbloquiar tab
		unlockForm: function(sKey, oView) {
			// var sValue;
			// var oView = this.getView();
			// var oITFactual = oView.byId(sKey);
			var oITFactual = sKey;
			var oContent = oITFactual.getContent();
			$.each(oContent, function(iEIndex, oForm) {
				if (oForm.getFormContainers) { //es Form
					var oFormContainers = oForm.getFormContainers();
					$.each(oFormContainers, function(iFCIndex, oFormContainer) {
						var oFormElements = oFormContainer.getFormElements();
						$.each(oFormElements, function(iFEIndex, oFormElement) {
							if (oFormElement.getLabelControl) {
								var oLabel = oFormElement.getLabelControl();
								var oFields = oFormElement.getFields();
								if (oLabel !== null) {
									$.each(oFields, function(iFIndex, oField) {
										var oInput = oView.byId(oField.getId());
										if (oField.getId() === "__xmlview0--oDTIGradoColegio" ||
											oField.getId() === "__xmlview0--oDTIGradoUniversidad") {
											// console.log(oField.getId() + " Valor: " + oInput.getDateValue());
											if (oInput.getDateValue() === null ||
												oInput.getDateValue() === undefined) {
												oInput.setEnabled(true);
											} else {
												oInput.setEnabled(false);
											}
										} else if (oInput.getValue) {
											// console.log(oField.getId() + " Valor: " + oInput.getValue());
											if (oInput.getValue() === "") {
												oInput.setEditable(true);
											} else {
												if (oField.getId() === "__xmlview0--oINumEst" ||
													oField.getId() === "__xmlview0--oINumIdenRef") {
													oInput.setEditable(true);
												} else {
													oInput.setEditable(false);
												}
											}
										} else if (oInput.getSelectedItem) {
											// console.log(oField.getId() + " item: " + oInput.getSelectedItem());
											if (oInput.getSelectedItem() === null) {
												oInput.setEnabled(true);
											} else if (oInput.getSelectedItem().getText) {
												// console.log(oField.getId() + " Valor: " + oInput.getSelectedItem().getText());
												if (oInput.getSelectedItem().getText() === "") {
													oInput.setEnabled(true);
												} else {
													if (oField.getId() === "__xmlview0--oSTipId" ||
														oField.getId() === "__xmlview0--oSParentesco" ||
														oField.getId() === "__xmlview0--oSTipoIdenRef") {
														oInput.setEnabled(true);
													} else {
														oInput.setEnabled(false);
													}
												}
											} else {
												oInput.setEnabled(true);
											}
											//para en el caso que tenga 'no' en discapacidad y en etnia
											switch (oField.getId()) {
												case "__xmlview0--oSDiscapacidadCual":
													if (oInput.getSelectedItem().getText() === "") {
														oInput.setEnabled(false);
													}
													break;
												case "__xmlview0--oSEtniaCual":
													if (oInput.getSelectedItem().getText() === "") {
														oInput.setEnabled(false);
													}
													break;
											}
										}
										if (oField.getId() === "__xmlview0--oIDirRes" ||
											oField.getId() === "__xmlview0--oIDirRef" ||
											oField.getId() === "__xmlview0--oIDptoColegio" ||
											oField.getId() === "__xmlview0--oICiudadColegio" ||
											oField.getId() === "__xmlview0--oIDptoUniversidad" ||
											oField.getId() === "__xmlview0--oICiudadUniversidad" ||
											oField.getId() === "__xmlview0--oIcodigoSNP" ||
											// oField.getId() === "__xmlview0--oIMateria" ||
											oField.getId() === "__xmlview0--oIPuntaje") {
											oInput.setEditable(false);
										}
										if (oField.getId() === "__xmlview0--oSMateria") {
											oInput.setEnabled(false);
										}

									});
								}
							}
						});
					});
				} else { //es simple form
					$.each(oForm._aElements, function(iElIndex, oElement) {
						if (oElement.sParentAggregationName === "label") {
							var oInput = oView.byId(oElement.__sLabeledControl);
							if (oInput.getValue) {
								if (oInput.getValue() === "") {
									oInput.setEditable(true);
								}
							} else if (oInput.getSelectedItem) {
								var oItem = sap.ui.getCore().getControl(oElement.__sLabeledControl).getSelectedItem();
								if (oItem !== null) {
									// console.log(oItem.mProperties.key);
									// console.log(oItem.mProperties.text);
									if (oItem.mProperties.text === "") {
										oInput.setEnabled(true);
									}
								}
							}
							if (oElement.__sLabeledControl === "__xmlview0--oIDirRes" ||
								oElement.__sLabeledControl === "__xmlview0--oIDirRef" ||
								oElement.__sLabeledControl === "__xmlview0--oIDptoColegio" ||
								oElement.__sLabeledControl === "__xmlview0--oICiudadColegio" ||
								oElement.__sLabeledControl === "__xmlview0--oIDptoUniversidad" ||
								oElement.__sLabeledControl === "__xmlview0--oICiudadUniversidad") {
								oInput.setEditable(false);
							}
						}
					});
				}
			});
		},
		//evento pestañas menu
		handleIconTabBarSelect: function(evt) {
			var oView = this.getView();
			// 			var that = this;
			var oITBMenu = oView.byId("oITBMenu");
			var oINumEst = oView.byId("oINumEst");
			var sKey = evt.getParameters().key;
			var oITFDatosPersonales = oView.byId("oITFDatosPersonales");
			var sAcceptCond = oITFDatosPersonales.data("AcceptCond");
			console.log("tab: " +sKey);
			if (!this._oLoadDialog) {
				this._oLoadDialog = sap.ui.xmlfragment("ZSLCM_PREGRADO.view.Load", this);
				this.getView().addDependent(this._oLoadDialog);
			}
			switch (sKey) {
				case "__xmlview0--oITFDatosInscripcion":
					break;

				case "__xmlview0--oITFDatosPersonales":
					// console.log(this.valForm("oITFDatosInscripcion"));
					if (this.valForm("oITFDatosInscripcion")) {
						var oTab = oITBMenu.getSelectedKey();
						if (oTab !== "__xmlview0--oITFDatosInscripcion") {
							if (oTab === "__xmlview0--oITFDatosPersonales") {
								this.showOverlay();
							}
						}
					} else {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosInscripcion", 0);
						this.showDialog("Complete los datos de esta pestaña");
					}
					break;

				case "__xmlview0--oITFDatosAcademicos":
					if (this.valForm("oITFDatosInscripcion")) {
						if (this.valForm("oITFDatosPersonales")) {
							if (oINumEst.data("EstudianteAntiguo") === "X") {
								this.updateEstudiante();
							} else {
								this.createEstudiante();
							}
							this.lockForm("oITFDatosPersonales");
							this.lockForm("oITFDatosInscripcion");
						} else {
							if (sAcceptCond === "0") {
								this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
								this.showOverlay();
							} else {
								this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
								this.showDialog("Complete los datos de esta pestaña");
							}
						}
					} else {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosInscripcion", 0);
						this.showDialog("Complete los datos de esta pestaña");
					}
					break;

				case "__xmlview0--oITFDatosFamiliares":
					if (this.valForm("oITFDatosInscripcion") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosInscripcion", 0);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosPersonales") === false) {
						if (sAcceptCond === "0") {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showOverlay();
						} else {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showDialog("Complete los datos de esta pestaña");
						}
					} else if (this.valForm("oITFDatosAcademicos") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosAcademicos", 2);
						this.showDialog("Complete los datos de esta pestaña");
					} else {
						// this.showDialog("datos academicos"); //save data
						this.saveEstudios();
						this.lockForm("oITFDatosAcademicos");
					}
					break;

				case "__xmlview0--oITFDatosAdicionales":
					if (this.valForm("oITFDatosInscripcion") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosInscripcion", 0);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosPersonales") === false) {
						if (sAcceptCond === "0") {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showOverlay();
						} else {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showDialog("Complete los datos de esta pestaña");
						}
					} else if (this.valForm("oITFDatosAcademicos") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosAcademicos", 2);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosFamiliares") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosFamiliares", 3);
						this.showDialog("Complete los datos de esta pestaña");
					} else {
						this.saveReferencia();
						this.lockForm("oITFDatosFamiliares");
					}
					break;

				case "__xmlview0--oITFResumen":
					if (this.valForm("oITFDatosInscripcion") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosInscripcion", 0);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosPersonales") === false) {
						if (sAcceptCond === "0") {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showOverlay();
						} else {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showDialog("Complete los datos de esta pestaña");
						}
					} else if (this.valForm("oITFDatosAcademicos") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosAcademicos", 2);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosFamiliares") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosFamiliares", 3);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosAdicionales") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosAdicionales", 3);
						this.showDialog("Complete los datos de esta pestaña");
					} else {
						// this.showDialog("datos adicionales"); //save data 
						this.saveEncuesta();
						this.lockForm("oITFDatosAdicionales");
						this.createAdmision();
					}
					break;
			}
		},
		//evento boton siguiente
		handleIconTabBarButton: function() {
			var oView = this.getView();
			var oITBMenu = oView.byId("oITBMenu");
			var oTab = oITBMenu.getSelectedKey();
			var oITFDatosPersonales = oView.byId("oITFDatosPersonales");
			var oINumEst = oView.byId("oINumEst");
			var sAcceptCond = oITFDatosPersonales.data("AcceptCond");
			switch (oTab) {

				case "__xmlview0--oITFDatosInscripcion":
					if (this.valForm("oITFDatosInscripcion")) {
						if (oITFDatosPersonales.data("AcceptCond") === "0") {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showOverlay();
						} else {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
						}
					} else {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosInscripcion", 0);
						this.showDialog("Complete los datos de esta pestaña");
					}
					break;

				case "__xmlview0--oITFDatosPersonales":
					if (oITFDatosPersonales.data("AcceptCond") === "0") {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
						this.showOverlay();
					} else {
						if (this.valForm("oITFDatosInscripcion")) {
						if (this.valForm("oITFDatosPersonales")) {
							if (oINumEst.data("EstudianteAntiguo") === "X") {
								// this.updateEstudiante();
								this.goToTab(oITBMenu, "__xmlview0--oITFDatosAcademicos", 2);
							} else {
								// this.createEstudiante();
								this.goToTab(oITBMenu, "__xmlview0--oITFDatosAcademicos", 2);
							}
							this.lockForm("oITFDatosPersonales");
						} else {
							if (sAcceptCond === "0") {
								this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
								this.showOverlay();
							} else {
								this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
								this.showDialog("Complete los datos de esta pestaña");
							}
						}
						}
					}
					break;

				case "__xmlview0--oITFDatosAcademicos":
					if (oITFDatosPersonales.data("AcceptCond") === "0") {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
						this.showOverlay();
					} else {
						if (this.valForm("oITFDatosInscripcion") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosInscripcion", 0);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosPersonales") === false) {
						if (sAcceptCond === "0") {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showOverlay();
						} else {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showDialog("Complete los datos de esta pestaña");
						}
					} else if (this.valForm("oITFDatosAcademicos") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosAcademicos", 2);
						this.showDialog("Complete los datos de esta pestaña");
					} else {
						// this.showDialog("datos academicos"); //save data
						// this.saveEstudios();
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosFamiliares", 3);
						this.lockForm("oITFDatosAcademicos");
					}
					}
					break;

				case "__xmlview0--oITFDatosFamiliares":
					if (oITFDatosPersonales.data("AcceptCond") === "0") {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
						this.showOverlay();
					} else {
						if (this.valForm("oITFDatosInscripcion") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosInscripcion", 0);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosPersonales") === false) {
						if (sAcceptCond === "0") {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showOverlay();
						} else {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showDialog("Complete los datos de esta pestaña");
						}
					} else if (this.valForm("oITFDatosAcademicos") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosAcademicos", 2);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosFamiliares") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosFamiliares", 3);
						this.showDialog("Complete los datos de esta pestaña");
					} else {
						// this.saveReferencia();
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosAdicionales", 4);
						this.lockForm("oITFDatosFamiliares");
					}
					}
					break;

				case "__xmlview0--oITFDatosAdicionales":
					if (oITFDatosPersonales.data("AcceptCond") === "0") {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
						this.showOverlay();
					} else {
						if (this.valForm("oITFDatosInscripcion") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosInscripcion", 0);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosPersonales") === false) {
						if (sAcceptCond === "0") {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showOverlay();
						} else {
							this.goToTab(oITBMenu, "__xmlview0--oITFDatosPersonales", 1);
							this.showDialog("Complete los datos de esta pestaña");
						}
					} else if (this.valForm("oITFDatosAcademicos") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosAcademicos", 2);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosFamiliares") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosFamiliares", 3);
						this.showDialog("Complete los datos de esta pestaña");
					} else if (this.valForm("oITFDatosAdicionales") === false) {
						this.goToTab(oITBMenu, "__xmlview0--oITFDatosAdicionales", 3);
						this.showDialog("Complete los datos de esta pestaña");
					} else {
						// this.showDialog("datos adicionales"); //save data 
						this.goToTab(oITBMenu, "__xmlview0--oITFResumen", 5);
						// this.saveEncuesta();
						this.lockForm("oITFDatosAdicionales");
						// this.createAdmision();
					}	
					}
					break;
			}
		},
		//evento select de discapacidad y etnia
		handleSelectInclusion: function(evt) {
			var oView = this.getView();
			var oSelect = oView.byId(evt.getSource().getId());
			var sKey = oSelect.getSelectedKey();
			var oSelectCual;
			var oLabel;
			switch (evt.getSource().getId()) {
				case "__xmlview0--oSDiscapacidad":
					oSelectCual = oView.byId("oSDiscapacidadCual");
					oLabel = oView.byId("__label19");
					break;
				case "__xmlview0--oSEtnia":
					oSelectCual = oView.byId("oSEtniaCual");
					oLabel = oView.byId("__label21");
					break;
			}
			if (sKey === "N") {
				oSelectCual.setSelectedKey("");
				oSelectCual.setEnabled(false);
				oLabel.setRequired(false);
			} else {
				oSelectCual.setEnabled(true);
				oLabel.setRequired(true);
			}
		},
		//evento select de estatus de estudio
		handleEstatusEstudio: function(evt) {
			var oView = this.getView();
			var oSelect = oView.byId(evt.getSource().getId());
			var sKey = oSelect.getSelectedKey();
			var oDTIFechaGrado;
			var oLabel;
			switch (evt.getSource().getId()) {
				case "__xmlview0--oSEstatusColegio":
					oLabel =  oView.byId("__label28");
					oDTIFechaGrado = oView.byId("oDTIGradoColegio");
					break;
				case "__xmlview0--oSEstatusUniversidad":
					oLabel =  oView.byId("__label33");
					oDTIFechaGrado = oView.byId("oDTIGradoUniversidad");
					break;
			}
			if (sKey === "COMP") {
				oDTIFechaGrado.setEnabled(true);
				oLabel.setRequired(true);
			} else if (sKey === "CULM") {
				oDTIFechaGrado.setEnabled(false);
				oLabel.setRequired(false);
			}
		},
		//evento select de pruebas saber
		handlePruebasSaber: function() {
			var oView = this.getView();
			var oIcodigoSNP = oView.byId("oIcodigoSNP");
			// var oIMateria = oView.byId("oIMateria");
			var oSMateria = oView.byId("oSMateria");
			var oIPuntaje = oView.byId("oIPuntaje");
			var oSPruebaSaber = oView.byId("oSPruebaSaber");
			var sKey = oSPruebaSaber.getSelectedKey();
			if (sKey === "S") {
				oIcodigoSNP.setEditable(true);
				// oIMateria.setEditable(true);
				oSMateria.setEnabled(true);
				oIPuntaje.setEditable(true);
			} else {
				oIcodigoSNP.setEditable(false);
				// oIMateria.setEditable(false);
				oSMateria.setEnabled(false);
				oIPuntaje.setEditable(false);
			}
		},
		//mostrar mensaje
		showDialog: function(oText) {
			sap.m.MessageToast.show(oText, {
				duration: 6000
			});
		},
		//seleccion de sede
		OnSelectionChangeSede: function(evt) {
			var that = this;
			var oView = this.getView();
			var item = sap.ui.getCore().getControl(evt.getSource().getId()).getSelectedItem();
			var oSTipoPrograma = oView.byId("oSTipoPrograma");
			var oSNombrePrograma = oView.byId("oSNombrePrograma");
			var oModel = item.getModel();
			var oContext = item.getBindingContext();
			var sPath = oContext.getPath() + "/TipoPregradoSet";
			var oItems = new sap.ui.core.ListItem();
			oItems.bindProperty("text", "Stext");
			oItems.bindProperty("key", "Objid");
			oSTipoPrograma.setModel(oModel);
			oSTipoPrograma.setValue("");
			oSNombrePrograma.setValue("");
			oSTipoPrograma.unbindItems();
			oSNombrePrograma.unbindItems();
			oSNombrePrograma.unbindAggregation();
			var BusyDialog = oView.byId("BusyDialog");
			BusyDialog.open();
			oSTipoPrograma.bindAggregation("items", {
						path : sPath,
						template : oItems,
						events : {
						     dataReceived : function(){
						     var oItemLength = oSTipoPrograma.getItems();
						     if (oItemLength.length === 0) {
								var text = "En este momento la Sede " + item.getText() +
								" no tiene postgrados agendados, por favor comunicate con la universidad";
								// 			sap.m.MessageToast.show(text);
								that.showDialog(text);
								BusyDialog.close();
							}
							BusyDialog.close();
						 }
						}
						});
			// jQuery.sap.delayedCall(10, this, function() {
			// 	oSTipoPrograma.bindItems(sPath, oItems);
			// });
			// jQuery.sap.delayedCall(1000, this, function() {
			// 	var text;
			// 	var oItemLength = oSTipoPrograma.getItems();
			// 	if (oItemLength.length === 0) {
			// 		text = "En este momento la Sede " + item.getText() +
			// 			" no tiene postgrados agendados, por favor comunicate con la universidad";
			// 		// 			sap.m.MessageToast.show(text);
			// 		this.showDialog(text);
			// 	}
			// 	BusyDialog.close();
			// });
			// jQuery.sap.delayedCall(1000, this, function() {
			// var oItemLength;
			// var text;
			// var sNoItem = true;
			// do {
			// 	oItemLength = oSTipoPrograma.getItems();
			// 	if (oItemLength.length === 0) {
			// 			text = "En este momento la Sede " + item.getText() +
			// 			" no tiene postgrados agendados, por favor comunicate con la universidad";
			// 		this.showDialog(text);
			// 		sNoItem = false;
			// 	}
			// 	console.log(sNoItem + oItemLength.length);
			// }while (sNoItem);
			// console.log("CERRAR");
			// BusyDialog.close();
			// });
		},
		//seleccion de tipo programa
		OnSelectionChangeTipoProg: function(evt) {
			var oView = this.getView();
			var item = sap.ui.getCore().getControl(evt.getSource().getId()).getSelectedItem();
			var oSNombrePrograma = oView.byId("oSNombrePrograma");
			var oModel = item.getModel();
			var oContext = item.getBindingContext();
			var sPath = oContext.getPath() + "/TipoPregradoToPrograma";
			var oItems = new sap.ui.core.ListItem();
			oItems.bindProperty("text", "StextPrograma");
			oItems.bindProperty("key", "ScObjid");
			oSNombrePrograma.setModel(oModel);
			oSNombrePrograma.setValue("");
			oSNombrePrograma.unbindItems();
			oSNombrePrograma.bindItems(sPath, oItems);
		},
		//validar solo letras
		validarNombreApellido: function(evt) {
			var text = this.getView().byId(evt.getSource().getId()).getValue();
			if (text !== "") {
				// var stringregex = /^[A-Za-z]+$/;
				var stringregex = /^([A-Za-zÑñáéíóúÁÉÍÓÚ ]+)$/;
				if (!text.match(stringregex)) {
					sap.m.MessageToast.show(text + " es un texto no valido!");
					this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.Error);
				} else {
					this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.None);
				}
				// if (evt.getSource().getId() !== "oISegundoNombre") {
				// 	this.valForm("oITFDatosPersonales");
				// }
			} else {
				if (this.getView().byId(evt.getSource().getId()).getValueState() === sap.ui.core.ValueState.Error) {
					this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.None);
				}
			}
		},
		//validar formato email
		validarEmail: function(evt) {
			var email = this.getView().byId(evt.getSource().getId()).getValue();
			var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			if (!mailregex.test(email)) {
				sap.m.MessageToast.show(email + " no es un correo valido!");
				this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.Error);
			} else {
				this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.None);
			}
		},
		//limpiar campos universidad
		clearUniversidad: function(evt){
			var oView = this.getView();
			var sValue = oView.byId(evt.getSource().getId()).getValue();
			var oIUniversidad = oView.byId(evt.getSource().getId());
			if(sValue === ""){
				var oIDptoUniversidad = oView.byId("oIDptoUniversidad");
				var oICiudadUniversidad = oView.byId("oICiudadUniversidad");
				var oITituloUniversidad = oView.byId("oITituloUniversidad");
				var oSEstatusUniversidad = oView.byId("oSEstatusUniversidad");
				var oDTIGradoUniversidad = oView.byId("oDTIGradoUniversidad");
				oIDptoUniversidad.setValue("");
				oICiudadUniversidad.setValue("");
				oITituloUniversidad.setValue("");
				oITituloUniversidad.data("Objid","",true);
				oIUniversidad.data("Objid","",true);
				oIUniversidad.data("Landx50","",true);
				oSEstatusUniversidad.setSelectedItemId("__xmlview0--__item51-__xmlview0--oSEstatusUniversidad-0");
				oDTIGradoUniversidad.setValue("");                       
			}
		}
		//validar telefono
		// validarTelefono: function(evt) {
		// 	var text = this.getView().byId(evt.getSource().getId()).getValue();
		// 	if (text !== "") {
		// 		// var stringregex = /^[A-Za-z]+$/;
		// 		var stringregex = /\b\d{3}\d{3}[-]?\d{4}\b/;
		// 		if (!text.match(stringregex)) {
		// 			sap.m.MessageToast.show(text + " es un telefono no valido!");
		// 			this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.Error);
		// 		} else {
		// 			this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.None);
		// 		}
		// 	} else {
		// 		if (this.getView().byId(evt.getSource().getId()).getValueState() === sap.ui.core.ValueState.Error) {
		// 			this.getView().byId(evt.getSource().getId()).setValueState(sap.ui.core.ValueState.None);
		// 		}
		// 	}
		// }
	});
});