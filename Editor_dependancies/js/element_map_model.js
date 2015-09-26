function Element_Map_Model() {
	var me = this;
	this.model = new Array();
	this.addButton = function(id,text,fontSize,textColor,fillColor,isEnabled,width,height,left,top){
		me.model.push({'Type': 'Button', 'ID':id, 'Text': text, 'Fill': fillColor, 'TextColor': textColor, 'FontSize': fontSize, 'IsEnabled': isEnabled, 'Width': width, 'Height': height, 'Left': left, 'Top': top});
	};
	this.addEntry = function(id,placeholder,entryPassword,fontSize,textColor,width,height,left,top){
		me.model.push({'Type': 'Entry', 'ID':id, 'Placeholder': placeholder, 'TextColor': textColor, 'FontSize': fontSize, 'IsPassword': entryPassword, 'Width': width, 'Height': height, 'Left': left, 'Top': top});
	};
	this.addImage = function(id,url,width,height,left,top){
		me.model.push({'Type': 'Image', 'ID':id, 'URL': url, 'Width': width, 'Height': height, 'Left': left, 'Top': top});
	};
	this.addLabel = function(id,text,fontSize,width,height,left,top){
		me.model.push({'Type': 'Label', 'ID':id, 'Text': text, 'Width': width, 'Height': height, 'Left': left, 'Top': top});
	};
	this.removeByID = function(id){
		var temp_model = new Array();
		for(var i = 0; i < me.model.length; i++) {
			var elem = me.model[i];
			if(elem['id']!=id) {
				temp_model.push(elem);
			}
		}
		me.model = temp_model;
	};
	this.compile = function (compiler) {
		for(var i =0; i < me.model.length; i++) {
			var elem = me.model[i];
			var type = elem['Type'];
			if(type=='Button') {
				compiler.buttonCodeBlock(elem['ID'],elem['Text'],elem['FontSize'],elem['TextColor'],elem['Fill'],elem['IsEnabled']);
				compiler.addTo_idArray(elem['ID']);
			} else if(type=='Entry') {
				compiler.entryCodeBlock(elem['ID'],elem['Placeholder'],elem['IsPassword'],elem['FontSize'],elem['TextColor']);
				compiler.addTo_idArray(elem['ID']);
			} else if(type=='Image') {
				compiler.imageCodeBlock(elem['ID'],elem['URL']);
				compiler.addTo_idArray(elem['ID']);
			} else if(type=='Label') {
				compiler.labelCodeBlock(elem['ID'],elem['Text'],elem['FontSize'],elem['TextColor']);
				compiler.addTo_idArray(elem['ID']);
			} else {
				alert('Error: Unrecognized Element found in element map: '+elem+'!');
			}
		}
	};
}