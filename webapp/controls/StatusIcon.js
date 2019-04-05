sap.ui.core.Icon.extend('arcelor.controls.StatusIcon', {
    metadata: {
        properties: {
            status: {type: "string"}
        }
    },
    
    init : function() {
        
    },

    renderer: function(oRm, oControl) {
        sap.ui.core.IconRenderer.render.apply(this, arguments);
    },

    onAfterRendering: function() {
		var sStatusClass = (this.getStatus() && this.getStatus().length > 0 ? "statusUiIcon" + this.getStatus() : "");
		this.addStyleClass(sStatusClass);
    }
});